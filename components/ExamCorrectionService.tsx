'use client';

import React, { useState } from 'react';
import '@google/model-viewer';

export default function ExamCorrectionService() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto my-8 bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
      {/* Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-right bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:bg-slate-800/80 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 text-xl shadow-inner">
            📝
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">خدمات مؤسسة مساعد التعليمية</h3>
            <p className="text-slate-400 text-sm mt-1">تصحيح الأوراق الامتحانية</p>
          </div>
        </div>
        <span className={`text-slate-400 text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Content with 3D Model & Description */}
      {isOpen && (
        <div className="p-8 border-t border-slate-800 bg-slate-950/50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
          {/* Professional Description */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-blue-400">آلية التصحيح الآمن والمضمون</h4>
            <p className="text-slate-300 leading-relaxed text-lg">
              تتم عملية تصحيح الأوراق الامتحانية بدقة وسرعة عاليتين في مكان مخصص ومحفوظ حيث تكون ورقة الطالب مؤمنة.
            </p>
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-300 text-sm font-medium">
              ✨ معتمدة لدى مؤسسة المساعد التعليمية
            </div>
          </div>

          {/* 3D GLB Model Viewer */}
          <div className="w-full h-72 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden relative shadow-inner">
            {/* @ts-ignore */}
            <model-viewer
              src="/your-model-file.glb"
              alt="تصحيح الأوراق ثلاثي الأبعاد"
              auto-rotate
              camera-controls
              ar
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
            ></model-viewer>
            <span className="absolute bottom-3 right-3 text-xs text-slate-500 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
              اسحب للتدوير 3D 🖱️
            </span>
          </div>
        </div>
      )}
    </div>
  );
}