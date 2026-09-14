إصلاح تمركز شعار مساعد عند أول فتح على الجوال

المشكلة:
GSAP كان يكتب transform جديداً على introCore، وفي بعض مرات التحميل الأولى
يفقد translate(-50%, -50%) مؤقتاً، فيظهر الشعار أسفل/يمين المركز.

الإصلاح:
- تثبيت xPercent:-50 و yPercent:-50 داخل GSAP نفسه.
- تثبيت تمركز introCore قبل بدء الأنيميشن.
- إضافة cache-busting جديد لـ styles.css و app.js.
- الحفاظ على المجرة وصورة الأستاذة نادية وبقية الموقع.

الاستخدام:
1) استبدل index.html و styles.css و app.js.
2) إذا لم تكن teacher-nadia.webp موجودة، أضفها.
3) git add -A
4) git commit -m "Fix mobile intro logo centering"
5) git push
