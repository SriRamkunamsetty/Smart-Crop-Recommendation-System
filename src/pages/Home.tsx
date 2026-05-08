import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Droplets, ThermometerSun } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-emerald-50">
            Smart Crop Recommendation System
          </h1>
          <p className="text-lg md:text-xl text-emerald-200 mb-10 leading-relaxed">
            Empowering Indian farmers with Machine Learning. Input your soil and environment data to discover the most profitable crop to plant.
          </p>
          <Link 
            to="/predict" 
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span>Start Prediction</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
              <Sprout className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Enter Soil Data</h3>
            <p className="text-gray-600">
              Provide Nitrogen (N), Phosphorus (P), Potassium (K), and pH levels based on your soil test results.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
              <Droplets className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Add Environment</h3>
            <p className="text-gray-600">
              Input average temperature, humidity percentages, and expected rainfall for your specific region.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600">
              <ThermometerSun className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. AI Analysis</h3>
            <p className="text-gray-600">
              Our trained Random Forest ML model analyzes the parameters and recommends the best crops with high confidence.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
