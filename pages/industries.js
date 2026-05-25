'use client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { motion } from 'framer-motion';
import { Train, Building2, Factory, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Industries() {
  const industries = [
    { Icon:Train, title:'Railways & Rolling Stock', image:'/images/ind-train.jpg',
      desc:'Specialized components for passenger and freight trains including braking systems, suspension, and HVAC solutions.',
      features:['Brake Discs & Pads','Air Suspension','Shock Absorbers','Coupler Components'] },
    { Icon:Building2, title:'Metro & Urban Transit', image:'/images/gallery-5.jpg',
      desc:'Advanced HVAC systems and precision components tailored for modern metro networks and urban rail transit.',
      features:['Saloon HVAC','Driver Cab HVAC','Electronic Controls','Maintenance Support'] },
    { Icon:Factory, title:'Industrial HVAC', image:'/images/gallery-9.jpg',
      desc:'High-efficiency thermal management solutions for large-scale industrial plants and commercial buildings.',
      features:['Heat Exchangers','Thermal Coils','Control Systems','Energy Efficiency'] },
    { Icon:ShieldCheck, title:'Precision Manufacturing', image:'/images/aboutfront.jpg',
      desc:'Contract manufacturing for critical sectors requiring high-precision metal components and assemblies.',
      features:['CNC Machining','Custom Fabrication','Quality Assurance','Rapid Prototyping'] },
  ];

  return (
    <div className="bg-[#07080C] min-h-screen">
      <Head>
        <title>Industries We Serve | AND Hitech</title>
      </Head>
      <Header />
      <PageBanner title="Industries We Serve" backgroundImage="/images/page-header-bg.jpg" currentPage="Industries" />

      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-grid-eng opacity-40 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="max-w-3xl mb-24">
            <span className="eyebrow mb-5 block">Our Reach</span>
            <h2 className="display-md">Driving Innovation Across<br/><span style={{color:'#E3510F'}}>Key Industrial Sectors</span></h2>
          </motion.div>

          <div className="space-y-28 md:space-y-36">
            {industries.map(({ Icon, title, image, desc, features }, idx) => {
              const rev = idx%2===1;
              return (
                <motion.div key={idx} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-80px' }}
                  transition={{ duration:0.8 }}
                  className={`flex flex-col ${rev?'lg:flex-row-reverse':'lg:flex-row'} gap-14 lg:gap-20 items-center`}>
                  {/* Image */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="rounded-2xl overflow-hidden border border-white/6 relative">
                      <Image src={image} alt={title} width={700} height={460}
                        className="w-full h-[380px] object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080C]/60 to-transparent" />
                    </div>
                    {/* Icon badge */}
                    <div className={`absolute -bottom-7 ${rev?'left-8':'right-8'} w-14 h-14 bg-[#E3510F] flex items-center justify-center text-white shadow-xl`}
                      style={{clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))'}}>
                      <Icon size={26} />
                    </div>
                    {/* Big step number */}
                    <div className={`absolute -top-5 ${rev?'right-8':'left-8'} text-[#111827] font-bold text-8xl leading-none select-none`}
                      style={{fontFamily:'var(--font-display)'}}>
                      0{idx+1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-7">
                    <div>
                      <span className="eyebrow mb-3 block">Industry 0{idx+1}</span>
                      <h3 className="text-[#F0F2F5] font-bold leading-tight" style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.8rem,3.5vw,2.8rem)'}}>{title}</h3>
                    </div>
                    <p className="text-[#9BA5B4] text-sm leading-relaxed">{desc}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {features.map((f,fi) => (
                        <div key={fi} className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#E3510F]/20 transition-colors">
                          <div className="w-4 h-4 rounded-full bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={11} className="text-[#E3510F]" />
                          </div>
                          <span className="text-[#9BA5B4] text-xs font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className="btn-wire inline-flex items-center gap-2 group">
                      <span>Discuss Your Needs</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
