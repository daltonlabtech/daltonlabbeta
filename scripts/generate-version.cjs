const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const buildId = crypto.randomBytes(8).toString('hex') + '-' + Date.now();

const versionData = {
  buildId,
  buildTime: new Date().toISOString(),
};

const outputPath = path.resolve(__dirname, '..', 'public', 'version.json');
fs.writeFileSync(outputPath, JSON.stringify(versionData, null, 2));

console.log(`[generate-version] buildId: ${buildId}`);
