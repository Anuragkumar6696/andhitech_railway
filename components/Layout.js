'use client';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, siteSettings }) {
  return (
    <div className="min-h-screen" style={{ background:'#050608' }}>
      <Header initialData={siteSettings}/>
      <main>{children}</main>
      <Footer initialData={siteSettings}/>
    </div>
  );
}
