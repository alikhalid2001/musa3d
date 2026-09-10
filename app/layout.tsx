import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'مؤسسة مساعد التعليمية | تصحيح الامتحانات ودرجات الطلاب',
  description: 'أنظمة متكاملة لتصحيح الامتحانات، توثيق الدرجات، وإدارة بيانات الطلاب بدقة عالية.',
  verification: {
    google: 'SgYntqjHASJsQLvzEZEMAfsidntGNyeU98aTZ4XvQec',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#070e0e] text-[#E8E4D9] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}