'use client';

import React, { useState } from 'react';
import ModelViewer from './ModelViewer';

export default function ExamCorrectionService() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto my-8 bg-[#0b1616]/90 border border-teal-500/30 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
      {/* Clickable Main Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right bg-[#0e1b1b] hover:bg-[#112222] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-teal-300 text-lg">
            ▼
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#E8E4D9]">خدمات مؤسسة مساعد التعليمية</h3>
            <p className="text-teal-400 text-xs mt-0.5">تصحيح الأوراق الامتحانية</p>
          </div>
        </div>
      </button>

      {/* Expanded Accordion Content */}
      {isOpen && (
        <div className="p-6 border-t border-teal-500/20 bg-[#070e0e] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-right">
            <h4 className="text-lg font-semibold text-teal-300">نظام التصحيح الآلي المتطور</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              تتم عملية تصحيح الأوراق الامتحانية بدقة عالية، وتوثيق الدرجات فورياً لضمان حقوق الطلاب وسرعة إنجاز النتائج.
            </p>
            <div className="inline-block px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-lg text-teal-300 text-xs">
              ✨ دقة وموثوقية عالية
            </div>
          </div>

          {/* 3D GLB Model Container View */}
          <div className="w-full h-56 bg-[#040808] rounded-xl border border-teal-500/20 overflow-hidden relative flex items-center justify-center">
            <ModelViewer />
          </div>
        </div>
      )}
    </div>
  );
}