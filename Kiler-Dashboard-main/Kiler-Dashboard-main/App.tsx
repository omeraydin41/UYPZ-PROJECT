import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, ComposedChart, Legend,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { GlassCard } from './components/GlassCard';
import { getStrategicAdvice, getFutureSimulation } from './services/geminiService';
import { KPI, TimeRange } from './types';
import {
  Users, ChefHat, TrendingUp, Zap, Activity, DollarSign,
  ChevronRight, BrainCircuit, Sliders, LayoutDashboard,
  PieChart as PieIcon, Globe, Clock, Radio, Sparkles, Loader2,
  Target, Rocket, ShieldAlert, CreditCard, Map, Navigation, X, Info,
  ArrowUpRight, ArrowDownRight, BarChart3, Leaf, Heart, Coins
} from 'lucide-react';

// --- RENK PALETİ & TEMA ---
const THEME = {
  bg: 'bg-[#09090b]', // Almost black
  cardBg: 'bg-[#121212]', // Dark grey
  sidebarBg: 'bg-[#000000]', // Pure black
  accent: '#1DB954', // Spotify Greenish
  accent2: '#E91E63', // Neon Pink
  accent3: '#F59E0B', // Amber
  accent4: '#3B82F6', // Blue
  textMain: 'text-white',
  textMuted: 'text-stone-400',
};

// --- CURRENCY CONFIG ---
type CurrencyType = 'TL' | 'USD' | 'EUR';
const EXCHANGE_RATES = {
  TL: 1,
  USD: 43,
  EUR: 50
};

// --- DATA GENERATORS (STABILIZED) ---

const generateData = (range: TimeRange, currency: CurrencyType = 'TL') => {
  let userBase = 423123;
  let timeLabel = "Haftalık";
  let multiplier = 1;
  const rate = EXCHANGE_RATES[currency];
  
  // Base stats modifiers
  if (range === TimeRange.MONTH) {
    userBase = userBase * 4.2;
    timeLabel = "Aylık";
    multiplier = 4;
  } else if (range === TimeRange.YEAR) {
    userBase = userBase * 52 * 1.4; // Growth included
    timeLabel = "Yıllık";
    multiplier = 12;
  }

  // --- WAVE CHART LOGIC (CUSTOM DAILY RHYTHM) ---
  const waveBaseValues = [
    12, // 00:00 - Night start (Low)
    6,  // 02:00 - Deep night (Lowest)
    3,  // 04:00 - Dead hours
    9,  // 06:00 - Waking up (<15%)
    25, // 08:00 - Breakfast/Morning prep (Rising)
    34, // 10:00 - Mid-morning
    39, // 12:00 - Lunch Peak (Near 40%)
    22, // 14:00 - Post-lunch drop (Target ~20%)
    19, // 16:00 - Afternoon lull (~20%)
    52, // 18:00 - Dinner prep start (Rising fast)
    63, // 20:00 - Prime Time Peak (>60%)
    35, // 22:00 - Late snack/winding down
    15  // 24:00 - Loop close
  ];

  const waveData = Array.from({ length: 13 }, (_, i) => {
    const variance = (Math.random() * 6) - 3; 
    const val = Math.max(0, Math.floor(waveBaseValues[i] + variance));
    return {
      time: `${(i * 2).toString().padStart(2, '0')}:00`,
      value: val
    };
  });

  // Calculate Prime Time Value from the Graph Data (Max of evening hours)
  const primeTimeValue = Math.max(waveData[9].value, waveData[10].value); // 18:00 & 20:00

  // --- REVENUE DATA ---
  let revCount = 7;
  let revBase = 2000; // Base in TL
  
  if (range === TimeRange.MONTH) {
      revCount = 4; // Show 4 weeks for clearer aggregation
      revBase = 12500; // Approx weekly revenue
  } else if (range === TimeRange.YEAR) {
      revCount = 12;
      revBase = 50000;
  }

  // Apply Currency Conversion to Base
  revBase = revBase / rate;

  const revenueData = Array.from({ length: revCount }, (_, i) => {
    let label = `Gün ${i+1}`;
    if (range === TimeRange.MONTH) label = `Hafta ${i+1}`;
    if (range === TimeRange.YEAR) label = `Ay ${i+1}`;

    return {
        name: label,
        Premium: Math.floor(revBase * (1 + Math.random() * 0.2)),
        Reklam: Math.floor((revBase * 0.6) * (1 + Math.random() * 0.4))
    };
  });

  // --- SUSTAINABILITY DATA (New) ---
  const wasteData = Array.from({ length: range === TimeRange.WEEK ? 7 : range === TimeRange.MONTH ? 4 : 12 }, (_, i) => ({
      name: range === TimeRange.WEEK ? `Gün ${i+1}` : range === TimeRange.MONTH ? `Hafta ${i+1}` : `Ay ${i+1}`,
      saved: Math.floor((150 * multiplier) + (Math.random() * 50 * multiplier)),
      potential: Math.floor((200 * multiplier) + (Math.random() * 30 * multiplier))
  }));

  // --- NUTRITION vs SATISFACTION (New) ---
  const nutritionData = [
      { name: 'Protein', usage: 85, satisfaction: 92, fill: '#E91E63' },
      { name: 'Düşük Karb', usage: 65, satisfaction: 78, fill: '#F59E0B' },
      { name: 'Vegan', usage: 45, satisfaction: 88, fill: '#1DB954' },
      { name: 'Glutensiz', usage: 30, satisfaction: 65, fill: '#3B82F6' },
      { name: 'Yüksek Lif', usage: 55, satisfaction: 82, fill: '#8B5CF6' },
  ];

  return {
    kpi: [
      { 
        id: 'active', label: `Aktif Şefler (${timeLabel})`, 
        value: Math.floor(userBase).toLocaleString('tr-TR'), 
        trend: range === TimeRange.YEAR ? 45 : 12, 
        story: range === TimeRange.WEEK ? 'Haftalık rekor katılım.' : 'İstikrarlı yıllık büyüme.', 
        icon: 'Users',
        details: [
            { label: 'Yeni Kullanıcı', value: `%${30 + Math.floor(Math.random()*5)}` },
            { label: 'Geri Dönen', value: `%${60 + Math.floor(Math.random()*5)}` },
            { label: 'Churn', value: `%${2 + Math.floor(Math.random()*2)}` }
        ]
      },
      { 
        id: 'conversion', label: 'Ort. Pişirme Süresi', 
        value: range === TimeRange.WEEK ? '45dk' : range === TimeRange.MONTH ? '48dk' : '43dk', 
        trend: Math.floor(Math.random() * 5) - 2, 
        story: 'Hız odaklı pratik tarifler.', 
        icon: 'Clock',
        details: [
            { label: 'Hazırlık', value: '12dk' },
            { label: 'Pişirme', value: '25dk' },
            { label: 'Sunum', value: '8dk' }
        ]
      },
      { 
        id: 'nps', label: 'NPS (Memnuniyet)', 
        value: range === TimeRange.WEEK ? '72' : range === TimeRange.MONTH ? '75' : '71', 
        trend: 8, 
        story: 'Kullanıcı sadakati artıyor.', 
        icon: 'Heart',
        details: [
            { label: 'Destekçiler', value: '%72' },
            { label: 'Pasifler', value: '%21' },
            { label: 'Kötüleyen', value: '%7' }
        ]
      },
      { 
        id: 'arpu', label: 'Prime Time Doluluğu', 
        value: `%${primeTimeValue}`, // Synced with Wave Chart
        trend: 14, 
        story: 'Akşam kuşağı (18-21) zirvede.', 
        icon: 'Activity',
        details: [
            { label: 'Hafta İçi', value: '%65' },
            { label: 'Hafta Sonu', value: '%82' },
            { label: 'Mobil', value: '%90' }
        ]
      },
    ],
    wave: waveData,
    waste: wasteData,
    nutrition: nutritionData,
    genre: [
      { name: 'Pratik İtalyan', value: (75 + Math.random() * 10) * multiplier, fill: '#E91E63' },
      { name: 'Protein Ağırlıklı', value: (65 + Math.random() * 10) * multiplier, fill: '#F59E0B' },
      { name: 'Vegan Atıştırmalık', value: (80 + Math.random() * 10) * multiplier, fill: '#8B5CF6' },
      { name: 'Geleneksel Türk', value: (55 + Math.random() * 10) * multiplier, fill: '#FACC15' },
      { name: 'Asya Sokak', value: (45 + Math.random() * 10) * multiplier, fill: '#06B6D4' },
    ],
    device: [
        { name: 'Mobil', value: 65, fill: '#10B981' },
        { name: 'Tablet', value: 20, fill: '#3B82F6' },
        { name: 'Masaüstü', value: 15, fill: '#E91E63' },
    ],
    revenue: revenueData,
    countries: [
        { name: 'Türkiye', value: 45, code: 'TR' },
        { name: 'ABD', value: 22, code: 'US' },
        { name: 'Japonya', value: 16, code: 'JP' },
        { name: 'Fransa', value: 12, code: 'FR' },
        { name: 'Diğer', value: 5, code: 'OT' },
    ]
  };
};

