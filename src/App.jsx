import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  Zap, Sun, Wind, Battery, TrendingUp, AlertTriangle, 
  Cpu, Users, Recycle, Leaf, BarChart3, ChevronRight 
} from 'lucide-react';
import './index.css';
const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Datos de Matriz Energética (Ecuador vs Benchmark Brasil)
  const matrixData = [
    { name: 'Hidroeléctrica', ecuador: 71, brasil: 65 },
    { name: 'Solar/Eólica', ecuador: 2, brasil: 14 },
    { name: 'Convencional', ecuador: 27, brasil: 21 },
  ];

  // Proyecciones de Crecimiento Latam
  const growthData = [
    { year: '2024', solar: 15, eolica: 12, convencional: -2 },
    { year: '2026', solar: 22, eolica: 18, convencional: -5 },
    { year: '2028', solar: 35, eolica: 25, convencional: -8 },
    { year: '2030', solar: 50, eolica: 32, convencional: -12 },
  ];

  // Composición Material Panel 580W
  const lifecycleData = [
    { name: 'Vidrio', weight: 25.8 },
    { name: 'Aluminio', weight: 2.5 },
    { name: 'Silicio', weight: 2.7 },
    { name: 'Cobre', weight: 0.4 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Energy Latam Outlook 2025</h1>
        <p className="text-slate-500">Transformación y Brecha Energética en Ecuador</p>
        
        <div className="flex gap-2 mt-6 bg-white p-1 rounded-lg shadow-sm border border-slate-200 w-fit">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
          >
            Visión General
          </button>
          <button 
            onClick={() => setActiveTab('technical')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'technical' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
          >
            Datos Técnicos SFV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Cobertura Nacional" value="97.78%" subtitle="Ecuador 2024" icon={Users} color="bg-blue-500" />
          <StatCard title="Eficiencia Meta" value="> 95%" subtitle="Operativa" icon={TrendingUp} color="bg-emerald-500" />
          <StatCard title="Brecha de Acceso" value="84,037" subtitle="Hogares" icon={AlertTriangle} color="bg-amber-500" />
          <StatCard title="CO2 Evitado" value="17 Ton" subtitle="Por panel" icon={Leaf} color="bg-indigo-500" />
        </div>

        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={20}/> Crecimiento Proyectado (%)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="solar" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} name="Solar" />
                    <Area type="monotone" dataKey="eolica" stroke="#10b981" fill="#10b981" fillOpacity={0.1} name="Eólica" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center gap-2"><Zap size={20}/> Matriz: Ecuador vs Brasil</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={matrixData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="ecuador" fill="#3b82f6" name="Ecuador %" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="brasil" fill="#10b981" name="Brasil %" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-bold mb-4">Especificaciones Panel 580W</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2"><span>Eficiencia</span><strong>22.45%</strong></li>
                <li className="flex justify-between border-b pb-2"><span>Vida Útil</span><strong>30 años</strong></li>
                <li className="flex justify-between border-b pb-2"><span>Energía Total</span><strong>29,000 kWh</strong></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-bold mb-4">Composición de Materiales</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={lifecycleData} dataKey="weight" innerRadius={60} outerRadius={80} paddingAngle={5}>
                      {lifecycleData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        <section className="bg-slate-900 text-white p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Recomendaciones Estratégicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">1. Analítica Predictiva</h4>
              <p className="text-slate-400">Implementar sensores en activos críticos como Coca Codo Sinclair para evitar fallas reactivas.</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">2. Redes Inteligentes</h4>
              <p className="text-slate-400">Digitalizar la red para permitir la entrada de energías variables sin desestabilizar el sistema.</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">3. Economía Circular</h4>
              <p className="text-slate-400">Trazar el ciclo de vida de los paneles para gestionar el crecimiento de residuos hacia 2050.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;