'use client';

import React, { useState } from 'react';
import ModelViewer from './ModelViewer';

export default function ExamCorrectionService() {
  const [activeTab, setActiveTab] = useState<'correction' | 'analysis' | 'reports' | 'monitoring'>('correction');

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-6">
      {/* Main Category Header with Selection Tabs */}
      <div className="bg-[#0b1616]/90 border border-teal-500/30 rounded-3xl p-8 shadow-2xl text-center">
        <h3 className="text-3xl font-extrabold text-[#E8E4D9]">خدمات مؤسسة مساعد التعليمية</h3>
        <p className="text-teal-400 text-sm mt-2">اختر الخدمة المطلوبة أدناه</p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('correction')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'correction'
                ? 'bg-teal-500 text-[#070e0e] shadow-lg shadow-teal-500/30 scale-105'
                : 'bg-[#070e0e] text-gray-300 border border-teal-500/30 hover:bg-teal-500/10'
            }`}
          >
            تصحيح الأوراق الامتحانية
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-teal-500 text-[#070e0e] shadow-lg shadow-teal-500/30 scale-105'
                : 'bg-[#070e0e] text-gray-300 border border-teal-500/30 hover:bg-teal-500/10'
            }`}
          >
            تحليل النتائج
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-teal-500 text-[#070e0e] shadow-lg shadow-teal-500/30 scale-105'
                : 'bg-[#070e0e] text-gray-300 border border-teal-500/30 hover:bg-teal-500/10'
            }`}
          >
            تقارير PDF تلقائية
          </button>

          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'monitoring'
                ? 'bg-teal-500 text-[#070e0e] shadow-lg shadow-teal-500/30 scale-105'
                : 'bg-[#070e0e] text-gray-300 border border-teal-500/30 hover:bg-teal-500/10'
            }`}
          >
            إدارة المراقبة
          </button>
        </div>
      </div>

      {/* Dynamic Content Card based on selected tab */}
      {activeTab === 'correction' ? (
        <div className="bg-[#0b1616]/90 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-right">
            <h4 className="text-xl font-bold text-teal-300">نظام التصحيح الآلي المتطور</h4>
            <p className="text-gray-300 text-base leading-relaxed">
              تتم عملية تصحيح الأوراق الامتحانية بدقة عالية، وتوثيق الدرجات فورياً لضمان حقوق الطلاب وسرعة إنجاز النتائج.
            </p>
            <div className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-300 text-xs font-semibold">
              ✨ دقة وموثوقية عالية
            </div>
          </div>

          <div className="w-full h-72 bg-[#040808] rounded-2xl border border-teal-500/20 overflow-hidden relative flex items-center justify-center shadow-inner">
            <ModelViewer modelPath="/pencil.glb" />
          </div>
        </div>
      ) : activeTab === 'analysis' ? (
        <div className="bg-[#0b1616]/95 border-2 border-teal-500/40 rounded-3xl overflow-hidden shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-right">
            <h4 className="text-2xl font-bold text-teal-300">نظام تحليل النتائج الذكي</h4>
            <p className="text-gray-200 text-base leading-relaxed">
              استخراج تقارير إحصائية متكاملة ومستويات الأداء للطلاب والمواد، مع رسوم بيانية ومؤشرات دقيقة لمتابعة التطور العلمي واتخاذ القرارات الأكاديمية بثقة.
            </p>
            <div className="inline-block px-4 py-2 bg-teal-500/15 border border-teal-500/30 rounded-xl text-teal-300 text-sm font-semibold">
              📊 تقارير وإحصائيات فورية شاملة
            </div>
          </div>

          <div className="w-full h-80 bg-[#040808] rounded-2xl border border-teal-500/30 overflow-hidden relative flex items-center justify-center shadow-inner">
            <ModelViewer modelPath="/scale.glb" />
          </div>
        </div>
      ) : activeTab === 'reports' ? (
        <div className="bg-[#0b1616]/95 border-2 border-teal-500/40 rounded-3xl overflow-hidden shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-right">
            <h4 className="text-2xl font-bold text-teal-300">خدمة تقارير PDF تلقائية</h4>
            <p className="text-gray-200 text-base leading-relaxed">
              إنشاء وتصدير كشوفات الدرجات وقوائم الطلاب الرسمية بصيغة PDF بشكل آلي ومنظم، جاهزة للطباعة والمشاركة الفورية بكل سهولة.
            </p>
            <div className="inline-block px-4 py-2 bg-teal-500/15 border border-teal-500/30 rounded-xl text-teal-300 text-sm font-semibold">
              📄 تصدير فوري واحترافي
            </div>
          </div>

          <div className="w-full h-80 bg-[#040808] rounded-2xl border border-teal-500/30 overflow-hidden relative flex items-center justify-center shadow-inner">
            <ModelViewer modelPath="/list.glb" />
          </div>
        </div>
      ) : (
        /* Monitoring Management Section */
        <div className="bg-[#0b1616]/95 border-2 border-teal-500/40 rounded-3xl overflow-hidden shadow-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-right">
            <h4 className="text-2xl font-bold text-teal-300">نظام إدارة المراقبة</h4>
            <p className="text-gray-200 text-base leading-relaxed">
              تخطيط وتوزيع لجان المراقبة والقاعات الامتحانية بمرونة وكفاءة عالية، لضمان سير الامتحانات بسلاسة وتنظيم متكامل للمشرفين والكوادر.
            </p>
            <div className="inline-block px-4 py-2 bg-teal-500/15 border border-teal-500/30 rounded-xl text-teal-300 text-sm font-semibold">
              👁️ تنظيم وتغطية شاملة
            </div>
          </div>

          <div className="w-full h-80 bg-[#040808] rounded-2xl border border-teal-500/30 overflow-hidden relative flex items-center justify-center shadow-inner">
            <ModelViewer modelPath="/teles.glb" />
          </div>
        </div>
      )}
    </div>
  );
}