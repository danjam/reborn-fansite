// scripts/image-optimizer.js
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import tinify from 'tinify';

export class ImageOptimizer {
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error('TinyPNG API key is required');
    }

    tinify.key = apiKey;
    this.processed = [];
    this.skipped = [];
    this.errors = [];
    this.totalOriginalSize = 0;
    this.totalOptimizedSize = 0;
    this.concurrency = options.concurrency || 3;
    this.CACHE_FILE = '.tinify-cache.json';
    this.cache = {};
    // Find project root by looking for package.json
    this.projectRoot = this.findProjectRoot();
  }

  // Find project root directory
  findProjectRoot() {
    let dir = process.cwd();
    while (dir !== path.dirname(dir)) {
      if (fs.existsSync(path.join(dir, 'package.json'))) {
        return dir;
      }
      dir = path.dirname(dir);
    }
    // Fallback to current working directory
    return process.cwd();
  }

  // Convert absolute path to relative path for cache key (always from project root)
  getRelativeCacheKey(filePath) {
    return path.relative(this.projectRoot, filePath);
  }

  async optimizeFiles(filePaths, title = 'Image Optimiser') {
    console.log(`🎨 ${title}`);
    console.log('---------------------------------------------------\n');

    // Load cache
    await this.loadCache();

    const fileCount = filePaths.length;
    if (fileCount === 0) {
      console.log('✨ No images to optimize\n');
      return { processed: 0, skipped: 0, errors: 0, totalSavings: 0 };
    }

    // Filter files that need processing
    const filesToProcess = await this.filterFilesToProcess(filePaths);
    const processCount = filesToProcess.length;
    const cachedCount = fileCount - processCount;

    if (processCount === 0) {
      console.log('✨ All images already optimized (cached)\n');
      return { processed: 0, skipped: fileCount, errors: 0, totalSavings: 0 };
    }

    console.log(
      `📂 Processing ${processCount} image(s) (${cachedCount} cached)\n`
    );

    // Process files with controlled concurrency
    await this.processFilesInParallel(filesToProcess);

    // Save cache
    await this.saveCache();

    this.printSummary();

    return {
      processed: this.processed.length,
      skipped: this.skipped.length + cachedCount,
      errors: this.errors.length,
      totalSavings: this.totalOriginalSize - this.totalOptimizedSize,
    };
  }

  async processFilesInParallel(filesToProcess) {
    const total = filesToProcess.length;
    let completed = 0;

    // Process files in batches with controlled concurrency
    for (let i = 0; i < total; i += this.concurrency) {
      const batch = filesToProcess.slice(i, i + this.concurrency);

      // Process batch in parallel
      const promises = batch.map((filePath, batchIndex) =>
        this.processFileWithProgress(filePath, i + batchIndex + 1, total)
      );

      await Promise.all(promises);
      completed += batch.length;

      // Show overall progress after each batch
      if (completed < total) {
        console.log(`📊 Progress: ${completed}/${total} files completed\n`);
      }
    }
  }

  async processFileWithProgress(filePath, current, total) {
    try {
      const originalStats = fs.statSync(filePath);
      const originalSize = originalStats.size;
      const fileName = path.basename(filePath);
      const originalSizeStr = this.formatBytes(originalSize);

      console.log(`🔄 [${current}/${total}] Processing: ${fileName}`);
      console.log(`   📁 ${filePath}`);
      console.log(`   📏 Original: ${originalSizeStr}`);

      const result = await this.optimizeImage(filePath);

      if (result.skipped) {
        console.log(`   ⚠️  Skipped: ${result.reason}`);
        this.skipped.push({ filePath, reason: result.reason });
      } else {
        const optimizedStats = fs.statSync(filePath);
        const optimizedSize = optimizedStats.size;
        const savings = originalSize - optimizedSize;
        const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

        console.log(`   ✅ Optimized: ${this.formatBytes(optimizedSize)}`);
        console.log(
          `   💾 Saved: ${this.formatBytes(savings)} (${savingsPercent}%)`
        );

        // Update cache using relative path as key
        const hash = await this.calculateFileHash(filePath);
        const relativePath = this.getRelativeCacheKey(filePath);
        this.cache[relativePath] = {
          hash,
          optimizedAt: new Date().toISOString(),
          originalSize,
          optimizedSize,
          savings,
        };

        this.processed.push({
          filePath,
          originalSize,
          optimizedSize,
          savings,
          savingsPercent: parseFloat(savingsPercent),
        });

        this.totalOriginalSize += originalSize;
        this.totalOptimizedSize += optimizedSize;
      }

      console.log('');
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
      this.errors.push({ filePath, error: error.message });
    }
  }

  async optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    try {
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        return await this.processWithTinyPNG(filePath);
      } else {
        return { skipped: true, reason: 'Unsupported format' };
      }
    } catch (error) {
      throw new Error(`TinyPNG processing failed: ${error.message}`);
    }
  }

  async processWithTinyPNG(filePath) {
    const tempPath = filePath + '.tmp';
    const source = tinify.fromFile(filePath);
    await source.toFile(tempPath);

    // Check if optimization actually helped
    const originalStats = fs.statSync(filePath);
    const optimizedStats = fs.statSync(tempPath);

    if (optimizedStats.size >= originalStats.size) {
      // Remove temp file and skip
      fs.unlinkSync(tempPath);
      return { skipped: true, reason: 'No size improvement' };
    }

    // Replace original with optimized
    fs.renameSync(tempPath, filePath);
    return { skipped: false };
  }

  printSummary() {
    const processedCount = this.processed.length;
    const skippedCount = this.skipped.length;
    const errorCount = this.errors.length;
    const totalSavings = this.totalOriginalSize - this.totalOptimizedSize;

    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('---------------------------------------------------');

    if (processedCount > 0) {
      console.log(`✅ Optimized: ${processedCount} files`);
      console.log(`📉 Total size reduction: ${this.formatBytes(totalSavings)}`);
      console.log(
        `📊 Overall savings: ${((totalSavings / this.totalOriginalSize) * 100).toFixed(1)}%`
      );
    }

    if (skippedCount > 0) {
      console.log(`⚠️  Skipped: ${skippedCount} files`);
    }

    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} files`);
      console.log('\nError details:');
      for (const { filePath, error } of this.errors) {
        console.log(`   ${filePath}: ${error}`);
      }
    }

    // Show API quota usage
    const quotaUsed = tinify.compressionCount || 0;
    console.log(`🔑 API quota used: ${quotaUsed}/500 this month`);

    if (quotaUsed > 450) {
      console.log('⚠️  Warning: Approaching monthly quota limit!');
    }

    console.log('\n🎉 Image optimization complete!\n');
  }

  // Cache management methods
  async loadCache() {
    try {
      const cacheData = fs.readFileSync(this.CACHE_FILE, 'utf8');
      this.cache = JSON.parse(cacheData);
      console.log(
        `📋 Loaded cache with ${Object.keys(this.cache).length} entries`
      );
    } catch (error) {
      this.cache = {};
      console.log('📋 No cache file found, starting fresh');
    }
  }

  async saveCache() {
    try {
      fs.writeFileSync(
        this.CACHE_FILE,
        JSON.stringify(this.cache, null, 2) + '\n'
      );
      console.log(
        `💾 Cache saved with ${Object.keys(this.cache).length} entries\n`
      );
    } catch (error) {
      console.error('❌ Failed to save cache:', error.message);
    }
  }

  calculateFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  }

  async filterFilesToProcess(filePaths) {
    const filesToProcess = [];

    for (const filePath of filePaths) {
      const currentHash = await this.calculateFileHash(filePath);
      const relativePath = this.getRelativeCacheKey(filePath);
      const cached = this.cache[relativePath];

      if (!cached || cached.hash !== currentHash) {
        filesToProcess.push(filePath);
      }
    }

    return filesToProcess;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / k ** i).toFixed(1)) + ' ' + sizes[i];
  }
}
