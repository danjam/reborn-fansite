import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

/**
 * Load environment variables for Node.js scripts
 */
export function loadEnv() {
  const envFile = resolve(rootDir, '.env');
  config({ path: envFile });

  const environment = process.env.NODE_ENV || 'development';
  console.log(`🔧 Environment: ${environment}`);
}
