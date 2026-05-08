import fs from 'fs';

const fixFile = (path) => {
  let content = fs.readFileSync(path, 'utf-8');
  content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
  fs.writeFileSync(path, content);
};

fixFile('./src/pages/Predict.tsx');
fixFile('./src/pages/Train.tsx');
console.log("Fixed files");
