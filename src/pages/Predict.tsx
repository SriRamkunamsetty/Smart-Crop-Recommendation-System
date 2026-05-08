import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, CloudRain, Droplets, FlaskConical, Thermometer, Wind, CloudLightning, X } from 'lucide-react';
import { getPrediction } from '../lib/mlService';
import { useLanguage } from '../lib/LanguageContext';

export default function Predict() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [selectedCropInfo, setSelectedCropInfo] = useState<string | null>(null);

  const CROP_DETAILS: Record<string, any> = {
    rice: { climate: 'Hot and humid', soil: 'Heavy clay or clayey loam', pests: 'Stem borer, leaf folder' },
    maize: { climate: 'Warm temperatures', soil: 'Well-drained loam', pests: 'Fall armyworm, stalk borer' },
    cotton: { climate: 'Warm and sunny', soil: 'Black cotton soil', pests: 'Bollworm, whitefly, aphids' },
    sugarcane: { climate: 'Hot and moist', soil: 'Deep, rich loamy soil', pests: 'Top borer, early shoot borer' },
    tea: { climate: 'Warm and humid', soil: 'Well-drained acidic soil', pests: 'Tea mosquito bug, red spider mite' },
    groundnut: { climate: 'Warm and dry', soil: 'Well-drained sandy loam', pests: 'Leaf miner, white grub' },
    mustard: { climate: 'Cool and dry', soil: 'Sandy loam to clay loam', pests: 'Aphids, painted bug' },
    soybean: { climate: 'Warm and moist', soil: 'Well-drained loamy soil', pests: 'Girdle beetle, whitefly' }
  };

  const openCropModal = (crop: string) => {
    setSelectedCropInfo(crop);
  };
  const closeCropModal = () => setSelectedCropInfo(null);

  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [rainUnit, setRainUnit] = useState<'mm' | 'in'>('mm');

  const [formData, setFormData] = useState({
    n: '',
    p: '',
    k: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [city, setCity] = useState('');
  const [weatherError, setWeatherError] = useState('');

  const [errors, setErrors] = useState<any>({});
  
  const [history, setHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('soilDataHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleTempToggle = () => {
    if (formData.temperature) {
      const num = parseFloat(formData.temperature);
      if (!isNaN(num)) {
        if (tempUnit === 'C') {
          setFormData({...formData, temperature: (num * 9/5 + 32).toFixed(1)});
        } else {
          setFormData({...formData, temperature: ((num - 32) * 5/9).toFixed(1)});
        }
      }
    }
    setTempUnit(v => v === 'C' ? 'F' : 'C');
  };

  const handleRainToggle = () => {
    if (formData.rainfall) {
      const num = parseFloat(formData.rainfall);
      if (!isNaN(num)) {
        if (rainUnit === 'mm') {
          setFormData({...formData, rainfall: (num / 25.4).toFixed(2)});
        } else {
          setFormData({...formData, rainfall: (num * 25.4).toFixed(1)});
        }
      }
    }
    setRainUnit(v => v === 'mm' ? 'in' : 'mm');
  };

  const fillSampleData = () => {
    setTempUnit('C');
    setRainUnit('mm');
    setFormData({
      n: '90',
      p: '42',
      k: '43',
      temperature: '20.8',
      humidity: '82.0',
      ph: '6.5',
      rainfall: '202.9'
    });
    setErrors({});
  };

  const fetchWeather = async () => {
    if (!city) {
      setWeatherError('Please enter a city name to get weather.');
      return;
    }
    setWeatherLoading(true);
    setWeatherError('');
    
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found.");
      }
      
      const { latitude, longitude } = geoData.results[0];
      
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation`);
      const weatherData = await weatherRes.json();
      
      setFormData(prev => ({
        ...prev,
        temperature: weatherData.current.temperature_2m.toString(),
        humidity: weatherData.current.relative_humidity_2m.toString(),
        rainfall: weatherData.current.precipitation > 0 ? (weatherData.current.precipitation * 30).toFixed(1) : '150.5' 
      }));
      setWeatherError('');
      setErrors((prev: any) => ({ ...prev, temperature: null, humidity: null, rainfall: null }));

    } catch (err: any) {
      setWeatherError(err.message || 'Failed to fetch weather.');
    } finally {
      setWeatherLoading(false);
    }
  };

  const validate = () => {
    const errs: any = {};
    const n = Number(formData.n);
    const p = Number(formData.p);
    const k = Number(formData.k);
    const temp = Number(formData.temperature);
    const hum = Number(formData.humidity);
    const ph = Number(formData.ph);
    const rain = Number(formData.rainfall);

    if (!formData.n || isNaN(n) || n < 0 || n > 140) errs.n = `N ${t('predict.n_range') || 'must be 0-140'}`;
    if (!formData.p || isNaN(p) || p < 5 || p > 145) errs.p = `P ${t('predict.p_range') || 'must be 5-145'}`;
    if (!formData.k || isNaN(k) || k < 5 || k > 205) errs.k = `K ${t('predict.k_range') || 'must be 5-205'}`;
    
    const minTemp = tempUnit === 'C' ? 0 : 32;
    const maxTemp = tempUnit === 'C' ? 50 : 122;
    const tempLabel = tempUnit === 'C' ? '°C' : '°F';
    if (!formData.temperature || isNaN(temp) || temp < minTemp || temp > maxTemp) errs.temperature = `Temp must be ${minTemp}-${maxTemp}${tempLabel}`;
    
    if (!formData.humidity || isNaN(hum) || hum < 0 || hum > 100) errs.humidity = "Humidity must be 0-100%";
    if (!formData.ph || isNaN(ph) || ph < 0 || ph > 14) errs.ph = "pH must be between 0-14";
    
    const maxRain = rainUnit === 'mm' ? 500 : 19.7;
    const rainLabel = rainUnit === 'mm' ? 'mm' : 'in';
    if (!formData.rainfall || isNaN(rain) || rain < 0 || rain > maxRain) errs.rainfall = `Rainfall must be 0-${maxRain}${rainLabel}`;
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setResult(null);

    const newEntry = { id: Date.now(), ...formData, tempUnit, rainUnit, date: new Date().toLocaleString() };
    const updatedHistory = [newEntry, ...history].slice(0, 5); // Kept last 5
    setHistory(updatedHistory);
    localStorage.setItem('soilDataHistory', JSON.stringify(updatedHistory));

    const stdTemp = tempUnit === 'C' ? Number(formData.temperature) : (Number(formData.temperature) - 32) * 5/9;
    const stdRain = rainUnit === 'mm' ? Number(formData.rainfall) : Number(formData.rainfall) * 25.4;

    // Simulate API call to ML model
    setTimeout(() => {
      const prediction = getPrediction(
        Number(formData.n),
        Number(formData.p),
        Number(formData.k),
        stdTemp,
        Number(formData.humidity),
        Number(formData.ph),
        stdRain
      );
      setResult(prediction);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900">{t('predict.title')}</h2>
        <p className="text-gray-500 mt-2">{t('predict.subtitle')}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold flex items-center text-emerald-800 mb-4 md:mb-0">
              <FlaskConical className="h-5 w-5 mr-2" />
              Agronomic Parameters
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto relative">
              <div className="relative w-full sm:w-auto flex">
                <input 
                  type="text" 
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Enter City" 
                  className="pl-3 pr-2 py-1.5 border border-gray-300 rounded-l-lg text-sm w-full sm:w-32 focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <button 
                  type="button"
                  onClick={fetchWeather}
                  disabled={weatherLoading}
                  className="bg-blue-50 text-blue-600 border border-l-0 border-gray-300 rounded-r-lg px-3 py-1.5 text-sm hover:bg-blue-100 disabled:opacity-50 flex items-center"
                >
                  {weatherLoading ? <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div> : <CloudLightning className="h-4 w-4" />}
                  <span className="ml-1">Get Weather</span>
                </button>
              </div>
              <button 
                type="button" 
                onClick={fillSampleData}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500 underline whitespace-nowrap"
              >
                {t('predict.loadSample')}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setFormData({
                    ...formData,
                    n: Math.floor(Math.random() * 140).toString(),
                    p: Math.floor(Math.random() * 140).toString(),
                    k: Math.floor(Math.random() * 200).toString(),
                  });
                  setErrors((prev: any) => ({ ...prev, n: null, p: null, k: null }));
                }}
                className="text-sm font-medium text-amber-600 hover:text-amber-500 underline whitespace-nowrap ml-3"
              >
                {t('predict.sensor')}
              </button>
              <AnimatePresence>
                {weatherError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 mt-1 bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-lg text-xs shadow-md z-10 w-full sm:w-auto"
                  >
                    {weatherError}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* NPK Values */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('predict.n')} <span className="font-normal text-xs text-gray-400">0-140</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">N</div>
                  <input type="number" step="any" className={`w-full pl-8 pr-3 py-2 bg-gray-50 border ${errors.n ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
                    value={formData.n} onChange={e => setFormData({...formData, n: e.target.value})} placeholder="e.g. 90" />
                </div>
                <AnimatePresence>
                  {errors.n && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.n}</motion.p>}
                </AnimatePresence>
              </motion.div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('predict.p')} <span className="font-normal text-xs text-gray-400">5-145</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">P</div>
                  <input type="number" step="any" className={`w-full pl-8 pr-3 py-2 bg-gray-50 border ${errors.p ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
                    value={formData.p} onChange={e => setFormData({...formData, p: e.target.value})} placeholder="e.g. 42" />
                </div>
                <AnimatePresence>
                  {errors.p && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.p}</motion.p>}
                </AnimatePresence>
              </motion.div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('predict.k')} <span className="font-normal text-xs text-gray-400">5-205</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">K</div>
                  <input type="number" step="any" className={`w-full pl-8 pr-3 py-2 bg-gray-50 border ${errors.k ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
                    value={formData.k} onChange={e => setFormData({...formData, k: e.target.value})} placeholder="e.g. 43" />
                </div>
                <AnimatePresence>
                  {errors.k && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.k}</motion.p>}
                </AnimatePresence>
              </motion.div>

              {/* Weather Data */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('predict.temp')} <button type="button" onClick={handleTempToggle} className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">°{tempUnit}</button></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Thermometer className="h-4 w-4" />
                  </div>
                  <input type="number" step="any" className={`w-full pl-9 pr-3 py-2 bg-gray-50 border ${errors.temperature ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
                    value={formData.temperature} onChange={e => setFormData({...formData, temperature: e.target.value})} placeholder="e.g. 20.8" />
                </div>
                <AnimatePresence>
                  {errors.temperature && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.temperature}</motion.p>}
                </AnimatePresence>
              </motion.div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('predict.humidity')} <span className="font-normal text-xs text-gray-400">0-100</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Wind className="h-4 w-4" />
                  </div>
                  <input type="number" step="any" className={`w-full pl-9 pr-3 py-2 bg-gray-50 border ${errors.humidity ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
                    value={formData.humidity} onChange={e => setFormData({...formData, humidity: e.target.value})} placeholder="e.g. 82.0" />
                </div>
                <AnimatePresence>
                  {errors.humidity && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.humidity}</motion.p>}
                </AnimatePresence>
              </motion.div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('predict.ph')} <span className="font-normal text-xs text-gray-400">0-14</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Beaker className="h-4 w-4" />
                  </div>
                  <input type="number" step="any" className={`w-full pl-9 pr-3 py-2 bg-gray-50 border ${errors.ph ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
                    value={formData.ph} onChange={e => setFormData({...formData, ph: e.target.value})} placeholder="e.g. 6.5" />
                </div>
                <AnimatePresence>
                  {errors.ph && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.ph}</motion.p>}
                </AnimatePresence>
              </motion.div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('predict.rainfall')} <button type="button" onClick={handleRainToggle} className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">{rainUnit}</button></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <CloudRain className="h-4 w-4" />
                  </div>
                  <input type="number" step="any" className={`w-full pl-9 pr-3 py-2 bg-gray-50 border ${errors.rainfall ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all`} 
                    value={formData.rainfall} onChange={e => setFormData({...formData, rainfall: e.target.value})} placeholder="e.g. 202.9" />
                </div>
                <AnimatePresence>
                  {errors.rainfall && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1">{errors.rainfall}</motion.p>}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <motion.svg 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="-ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    {t('predict.analyzing')}
                  </>
                ) : (
                  "{t('predict.button')}"
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-emerald-50 p-8 border-t border-emerald-100 overflow-hidden"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('predict.resultsTitle')}</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-6"
                >
                  <p className="text-sm uppercase tracking-wider text-emerald-800 font-semibold mb-2">{t('predict.highlyRecommended')}</p>
                  <div className="flex items-end space-x-3 mb-2">
                    <h4 
                      onClick={() => openCropModal(result.topCrop)}
                      className="text-4xl font-extrabold text-emerald-600 capitalize cursor-pointer hover:underline"
                    >
                      {t('crop.' + result.topCrop) || result.topCrop}
                    </h4>
                  </div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    <span>{t('predict.confidence')}:</span>
                    <span>{result.confidence}%</span>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500 font-medium mb-3">{t('predict.alternatives')}</p>
                    <div className="flex space-x-2">
                      {result.alternatives.map((crop: string) => (
                        <span 
                          key={crop} 
                          onClick={() => openCropModal(crop)}
                          className="px-3 py-1 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 cursor-pointer text-gray-600 rounded-md text-sm capitalize transition-colors"
                        >
                          {t('crop.' + crop) || crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6"
                >
                  <p className="text-sm uppercase tracking-wider text-amber-800 font-semibold mb-4 flex items-center">
                    <Droplets className="h-4 w-4 mr-1" />
                    {t('predict.fertilizer')}
                  </p>
                  <ul className="space-y-3">
                    {result.fertilizers.map((fert: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mt-0.5 text-amber-600 font-bold text-xs">{i + 1}</div>
                        <p className="ml-3 text-gray-700 text-sm leading-relaxed">{fert}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Display crop varieties */}
                {result.varieties && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2 glass-card p-6"
                  >
                    <p className="text-sm uppercase tracking-wider text-emerald-800 font-semibold mb-4 flex items-center">
                      {t('predict.regional')} {t('crop.' + result.topCrop) || result.topCrop}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {result.varieties.map((v: any, i: number) => (
                        <div key={i} className="bg-emerald-50 p-4 rounded-lg">
                          <p className="font-semibold text-emerald-800 text-sm mb-1">{v.region}</p>
                          <p className="text-gray-700 text-sm leading-snug">{v.varieties}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Display cultivation tips */}
                {result.cultivationTips && result.cultivationTips.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="md:col-span-2 glass-card p-6"
                  >
                    <p className="text-sm uppercase tracking-wider text-blue-800 font-semibold mb-4 flex items-center">
                      <Beaker className="h-4 w-4 mr-1" />
                      {t('predict.cultivation')}
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {result.cultivationTips.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start bg-blue-50 p-4 rounded-lg">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center mt-0.5 font-bold text-xs">{i + 1}</div>
                          <p className="ml-3 text-gray-700 text-sm leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Section */}
        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-8 border-t border-gray-100 p-8 bg-gray-50 rounded-b-2xl"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-tight">{t('predict.history')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item) => (
                <div key={item.id} className="glass-card p-4 border border-white/50 transition-all hover:shadow-md">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{item.date.split(',')[0]}</span>
                    <button onClick={() => { setFormData(item); setErrors({}); }} className="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-2 py-1 rounded font-medium transition-colors">{t('hist.load')}</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                    <div className="flex justify-between px-1"><span className="text-gray-400">N:</span> <span className="font-mono">{item.n}</span></div>
                    <div className="flex justify-between px-1"><span className="text-gray-400">Temp:</span> <span className="font-mono">{item.temperature}</span></div>
                    <div className="flex justify-between px-1"><span className="text-gray-400">P:</span> <span className="font-mono">{item.p}</span></div>
                    <div className="flex justify-between px-1"><span className="text-gray-400">Hum:</span> <span className="font-mono">{item.humidity}</span></div>
                    <div className="flex justify-between px-1"><span className="text-gray-400">K:</span> <span className="font-mono">{item.k}</span></div>
                    <div className="flex justify-between px-1"><span className="text-gray-400">pH:</span> <span className="font-mono">{item.ph}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Crop Info Modal */}
      <AnimatePresence>
        {selectedCropInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card w-full max-w-lg overflow-hidden"
            >
              <div className="flex justify-between items-center bg-emerald-600 text-white p-4">
                <h3 className="text-lg font-bold capitalize flex items-center">
                  <span className="mr-2">🌱</span>
                  {t('predict.cropDetails')} - {t('crop.' + selectedCropInfo) || selectedCropInfo}
                </h3>
                <button onClick={closeCropModal} className="text-white hover:text-emerald-200">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {(() => {
                  const details = CROP_DETAILS[selectedCropInfo] || { climate: 'Varies by region', soil: 'Well-drained typical soil', pests: 'Common regional pests' };
                  return (
                    <>
                      <div>
                        <h4 className="font-semibold text-emerald-800 text-sm uppercase tracking-wider">{t('predict.climate')}</h4>
                        <p className="text-gray-700 mt-1 leading-relaxed">{details.climate}</p>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-semibold text-amber-800 text-sm uppercase tracking-wider">{t('predict.soil')}</h4>
                        <p className="text-gray-700 mt-1 leading-relaxed">{details.soil}</p>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-semibold text-rose-800 text-sm uppercase tracking-wider">{t('predict.pests')}</h4>
                        <p className="text-gray-700 mt-1 leading-relaxed">{details.pests}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
