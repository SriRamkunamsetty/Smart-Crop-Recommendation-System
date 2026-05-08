import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Cpu, Save, CheckCircle, BarChart, Database, AlertCircle } from 'lucide-react';

export default function Train() {
  const [file, setFile] = useState<File | null>(null);
  const [algorithms, setAlgorithms] = useState({
    logistic: true,
    decisionTree: true,
    randomForest: true,
    knn: true,
  });
  
  const [trainingState, setTrainingState] = useState<'idle' | 'uploading' | 'training' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startTraining = () => {
    if (!file) return;
    
    setTrainingState('uploading');
    setProgress(0);
    
    // Simulate training pipeline
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress === 30) {
        setTrainingState('training');
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTrainingState('completed');
        setMetrics({
          accuracy: 99.5,
          f1Score: 99.1,
          precision: 99.3,
          recall: 99.2,
          savedPath: 'model/crop_model.pkl'
        });
      }
    }, 200);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Cpu className="h-8 w-8 text-emerald-600" />
          Model Training Studio
        </h2>
        <p className="text-gray-500 mt-2">Upload datasets and train custom ML models for crop recommendation.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Col: Setup */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-600" />
              1. Dataset
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
              <input type="file" accept=".csv" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              {file ? (
                <p className="text-sm font-semibold text-emerald-600">{file.name}</p>
              ) : (
                <>
                  <p className="text-sm text-gray-600 font-medium">Click to upload CSV</p>
                  <p className="text-xs text-gray-400 mt-1">Format: N, P, K, Temp...</p>
                </>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-emerald-600" />
              2. Algorithms
            </h3>
            
            <div className="space-y-3">
              {Object.entries(algorithms).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={value}
                    onChange={() => setAlgorithms(prev => ({ ...prev, [key]: !prev[key as keyof typeof algorithms] }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" 
                  />
                  <span className="text-gray-700 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={startTraining}
            disabled={!file || trainingState === 'uploading' || trainingState === 'training'}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Cpu className="h-5 w-5" />
            {trainingState === 'idle' || trainingState === 'completed' ? 'Start Training' : 'Processing...'}
          </button>
        </div>

        {/* Right Col: Progress & Results */}
        <div className="md:col-span-2">
          {trainingState === 'idle' ? (
            <div className="bg-gray-50 h-full rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-8 text-center min-h-[400px]">
              <Cpu className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Configure settings and start training to see progress here.</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 h-full"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800">Training Pipeline</h3>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className={trainingState === 'uploading' ? 'text-blue-600' : 'text-gray-500'}>
                    {trainingState === 'uploading' ? 'Preprocessing Data...' : 'Model Training...'}
                  </span>
                  <span className="text-emerald-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-emerald-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: progress + "%" }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Logs */}
              <div className="bg-gray-900 rounded-xl p-4 text-green-400 font-mono text-sm h-48 overflow-y-auto mb-8">
                {progress > 5 && <p>{">"} Loading dataset...</p>}
                {progress > 20 && <p>{">"} Performing Train/Test split (80/20)...</p>}
                {progress > 30 && <p>{">"} Scaling features with StandardScaler...</p>}
                {progress > 40 && algorithms.logistic && <p>{">"} Training Logistic Regression...</p>}
                {progress > 55 && algorithms.decisionTree && <p>{">"} Training Decision Tree...</p>}
                {progress > 70 && algorithms.randomForest && <p>{">"} Training Random Forest (n_estimators=100)...</p>}
                {progress > 85 && algorithms.knn && <p>{">"} Training K-Nearest Neighbors (k=5)...</p>}
                {progress === 100 && <p className="text-white mt-2">{">"} ✅ Training completed!</p>}
              </div>

              {/* Results */}
              {trainingState === 'completed' && metrics && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-emerald-800 text-lg mb-4 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Best Model: Random Forest
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white px-4 py-2 rounded-lg border border-emerald-100 shadow-sm">
                          <p className="text-xs text-gray-500 uppercase font-semibold">Accuracy</p>
                          <p className="text-2xl font-bold text-gray-900">{metrics.accuracy}%</p>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg border border-emerald-100 shadow-sm">
                          <p className="text-xs text-gray-500 uppercase font-semibold">F1-Score</p>
                          <p className="text-2xl font-bold text-gray-900">{metrics.f1Score}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm cursor-default">
                        <Save className="h-4 w-4" />
                        Saved to joblib
                      </div>
                      <p className="text-xs text-gray-500 mt-2 font-mono">{metrics.savedPath}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
