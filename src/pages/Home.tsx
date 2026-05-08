import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Droplets, ThermometerSun } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-emerald-50">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl text-emerald-200 mb-10 leading-relaxed">
            {t('home.subtitle')}
          </p>
          <Link 
            to="/predict" 
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span>{t('home.startBtn')}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('home.howItWorks')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
              <Sprout className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('home.step1.title')}</h3>
            <p className="text-gray-600">
              {t('home.step1.desc')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
              <Droplets className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('home.step2.title')}</h3>
            <p className="text-gray-600">
              {t('home.step2.desc')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600">
              <ThermometerSun className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('home.step3.title')}</h3>
            <p className="text-gray-600">
              {t('home.step3.desc')}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
