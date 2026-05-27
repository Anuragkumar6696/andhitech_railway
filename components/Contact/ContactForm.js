'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ fname:'',lname:'',email:'',phone:'',message:'' });
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  const change = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault(); setBusy(true);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`,
        { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      if (r.ok) { setOk(true); setForm({fname:'',lname:'',email:'',phone:'',message:''}); setTimeout(()=>setOk(false),5000); }
      else alert('Failed to send. Please try again.');
    } catch { alert('Connection error.'); }
    finally { setBusy(false); }
  };

  return (
    <motion.div 
      initial={{ opacity:0, x:20 }} 
      whileInView={{ opacity:1, x:0 }} 
      viewport={{ once:true }}
      className="bg-[#0D1117] p-10 md:p-16 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3510F]/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className="h-[3px] bg-[#E3510F] w-20 mb-10 rounded-full shadow-[0_0_15px_rgba(227,81,15,0.5)]" />
        <h3 className="text-white text-5xl font-extrabold mb-4 tracking-tight leading-tight" style={{fontFamily:'var(--font-display)'}}>
          Send Us a <span className="text-[#E3510F]">Message</span>
        </h3>
        <p className="text-[#ADBAC7] text-xl mb-12 font-medium">Our engineering team typically responds within 24 hours.</p>

        {ok ? (
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
            className="bg-emerald-950/20 border border-emerald-500/30 p-16 rounded-3xl text-center shadow-2xl">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-8 border border-emerald-500/30 shadow-inner">
              <CheckCircle size={40} />
            </div>
            <h4 className="text-emerald-400 text-3xl font-bold mb-4" style={{fontFamily:'var(--font-display)'}}>Message Received!</h4>
            <p className="text-emerald-400 text-lg font-bold">We&apos;ll review your inquiry and get back to you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[['fname','First Name','John',User],['lname','Last Name','Smith',User]].map(([n,l,p,Icon]) => (
                <div key={n} className="space-y-4">
                  <label className="text-white text-[13px] uppercase tracking-[0.25em] font-black ml-1 block" style={{fontFamily:'var(--font-mono)'}}>{l}</label>
                  <div className="relative group">
                    <Icon size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#E3510F] group-focus-within:scale-110 transition-transform" />
                    <input type="text" name={n} value={form[n]} onChange={change} placeholder={p} required={n==='fname'}
                      className="w-full pl-16 pr-6 py-6 bg-white/[0.05] border border-white/10 focus:border-[#E3510F] focus:bg-white/[0.08] transition-all rounded-2xl text-lg text-white placeholder:text-white/20 font-semibold outline-none shadow-inner" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[['email','Email','you@company.com',Mail,'email'],['phone','Phone','+91 98765 43210',Phone,'tel']].map(([n,l,p,Icon,t]) => (
                <div key={n} className="space-y-4">
                  <label className="text-white text-[13px] uppercase tracking-[0.25em] font-black ml-1 block" style={{fontFamily:'var(--font-mono)'}}>{l}</label>
                  <div className="relative group">
                    <Icon size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#E3510F] group-focus-within:scale-110 transition-transform" />
                    <input type={t} name={n} value={form[n]} onChange={change} placeholder={p} required={n==='email'}
                      className="w-full pl-16 pr-6 py-6 bg-white/[0.05] border border-white/10 focus:border-[#E3510F] focus:bg-white/[0.08] transition-all rounded-2xl text-lg text-white placeholder:text-white/20 font-semibold outline-none shadow-inner" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <label className="text-white text-[13px] uppercase tracking-[0.25em] font-black ml-1 block" style={{fontFamily:'var(--font-mono)'}}>Message</label>
              <div className="relative group">
                <MessageSquare size={18} className="absolute left-6 top-7 text-[#E3510F] group-focus-within:scale-110 transition-transform" />
                <textarea name="message" value={form.message} onChange={change} rows={6} required
                  placeholder="Describe your project or technical inquiry…" 
                  className="w-full pl-16 pr-6 py-6 bg-white/[0.05] border border-white/10 focus:border-[#E3510F] focus:bg-white/[0.08] transition-all rounded-2xl text-lg text-white placeholder:text-white/20 font-semibold outline-none shadow-inner resize-none" />
              </div>
            </div>
            <button type="submit" disabled={busy}
              className="btn-flame w-full justify-center flex items-center gap-4 py-7 text-xl font-black tracking-widest shadow-[0_15px_40px_rgba(227,81,15,0.3)] hover:shadow-[0_20px_60px_rgba(227,81,15,0.5)] transition-all duration-500 group">
              {busy ? <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>TRANSMIT MESSAGE</span><Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" /></>}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
