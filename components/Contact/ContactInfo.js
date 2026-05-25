'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const details = [
  { Icon:Mail,  title:'Email Us',      lines:['Info@andhitech.in'], href:'mailto:Info@andhitech.in' },
  { Icon:Phone, title:'Call Us',       lines:['011-25710064'],       href:'tel:01125710064' },
  { Icon:MapPin,title:'Visit Us',      lines:['509, 5th Floor, Kirti Mahal Building 19,','Rajendra Place, New Delhi – 110008, India.'], href:'https://maps.google.com/?q=Kirti+Mahal+Rajendra+Place+New+Delhi' },
  { Icon:Clock, title:'Business Hours',lines:['Mon – Sat: 9:00 AM – 6:00 PM','Sunday: Closed'], href:null },
];

export default function ContactInfo() {
  return (
    <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.75 }}
      className="space-y-8">
      <div>
        <span className="eyebrow mb-5 block">Reach Out</span>
        <h2 className="display-md mb-4">Let&apos;s Start a<br/><span style={{color:'#E3510F'}}>Conversation</span></h2>
        <p className="text-[#9BA5B4] text-sm leading-relaxed">
          Whether you have a project inquiry or need technical information, our engineering team is ready to help.
        </p>
      </div>

      <div className="space-y-3">
        {details.map(({ Icon, title, lines, href }, i) => {
          const inner = (
            <div className="flex gap-4 p-5 rounded-xl bg-[#0D1117] border border-white/6 hover:border-[#E3510F]/25 transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E3510F] transition-colors">
                <Icon size={16} className="text-[#E3510F] group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-[#E3510F] text-[10px] uppercase tracking-[0.15em] mb-1 font-medium" style={{fontFamily:'var(--font-mono)'}}>{title}</div>
                {lines.map((l,j) => <div key={j} className="text-[#F0F2F5] text-sm font-medium">{l}</div>)}
              </div>
            </div>
          );
          return (
            <motion.div key={title} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}>
              {href ? <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer">{inner}</a> : inner}
            </motion.div>
          );
        })}
      </div>
      <Link href="/products" className="btn-wire inline-flex items-center gap-2">
        <MessageCircle size={15} /> View Our Products
      </Link>
    </motion.div>
  );
}
