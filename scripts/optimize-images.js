#!/usr/bin/env node
// scripts/optimize-images.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ImageOptimizer } from './image-optimizer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, '../src/assets');

class ImageOptimizerCLI {
  constructor() {
    this.mode = this.parseArgs();
    this.apiKey = this.getApiKey();
  }

  parseArgs() {
    const args = process.argv.slice(2);

    if (args.includes('--git')) {
      return 'git';
    } else if (args.includes('--all')) {
      return 'all';
    } else {
      // Default to all if no specific mode
      return 'all';
    }
  }

  getApiKey() {
    const apiKey = process.env.TINIFY_API_KEY;
    if (!apiKey) {
      console.error('❌ TINIFY_API_KEY environment variable is required');
      console.log('💡 Set it with: export TINIFY_API_KEY=your_api_key_here');
      process.exit(1);
    }
    return apiKey;
  }

  async run() {
    const optimizer = new ImageOptimizer(this.apiKey);
    let filePaths = [];
    let title = 'Image Optimiser';

    switch (this.mode) {
      case 'git':
        filePaths = this.getStagedImages();
        title = 'Git Hook Image Optimiser';
        break;
      case 'all':
        filePaths = this.getAllImages();
        title = 'Backfill Image Optimiser';
        break;
    }

    const results = await optimizer.optimizeFiles(filePaths, title);

    // Re-stage modified files if in git mode
    if (this.mode === 'git' && results.processed > 0) {
      this.restageModifiedFiles(optimizer.processed);
    }

    return results;
  }

  getStagedImages() {
    try {
      const staged = execSync('git diff --cached --name-only', {
        encoding: 'utf8',
      });
      const stagedFiles = staged
        .split('\n')
        .filter(file => file.startsWith('src/assets/'))
        .filter(file => /\.(png|jpe?g)$/i.test(file))
        .filter(file => fs.existsSync(file));

      console.log(
        `🔍 Found ${stagedFiles.length} staged image(s) in src/assets/`
      );
      return stagedFiles;
    } catch (error) {
      console.error('❌ Failed to get staged files:', error.message);
      console.log('💡 Make sure you are in a git repository');
      process.exit(1);
    }
  }

  getAllImages() {
    if (!fs.existsSync(ASSETS_DIR)) {
      console.log(`⚠️  Assets directory not found: ${ASSETS_DIR}`);
      return [];
    }

    const images = [];

    const scanDirectory = dir => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          scanDirectory(fullPath);
        } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
          images.push(fullPath);
        }
      }
    };

    scanDirectory(ASSETS_DIR);
    console.log(`🔍 Found ${images.length} image(s) in src/assets/`);
    return images;
  }

  restageModifiedFiles(processedFiles) {
    if (processedFiles.length > 0) {
      console.log('📝 Re-staging optimized images...');
      for (const { filePath } of processedFiles) {
        try {
          execSync(`git add "${filePath}"`);
        } catch (error) {
          console.error(`❌ Failed to re-stage ${filePath}:`, error.message);
        }
      }
      console.log('✅ Optimized images re-staged for commit\n');
    }
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cli = new ImageOptimizerCLI();

  cli.run().catch(error => {
    console.error('❌ Image optimization failed:', error);
    process.exit(1);
  });
}