const generateFutureData = (budget: number, tech: number) => {
  const data = [];
  let baseValue = 1000;
  let aiValue = 1000;
  
  for (let i = 0; i < 12; i++) {
    const month = `Ay ${i+1}`;
    baseValue = baseValue * 1.05; 
    const boostFactor = 1.05 + ((budget + tech) / 1000); 
    aiValue = aiValue * boostFactor;

    data.push({
      name: month,
      Organik: Math.floor(baseValue),
      Simülasyon: Math.floor(aiValue)
    });
  }
  return data;
};

// --- DYNAMIC CONTINENT & SEGMENT DATA GENERATOR ---
const generateContinentData = (range: TimeRange) => {
    let volMult = 1; // Volume multiplier
    let trendShift = 0; // Shifts in percentages to simulate trends over time

    if (range === TimeRange.MONTH) {
        volMult = 1.2;
        trendShift = 5; 
    } else if (range === TimeRange.YEAR) {
        volMult = 2.5;
        trendShift = 15; 
    }

    return {
        'Avrupa': {
            stats: [
                { label: 'Sağlık', value: Math.min(100, 80 + trendShift), full: 100 },
                { label: 'Hız', value: 60, full: 100 },
                { label: 'Lezzet', value: 90, full: 100 },
                { label: 'Maliyet', value: Math.max(20, 40 - trendShift), full: 100 },
                { label: 'Sosyal', value: 85, full: 100 },
            ],
            segments: [
                { name: 'Geleneksel Modernler', desc: 'Türk mutfağı & Dünya', value: 45 + trendShift, color: '#1DB954' },
                { name: 'Eco-Chefs', desc: 'Atıksız ve sürdürülebilir', value: 30, color: '#3B82F6' },
                { name: 'Gurme Gezginler', desc: 'Yöresel keşifler', value: Math.max(5, 25 - trendShift), color: '#F59E0B' },
            ],
            countries: [
                { name: 'Türkiye', val: Math.min(90, 65 + (trendShift/2)), color: '#1DB954', topDish: 'İskender Modern', primeHour: '20:00' },
                { name: 'Almanya', val: 20, color: '#F59E0B', topDish: 'Vegan Schnitzel', primeHour: '19:00' },
                { name: 'Fransa', val: 15, color: '#3B82F6', topDish: 'Ratatouille Hızlı', primeHour: '20:30' }
            ]
        },
        'Asya': {
            stats: [
                { label: 'Sağlık', value: 85, full: 100 },
                { label: 'Hız', value: Math.min(100, 95 + trendShift), full: 100 },
                { label: 'Lezzet', value: 90, full: 100 },
                { label: 'Maliyet', value: 80, full: 100 },
                { label: 'Sosyal', value: 60, full: 100 },
            ],
            segments: [
                { name: 'Bento Sanatçıları', desc: 'Görsel odaklı kutular', value: Math.min(60, 40 + trendShift), color: '#E91E63' },
                { name: 'Sokak Lezzetleri', desc: 'Hızlı ve baharatlı', value: 45, color: '#F59E0B' },
                { name: 'Tech Cooks', desc: 'Akıllı cihaz kullanıcıları', value: Math.max(10, 15 - trendShift), color: '#3B82F6' },
            ],
            countries: [
                { name: 'Japonya', val: 50, color: '#E91E63', topDish: 'Ramen', primeHour: '19:30' },
                { name: 'G.Kore', val: 30, color: '#3B82F6', topDish: 'Kimchi Fried Rice', primeHour: '18:30' },
                { name: 'Hindistan', val: 20, color: '#F59E0B', topDish: 'Butter Chicken', primeHour: '21:00' }
            ]
        },
        'Kuzey Amerika': {
            stats: [
                { label: 'Sağlık', value: Math.min(100, 50 + trendShift * 2), full: 100 },
                { label: 'Hız', value: 90, full: 100 },
                { label: 'Lezzet', value: 85, full: 100 },
                { label: 'Maliyet', value: 60, full: 100 },
                { label: 'Sosyal', value: 70, full: 100 },
            ],
            segments: [
                { name: 'Meal Preppers', desc: 'Haftalık stokçular', value: 45, color: '#10B981' },
                { name: 'Keto Warriors', desc: 'Düşük karbonhidrat', value: 30, color: '#3B82F6' },
                { name: 'Comfort Eaters', desc: 'Duygusal yeme', value: 25, color: '#E91E63' },
            ],
            countries: [
                { name: 'ABD', val: 70, color: '#3B82F6', topDish: 'Mac & Cheese', primeHour: '18:00' },
                { name: 'Kanada', val: 20, color: '#E91E63', topDish: 'Poutine Light', primeHour: '17:30' },
                { name: 'Meksika', val: 10, color: '#10B981', topDish: 'Taco Bowl', primeHour: '21:00' }
            ]
        },
        'Güney Amerika': {
            stats: [
                { label: 'Sağlık', value: 70, full: 100 },
                { label: 'Hız', value: 50, full: 100 },
                { label: 'Lezzet', value: 95, full: 100 },
                { label: 'Maliyet', value: 85, full: 100 },
                { label: 'Sosyal', value: 95, full: 100 },
            ],
            segments: [
                { name: 'Asado Ustaları', desc: 'Ateş ve et', value: 50, color: '#F59E0B' },
                { name: 'Tropik Kaşifler', desc: 'Egzotik meyveler', value: 30, color: '#10B981' },
                { name: 'Fusion', desc: 'Modern karışımlar', value: 20, color: '#E91E63' },
            ],
            countries: [
                { name: 'Brezilya', val: 55, color: '#10B981', topDish: 'Feijoada', primeHour: '20:00' },
                { name: 'Arjantin', val: 30, color: '#3B82F6', topDish: 'Steak', primeHour: '22:00' },
                { name: 'Şili', val: 15, color: '#E91E63', topDish: 'Corn Pie', primeHour: '21:00' }
            ]
        },
        'Afrika': {
            stats: [
                { label: 'Sağlık', value: 80, full: 100 },
                { label: 'Hız', value: 40, full: 100 },
                { label: 'Lezzet', value: 95, full: 100 },
                { label: 'Maliyet', value: 90, full: 100 },
                { label: 'Sosyal', value: 90, full: 100 },
            ],
            segments: [
                { name: 'Kökler', desc: 'Geleneksel tahıllar', value: 60, color: '#F59E0B' },
                { name: 'Modern Baharat', desc: 'Yeni nesil füzyon', value: 40, color: '#E91E63' },
            ],
            countries: [
                { name: 'Mısır', val: 40, color: '#F59E0B', topDish: 'Koshary', primeHour: '22:00' },
                { name: 'G.Afrika', val: 35, color: '#3B82F6', topDish: 'BBQ', primeHour: '18:00' },
                { name: 'Nijerya', val: 25, color: '#10B981', topDish: 'Jollof', primeHour: '19:00' }
            ]
        }
    };
};

