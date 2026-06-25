const fs = require('fs');
let code = fs.readFileSync('src/pages/Predict.tsx', 'utf8');

// Replacements for UI text
code = code.replace(/<h2 className="text-3xl font-bold text-gray-900">Crop Prediction Form<\/h2>/, `<h2 className="text-3xl font-bold text-gray-900">{t('predict.title')}</h2>`);
code = code.replace(/<p className="text-gray-500 mt-2">Enter the properties of your soil and weather context\.<\/p>/, `<p className="text-gray-500 mt-2">{t('predict.subtitle')}</p>`);
code = code.replace(/<h3 className="text-xl font-bold text-gray-800">[^<]*Agronomic Parameters[^<]*<\/h3>/g, `<h3 className="text-xl font-bold text-gray-800">{t('predict.params')}</h3>`);

code = code.replace(/<button[^>]*onClick=\{fetchWeather\}[^>]*>[\s\n]*Get Weather[\s\n]*<\/button>/g, `<button onClick={fetchWeather} type="button" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors whitespace-nowrap outline-none flex items-center justify-center min-w-[120px]">{weatherLoading ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> : t('predict.getWeather')}</button>`);
code = code.replace(/Load Sample Data/g, `{t('predict.loadSample')}`);
code = code.replace(/Nitrogen \(N\) <span/g, `{t('predict.n')} <span`);
code = code.replace(/Phosphorus \(P\) <span/g, `{t('predict.p')} <span`);
code = code.replace(/Potassium \(K\) <span/g, `{t('predict.k')} <span`);

// Temp and rainfall toggles
code = code.replace(/Temperature \(\°C\) <span[^>]*>[^<]*<\/span>/, `{t('predict.temp')} <button type="button" onClick={handleTempToggle} className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">°{tempUnit}</button>`);
code = code.replace(/Humidity \(%\) <span[^>]*>[^<]*<\/span>/, `{t('predict.humidity')} <span className="font-normal text-xs text-gray-400">0-100</span>`);
code = code.replace(/pH Level <span[^>]*>[^<]*<\/span>/, `{t('predict.ph')} <span className="font-normal text-xs text-gray-400">0-14</span>`);
code = code.replace(/Rainfall \(mm\) <span[^>]*>[^<]*<\/span>/, `{t('predict.rainfall')} <button type="button" onClick={handleRainToggle} className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">{rainUnit}</button>`);

// Predict button
code = code.replace(/Predict Best Crop/g, `{t('predict.button')}`);
code = code.replace(/Analyzing Data\.\.\./g, `{t('predict.analyzing')}`);
code = code.replace(/Prediction Results/g, `{t('predict.resultsTitle')}`);
code = code.replace(/Highly Recommended Crop/g, `{t('predict.highlyRecommended')}`);
code = code.replace(/Confidence/g, `{t('predict.confidence')}`);
code = code.replace(/Other suitable alternatives:/g, `{t('predict.alternatives')}`);
code = code.replace(/Fertilizer & Care Guide/g, `{t('predict.fertilizer')}`);
code = code.replace(/Regional Varieties for \{result\.topCrop\}/g, `{t('predict.regional')} {t('crop.' + result.topCrop) || result.topCrop}`);
code = code.replace(/Recent Soil Inputs/g, `{t('predict.history')}`);
code = code.replace(/>Load</g, `>{t('hist.load')}<`);

// Translate top crops properly using t('crop.' + cropname)
code = code.replace(/<span className="font-bold text-emerald-900 border-b-2 border-emerald-300">\{result\.topCrop\}<\/span>/, `<span className="font-bold text-emerald-900 border-b-2 border-emerald-300">{t('crop.' + result.topCrop) || result.topCrop}</span>`);
code = code.replace(/\{alt\}/g, `{t('crop.' + alt) || alt}`);

fs.writeFileSync('src/pages/Predict.tsx', code);
console.log('Fixed translations');
