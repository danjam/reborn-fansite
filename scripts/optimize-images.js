#!/usr/bin/env node
// scripts/optimize-images.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ImageOptimizer } from './image-optimizer.js';
import { loadEnv } from './load-env.js';

// Load environment variables
loadEnv();

const ASSETS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/assets'
);

class ImageOptimizerCLI {
  constructor() {
    const args = process.argv.slice(2);
    this.mode = args.includes('--git') ? 'git' : 'all';

    const apiKey = process.env.TINIFY_API_KEY;
    if (!apiKey) {
      console.error('❌ TINIFY_API_KEY environment variable is required');
      console.log(
        '💡 Create a .env file with: TINIFY_API_KEY=your_api_key_here'
      );
      process.exit(1);
    }
    this.apiKey = apiKey;
  }

  async run() {
    const optimizer = new ImageOptimizer(this.apiKey);
    const isGitMode = this.mode === 'git';
    const filePaths = isGitMode ? this.getStagedImages() : this.getAllImages();
    const title = isGitMode
      ? 'Git Hook Image Optimiser'
      : 'Backfill Image Optimiser';

    const results = await optimizer.optimizeFiles(filePaths, title);

    // Re-stage modified files if in git mode
    if (isGitMode && results.processed > 0) {
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
        .filter(
          file =>
            file.startsWith('src/assets/') &&
            /\.(png|jpe?g)$/i.test(file) &&
            fs.existsSync(file)
        );

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
    const imageRegex = /\.(png|jpe?g)$/i;

    const scanDirectory = dir => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          scanDirectory(fullPath);
        } else if (imageRegex.test(entry.name)) {
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
