const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found. Create one with api_key=...');
  process.exit(1);
}

const envText = fs.readFileSync(envPath, 'utf8');
const match = envText.match(/^\s*api_key\s*=\s*['"]?([^'"\s]+)['"]?\s*$/m);
if (!match) {
  console.error('api_key not found in .env');
  process.exit(1);
}

const apiKey = match[1];
const configText = `window.PRODUCTIVE_DASHBOARD_API_KEY = ${JSON.stringify(apiKey)};\n`;
fs.writeFileSync(path.resolve(__dirname, 'config.js'), configText, 'utf8');
console.log('Generated config.js from .env');
