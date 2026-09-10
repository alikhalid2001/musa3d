'use client';

import React, { useState } from 'react';
import ModelViewer from './ModelViewer';

export default function ExamCorrectionService() {
  const [activeTab, setActiveTab] = useState<'correction' | 'analysis'>('correction');

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-6">
      {/* Main Category Header with Selection Tabs */}
      <div className="bg-[#0b1616]/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl text-center">
        <h3 className="text-2xl font-bold text-[#E8E4D9]">خدمات مؤسسة مساعد التعليمية</h3>
        <p className="text-teal-400 text-xs mt-1">اختر الخدمة المطلوبة أدناه</p>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => setActiveTab('correction')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'correction'
                ? 'bg-teal-500 text-[#070e0e] shadow-lg shadow-teal-500/20'
                : 'bg-[#070e0e] text-gray-300 border border-teal-500/30 hover:bg-teal-500/10'
            }`}
          >
            تصحيح الأوراق الامتحانية
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-teal-500 text-[#070e0e] shadow-lg shadow-teal-500/20'
                : 'bg-[#070e0e] text-gray-300 border border-teal-500/30 hover:bg-teal-500/10'
            }`}
          >
            تحليل النتائج
          </button>
        </div>
      </div>

      {/* Dynamic Content Card based on selected tab */}
      {activeTab === 'correction' ? (
        <div className="bg-[#0b1616]/90 border border-teal-500/30 rounded-2xl overflow-hidden shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-right">
            <h4 className="text-lg font-semibold text-teal-300">نظام التصحيح الآلي المتطور</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              تتم عملية تصحيح الأوراق الامتحانية بدقة عالية، وتوثيق الدرجات فورياً لضمان حقوق الطلاب وسرعة إنجاز النتائج.
            </p>
            <div className="inline-block px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-lg text-teal-300 text-xs">
              ✨ دقة وموثوقية عالية
            </div>
          </div>

          <div className="w-full h-56 bg-[#040808] rounded-xl border border-teal-500/20 overflow-hidden relative flex items-center justify-center">
            <ModelViewer modelPath="/pencil.glb" />
          </div>
        </div>
      ) : (
        <div className="bg-[#0b1616]/90 border border-teal-500/30 rounded-2xl overflow-hidden shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-right">
            <h4 className="text-lg font-semibold text-teal-300">نظام تحليل النتائج الذكي</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              استخراج تقارير إحصائية متكاملة ومستويات الأداء للطلاب والمواد، مع رسوم بيانية دقيقة لمتابعة التطور العلمي.
            </p>
            <div className="inline-block px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-lg text-teal-300 text-xs">
              📊 تقارير فورية دقيقة
            </div>
          </div>

          <div className="w-full h-56 bg-[#040808] rounded-xl border border-teal-500/20 overflow-hidden relative flex items-center justify-center">
            <ModelViewer modelPath="/scale.glb" />
          </div>
        </div>
      )}
    </div>
  );
}