import fs from 'fs';
let code = fs.readFileSync('src/pages/Train.tsx', 'utf8');

code = code.replace(/export default function Train\(\) \{/, `import { useLanguage } from '../lib/LanguageContext';\n\nexport default function Train() {\n  const { t } = useLanguage();`);

code = code.replace(/Model Training Studio/, `{t('train.title')}`);
code = code.replace(/Upload datasets and train custom ML models for crop recommendation\./, `{t('train.subtitle')}`);
code = code.replace(/1\. Dataset/, `{t('train.data')}`);
code = code.replace(/Click to upload CSV/, `{t('train.click')}`);
code = code.replace(/Format: N, P, K, Temp\.\.\./, `{t('train.format')}`);
code = code.replace(/2\. Algorithms/, `{t('train.algo')}`);
code = code.replace(/'Start Training' : 'Processing\.\.\.'/, `t('train.start') : t('train.processing')`);
code = code.replace(/Configure settings and start training to see progress here\./, `{t('train.configure')}`);
code = code.replace(/Training Pipeline/, `{t('train.pipeline')}`);
code = code.replace(/'Preprocessing Data\.\.\.' : 'Model Training\.\.\.'/, `t('train.pre') : t('train.train')`);

fs.writeFileSync('src/pages/Train.tsx', code);
console.log('Fixed Train translations');
