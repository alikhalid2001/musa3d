const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    const weakDevice = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ignoreMobileResize:true,limitCallbacks:true});
    }

    /* cursor */
    const cursorGlow = document.querySelector('.cursor-glow');
    const glowX = (cursorGlow && window.gsap) ? gsap.quickTo(cursorGlow,'x',{duration:.28,ease:'power3.out'}) : null;
    const glowY = (cursorGlow && window.gsap) ? gsap.quickTo(cursorGlow,'y',{duration:.28,ease:'power3.out'}) : null;
    window.addEventListener('pointermove', (e) => {
      if (!cursorGlow || innerWidth < 850 || !glowX || !glowY) return;
      glowX(e.clientX); glowY(e.clientY);
    },{passive:true});

    /* =====================================================
       INTRO — REAL SCROLL TRANSITION
    ===================================================== */
    if (window.gsap && window.ScrollTrigger && !reducedMotion) {
      const introTl = gsap.timeline({
        defaults:{ease:'none'},
        scrollTrigger:{
          trigger:'#intro',
          start:'top top',
          end:'bottom bottom',
          scrub:.45
        }
      });

      introTl
        .fromTo('#introCore',
          {scale:.78,opacity:.30,z:-160,rotateX:7},
          {scale:1,opacity:1,z:0,rotateX:0,duration:.24,ease:'power2.out'}
        )
        .to('#introCaption',{opacity:1,duration:.08},0)
        .to('#introCaption',{opacity:0,y:-30,duration:.18},.34)
        .to('#introCore',{
          scale:3.7,
          z:500,
          rotateX:-8,
          rotateY:8,
          opacity:0,
          duration:.34,
          ease:'power3.in'
        },.46)
        .fromTo('#introBridge',
          {opacity:0,scale:.72,z:-500,rotateX:13},
          {opacity:1,scale:1,z:0,rotateX:0,duration:.30,ease:'power3.out'},
          .50
        )
        .to('#introBridge',{opacity:0,scale:1.08,z:160,duration:.20,ease:'power2.in'},.80);

      gsap.to('.site-header',{
        opacity:1,
        y:0,
        pointerEvents:'auto',
        duration:.65,
        ease:'power3.out',
        scrollTrigger:{trigger:'#hero',start:'top 78%',toggleActions:'play none none reverse'}
      });
    } else {
      window.gsap?.set('.site-header',{opacity:1,y:0,pointerEvents:'auto'});
    }

    /* =====================================================
       SECTION CAMERA TRANSITIONS
    ===================================================== */
    if (window.gsap && window.ScrollTrigger && !reducedMotion) {
      gsap.utils.toArray('#hero, #services, .stats-section').forEach((section) => {
        const inner = section.querySelector('.scene-inner');
        if (!inner) return;

        const tl = gsap.timeline({
          scrollTrigger:{
            trigger:section,
            start:'top bottom',
            end:'bottom top',
            scrub:.35
          }
        });

        tl.fromTo(inner,
          {opacity:0,y:70},
          {opacity:1,y:0,duration:.32,ease:'power3.out'}
        )
        .to(inner,{duration:.38})
        .to(inner,{opacity:.55,y:-38,duration:.30,ease:'power2.in'});

        section.querySelectorAll('.scene-glow').forEach((glow,index)=>{
          gsap.fromTo(glow,
            {x:index%2?70:-70,y:50,scale:.88},
            {x:index%2?-80:80,y:-60,scale:1.12,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:true}}
          );
        });
      });

      gsap.to('.hero-brand-float',{y:-18,rotateY:8,duration:3.8,repeat:-1,yoyo:true,ease:'sine.inOut'});
      gsap.to('.floating-chip',{y:-12,rotate:2,duration:2.8,repeat:-1,yoyo:true,stagger:.25,ease:'sine.inOut'});
      gsap.to('.visual-halo',{scale:1.06,rotate:7,duration:5.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
    }


    /* =====================================================
       CINEMATIC TEACHERS — CUT-OUT PLANE DEPTH SEQUENCE
       Desktop: pinned film-like approach from deep background.
       Mobile: native sticky + lightweight 2D scrub for smooth scrolling.
    ===================================================== */
    if (window.gsap && window.ScrollTrigger && !reducedMotion) {
      const teacherMedia = gsap.matchMedia();

      teacherMedia.add("(min-width: 851px)", () => {
        gsap.set('#elitePlaneWrap',{xPercent:-50,yPercent:-50,x:175,y:92,scale:.14,rotation:-7,opacity:.06});
        gsap.set('#planeBrandMark',{opacity:0,scale:.5,rotation:-8});
        gsap.set('.plane-name',{opacity:0,scale:.70});
        gsap.set('#teachersCinemaCaption',{opacity:0,y:42});
        gsap.set('.plane-cinema .academy-ring',{opacity:.02,scale:.78});
        gsap.set('.elite-cloud',{opacity:0});
        gsap.set('#flightStreak',{opacity:0,scaleX:.35});

        const teacherTl = gsap.timeline({
          scrollTrigger:{
            trigger:'#teachersCinemaStage',
            start:'top top',
            end:()=>`+=${Math.round(window.innerHeight * 2.45)}`,
            scrub:.34,
            pin:true,
            pinSpacing:true,
            anticipatePin:1,
            invalidateOnRefresh:true
          }
        });

        teacherTl
          .to('.teachers-stars',{x:24,y:-16,duration:1,ease:'none'},0)
          .to('.beam-a',{x:-90,rotate:20,duration:1,ease:'none'},0)
          .to('.beam-b',{x:105,rotate:-18,duration:1,ease:'none'},0)

          /* The plane appears as a tiny object far behind the scene. */
          .to('#elitePlaneWrap',{x:130,y:72,scale:.27,rotation:-6,opacity:.34,duration:.12,ease:'none'},.02)
          .to('#flightStreak',{opacity:.24,scaleX:.62,duration:.10,ease:'none'},.08)
          .to('.elite-cloud.c3',{opacity:.18,x:35,y:-6,duration:.18,ease:'none'},.08)
          .to('.elite-cloud.c4',{opacity:.15,x:-30,y:4,duration:.18,ease:'none'},.08)

          /* It flies toward the viewer, like a cinematic camera push. */
          .to('#elitePlaneWrap',{x:62,y:30,scale:.52,rotation:-4,opacity:.72,duration:.17,ease:'none'},.15)
          .to('.plane-cinema .academy-ring',{opacity:.07,scale:.92,duration:.20,stagger:.014,ease:'none'},.17)
          .to('#elitePlaneWrap',{x:12,y:0,scale:.82,rotation:-1.5,opacity:1,duration:.20,ease:'power2.out'},.31)
          .to('.elite-cloud.c1',{opacity:.26,x:35,y:-10,duration:.22,ease:'none'},.31)
          .to('.elite-cloud.c2',{opacity:.25,x:-34,y:-8,duration:.22,ease:'none'},.31)
          .to('.elite-cloud.c5',{opacity:.20,y:-15,duration:.22,ease:'none'},.34)
          .to('#flightStreak',{opacity:.44,scaleX:1,duration:.18,ease:'none'},.31)
          .to('#elitePlaneWrap',{x:0,y:-10,scale:.94,rotation:0,opacity:1,duration:.15,ease:'power2.out'},.49)

          /* Keep the real logo razor sharp as a separate HTML layer. */
          .fromTo('#planeBrandMark',{opacity:0,scale:.5,rotation:-8},{opacity:1,scale:1,rotation:-3,duration:.12,ease:'back.out(1.65)'},.44)
          .to('.plane-cinema .ring-a',{rotation:50,duration:.60,ease:'none'},.24)
          .to('.plane-cinema .ring-b',{rotation:-75,duration:.60,ease:'none'},.24)
          .to('.plane-cinema .ring-c',{rotation:95,duration:.60,ease:'none'},.24)

          /* Teacher names emerge from the aircraft as it reaches the camera. */
          .fromTo('.name-1',{x:105,y:24,opacity:0,scale:.70},{x:0,y:0,opacity:1,scale:1,duration:.11,ease:'back.out(1.35)'},.52)
          .fromTo('.name-2',{x:108,y:-18,opacity:0,scale:.70},{x:0,y:0,opacity:1,scale:1,duration:.11,ease:'back.out(1.35)'},.59)
          .fromTo('.name-3',{x:-108,y:-18,opacity:0,scale:.70},{x:0,y:0,opacity:1,scale:1,duration:.11,ease:'back.out(1.35)'},.66)
          .fromTo('.name-4',{x:-105,y:24,opacity:0,scale:.70},{x:0,y:0,opacity:1,scale:1,duration:.11,ease:'back.out(1.35)'},.73)
          .fromTo('.name-5',{y:-48,opacity:0,scale:.70},{y:0,opacity:1,scale:1,duration:.11,ease:'back.out(1.35)'},.78)
          .fromTo('.name-6',{y:48,opacity:0,scale:.70},{y:0,opacity:1,scale:1,duration:.11,ease:'back.out(1.35)'},.84)
          .fromTo('#teachersCinemaCaption',{opacity:0,y:42},{opacity:1,y:0,duration:.14,ease:'power3.out'},.88)

          /* A subtle last push, then dissolve into the actual teacher cards. */
          .to('#elitePlaneWrap',{scale:1.02,y:-18,duration:.12,ease:'none'},.91)
          .to('.plane-name',{y:'-=4',duration:.10,stagger:.005,ease:'none'},.92)
          .to('#academyOrbit',{scale:1.08,opacity:0,duration:.16,ease:'power3.in'},.97)
          .to('#teachersCinemaCaption',{opacity:0,y:-20,duration:.10},.975);

        gsap.from('.teachers-grid .teacher-card',{
          opacity:0,y:88,z:-110,rotateY:(i)=>i%2?8:-8,scale:.94,
          stagger:.07,duration:.70,ease:'power3.out',
          scrollTrigger:{trigger:'.teachers-grid',start:'top 86%',once:true}
        });

        return () => {
          teacherTl.scrollTrigger?.kill();
          teacherTl.kill();
        };
      });

      teacherMedia.add("(max-width: 850px)", () => {
        gsap.set('#elitePlaneWrap',{xPercent:-50,yPercent:-50,x:54,y:40,scale:.28,rotation:-5,opacity:.12});
        gsap.set('#planeBrandMark',{opacity:0,scale:.70});
        gsap.set('.plane-name',{opacity:0,scale:.82});
        gsap.set('#teachersCinemaCaption',{opacity:0,y:20});
        gsap.set('.plane-cinema .academy-ring',{opacity:.02,scale:.90});
        gsap.set('.elite-cloud',{opacity:0});
        gsap.set('#flightStreak',{opacity:0,scaleX:.45});

        const mobileTeacherTl = gsap.timeline({
          defaults:{ease:'none'},
          scrollTrigger:{
            trigger:'#teachersCinemaWrap',
            start:'top top',
            end:'bottom bottom',
            scrub:.12,
            invalidateOnRefresh:true
          }
        });

        mobileTeacherTl
          .to('#elitePlaneWrap',{x:24,y:18,scale:.48,rotation:-3,opacity:.52,duration:.20},0)
          .to('#flightStreak',{opacity:.20,scaleX:.70,duration:.18},.05)
          .to('#elitePlaneWrap',{x:0,y:-2,scale:.76,rotation:-1,opacity:1,duration:.24},.18)
          .to('.elite-cloud.c1',{opacity:.17,x:18,y:-6,duration:.25},.18)
          .to('.elite-cloud.c2',{opacity:.16,x:-18,y:-5,duration:.25},.18)
          .to('.elite-cloud.c5',{opacity:.12,y:-8,duration:.25},.20)
          .to('.plane-cinema .academy-ring',{opacity:.05,scale:1,duration:.20,stagger:.012},.20)
          .to('#elitePlaneWrap',{scale:.88,y:-8,duration:.16},.40)
          .to('#planeBrandMark',{opacity:1,scale:1,duration:.10},.39)
          .fromTo('.name-1',{x:30,y:7,opacity:0,scale:.82},{x:0,y:0,opacity:1,scale:1,duration:.075},.50)
          .fromTo('.name-2',{x:30,y:-6,opacity:0,scale:.82},{x:0,y:0,opacity:1,scale:1,duration:.075},.58)
          .fromTo('.name-3',{x:-30,y:-6,opacity:0,scale:.82},{x:0,y:0,opacity:1,scale:1,duration:.075},.66)
          .fromTo('.name-4',{x:-30,y:7,opacity:0,scale:.82},{x:0,y:0,opacity:1,scale:1,duration:.075},.74)
          .fromTo('.name-5',{y:-20,opacity:0,scale:.82},{y:0,opacity:1,scale:1,duration:.075},.78)
          .fromTo('.name-6',{y:20,opacity:0,scale:.82},{y:0,opacity:1,scale:1,duration:.075},.84)
          .to('#teachersCinemaCaption',{opacity:1,y:0,duration:.10},.90)
          .to('#elitePlaneWrap',{scale:.94,y:-14,duration:.10},.93);

        gsap.from('.teachers-grid .teacher-card',{
          opacity:0,y:42,stagger:.05,duration:.50,ease:'power2.out',
          scrollTrigger:{trigger:'.teachers-grid',start:'top 90%',once:true}
        });

        return () => {
          mobileTeacherTl.scrollTrigger?.kill();
          mobileTeacherTl.kill();
        };
      });
    }

    /* =====================================================
       CINEMATIC APP — THE PEN DRAWS THE ENTIRE REAL LOGO
    ===================================================== */
    if (window.gsap && window.ScrollTrigger && !reducedMotion) {
      const appPinDistance = () => Math.round(window.innerHeight * (window.innerWidth <= 850 ? 2.35 : 3.15));
      const board = document.querySelector('#drawBoard');
      const pen = document.querySelector('#appPen');
      const paintSvg = document.querySelector('#logoPaintSvg');
      const outlineGuide = document.querySelector('#logoOutlineGuide');
      const fillGuide = document.querySelector('#logoFillGuide');
      const outlineMask = document.querySelector('#logoOutlineMask');
      const fillMask = document.querySelector('#logoFillMask');

      // Cache layout measurements once per refresh. Reading layout on every scroll frame
      // was one of the main causes of stutter in the drawing scene.
      let penMetrics = null;
      const pathLengths = new WeakMap();
      function cachePenMetrics(){
        if (!paintSvg || !board) return;
        const svgRect = paintSvg.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
        penMetrics = {
          scaleX: svgRect.width / 640,
          scaleY: svgRect.height / 640,
          offsetX: svgRect.left - boardRect.left - boardRect.width / 2,
          offsetY: svgRect.top - boardRect.top - boardRect.height / 2
        };
        [outlineGuide,fillGuide].forEach(path=>{
          if (path) pathLengths.set(path,path.getTotalLength());
        });
      }

      let lastPenPath = null;
      let lastPenAt = -1;
      function putPenOnPath(path, progress, extraRotation = 0) {
        if (!path || !pen || !penMetrics) return;
        const total = pathLengths.get(path) || path.getTotalLength();
        const at = Math.max(0, Math.min(1, progress));
        if (innerWidth <= 850 && path === lastPenPath && Math.abs(at - lastPenAt) < .012) return;
        lastPenPath = path;
        lastPenAt = at;
        const point = path.getPointAtLength(total * at);
        const point2 = path.getPointAtLength(Math.min(total, total * at + 2));
        const x = penMetrics.offsetX + point.x * penMetrics.scaleX;
        const y = penMetrics.offsetY + point.y * penMetrics.scaleY;
        const angle = Math.atan2((point2.y - point.y) * penMetrics.scaleY, (point2.x - point.x) * penMetrics.scaleX) * 180 / Math.PI;
        gsap.set(pen, {x, y, rotation: angle + 86 + extraRotation});
      }

      const outlineState = {p:0};
      const fillState = {p:0};
      const appTl = gsap.timeline({
        scrollTrigger:{
          trigger:'#appCinemaStage',
          start:'top top',
          end:()=>`+=${appPinDistance()}`,
          scrub:.42,
          pin:true,
          pinSpacing:true,
          anticipatePin:1,
          invalidateOnRefresh:true,
          onRefresh:()=>{
            cachePenMetrics();
            if (outlineState.p < .999) putPenOnPath(outlineGuide, outlineState.p);
            else putPenOnPath(fillGuide, fillState.p);
          }
        }
      });

      cachePenMetrics();

      appTl
        .fromTo('#drawBoard',
          {scale:.56,z:-420,rotateX:18,rotateY:-14,opacity:0},
          {scale:1,z:0,rotateX:0,rotateY:0,opacity:1,duration:.16,ease:'power3.out'}
        )
        .fromTo('.floating-paper',
          {opacity:0,scale:.55,z:-320},
          {opacity:.48,scale:1,z:0,stagger:.025,duration:.14,ease:'back.out(1.4)'},.04
        )
        .set('#logoOutlineMask',{strokeDashoffset:1},.10)
        .set('#logoFillMask',{strokeDashoffset:1},.10)
        .set('#appPen',{opacity:0,scale:.82},.10)
        .add(()=>putPenOnPath(outlineGuide,0),.115)
        .to('#appPen',{opacity:1,scale:1,duration:.06,ease:'power2.out'},.115)

        // 1) Draw the outer diamond of the real logo.
        .to(outlineState,{
          p:1,duration:.19,ease:'none',
          onUpdate:()=>{
            outlineMask.style.strokeDashoffset = String(1-outlineState.p);
            putPenOnPath(outlineGuide,outlineState.p);
          }
        },.13)

        // 2) The pen then paints every part of the actual PNG logo.
        // The broad masked strokes overlap, so no part of the Arabic word or diamond is skipped.
        .to(fillState,{
          p:1,duration:.41,ease:'none',
          onUpdate:()=>{
            fillMask.style.strokeDashoffset = String(1-fillState.p);
            putPenOnPath(fillGuide,fillState.p);
          }
        },.32)

        // 3) Hold the completed logo clearly, with no text covering it.
        .to('#logoFinishGlow',{opacity:1,scale:1.08,duration:.10,ease:'power2.out'},.69)
        .to('#logoPaintSvg',{scale:1.035,duration:.10,ease:'back.out(1.8)'},.70)
        .to('#appPen',{x:'+=150',y:'+=90',rotation:'+=45',opacity:0,scale:.8,duration:.10,ease:'power2.in'},.72)

        // The small stamp now sits OUTSIDE the paper, below the logo.
        .fromTo('#boardStamp',{opacity:0,scale:1.8,rotate:-12},{opacity:1,scale:1,rotate:-3,duration:.08,ease:'back.out(2)'},.75)

        // Move the finished logo upward first, then reveal the copy underneath it.
        // This guarantees that the text never overlaps the drawn logo.
        .to('#drawBoard',{y:-150,scale:.74,z:55,rotateY:2,duration:.14,ease:'power2.inOut'},.80)
        .fromTo('#appCinemaCopy',{opacity:0,y:60},{opacity:1,y:0,duration:.12,ease:'power3.out'},.88)

        // Keep both elements readable for a moment, then transition to the app section.
        .to('#drawBoard',{scale:2.15,z:430,rotateY:8,opacity:0,duration:.17,ease:'power3.in'},.96)
        .to('#appCinemaCopy',{opacity:0,y:-28,duration:.10,ease:'power2.in'},1.02)
        .to('.floating-paper',{opacity:0,scale:1.32,y:(i)=>i%2?110:-110,stagger:.012,duration:.10},.96);

      appTl
        .to('.app-cinema-glow',{scale:1.16,rotate:22,duration:1,ease:'none'},0)
        .to('.app-giant-word',{scale:1.18,xPercent:-3,duration:1,ease:'none'},0)
        .to('.app-cinema-grid',{yPercent:-12,duration:1,ease:'none'},0);
    }

    /* =====================================================
       MOUSE 3D TILT
    ===================================================== */
    document.querySelectorAll('.tilt-panel').forEach(panel=>{
      const strength=Number(panel.dataset.tilt||7);
      panel.addEventListener('pointermove',e=>{
        if(innerWidth<850||reducedMotion||!window.gsap)return;
        const r=panel.getBoundingClientRect();
        const px=(e.clientX-r.left)/r.width-.5;
        const py=(e.clientY-r.top)/r.height-.5;
        gsap.to(panel,{rotateY:px*strength,rotateX:py*-strength,y:-8,scale:1.015,transformPerspective:1200,duration:.24,ease:'power2.out',overwrite:true});
      });
      panel.addEventListener('pointerleave',()=>{
        if(!window.gsap)return;
        gsap.to(panel,{rotateY:0,rotateX:0,y:0,scale:1,duration:.45,ease:'power3.out',overwrite:true});
      });
    });

    /* magnetic */
    document.querySelectorAll('.magnetic').forEach(button=>{
      button.addEventListener('pointermove',e=>{
        if(innerWidth<850||reducedMotion||!window.gsap)return;
        const r=button.getBoundingClientRect();
        const x=e.clientX-(r.left+r.width/2);
        const y=e.clientY-(r.top+r.height/2);
        gsap.to(button,{x:x*.12,y:y*.15,duration:.20,overwrite:true});
      });
      button.addEventListener('pointerleave',()=>window.gsap?.to(button,{x:0,y:0,duration:.35,ease:'power3.out',overwrite:true}));
    });

    /* =====================================================
       SERVICE-TO-SERVICE CINEMATIC TRANSITION
    ===================================================== */
    const serviceData=[
      {no:'01',title:'تصحيح الأوراق الامتحانية',text:'تتم عملية تصحيح الأوراق الامتحانية بدقة عالية، وتوثيق الدرجات فورياً لضمان حقوق الطلاب وسرعة إنجاز النتائج.',badge:'دقة وموثوقية عالية'},
      {no:'02',title:'تحليل النتائج بصورة أوضح',text:'تحويل الدرجات إلى مؤشرات تساعد الأستاذ على معرفة مستوى الطلاب، نقاط القوة، والموضوعات التي تحتاج إلى مراجعة إضافية.',badge:'تحليل يساعد على القرار'},
      {no:'03',title:'تقارير PDF تلقائية ومنظمة',text:'إنشاء تقارير واضحة وجاهزة للحفظ والمشاركة لتقليل العمل اليدوي والحفاظ على سجل مرتب لنتائج الامتحانات.',badge:'تقارير جاهزة فوراً'},
      {no:'04',title:'إدارة أكثر سلاسة للمراقبة',text:'أدوات تساعد في تنظيم سير الامتحان والمتابعة وتبسيط المهام التشغيلية داخل المؤسسة التعليمية.',badge:'تنظيم ومتابعة مستمرة'}
    ];
    const cards=[...document.querySelectorAll('.service-card')];
    const detail=document.querySelector('#serviceDetail');
    const detailNumber=document.querySelector('#detailNumber');
    const detailTitle=document.querySelector('#detailTitle');
    const detailText=document.querySelector('#detailText');
    const detailBadge=document.querySelector('#detailBadge');
    let activeService=0;

    function showService(index){
      if(index===activeService && cards[index].classList.contains('active')) return;
      activeService=index;
      const data=serviceData[index];
      cards.forEach((card,i)=>card.classList.toggle('active',i===index));

      if(!window.gsap){
        detailNumber.textContent=data.no;detailTitle.textContent=data.title;detailText.textContent=data.text;detailBadge.textContent=data.badge;return;
      }

      gsap.timeline()
        .to(detail,{opacity:0,x:38,z:-90,rotateY:-6,scale:.98,duration:.16,ease:'power2.in'})
        .add(()=>{
          detailNumber.textContent=data.no;
          detailTitle.textContent=data.title;
          detailText.textContent=data.text;
          detailBadge.textContent=data.badge;
        })
        .fromTo(detail,
          {opacity:0,x:-48,z:-130,rotateY:7,scale:.97},
          {opacity:1,x:0,z:0,rotateY:0,scale:1,duration:.46,ease:'power3.out'}
        );

      gsap.fromTo(cards[index],{scale:.94,z:-40},{scale:1.025,z:35,duration:.48,ease:'back.out(1.5)'});
    }

    cards.forEach(card=>{
      card.addEventListener('click',()=>showService(Number(card.dataset.service)));
      card.addEventListener('mouseenter',()=>{if(innerWidth>=850)showService(Number(card.dataset.service))});
    });

    /* counters */
    if(window.ScrollTrigger&&window.gsap){
      document.querySelectorAll('[data-count]').forEach(el=>{
        const end=Number(el.dataset.count),suffix=el.dataset.suffix||'',state={value:0};
        ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:()=>{
          gsap.to(state,{value:end,duration:1.8,ease:'power3.out',onUpdate:()=>{
            el.textContent=state.value.toFixed(Number.isInteger(end)?0:1)+suffix;
          }});
        }});
      });
    }

    /* =====================================================
       THREE.JS EDUCATIONAL BACKGROUND
    ===================================================== */
    (function(){
      if(!window.THREE||reducedMotion||innerWidth<900||saveData||weakDevice)return;
      const canvas=document.querySelector('#three-canvas');
      const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'high-performance'});
      renderer.setPixelRatio(Math.min(devicePixelRatio,1.15));
      renderer.setSize(innerWidth,innerHeight,false);

      const scene=new THREE.Scene();
      const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,100);
      camera.position.set(0,0,8.5);
      const world=new THREE.Group();scene.add(world);

      const ringMat=new THREE.MeshBasicMaterial({color:0xc7a96c,transparent:true,opacity:.11,wireframe:true});
      for(let i=0;i<3;i++){
        const ring=new THREE.Mesh(new THREE.TorusGeometry(2.1+i*.52,.012,6,80),ringMat.clone());
        ring.rotation.x=Math.PI*(.35+i*.08);ring.rotation.y=i*.5;ring.position.set(2.7,.5,-1.5-i*.5);ring.userData.speed=.001+i*.0003;world.add(ring);
      }

      const sheetMat=new THREE.MeshBasicMaterial({color:0xd7d0be,transparent:true,opacity:.055,side:THREE.DoubleSide});
      for(let i=0;i<6;i++){
        const sheet=new THREE.Mesh(new THREE.BoxGeometry(.85,1.15,.02),sheetMat.clone());
        sheet.position.set((Math.random()-.5)*12,(Math.random()-.5)*9,-2-Math.random()*7);
        sheet.rotation.set(Math.random()*1.2,Math.random()*1.4,Math.random()*1.2);
        sheet.userData.baseY=sheet.position.y;sheet.userData.offset=Math.random()*Math.PI*2;sheet.userData.speed=.4+Math.random()*.6;world.add(sheet);
      }

      const count=280,positions=new Float32Array(count*3);
      for(let i=0;i<count;i++){
        positions[i*3]=(Math.random()-.5)*18;
        positions[i*3+1]=(Math.random()-.5)*12;
        positions[i*3+2]=-Math.random()*12;
      }
      const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
      const points=new THREE.Points(geometry,new THREE.PointsMaterial({color:0x7fb4aa,size:.017,transparent:true,opacity:.25}));world.add(points);

      let mx=0,my=0,scrollTarget=0,lastFrame=0;
      addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2},{passive:true});
      addEventListener('scroll',()=>{scrollTarget=scrollY/Math.max(document.body.scrollHeight-innerHeight,1)},{passive:true});
      const clock=new THREE.Clock();

      function animate(now=0){
        requestAnimationFrame(animate);
        if(document.hidden || now-lastFrame<33)return;
        lastFrame=now;
        const t=clock.getElapsedTime();
        camera.position.x+=(mx*.20-camera.position.x)*.04;
        camera.position.y+=(-my*.14-camera.position.y)*.04;
        world.rotation.y+=(mx*.045-world.rotation.y)*.025;
        world.rotation.x+=(-my*.03-world.rotation.x)*.025;
        world.position.y=scrollTarget*1.1;
        world.position.z=-scrollTarget*2.1;
        world.children.forEach(obj=>{
          if(obj.geometry&&obj.geometry.type==='TorusGeometry')obj.rotation.z+=obj.userData.speed;
          if(obj.userData.baseY!==undefined){
            obj.position.y=obj.userData.baseY+Math.sin(t*obj.userData.speed+obj.userData.offset)*.18;
            obj.rotation.z+=.00045;
          }
        });
        points.rotation.y=t*.012;
        renderer.render(scene,camera);
      }
      requestAnimationFrame(animate);

      let resizeRaf=0;
      addEventListener('resize',()=>{
        cancelAnimationFrame(resizeRaf);
        resizeRaf=requestAnimationFrame(()=>{
          camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);
        });
      },{passive:true});
    })();

    addEventListener('load',()=>{
      requestAnimationFrame(()=>window.ScrollTrigger?.refresh());
      if(document.fonts?.ready){document.fonts.ready.then(()=>window.ScrollTrigger?.refresh());}
    });