// --- HOLOGRAPHIC GLOBE COMPONENT ---
const HolographicGlobe = ({ onSelectContinent, selectedContinent }: { onSelectContinent: (c: string) => void, selectedContinent: string }) => {
    // Simplified SVG coordinates for continents on a globe projection
    const continents = [
        { name: 'Kuzey Amerika', cx: 100, cy: 80, r: 25, color: '#3B82F6' },
        { name: 'Güney Amerika', cx: 130, cy: 180, r: 20, color: '#10B981' },
        { name: 'Avrupa', cx: 210, cy: 70, r: 15, color: '#F59E0B' },
        { name: 'Afrika', cx: 210, cy: 140, r: 22, color: '#E91E63' },
        { name: 'Asya', cx: 290, cy: 90, r: 35, color: '#8B5CF6' },
    ];

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,185,84,0.1)_0%,transparent_70%)]" />
            
            {/* The Globe Sphere */}
            <div className="relative w-[320px] h-[320px] rounded-full border border-white/10 bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,255,0.05)] animate-[spin_60s_linear_infinite]">
                 {/* Latitude Lines */}
                 <div className="absolute inset-0 rounded-full border-t border-b border-white/5 top-[25%] bottom-[25%]" />
                 <div className="absolute inset-0 rounded-full border-t border-b border-white/5 top-[40%] bottom-[40%]" />
                 <div className="absolute inset-0 rounded-full border-l border-r border-white/5 left-[40%] right-[40%]" />
            </div>

            {/* Static Overlay for Interaction (The "Hologram") */}
            <svg viewBox="0 0 400 300" className="absolute w-[400px] h-[300px] z-10">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Connecting Lines */}
                <path d="M100 80 L130 180 M210 70 L210 140 M210 70 L290 90 M100 80 L210 70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

                {continents.map((c) => (
                    <g 
                        key={c.name} 
                        onClick={() => onSelectContinent(c.name)}
                        className="cursor-pointer transition-all duration-300 hover:opacity-80 group"
                    >
                        {/* Pulse Effect */}
                        <circle cx={c.cx} cy={c.cy} r={selectedContinent === c.name ? c.r + 10 : c.r + 5} fill={c.color} opacity="0.2" className={selectedContinent === c.name ? 'animate-ping' : ''} />
                        
                        {/* Core Node */}
                        <circle cx={c.cx} cy={c.cy} r={c.r} fill="rgba(0,0,0,0.6)" stroke={c.color} strokeWidth={selectedContinent === c.name ? 3 : 1} filter="url(#glow)" />
                        
                        {/* Label */}
                        <text x={c.cx} y={c.cy} dy={5} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="pointer-events-none uppercase tracking-widest">{c.name}</text>
                    </g>
                ))}
            </svg>

            {/* Scanning Line Effect */}
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1DB954]/50 to-transparent animate-[scan_4s_ease-in-out_infinite]" />
        </div>
    );
};

// --- COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
      ${active ? 'text-white bg-white/10' : 'text-stone-400 hover:text-white hover:bg-white/5'}
    `}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1DB954] shadow-[0_0_10px_#1DB954]" />}
    <Icon size={20} className={`z-10 transition-colors ${active ? 'text-[#1DB954]' : ''}`} />
    <span className="z-10 font-medium tracking-wide text-sm">{label}</span>
  </button>
);

const NeonCard = ({ children, className = '', title, subtitle, onClick }: { children: React.ReactNode, className?: string, title?: string, subtitle?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`bg-[#121212] rounded-xl border border-white/5 p-6 relative overflow-hidden group flex flex-col ${onClick ? 'cursor-pointer hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all' : ''} ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {(title || subtitle) && (
      <div className="mb-6 flex-shrink-0">
        {title && <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>}
        {subtitle && <p className="text-xs text-stone-500 mt-1">{subtitle}</p>}
      </div>
    )}
    <div className="flex-1 min-h-0 relative">
      {children}
    </div>
  </div>
);

