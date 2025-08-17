// scripts/set-version-env.js
// Run this locally to test version display with git hash

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

try {
  // Get current git hash
  const gitHash = execSync('git rev-parse --short HEAD', {
    encoding: 'utf8',
  }).trim();

  // Read current .env file or create one
  let envContent = '';
  try {
    envContent = readFileSync('.env', 'utf8');
  } catch (error) {
    console.log('📝 Creating new .env file');
  }

  // Update or add git hash
  const lines = envContent.split('\n');
  const hashLineIndex = lines.findIndex(line =>
    line.startsWith('VITE_REACT_APP_GIT_HASH=')
  );

  if (hashLineIndex >= 0) {
    lines[hashLineIndex] = `VITE_REACT_APP_GIT_HASH=${gitHash}`;
  } else {
    lines.push(`VITE_REACT_APP_GIT_HASH=${gitHash}`);
  }

  // Write back to .env
  writeFileSync('.env', lines.join('\n'));

  console.log(`✅ Set git hash: ${gitHash}`);
  console.log('🔄 Restart your dev server to see the change');
} catch (error) {
  console.error('❌ Error setting git hash:', error.message);
  process.exit(1);
}
