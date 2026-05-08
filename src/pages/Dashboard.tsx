import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

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

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-500 mt-2">Visualizing Machine Learning performance and crop patterns.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Model Accuracy Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Model Performance Comparison</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ACCURACY_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="accuracy" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Random Forest selected as final deployment model due to 99.5% accuracy.
          </p>
        </div>

        {/* NPK Radar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Nutritional Needs by Crop Type</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SOIL_REQUIREMENTS}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#4B5563', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Rice" dataKey="rice" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                <Radar name="Cotton" dataKey="cotton" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                <Legend iconType="circle" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Multivariate analysis showing requirement variance between cash crops and staple grains.
          </p>
        </div>

      </div>
    </div>
  );
}
