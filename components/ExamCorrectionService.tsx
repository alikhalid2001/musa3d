'use client';

import React, { useState } from 'react';

export default function ExamCorrectionService() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto my-8 bg-[#112222]/90 border border-white/15 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
      {/* Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-right bg-gradient-to-r from-[#112222] via-[#0e1b1b] to-[#112222] hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center text-teal-300 text-xl shadow-inner">
            📝
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#E8E4D9]">خدمات مؤسسة مساعد التعليمية</h3>
            <p className="text-teal-400 text-sm mt-1">تصحيح الأوراق الامتحانية</p>
          </div>
        </div>
        <span className={`text-teal-400 text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="p-8 border-t border-white/10 bg-[#070e0e]/50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-right">
            <h4 className="text-xl font-semibold text-teal-300">آلية التصحيح الآمن والمضمون</h4>
            <p className="text-gray-300 leading-relaxed text-sm">
              تتم عملية تصحيح الأوراق الامتحانية بدقة وسرعة عاليتين في مكان مخصص ومحفوظ حيث تكون ورقة الطالب مؤمنة بالكامل وفق أعلى معايير الجودة.
            </p>
            <div className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-300 text-xs font-medium">
              ✨ معتمدة لدى مؤسسة المساعد التعليمية
            </div>
          </div>

          <div className="w-full h-56 bg-[#070e0e] rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="text-4xl">🔒</div>
            <div className="text-sm font-bold text-[#E8E4D9]">حماية عالية لبيانات الطلاب</div>
            <p className="text-xs text-gray-400">توثيق فوري للدرجات واستخراج تقارير دقيقة بضغطة زر واحدة.</p>
          </div>
        </div>
      )}
    </div>
  );
}