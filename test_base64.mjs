import fs from 'fs';
const buf = fs.readFileSync('public/images/easesleep.jpg');
console.log(buf.toString('base64').substring(0, 100));
