import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, CloudRain, Droplets, FlaskConical, Thermometer, Wind, CloudLightning } from 'lucide-react';
import { getPrediction } from '../lib/mlService';

export default function Predict() {
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

  const fillSampleData = () => {
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
      setWeatherError('Please enter a city name first.');
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

    if (!formData.n || isNaN(n) || n < 0 || n > 140) errs.n = "N must be 0-140";
    if (!formData.p || isNaN(p) || p < 5 || p > 145) errs.p = "P must be 5-145";
    if (!formData.k || isNaN(k) || k < 5 || k > 205) errs.k = "K must be 5-205";
    
    if (!formData.temperature || isNaN(temp) || temp < 0 || temp > 50) errs.temperature = "Temp must be 0-50°C";
    if (!formData.humidity || isNaN(hum) || hum < 0 || hum > 100) errs.humidity = "Humidity must be 0-100%";
    if (!formData.ph || isNaN(ph) || ph < 0 || ph > 14) errs.ph = "pH must be between 0-14";
    if (!formData.rainfall || isNaN(rain) || rain < 0 || rain > 500) errs.rainfall = "Rainfall must be 0-500mm";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setResult(null);

    // Simulate API call to ML model
    setTimeout(() => {
      const prediction = getPrediction(
        Number(formData.n),
        Number(formData.p),
        Number(formData.k),
        Number(formData.temperature),
        Number(formData.humidity),
        Number(formData.ph),
        Number(formData.rainfall)
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
        <h2 className="text-3xl font-bold text-gray-900">Crop Prediction Form</h2>
        <p className="text-gray-500 mt-2">Enter the properties of your soil and weather context.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold flex items-center text-emerald-800 mb-4 md:mb-0">
              <FlaskConical className="h-5 w-5 mr-2" />
              Agronomic Parameters
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
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
                Load Sample Data
              </button>
            </div>
            {weatherError && <p className="text-xs text-red-500 absolute mt-12">{weatherError}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* NPK Values */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N) <span className="font-normal text-xs text-gray-400">0-140</span></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P) <span className="font-normal text-xs text-gray-400">5-145</span></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (K) <span className="font-normal text-xs text-gray-400">5-205</span></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C) <span className="font-normal text-xs text-gray-400">0-50</span></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Humidity (%) <span className="font-normal text-xs text-gray-400">0-100</span></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">pH Level <span className="font-normal text-xs text-gray-400">0-14</span></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall (mm) <span className="font-normal text-xs text-gray-400">0-500</span></label>
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
                    Analyzing Data...
                  </>
                ) : (
                  "Predict Best Crop"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Prediction Results</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-emerald-200"
                >
                  <p className="text-sm uppercase tracking-wider text-emerald-800 font-semibold mb-2">Highly Recommended Crop</p>
                  <div className="flex items-end space-x-3 mb-2">
                    <h4 className="text-4xl font-extrabold text-emerald-600 capitalize">{result.topCrop}</h4>
                  </div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    <span>Confidence:</span>
                    <span>{result.confidence}%</span>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500 font-medium mb-3">Other suitable alternatives:</p>
                    <div className="flex space-x-2">
                      {result.alternatives.map((crop: string) => (
                        <span key={crop} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm capitalize">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-amber-200"
                >
                  <p className="text-sm uppercase tracking-wider text-amber-800 font-semibold mb-4 flex items-center">
                    <Droplets className="h-4 w-4 mr-1" />
                    Fertilizer & Care Guide
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
