import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(dir);

for (const file of files) {
  const filepath = path.join(dir, file);
  const stats = fs.statSync(filepath);
  const buffer = fs.readFileSync(filepath, { length: 100 });
  console.log(`${file}: ${stats.size} bytes`);
  console.log(`Content start: ${buffer.toString('utf8').substring(0, 50)}`);
}
