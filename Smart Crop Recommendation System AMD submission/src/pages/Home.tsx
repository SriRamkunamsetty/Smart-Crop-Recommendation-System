import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Droplets, ThermometerSun } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 text-center mt-12 mb-8">
        <div className="max-w-4xl mx-auto glass-card p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <Link 
            to="/predict" 
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-[0_8px_30px_rgba(5,150,105,0.4)] transition-all hover:shadow-[0_8px_40px_rgba(5,150,105,0.6)] hover:-translate-y-1 active:scale-95 text-lg"
          >
            <span>{t('home.startBtn')}</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12 drop-shadow-sm">{t('home.howItWorks')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-emerald-100/80 backdrop-blur-md rounded-2xl shadow-inner flex items-center justify-center mb-6 text-emerald-600 border border-emerald-200">
              <Sprout className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.step1.title')}</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              {t('home.step1.desc')}
            </p>
          </div>

          <div className="glass-card p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-blue-100/80 backdrop-blur-md rounded-2xl shadow-inner flex items-center justify-center mb-6 text-blue-600 border border-blue-200">
              <Droplets className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.step2.title')}</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              {t('home.step2.desc')}
            </p>
          </div>

          <div className="glass-card p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-amber-100/80 backdrop-blur-md rounded-2xl shadow-inner flex items-center justify-center mb-6 text-amber-600 border border-amber-200">
              <ThermometerSun className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.step3.title')}</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              {t('home.step3.desc')}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
