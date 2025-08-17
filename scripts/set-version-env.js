// Run this locally to test version display with git hash
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

try {
  const gitHash = execSync('git rev-parse --short HEAD', {
    encoding: 'utf8',
  }).trim();

  let envContent = '';
  try {
    envContent = readFileSync('.env', 'utf8');
  } catch {
    console.log('📝 Creating new .env file');
  }

  const envVarRegex = /^VITE_REACT_APP_GIT_HASH=.*$/m;
  const newLine = `VITE_REACT_APP_GIT_HASH=${gitHash}`;

  const updatedContent = envVarRegex.test(envContent)
    ? envContent.replace(envVarRegex, newLine)
    : envContent
      ? `${envContent}\n${newLine}`
      : newLine;

  writeFileSync('.env', updatedContent);
  console.log(`✅ Set git hash: ${gitHash}`);
  console.log('🔄 Restart your dev server to see the change');
} catch (error) {
  console.error('❌ Error setting git hash:', error.message);
  process.exit(1);
}
