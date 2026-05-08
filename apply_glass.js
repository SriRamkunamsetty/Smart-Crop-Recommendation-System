import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Dashboard replacements
  content = content.replace(/className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"/g, 'className="glass-card p-6"');
  
  // Predict replacements
  content = content.replace(/className="bg-white p-6 rounded-xl shadow-sm border border-[a-z]+-200"/g, 'className="glass-card p-6"');
  content = content.replace(/className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-[a-z]+-200"/g, 'className="md:col-span-2 glass-card p-6"');
  content = content.replace(/className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 /g, 'className="glass-card p-4 border border-white/50 ');
  content = content.replace(/className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"/g, 'className="glass-card w-full max-w-lg overflow-hidden"');

  // Home replacements
  content = content.replace(/className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/g, 'className="glass-card p-8 group');
  content = content.replace(/className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center relative overflow-hidden"/g, 'className="glass-card p-8 text-center relative overflow-hidden text-gray-900"');
  content = content.replace(/className="text-white text-lg max-w-2xl mx-auto"/g, 'className="text-gray-900 text-lg max-w-2xl mx-auto font-medium"');
  content = content.replace(/bg-emerald-800 text-white py-20/g, 'py-20');

  // Train replacements
  content = content.replace(/className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"/g, 'className="glass-card p-6 md:p-8"');
  content = content.replace(/className="bg-white rounded-2xl shadow-sm border border-gray-100/g, 'className="glass-card');
  
  // Doc replacements
  content = content.replace(/className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"/g, 'className="glass-card p-8 md:p-12"');
  content = content.replace(/className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100"/g, 'className="glass-card p-8 md:p-12"');

  fs.writeFileSync(filePath, content);
}
console.log('Done mapping glass-card styling.');
