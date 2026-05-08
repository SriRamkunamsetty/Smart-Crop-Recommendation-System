import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import { useLanguage } from '../lib/LanguageContext';

const ACCURACY_DATA = [
  { name: 'Logistic Regression', accuracy: 95.2 },
  { name: 'Decision Tree', accuracy: 98.1 },
  { name: 'KNN', accuracy: 97.4 },
  { name: 'Random Forest', accuracy: 99.5 },
];

const SOIL_REQUIREMENTS = [
  { subject: 'Nitrogen', rice: 80, wheat: 40, cotton: 120, fullMark: 150 },
  { subject: 'Phosphorus', rice: 50, wheat: 60, cotton: 45, fullMark: 150 },
  { subject: 'Potassium', rice: 40, wheat: 50, cotton: 40, fullMark: 150 },
  { subject: 'Moisture', rice: 90, wheat: 50, cotton: 60, fullMark: 150 },
  { subject: 'Temp', rice: 80, wheat: 40, cotton: 90, fullMark: 150 },
];

const HISTORICAL_YIELD_DATA = [
  { year: '2019', rice: 2.8, wheat: 3.1, cotton: 1.5, maize: 2.6 },
  { year: '2020', rice: 2.9, wheat: 3.2, cotton: 1.6, maize: 2.7 },
  { year: '2021', rice: 3.1, wheat: 3.4, cotton: 1.8, maize: 3.0 },
  { year: '2022', rice: 3.0, wheat: 3.3, cotton: 1.7, maize: 2.9 },
  { year: '2023', rice: 3.3, wheat: 3.5, cotton: 1.9, maize: 3.2 },
  { year: '2024', rice: 3.5, wheat: 3.8, cotton: 2.1, maize: 3.5 },
];

const ENVIRONMENTAL_TRENDS = [
  { year: '2019', humidity: 65, rainfall: 850 },
  { year: '2020', humidity: 68, rainfall: 920 },
  { year: '2021', humidity: 64, rainfall: 810 },
  { year: '2022', humidity: 70, rainfall: 980 },
  { year: '2023', humidity: 72, rainfall: 1050 },
  { year: '2024', humidity: 69, rainfall: 900 },
];

const PH_DISTRIBUTION = [
  { range: '4.5 - 5.0', count: 12 },
  { range: '5.0 - 5.5', count: 25 },
  { range: '5.5 - 6.0', count: 45 },
  { range: '6.0 - 6.5', count: 80 },
  { range: '6.5 - 7.0', count: 120 },
  { range: '7.0 - 7.5', count: 65 },
  { range: '7.5 - 8.0', count: 30 },
  { range: '8.0 - 8.5', count: 10 },
];

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{t('dash.title')}</h2>
        <p className="text-gray-500 mt-2">{t('dash.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        
        {/* Model Accuracy Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-800">{t('dash.modelPerf')}</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ACCURACY_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="accuracy" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NPK Radar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-800">{t('dash.nutritional')}</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SOIL_REQUIREMENTS}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#4B5563', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name={t('crop.rice')} dataKey="rice" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                <Radar name={t('crop.cotton')} dataKey="cotton" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                <Legend iconType="circle" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Yield Chart */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-6 text-gray-800">{t('dash.yield')}</h3>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={HISTORICAL_YIELD_DATA}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
              />
              <Legend iconType="circle" />
              <Line type="monotone" name={t('crop.rice')} dataKey="rice" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              <Line type="monotone" name={t('crop.wheat') || 'Wheat'} dataKey="wheat" stroke="#F59E0B" strokeWidth={3} dot={{r: 4}} />
              <Line type="monotone" name={t('crop.cotton')} dataKey="cotton" stroke="#10B981" strokeWidth={3} dot={{r: 4}} />
              <Line type="monotone" name={t('crop.maize')} dataKey="maize" stroke="#8B5CF6" strokeWidth={3} dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Environmental Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8 mt-8">
        {/* Humidity Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-800">{t('dash.humidity')}</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={ENVIRONMENTAL_TRENDS}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} domain={[50, 80]}/>
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Legend iconType="circle" />
                <Line type="basis" name="Humidity (%)" dataKey="humidity" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rainfall Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-800">{t('dash.rainfall')}</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={ENVIRONMENTAL_TRENDS}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} domain={[0, 1200]}/>
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Legend iconType="circle" />
                <Line type="monotone" name="Rainfall (mm)" dataKey="rainfall" stroke="#06b6d4" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* pH Distribution Chart */}
      <div className="glass-card p-6 mt-8">
        <h3 className="text-lg font-bold mb-6 text-gray-800">{t('dash.ph')}</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={PH_DISTRIBUTION}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
              <Tooltip 
                cursor={{fill: '#F3F4F6'}}
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Regions Sampled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
