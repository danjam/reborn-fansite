import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Load environment variables for Node.js scripts
 */
export function loadEnv() {
  config({
    path: resolve(dirname(fileURLToPath(import.meta.url)), '..', '.env'),
  });

  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
}