// --- CUSTOM TOOLTIP COMPONENT FOR GLASS EFFECT ---
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-[#121212]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: data.payload.fill, backgroundColor: data.payload.fill }} />
                    <div>
                        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{data.name}</p>
                        <p className="text-2xl font-bold text-white leading-none">%{data.value}</p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

// --- CUSTOM TOOLTIP FOR NUTRITION & TASTE ---
const CustomNutritionTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121212]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] min-w-[150px] transform transition-all duration-300">
        <p className="text-[#1DB954] font-bold text-sm mb-3 tracking-wide">{label}</p>
        <div className="space-y-2">
            {/* Bar Value */}
            <div className="flex justify-between items-center gap-4 text-xs">
                <span className="text-stone-400">Tüketim:</span>
                <span className="font-mono font-bold text-white">{payload[0].value} birim</span>
            </div>
             {/* Scatter Value */}
             <div className="flex justify-between items-center gap-4 text-xs">
                <span className="text-stone-400">Memnuniyet:</span>
                <span className="font-mono font-bold text-[#E91E63]">{payload[1].value}/100</span>
            </div>
        </div>
      </div>
    );
  }
  return null;
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'analysis' | 'audience' | 'settings' | 'future' | 'revenue'>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.WEEK);
  const [selectedContinent, setSelectedContinent] = useState<string>('Asya'); // Default selection
  const [currency, setCurrency] = useState<CurrencyType>('TL');
  
  // Continent Data State (Dynamic)
  const [continentData, setContinentData] = useState(generateContinentData(TimeRange.WEEK));

  // Modal States
  const [selectedCountry, setSelectedCountry] = useState<{name: string, val: number, color: string, topDish?: string, primeHour?: string} | null>(null);
  const [countryAiAdvice, setCountryAiAdvice] = useState<string | null>(null);
  const [isCountryAiLoading, setIsCountryAiLoading] = useState(false);

  // KPI Modal States
  const [selectedKpi, setSelectedKpi] = useState<any | null>(null);
  const [kpiAiAdvice, setKpiAiAdvice] = useState<string | null>(null);
  const [isKpiAiLoading, setIsKpiAiLoading] = useState(false);

  // Specific Chart AI States
  const [sustainabilityAdvice, setSustainabilityAdvice] = useState<string | null>(null);
  const [isSustainabilityLoading, setIsSustainabilityLoading] = useState(false);
  const [nutritionAdvice, setNutritionAdvice] = useState<string | null>(null);
  const [isNutritionLoading, setIsNutritionLoading] = useState(false);


  // Refs
  const detailsRef = useRef<HTMLDivElement>(null);

  // General AI Advice
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Future Sim State
  const [simParams, setSimParams] = useState({ budget: 20, tech: 30, market: 10 });
  const [simResult, setSimResult] = useState<string | null>(null);
  const [isSimLoading, setIsSimLoading] = useState(false);
  const [futureChartData, setFutureChartData] = useState(generateFutureData(20, 30));

  const [data, setData] = useState(generateData(TimeRange.WEEK, 'TL'));

  // Update main data when time range changes
  useEffect(() => {
    setData(generateData(timeRange, currency));
    setContinentData(generateContinentData(timeRange)); // Update continent data dynamically
  }, [timeRange, currency]);

  // Update future chart when params change
  useEffect(() => {
    setFutureChartData(generateFutureData(simParams.budget, simParams.tech));
  }, [simParams]);

  // Initial AI Advice
  useEffect(() => {
    handleAiRequest();
  }, []); // Run once on mount

  // Clear AI advice when view changes to force user to ask again for new context
  useEffect(() => {
      setAiAdvice(null); 
  }, [currentView]);


  const handleAiRequest = async () => {
    setIsAiLoading(true);
    setAiAdvice("Kiler Zekası verileri analiz ediyor...");
    
    let context = "";
    
    if (currentView === 'overview') {
        context = `
          Genel Bakış Sayfası.
          Zaman: ${timeRange}
          Aktif Kullanıcı: ${data.kpi[0].value}
          Prime Time Yoğunluğu: ${data.kpi[3].value}
          Baskın Kategori: ${data.genre.sort((a,b) => b.value - a.value)[0].name}
        `;
    } else if (currentView === 'analysis') {
        context = `
          Tür ve Akış Analizi Sayfası.
          En Popüler Tür: ${data.genre[0].name} (Değer: ${data.genre[0].value.toFixed(0)})
          Cihaz Dağılımı: Mobil %${data.device[0].value}
          Günün en yoğun saati: 20:00 (Değer: 63)
        `;
    } else if (currentView === 'revenue') {
        context = `
          Gelir Merkezi Sayfası.
          Zaman: ${timeRange}
          Para Birimi: ${currency}
          Baskın Gelir Kaynağı: Premium Üyelik (Reklamdan %30 daha fazla)
          En yüksek pazar: Türkiye (%45), ABD (%22), Japonya (%16).
        `;
    } else if (currentView === 'audience') {
        context = `
          Kitle Yönetimi Sayfası.
          Seçili Kıta: ${selectedContinent}.
          Kıta Segmentleri: ${continentData[selectedContinent].segments.map(s => s.name).join(', ')}.
        `;
    } else {
        context = `Genel platform durumu. Kullanıcı sayısı: ${data.kpi[0].value}`;
    }

    try {
        const advice = await getStrategicAdvice(context);
        setAiAdvice(advice);
    } catch (e) {
        setAiAdvice("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
        setIsAiLoading(false);
    }
  };

  const handleContinentSelect = (continent: string) => {
      setSelectedContinent(continent);
      // Soft scroll to details without shifting layout agressively
      setTimeout(() => {
          detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
  };

  const handleCountryClick = (country: any) => {
      setSelectedCountry(country);
      setCountryAiAdvice(null);
  };

  const handleCountryAiRequest = async () => {
      if (!selectedCountry) return;
      setIsCountryAiLoading(true);
      try {
          const context = `
            Ülke: ${selectedCountry.name}.
            Pazar Payı: %${selectedCountry.val}.
            Kıta: ${selectedContinent}.
            Popüler Yemek: ${selectedCountry.topDish}.
            Prime Time: ${selectedCountry.primeHour}.
            
            Bu ülke için büyüme stratejisi ve bir adet taktiksel pazarlama önerisi ver.
          `;
          const advice = await getStrategicAdvice(context);
          setCountryAiAdvice(advice);
      } catch (e) {
          setCountryAiAdvice("Analiz hatası.");
      } finally {
          setIsCountryAiLoading(false);
      }
  };

  // KPI Handlers
  const handleKpiClick = (kpi: any) => {
      setSelectedKpi(kpi);
      setKpiAiAdvice(null);
  };

  const handleKpiAiRequest = async () => {
      if (!selectedKpi) return;
      setIsKpiAiLoading(true);
      try {
          const context = `
            KPI Analizi: ${selectedKpi.label}.
            Mevcut Değer: ${selectedKpi.value}.
            Trend: %${selectedKpi.trend}.
            Otomatik Hikaye: ${selectedKpi.story}.
            Zaman Aralığı: ${timeRange}.
            
            Bu KPI neden bu durumda olabilir? 3 maddelik kısa bir analiz ve 1 adet aksiyon önerisi sun.
          `;
          const advice = await getStrategicAdvice(context);
          setKpiAiAdvice(advice);
      } catch (e) {
          setKpiAiAdvice("KPI analizi yapılamadı.");
      } finally {
          setIsKpiAiLoading(false);
      }
  };

  // Specific Chart Handlers
  const handleSustainabilityAiRequest = async () => {
      setIsSustainabilityLoading(true);
      try {
          const context = `
             Sürdürülebilirlik Raporu:
             Kurtarılan Gıda Miktarı artış eğiliminde.
             Potansiyel tasarruf ile gerçekleşen arasında %15 fark var.
             Kullanıcılar israfı önleme konusunda motive.
             
             Bu veriye dayanarak kiler yönetimi için 1 adet stratejik aksiyon önerisi ver.
          `;
          const advice = await getStrategicAdvice(context);
          setSustainabilityAdvice(advice);
      } catch(e) {
          setSustainabilityAdvice("Bağlantı hatası.");
      } finally {
          setIsSustainabilityLoading(false);
      }
  };

  const handleNutritionAiRequest = async () => {
      setIsNutritionLoading(true);
      try {
          const context = `
             Besin & Lezzet Dengesi Raporu:
             Protein ağırlıklı beslenmede memnuniyet yüksek (%92).
             Glutensiz diyetlerde memnuniyet düşük (%65) ancak talep artıyor.
             Vegan seçenekler dengeli.
             
             Düşük memnuniyet alan kategorileri iyileştirmek için 1 adet somut öneri ver.
          `;
          const advice = await getStrategicAdvice(context);
          setNutritionAdvice(advice);
      } catch(e) {
          setNutritionAdvice("Bağlantı hatası.");
      } finally {
          setIsNutritionLoading(false);
      }
  };


  const handleFutureSimulation = async () => {
    setIsSimLoading(true);
    try {
      const result = await getFutureSimulation(simParams);
      setSimResult(result);
    } catch (e) {
      setSimResult("Simülasyon hatası.");
    } finally {
      setIsSimLoading(false);
    }
  };

  // Helper for money formatting
  const formatMoney = (amountInTL: number) => {
      const val = amountInTL / EXCHANGE_RATES[currency];
      return new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: currency === 'TL' ? 'TRY' : currency,
          maximumFractionDigits: 0
      }).format(val);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in-up pb-8">
            {/* AI STRATEGY TOP BANNER */}
            {aiAdvice && (
                <NeonCard className="bg-gradient-to-r from-[#1DB954]/10 via-[#121212] to-[#121212] border-l-4 border-l-[#1DB954] !py-4 shadow-[0_0_20px_rgba(29,185,84,0.05)]">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#1DB954]/20 rounded-full shadow-[0_0_15px_rgba(29,185,84,0.2)]">
                        <BrainCircuit size={24} className="text-[#1DB954]" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xs font-bold text-[#1DB954] uppercase tracking-widest mb-1">
                            Kiler Intelligence
                        </h4>
                        <p className="text-base text-stone-200 font-light leading-snug">
                            {aiAdvice}
                        </p>
                    </div>
                </div>
                </NeonCard>
            )}

            {/* KPI ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.kpi.map((kpi, index) => (
                <NeonCard 
                    key={kpi.id} 
                    className="relative min-h-[140px]"
                    onClick={() => handleKpiClick(kpi)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">{kpi.label}</div>
                    </div>
                    <div className={`p-2 rounded-full bg-white/5 ${index === 0 ? 'text-[#1DB954]' : 'text-white'}`}>
                      {kpi.icon === 'Users' && <Users size={20} />}
                      {kpi.icon === 'Clock' && <Clock size={20} />}
                      {kpi.icon === 'Zap' && <Zap size={20} />}
                      {kpi.icon === 'Activity' && <Activity size={20} />}
                      {kpi.icon === 'Heart' && <Heart size={20} />}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className={`${kpi.trend > 0 ? 'text-[#1DB954]' : 'text-red-500'} font-bold`}>
                        {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                    </span>
                    <span className="text-stone-500 line-clamp-1">{kpi.story}</span>
                  </div>
                  
                  {/* Hover Hint */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={14} className="text-stone-500" />
                  </div>
                </NeonCard>
              ))}
            </div>

            {/* MAIN CHART */}
            <NeonCard title="Zaman Akışı Analizi" subtitle={`Saatlik pişirme yoğunluğu (${timeRange}). Akşam zirvesi ile KPI eşleşiktir.`}>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.wave}>
                    <defs>
                      <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1DB954" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', color: '#fff' }}
                      cursor={{ stroke: '#1DB954', strokeWidth: 1 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1DB954" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorWave)" 
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </NeonCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* NEW CHART 1: SUSTAINABILITY IMPACT */}
               <NeonCard title="Sürdürülebilirlik Etkisi" subtitle="Akıllı kiler kullanımıyla önlenen gıda israfı.">
                 <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.waste}>
                        <defs>
                          <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="name" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                        <Legend iconType="circle" />
                        <Area type="monotone" dataKey="saved" name="Kurtarılan Gıda (kg)" stroke="#10B981" fillOpacity={1} fill="url(#colorWaste)" strokeWidth={3} />
                        <Area type="monotone" dataKey="potential" name="Potansiyel Tasarruf" stroke="#333" strokeDasharray="5 5" fill="none" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 
                 {/* AI Button - Sustainability */}
                 <div className="absolute top-6 right-6 flex items-center gap-2">
                    <button 
                        onClick={handleSustainabilityAiRequest}
                        disabled={isSustainabilityLoading}
                        className="p-2 bg-[#10B981]/10 hover:bg-[#10B981]/20 rounded-full text-[#10B981] transition-all hover:scale-105"
                        title="Sürdürülebilirlik Önerisi Al"
                    >
                        {isSustainabilityLoading ? <Loader2 size={20} className="animate-spin"/> : <Sparkles size={20} />}
                    </button>
                 </div>
                 
                 {/* Sustainability Advice Text Area */}
                 {sustainabilityAdvice && (
                     <div className="mt-4 p-3 bg-[#10B981]/10 rounded-lg border border-[#10B981]/20 animate-fade-in-up">
                         <div className="flex items-center gap-2 mb-1">
                             <Leaf size={14} className="text-[#10B981]" />
                             <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">AI Çevre Raporu</span>
                         </div>
                         <p className="text-sm text-stone-200 leading-relaxed">{sustainabilityAdvice}</p>
                     </div>
                 )}
               </NeonCard>

               {/* NEW CHART 2: NUTRITION & TASTE BALANCE */}
               <NeonCard title="Besin & Lezzet Dengesi" subtitle="Tercih edilen diyetlerin memnuniyet analizi.">
                  <div className="h-[320px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart layout="vertical" data={data.nutrition} margin={{left: 20, right: 20}}>
                        <CartesianGrid stroke="#333" horizontal={true} vertical={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#999" fontSize={11} width={80} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomNutritionTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                        <Legend />
                        <Bar dataKey="usage" name="Tüketim Hacmi" barSize={12} radius={[0, 4, 4, 0]}>
                             {data.nutrition.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.6} />
                             ))}
                        </Bar>
                        <Scatter dataKey="satisfaction" name="Memnuniyet Skoru" fill="#fff" shape="circle" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* AI Button - Nutrition */}
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    <button 
                        onClick={handleNutritionAiRequest}
                        disabled={isNutritionLoading}
                        className="p-2 bg-[#E91E63]/10 hover:bg-[#E91E63]/20 rounded-full text-[#E91E63] transition-all hover:scale-105"
                        title="Beslenme Stratejisi Al"
                    >
                        {isNutritionLoading ? <Loader2 size={20} className="animate-spin"/> : <Sparkles size={20} />}
                    </button>
                 </div>

                 {/* Nutrition Advice Text Area */}
                 {nutritionAdvice && (
                     <div className="mt-4 p-3 bg-[#E91E63]/10 rounded-lg border border-[#E91E63]/20 animate-fade-in-up">
                         <div className="flex items-center gap-2 mb-1">
                             <Heart size={14} className="text-[#E91E63]" />
                             <span className="text-[10px] font-bold text-[#E91E63] uppercase tracking-wider">AI Lezzet Analizi</span>
                         </div>
                         <p className="text-sm text-stone-200 leading-relaxed">{nutritionAdvice}</p>
                     </div>
                 )}
               </NeonCard>
            </div>
          </div>
        );

      case 'analysis':
        return (
           <div className="space-y-6 animate-fade-in-up pb-8">
               {aiAdvice && (
                <NeonCard className="bg-gradient-to-r from-[#3B82F6]/10 via-[#121212] to-[#121212] border-l-4 border-l-[#3B82F6] !py-4 mb-4">
                <div className="flex items-center gap-4">
                    <BrainCircuit size={24} className="text-[#3B82F6]" />
                    <p className="text-base text-stone-200 font-light leading-snug">{aiAdvice}</p>
                </div>
                </NeonCard>
               )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <NeonCard title="Giriş Yapılan Cihaz" subtitle="Platform bazlı kullanım seviyeleri." className="lg:col-span-1 min-h-[400px]">
                    <div className="h-[220px] flex items-center justify-center relative mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie 
                                data={data.device} 
                                innerRadius={70} 
                                outerRadius={90} 
                                paddingAngle={5} 
                                dataKey="value" 
                                stroke="none"
                              >
                                {data.device.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                           </PieChart>
                        </ResponsiveContainer>
                    </div>
                     <div className="space-y-4 mt-8 px-2">
                       {data.device.map(d => (
                          <div key={d.name} className="flex items-center justify-between text-sm">
                             <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full shadow-[0_0_8px]" style={{backgroundColor: d.fill, boxShadow: `0 0 8px ${d.fill}`}} />
                                <span className="text-stone-300 font-medium">{d.name}</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <span className="text-white font-mono w-8 text-right">%{d.value}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </NeonCard>
                 
                 <NeonCard className="lg:col-span-2" title="Yapay Zeka Etkisi" subtitle="Öneri sisteminin tarif keşfine etkisi.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full content-start">
                        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-[#1DB954]">
                            <div className="flex justify-between">
                                <h3 className="text-stone-400 text-xs font-bold uppercase">Keşif Artışı</h3>
                                <BrainCircuit className="text-[#1DB954] opacity-50"/>
                            </div>
                            <p className="text-3xl font-bold text-white mt-2">+%137</p>
                            <p className="text-xs text-stone-500 mt-2">AI önerileri sonrası denenmeyen tariflerdeki artış.</p>
                        </div>
                         <div className="bg-white/5 p-6 rounded-xl border-l-4 border-[#E91E63]">
                            <div className="flex justify-between">
                                <h3 className="text-stone-400 text-xs font-bold uppercase">Seri Akış (Binge)</h3>
                                <Zap className="text-[#E91E63] opacity-50"/>
                            </div>
                            <p className="text-3xl font-bold text-white mt-2">3.2x</p>
                            <p className="text-xs text-stone-500 mt-2">Kullanıcı başına arka arkaya tarif görüntüleme.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-[#F59E0B] sm:col-span-2">
                             <div className="flex justify-between">
                                <h3 className="text-stone-400 text-xs font-bold uppercase">Çapraz Kategori Satışı</h3>
                                <Radio className="text-[#F59E0B] opacity-50"/>
                            </div>
                            <p className="text-xl text-white mt-2 font-light">"Tatlı sevenlere tuzlu atıştırmalık önerme başarısı %42 arttı."</p>
                        </div>
                    </div>
                 </NeonCard>
              </div>
           </div>
        );

      case 'revenue':
         return (
             <div className="space-y-6 animate-fade-in-up pb-8">
                 {aiAdvice && (
                    <NeonCard className="bg-gradient-to-r from-[#F59E0B]/10 via-[#121212] to-[#121212] border-l-4 border-l-[#F59E0B] !py-4 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#F59E0B]/20 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                             <DollarSign size={24} className="text-[#F59E0B]" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-1">Finansal Zeka</h4>
                            <p className="text-base text-stone-200 font-light leading-snug">{aiAdvice}</p>
                        </div>
                    </div>
                    </NeonCard>
                 )}

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* TOTAL REVENUE SUMMARY */}
                    <NeonCard className="lg:col-span-3">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                     <DollarSign size={24} />
                                 </div>
                                 <div>
                                     <p className="text-sm text-stone-400">Toplam Gelir ({timeRange})</p>
                                     <h3 className="text-3xl font-bold text-white">
                                         {formatMoney(1245000 * (timeRange === TimeRange.MONTH ? 4 : timeRange === TimeRange.YEAR ? 48 : 1))}
                                     </h3>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                                     <CreditCard size={24} />
                                 </div>
                                 <div>
                                     <p className="text-sm text-stone-400">Premium Oranı</p>
                                     <h3 className="text-3xl font-bold text-white">%68</h3>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                     <Activity size={24} />
                                 </div>
                                 <div>
                                     <p className="text-sm text-stone-400">Büyüme (YoY)</p>
                                     <h3 className="text-3xl font-bold text-[#1DB954]">+%142</h3>
                                 </div>
                             </div>
                         </div>
                    </NeonCard>

                    {/* REVENUE CHART */}
                    <NeonCard title="Gelir Akışı" subtitle={`Premium vs Reklam Gelirleri Dağılımı (${currency})`} className="lg:col-span-2 min-h-[400px]">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.revenue}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} 
                                    />
                                    <Legend />
                                    <Bar dataKey="Premium" stackId="a" fill="#1DB954" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="Reklam" stackId="a" fill="#E91E63" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </NeonCard>

                    {/* COUNTRY MAP LIST */}
                    <NeonCard title="Global Pazar" subtitle="Ülke bazlı gelir payı" className="lg:col-span-1">
                        <div className="space-y-6 mt-2">
                            {data.countries.map((c, i) => (
                                <div key={c.code} className="group">
                                    <div className="flex justify-between items-end mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-stone-500 font-mono text-xs">{c.code}</span>
                                            <span className="text-stone-200 font-medium">{c.name}</span>
                                        </div>
                                        <span className="text-white font-bold text-sm">%{c.value}</span>
                                    </div>
                                    <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_currentColor] ${
                                                i === 0 ? 'bg-[#1DB954]' : 
                                                i === 1 ? 'bg-[#3B82F6]' : 
                                                i === 2 ? 'bg-[#E91E63]' : 'bg-stone-500'
                                            }`} 
                                            style={{width: `${c.value}%`}}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-stone-500 text-xs">
                            <Map size={14} />
                            <span>Toplam 42 ülkede aktif</span>
                        </div>
                    </NeonCard>
                 </div>
             </div>
         );

      case 'future':
        return (
          <div className="space-y-6 animate-fade-in-up pb-8">
             <div className="flex items-center justify-between">
                <div>
                   <h2 className="text-2xl font-bold text-white">Gelecek Planı & Simülasyon</h2>
                   <p className="text-stone-400 text-sm">Parametreleri değiştirerek Kiler'in gelecek 12 aylık projeksiyonunu yönetin.</p>
                </div>
                <button 
                   onClick={handleFutureSimulation}
                   disabled={isSimLoading}
                   className="bg-[#1DB954] text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(29,185,84,0.3)] disabled:opacity-50"
                >
                   {isSimLoading ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
                   AI İle Analiz Et
                </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CONTROLS */}
                <NeonCard title="Senaryo Parametreleri" className="lg:col-span-1 h-fit">
                   <div className="space-y-8">
                      <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-stone-300">Pazarlama Bütçesi</label>
                            <span className="text-[#1DB954] font-bold">+{simParams.budget}%</span>
                         </div>
                         <input 
                            type="range" min="0" max="100" value={simParams.budget}
                            onChange={(e) => setSimParams({...simParams, budget: Number(e.target.value)})}
                            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                         />
                      </div>
                      <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-stone-300">Teknoloji & AI Yatırımı</label>
                            <span className="text-[#E91E63] font-bold">+{simParams.tech}%</span>
                         </div>
                         <input 
                            type="range" min="0" max="100" value={simParams.tech}
                            onChange={(e) => setSimParams({...simParams, tech: Number(e.target.value)})}
                            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#E91E63]"
                         />
                      </div>
                      <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-stone-300">Pazar Genişlemesi</label>
                            <span className="text-[#3B82F6] font-bold">+{simParams.market}%</span>
                         </div>
                         <input 
                            type="range" min="0" max="100" value={simParams.market}
                            onChange={(e) => setSimParams({...simParams, market: Number(e.target.value)})}
                            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                         />
                      </div>
                   </div>
                   
                   {/* SIMULATION RESULT BOX */}
                   {simResult && (
                      <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10 animate-fade-in-up">
                         <div className="flex items-center gap-2 mb-3 text-[#1DB954]">
                            <Sparkles size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">AI Tahmini</span>
                         </div>
                         <p className="text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                            {simResult}
                         </p>
                      </div>
                   )}
                </NeonCard>

                {/* CHART */}
                <NeonCard title="Büyüme Projeksiyonu" subtitle="Organik vs Simülasyon Karşılaştırması" className="lg:col-span-2 min-h-[500px]">
                   <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <ComposedChart data={futureChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                            <Legend />
                            <Area type="monotone" dataKey="Organik" fill="#333" stroke="#666" fillOpacity={0.3} />
                            <Line type="monotone" dataKey="Simülasyon" stroke="#1DB954" strokeWidth={3} dot={false} />
                         </ComposedChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                         <div className="text-stone-500 text-xs uppercase mb-1">Tahmini Büyüme</div>
                         <div className="text-2xl font-bold text-white">
                            {((simParams.budget + simParams.tech + simParams.market) * 1.2).toFixed(1)}%
                         </div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                         <div className="text-stone-500 text-xs uppercase mb-1">ROI Beklentisi</div>
                         <div className="text-2xl font-bold text-[#1DB954]">3.4x</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                         <div className="text-stone-500 text-xs uppercase mb-1">Risk Skoru</div>
                         <div className="text-2xl font-bold text-[#E91E63]">
                            {Math.min(10, (simParams.market / 10) + 2).toFixed(1)}/10
                         </div>
                      </div>
                   </div>
                </NeonCard>
             </div>
          </div>
        );

      case 'audience':
         return (
            <div className="space-y-6 animate-fade-in-up pb-8 relative">
               {/* HOLOGRAPHIC GLOBE SELECTOR */}
               <NeonCard className="flex items-center justify-center bg-gradient-to-b from-[#121212] to-black min-h-[450px]">
                   <div className="absolute top-4 left-6 z-10">
                       <h2 className="text-2xl font-light text-white flex items-center gap-3">
                           <Globe className="text-[#1DB954]" /> 
                           Global Kitle Haritası
                       </h2>
                       <p className="text-stone-400 text-sm mt-1">Kıtaları seçerek detaylı pazar analizini inceleyin.</p>
                   </div>
                   <HolographicGlobe onSelectContinent={handleContinentSelect} selectedContinent={selectedContinent} />
               </NeonCard>

               {/* AI ADVICE FOR CONTINENT */}
               {aiAdvice && (
                <NeonCard className="bg-gradient-to-r from-purple-500/10 via-[#121212] to-[#121212] border-l-4 border-l-purple-500 !py-4 mb-4">
                <div className="flex items-center gap-4">
                    <Navigation size={24} className="text-purple-500" />
                    <div>
                        <h4 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">{selectedContinent} Stratejisi</h4>
                        <p className="text-base text-stone-200 font-light leading-snug">{aiAdvice}</p>
                    </div>
                </div>
                </NeonCard>
               )}

               {/* DASHBOARD FOR SELECTED CONTINENT */}
               <div ref={detailsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up scroll-mt-6">
                    {/* RADAR CHART */}
                    <NeonCard title={`${selectedContinent} Tat Profili`} subtitle="Bölgesel lezzet tercihleri" className="lg:col-span-1 min-h-[350px]">
                        <div className="h-[250px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={continentData[selectedContinent].stats}>
                                    <PolarGrid stroke="#333" />
                                    <PolarAngleAxis dataKey="label" tick={{ fill: '#888', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name={selectedContinent} dataKey="value" stroke="#1DB954" strokeWidth={2} fill="#1DB954" fillOpacity={0.4} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </NeonCard>

                    {/* SEGMENT CARDS (Replacing Table) */}
                    <NeonCard title="Kullanıcı Segmentleri" subtitle="Baskın kitle profilleri" className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {continentData[selectedContinent].segments.map((seg, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className={`p-2 rounded-full bg-black/40 ${i===0?'text-[#1DB954]':i===1?'text-[#E91E63]':'text-[#3B82F6]'}`}>
                                            <Users size={16} />
                                        </div>
                                        <span className="text-xs font-mono text-stone-500">#{i+1}</span>
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-1">{seg.name}</h4>
                                    <p className="text-xs text-stone-400 mb-3 line-clamp-1">{seg.desc}</p>
                                    <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{width: `${Math.min(100, seg.value)}%`, backgroundColor: seg.color}} />
                                    </div>
                                    <div className="text-right text-xs mt-1 text-stone-500 font-bold">%{seg.value.toFixed(1)}</div>
                                </div>
                            ))}
                        </div>
                    </NeonCard>

                    {/* ENHANCED COUNTRY VISUALS WITH CLICK */}
                    <NeonCard title="Bölgesel Pazar Payı" subtitle="Ülke bazlı penetrasyon (Detay için ülkeye tıklayın)" className="lg:col-span-3">
                        <div className="flex flex-wrap gap-4 items-end h-[200px] pb-4 border-b border-white/5">
                             {continentData[selectedContinent].countries.map((country, i) => (
                                 <div 
                                    key={i} 
                                    onClick={() => handleCountryClick(country)}
                                    className="flex-1 min-w-[100px] h-full flex flex-col justify-end group cursor-pointer"
                                 >
                                     <div className="text-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <span className="text-xl font-bold text-white">%{country.val.toFixed(0)}</span>
                                     </div>
                                     <div 
                                        className="w-full rounded-t-lg relative overflow-hidden transition-all duration-500 hover:brightness-125"
                                        style={{ height: `${Math.min(100, country.val)}%`, backgroundColor: country.color }}
                                     >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20" />
                                        {/* Click Indicator Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Info size={20} className="text-white drop-shadow-md" />
                                        </div>
                                     </div>
                                     <div className="text-center mt-3">
                                         <h4 className="text-sm font-bold text-white group-hover:text-[#1DB954] transition-colors">{country.name}</h4>
                                         <div className="w-2 h-2 rounded-full mx-auto mt-1" style={{backgroundColor: country.color}} />
                                     </div>
                                 </div>
                             ))}
                        </div>
                    </NeonCard>
               </div>
            </div>
         );

      case 'settings':
         return (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up pb-8">
               <NeonCard title="Sistem Kalibrasyonu" subtitle="Yapay zeka parametreleri ve dashboard ayarları.">
                  <div className="space-y-8">
                     <div>
                        <label className="text-sm text-stone-400 mb-4 block font-medium">AI Öneri Agresifliği</label>
                        <div className="relative pt-1">
                           <input type="range" className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#1DB954]" />
                           <div className="flex justify-between text-xs text-stone-500 mt-3 font-medium uppercase tracking-wider">
                              <span>Güvenli</span>
                              <span>Dengeli</span>
                              <span>Deneysel</span>
                           </div>
                        </div>
                     </div>

                     {/* CURRENCY SETTINGS */}
                     <div className="py-4 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <Coins size={18} className="text-[#F59E0B]" />
                            <span className="text-stone-200 text-sm font-medium">Para Birimi Ayarları</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {(['TL', 'USD', 'EUR'] as CurrencyType[]).map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCurrency(c)}
                                    className={`
                                        py-3 px-4 rounded-lg text-sm font-bold transition-all border
                                        ${currency === c 
                                            ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]' 
                                            : 'bg-stone-800 border-transparent text-stone-400 hover:bg-stone-700'
                                        }
                                    `}
                                >
                                    {c === 'EUR' ? 'EURO' : c}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-stone-500 mt-3">
                            *Döviz kurları sabitlenmiştir: 1 USD = 43 TL, 1 EURO = 50 TL.
                        </p>
                     </div>
                     
                     <div className="flex items-center justify-between py-4 border-b border-white/5">
                        <div className="flex flex-col gap-1">
                           <span className="text-stone-200 text-sm font-medium">Dark Mode (OLED)</span>
                           <span className="text-stone-600 text-xs">Tam siyah zemin kullanımı.</span>
                        </div>
                        <div className="w-12 h-7 bg-[#1DB954] rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(29,185,84,0.3)]">
                           <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm" />
                        </div>
                     </div>
                  </div>
               </NeonCard>
            </div>
         );
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${THEME.bg} text-white font-sans selection:bg-[#1DB954]/30`}>
      
      {/* SIDEBAR - SPOTIFY STYLE */}
      <div className={`w-64 flex-shrink-0 ${THEME.sidebarBg} flex flex-col p-6 z-50 border-r border-white/5`}>
        {/* LOGO */}
        <div className="mb-8 flex items-center gap-3">
           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
             <div className="w-5 h-5 bg-black rounded-full" />
           </div>
           <h1 className="text-xl font-bold tracking-tight">Kiler<span className="text-[#1DB954]">.AI</span></h1>
        </div>

        {/* USER PROFILE - Moved here */}
        <div className="mb-8">
          <div className="flex items-center gap-3 px-3 py-3 border border-white/5 bg-[#121212] cursor-pointer hover:border-white/20 hover:bg-white/5 rounded-xl transition-all group">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-700 to-stone-900 border border-stone-600 flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
                AS
             </div>
             <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white truncate group-hover:text-[#1DB954] transition-colors">Arif Serkan Yılmaz</span>
                <span className="text-[10px] text-stone-500 truncate font-medium">CRM Director</span>
             </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 px-4">Menu</p>
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Genel Bakış" 
            active={currentView === 'overview'} 
            onClick={() => setCurrentView('overview')} 
          />
          <SidebarItem 
            icon={TrendingUp} 
            label="Gelecek Planı" 
            active={currentView === 'future'} 
            onClick={() => setCurrentView('future')} 
          />
          <SidebarItem 
            icon={DollarSign} 
            label="Gelir & Büyüme" 
            active={currentView === 'revenue'} 
            onClick={() => setCurrentView('revenue')} 
          />
          <SidebarItem 
            icon={PieIcon} 
            label="Tür & Akış" 
            active={currentView === 'analysis'} 
            onClick={() => setCurrentView('analysis')} 
          />
          <SidebarItem 
            icon={Globe} 
            label="Kullanıcı Evreni" 
            active={currentView === 'audience'} 
            onClick={() => setCurrentView('audience')} 
          />
          <SidebarItem 
            icon={Sliders} 
            label="Sistem Ayarları" 
            active={currentView === 'settings'} 
            onClick={() => setCurrentView('settings')} 
          />
        </div>

        {/* Removed the bottom user profile div */}
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
         {/* Background Glows */}
         <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#1DB954]/5 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E91E63]/5 rounded-full blur-[120px] pointer-events-none" />

         {/* STICKY HEADER */}
         <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#09090b] z-40">
            <div>
               <h2 className="text-xl font-bold text-white">
                 {currentView === 'overview' && 'Genel'}
                 {currentView === 'future' && 'Simülasyon Merkezi'}
                 {currentView === 'analysis' && 'Derin Analiz'}
                 {currentView === 'audience' && 'Kitle Yönetimi'}
                 {currentView === 'revenue' && 'Gelir Merkezi'}
                 {currentView === 'settings' && 'Ayarlar'}
               </h2>
               <p className="text-xs text-stone-500">
                  {currentView === 'overview' && 'Kullanıcı verilerinin genel analizi.'}
                  {currentView === 'future' && 'AI destekli gelecek projeksiyonları.'}
                  {currentView === 'revenue' && 'Finansal performans ve pazar dağılımı.'}
                  {currentView === 'audience' && 'Bölgesel pazar ve kullanıcı segmentasyonu.'}
               </p>
            </div>
            
            <div className="flex items-center gap-4">
               {/* Time Filters & AI Button - Show on relevant pages */}
               {(currentView === 'overview' || currentView === 'revenue' || currentView === 'analysis' || currentView === 'audience') && (
                  <>
                     <div className="flex bg-[#121212] p-1 rounded-lg border border-white/5">
                        {Object.values(TimeRange).map((t) => (
                           <button 
                              key={t}
                              onClick={() => setTimeRange(t)}
                              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                                 timeRange === t ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-white'
                              }`}
                           >
                              {t}
                           </button>
                        ))}
                     </div>
                     <button 
                       onClick={handleAiRequest}
                       disabled={isAiLoading}
                       className={`
                          px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2
                          ${isAiLoading 
                              ? 'bg-stone-800 text-stone-400 cursor-wait' 
                              : 'bg-[#E91E63] text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(233,30,99,0.4)]'
                          }
                       `}
                     >
                        {isAiLoading ? (
                          <>
                              <Loader2 size={14} className="animate-spin" />
                              Analiz Ediliyor...
                          </>
                        ) : (
                          <>
                              <Sparkles size={14} fill="currentColor" />
                              AI Tavsiyesi İste
                          </>
                        )}
                     </button>
                  </>
               )}
            </div>
         </header>

         {/* Scrollable Content */}
         <main className="flex-1 overflow-y-auto p-8 scrollbar-hide z-0">
            {renderContent()}
         </main>
      </div>

      {/* --- MODALS (Moved here to ensure they are on top of everything) --- */}

      {/* KPI DETAIL MODAL */}
      {selectedKpi && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedKpi(null)} />
              <div className="relative bg-[#18181b] border border-white/10 rounded-2xl w-full max-w-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up">
                  {/* Header */}
                  <div className="p-8 border-b border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                      <div className="flex justify-between items-start mb-4">
                          <div className="p-3 bg-white/5 rounded-full text-[#1DB954] border border-white/5">
                              {selectedKpi.icon === 'Users' && <Users size={32} />}
                              {selectedKpi.icon === 'Clock' && <Clock size={32} />}
                              {selectedKpi.icon === 'Zap' && <Zap size={32} />}
                              {selectedKpi.icon === 'Activity' && <Activity size={32} />}
                              {selectedKpi.icon === 'Heart' && <Heart size={32} />}
                          </div>
                          <button onClick={() => setSelectedKpi(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-white">
                              <X size={24} />
                          </button>
                      </div>
                      <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{selectedKpi.value}</h3>
                      <div className="flex items-center gap-3">
                          <span className="text-lg text-stone-400 font-medium">{selectedKpi.label}</span>
                          <span className={`px-2 py-0.5 rounded text-sm font-bold ${selectedKpi.trend > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                              {selectedKpi.trend > 0 ? '+' : ''}{selectedKpi.trend}%
                          </span>
                      </div>
                  </div>

                  {/* Body */}
                  <div className="p-8 space-y-8">
                        {/* Mini Breakdown Chart Area */}
                        <div className="grid grid-cols-3 gap-4">
                          {selectedKpi.details && selectedKpi.details.map((d: any, i: number) => (
                              <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
                                  <span className="text-stone-500 text-xs uppercase font-bold mb-2">{d.label}</span>
                                  <span className="text-white font-mono text-xl">{d.value}</span>
                              </div>
                          ))}
                        </div>

                        {/* Context Story */}
                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                            <BarChart3 className="text-stone-500 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h4 className="text-sm font-bold text-white mb-1">Veri Hikayesi</h4>
                                <p className="text-stone-400 text-sm leading-relaxed">{selectedKpi.story} Bu metrik, seçilen zaman aralığında ({timeRange}) platformun genel sağlık durumunu yansıtmaktadır.</p>
                            </div>
                        </div>

                      {/* AI Analysis Section */}
                      <div className="border-t border-white/10 pt-6">
                          <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-2 text-stone-200 font-bold">
                                  <Sparkles size={18} className="text-[#1DB954]" />
                                  <span>AI Metric Analysis</span>
                              </div>
                              {!kpiAiAdvice && (
                                  <button 
                                      onClick={handleKpiAiRequest}
                                      disabled={isKpiAiLoading}
                                      className="text-xs bg-white text-black px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50"
                                  >
                                      {isKpiAiLoading ? <Loader2 size={14} className="animate-spin" /> : 'Derinlemesine Analiz Et'}
                                  </button>
                              )}
                          </div>
                          
                          <div className="min-h-[80px] bg-black/20 rounded-xl p-4 border border-white/5 text-sm text-stone-400 leading-relaxed">
                              {isKpiAiLoading ? (
                                  <div className="flex items-center gap-2 text-[#1DB954]">
                                      <Loader2 size={16} className="animate-spin" />
                                      <span>Gemini veriyi işliyor...</span>
                                  </div>
                              ) : kpiAiAdvice ? (
                                  <span className="text-stone-200 animate-fade-in whitespace-pre-line">{kpiAiAdvice}</span>
                              ) : (
                                  "Bu metriğin kök neden analizi ve iyileştirme önerileri için butona tıklayın."
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* COUNTRY DETAIL MODAL */}
      {selectedCountry && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCountry(null)} />
              <div className="relative bg-[#18181b] border border-white/10 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up">
                  {/* Header */}
                  <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-transparent via-white/5 to-transparent">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-black shadow-[0_0_15px_currentColor]" style={{backgroundColor: selectedCountry.color, color: selectedCountry.color}}>
                              <span className="brightness-200 mix-blend-difference">{selectedCountry.name.substring(0,2)}</span>
                          </div>
                          <div>
                              <h3 className="text-2xl font-bold text-white">{selectedCountry.name}</h3>
                              <p className="text-sm text-stone-400">Pazar Payı: %{selectedCountry.val.toFixed(0)}</p>
                          </div>
                      </div>
                      <button onClick={() => setSelectedCountry(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-white">
                          <X size={24} />
                      </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                              <div className="text-stone-500 text-xs uppercase mb-1 flex items-center gap-2">
                                  <ChefHat size={14} /> En Sevilen
                              </div>
                              <div className="text-white font-medium">{selectedCountry.topDish}</div>
                          </div>
                          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                              <div className="text-stone-500 text-xs uppercase mb-1 flex items-center gap-2">
                                  <Clock size={14} /> Prime Time
                              </div>
                              <div className="text-white font-medium">{selectedCountry.primeHour}</div>
                          </div>
                      </div>

                      {/* AI ADVICE SECTION */}
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                          <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2 text-stone-300 font-bold text-sm">
                                  <Sparkles size={16} className="text-[#1DB954]" />
                                  Kiler AI: Ülke Analizi
                              </div>
                              {!countryAiAdvice && (
                                  <button 
                                      onClick={handleCountryAiRequest}
                                      disabled={isCountryAiLoading}
                                      className="text-xs bg-[#1DB954] text-black px-3 py-1 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50"
                                  >
                                      {isCountryAiLoading ? <Loader2 size={12} className="animate-spin" /> : 'Analiz Et'}
                                  </button>
                              )}
                          </div>
                          
                          <div className="min-h-[60px] text-sm text-stone-400 leading-relaxed">
                              {isCountryAiLoading ? (
                                  <span className="animate-pulse">Veriler işleniyor...</span>
                              ) : countryAiAdvice ? (
                                  <span className="text-stone-200 animate-fade-in">{countryAiAdvice}</span>
                              ) : (
                                  "Bu pazar için büyüme stratejisi oluşturmak üzere butona tıklayın."
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}