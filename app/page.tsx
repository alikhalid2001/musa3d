'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Center, useGLTF, Html } from '@react-three/drei';
import { motion, useScroll } from 'framer-motion';
import React, { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';

// Instant loading spinner fallback for the 3D model
function LogoLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] text-teal-300 tracking-wider">جاري التحميل...</span>
      </div>
    </Html>
  );
}

// 3D Logo Component with enlarged scaling
function CentralLogo({ scrollProgress }: { scrollProgress: any }) {
  const { scene } = useGLTF('/logo.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
            (mesh.material as THREE.Material).side = THREE.DoubleSide;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const currentProgress = scrollProgress.get();
      const targetScale = 2.2 + currentProgress * 3.5;
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Float>
    </group>
  );
}

useGLTF.preload('/logo.glb');
import ExamCorrectionService from '@/components/ExamCorrectionService';
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const instructorsRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInstructors = () => {
    instructorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header / Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-8">مؤسسة المساعد التعليمية</h1>

        {/* Your 3D Interactive Dropdown Service */}
        <ExamCorrectionService />

      </div>
    </main>
  );
}
    <div className="w-full bg-[#070e0e] text-[#E8E4D9] font-sans overflow-x-hidden overflow-y-auto min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <section ref={containerRef} className="relative w-full min-h-screen pb-16 flex flex-col justify-between">
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#112222_1px,transparent_1px),linear-gradient(to_bottom,#112222_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none z-0" />

        {/* Hero Content Layout */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 pt-10 lg:pt-0 my-auto">
          
          {/* Left Hero Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-auto w-full max-w-[340px] lg:max-w-[360px] p-6 rounded-3xl backdrop-blur-xl bg-[#112222]/90 border border-white/15 shadow-2xl space-y-5 order-1 lg:order-1"
          >
            <div className="space-y-2 text-right">
              <h1 className="text-2xl font-black tracking-tight text-[#E8E4D9] leading-snug">
                مستقبلك التعليمي <br />
                بدقة غير متناهية
              </h1>
              <p className="text-teal-400 text-sm tracking-wide font-bold uppercase font-sans">
                Musa3d Foundation &bull; مساعد
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={scrollToInstructors}
                className="w-full py-3 rounded-xl bg-[#E8E4D9] text-[#112222] font-bold text-xs hover:bg-white transition-all shadow-lg text-center cursor-pointer"
              >
                الاستاذة
              </button>
              <button 
                onClick={scrollToServices}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/15 text-xs font-semibold text-[#E8E4D9] text-center backdrop-blur-md cursor-pointer"
              >
                استكشاف الخدمات
              </button>
            </div>
          </motion.div>

          {/* 3D Canvas Container */}
          <div className="w-full h-[340px] sm:h-[400px] lg:h-[500px] lg:flex-1 pointer-events-none order-2 lg:order-2">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={3.0} />
              <directionalLight position={[10, 20, 10]} intensity={5} />
              <directionalLight position={[-10, -10, -5]} intensity={2.5} color="#2dd4bf" />
              <pointLight position={[0, 5, 5]} intensity={4} />
              
              <Suspense fallback={<LogoLoader />}>
                <CentralLogo scrollProgress={scrollYProgress} />
              </Suspense>
              
              <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.3} maxPolarAngle={Math.PI / 2 - 0.05} />
            </Canvas>
          </div>

          {/* Right Hero Cards (Download App Section) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="pointer-events-auto flex flex-col gap-4 w-full max-w-[340px] lg:max-w-[360px] order-3 lg:order-3"
          >
            {/* Main Download Card Header */}
            <div className="p-5 rounded-3xl backdrop-blur-xl bg-[#112222]/90 border border-white/15 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-right">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-black text-[#E8E4D9]">تحميل التطبيق</h3>
                  <p className="text-[10px] text-teal-300 font-medium" dir="ltr">Download App</p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 text-sm">
                  📱
                </div>
              </div>

              {/* Download Buttons Container */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* iPhone / iOS Button with App Store Link */}
                <a 
                  href="https://apps.apple.com/us/app/musaad-%D9%85%D8%B3%D8%A7%D8%B9%D8%AF/id6800101490" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 transition-all text-center group cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#E8E4D9] group-hover:text-teal-300 transition-colors">iPhone</span>
                  <span className="text-[9px] text-gray-400">App Store</span>
                </a>

                {/* Android Button */}
                <a 
                  href="#android-download" 
                  className="flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 transition-all text-center group cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#E8E4D9] group-hover:text-teal-300 transition-colors">Android</span>
                  <span className="text-[9px] text-gray-400">Google Play</span>
                </a>
              </div>
            </div>

            {/* Quick Status Sub-card */}
            <div className="p-4 rounded-3xl backdrop-blur-xl bg-[#112222]/90 border border-white/15 shadow-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-black text-xs">
                v2.6
              </div>
              <div className="space-y-1.5 flex-1 text-right">
                <div className="text-xs font-bold text-[#E8E4D9]">متاح الآن لجميع الأجهزة</div>
                <div className="text-[10px] text-gray-400">إدارة سلسة لدرجات الطلاب</div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]"></div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator Arrow */}
        <div className="relative mt-8 mx-auto flex flex-col items-center gap-2 z-10 pointer-events-none opacity-60 animate-bounce">
          <span className="text-[10px] tracking-widest text-teal-300">SCROLL</span>
          <svg className="w-4 h-4 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ================= SECTION 1: SERVICES ================= */}
      <section ref={servicesRef} className="relative z-20 py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#E8E4D9]">
            خدمات مؤسسة مساعد التعليمية
          </h2>
          <p className="text-teal-300/80 text-sm max-w-xl mx-auto">
            أنظمة متكاملة لتصحيح الامتحانات، توثيق الدرجات، وإدارة بيانات الطلاب بدقة عالية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all space-y-4 text-right shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-xl">
              📝
            </div>
            <h3 className="text-xl font-bold text-[#E8E4D9]">تصحيح الأوراق</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              تصحيح متقدم للدفاتر والامتحانات الامتحانية بسرعة فائقة ودقة متناهية مع تقارير فورية.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all space-y-4 text-right shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-xl">
              📊
            </div>
            <h3 className="text-xl font-bold text-[#E8E4D9]">تحليل النتائج</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              لوحات تحكم تفاعلية توضح مستويات الطلاب والتقارير الإحصائية للمدارس والمراكز التعليمية.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all space-y-4 text-right shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-xl">
              📄
            </div>
            <h3 className="text-xl font-bold text-[#E8E4D9]" dir="rtl">
              تقارير <span dir="ltr" className="inline-block">PDF</span> تلقائية
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              توليد القوائم والإنذارات والنتائج النهائية بصيغة PDF جاهزة للطباعة والتوزيع بضغطة زر.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all space-y-4 text-right shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-xl">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-[#E8E4D9]">إدارة المراقبة</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              توفير مراقبين لادارة العملية الامتحانية بكفاءة عالية وضمان سير الاختبارات بانتظام.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= SECTION: نخبة من العمالقة في مجال التدريس ================= */}
      <section ref={instructorsRef} className="relative z-20 py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#E8E4D9]">
            نخبة من العمالقة في مجال التدريس
          </h2>
          <p className="text-teal-300/80 text-sm max-w-xl mx-auto">
            أبرز الأساتذة والمختصين المتعاونين مع المؤسسة لتقديم أفضل محتوى وإشراف تعليمي متكامل
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          
          {/* Instructor 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all text-center space-y-4 shadow-xl flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-black text-2xl shadow-inner">
              📐
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E8E4D9]">الاستاذ قصي العميري</h3>
              <p className="text-xs text-teal-400">رياضيات</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              شرح مبسط واحترافية عالية في تدريس الرياضيات للمراحل الإعدادية.
            </p>
          </motion.div>

          {/* Instructor 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all text-center space-y-4 shadow-xl flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-black text-2xl shadow-inner">
              🧪
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E8E4D9]">الاستاذ احمد النداوي</h3>
              <p className="text-xs text-teal-400">كيمياء</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              تقديم مادّة الكيمياء بأسلوب علمي دقيق وشامل للامتحانات الوزارية.
            </p>
          </motion.div>

          {/* Instructor 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all text-center space-y-4 shadow-xl flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-black text-2xl shadow-inner">
              ⚡
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E8E4D9]">الاستاذ معتز الوادي</h3>
              <p className="text-xs text-teal-400">فيزياء</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              تمكين الطلاب من فهم النظريات والمسائل الفيزيائية بكل سهولة.
            </p>
          </motion.div>

          {/* Instructor 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all text-center space-y-4 shadow-xl flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-black text-2xl shadow-inner">
              🔭
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E8E4D9]">الاستاذ دلير الخالدي</h3>
              <p className="text-xs text-teal-400">فيزياء</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              طرق تدريس حديثة ومبتكرة لتبسيط مادة الفيزياء للمرحلة الإعدادية.
            </p>
          </motion.div>

          {/* Instructor 5 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-3xl bg-[#112222]/50 border border-white/10 hover:border-teal-400/40 transition-all text-center space-y-4 shadow-xl flex flex-col items-center sm:col-span-2 lg:col-span-1 xl:col-span-1"
          >
            <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-black text-2xl shadow-inner">
              💡
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E8E4D9]">الاستاذ حسين الصالحي</h3>
              <p className="text-xs text-teal-400">فيزياء</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              خبرة متميزة في إيصال المعلومة الفيزيائية وتحقيق أعلى الدرجات.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= SECTION 2: STATS (Updated to 3 columns) ================= */}
      <section className="relative z-20 py-20 bg-[#0a1515] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-2"
          >
            <h4 className="text-4xl font-black text-teal-400">+100k</h4>
            <p className="text-xs text-gray-400">ورقة امتحانية مصححة</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-2"
          >
            <h4 className="text-4xl font-black text-[#E8E4D9]">99.9%</h4>
            <p className="text-xs text-gray-400">دقة التوثيق</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-2"
          >
            <h4 className="text-4xl font-black text-[#E8E4D9]">24/7</h4>
            <p className="text-xs text-gray-400">دعم فني مستمر</p>
          </motion.div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-20 py-8 border-t border-white/5 text-center text-xs text-gray-500 tracking-widest">
        MUSA3D FOUNDATION &bull; مساعد &bull; 2026
      </footer>

    </div>
  );
}export default function Features3D() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Feature 1: تصحيح الأوراق */}
      <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 shadow-[0_20px_50px_rgba(8,112,184,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(59,130,246,0.3)]">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative z-10">
          <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 mb-6 text-2xl shadow-inner">
            📝
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">تصحيح الأوراق الذكي</h3>
          <p className="text-slate-400 leading-relaxed">
            نظام متقدم لتصحيح أوراق الامتحانات بدقة وسرعة عالية، مع رصد الدرجات واستخراج النتائج فورياً.
          </p>
        </div>
      </div>

      {/* Feature 2: تقارير PDF تلقائية */}
      <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 shadow-[0_20px_50px_rgba(8,112,184,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(168,85,247,0.3)]">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative z-10">
          <div className="w-14 h-14 bg-purple-600/20 border border-purple-500/30 rounded-2xl flex items-center justify-center text-purple-400 mb-6 text-2xl shadow-inner">
            📊
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">تقارير PDF تلقائية</h3>
          <p className="text-slate-400 leading-relaxed">
            إنشاء تقارير مفصلة واحترافية للطلاب والدرجات بصيغة PDF وتصديرها بضغطة زر واحدة.
          </p>
        </div>
      </div>
    </section>
  );
}