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
      className="bg-[#0B1F3A] p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#B88746]/5 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className="h-[2px] bg-[#B88746] w-12 mb-8 rounded-full shadow-[0_0_10px_rgba(184,135,70,0.3)]" />
        <h3 className="text-white text-3xl font-bold mb-3 tracking-normal leading-snug" style={{fontFamily:'var(--font-display)'}}>
          Send Us a <span className="text-[#B88746]">Message</span>
        </h3>
        <p className="text-[rgba(255,255,255,0.55)] text-base mb-10 font-medium tracking-wide">Our engineering team typically responds within 24 hours.</p>

        {ok ? (
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
            className="bg-emerald-950/20 border border-emerald-500/30 p-12 rounded-2xl text-center shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6 border border-emerald-500/30">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-emerald-400 text-2xl font-bold mb-3" style={{fontFamily:'var(--font-display)'}}>Message Received!</h4>
            <p className="text-emerald-400 text-base font-medium">We&apos;ll review your inquiry and get back to you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[['fname','First Name','John',User],['lname','Last Name','Smith',User]].map(([n,l,p,Icon]) => (
                <div key={n} className="space-y-3">
                  <label className="text-white text-[11px] uppercase tracking-[0.2em] font-bold ml-1 block" style={{fontFamily:'var(--font-mono)'}}>{l}</label>
                  <div className="relative group">
                    <Icon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B88746] transition-transform" />
                    <input type="text" name={n} value={form[n]} onChange={change} placeholder={p} required={n==='fname'}
                      className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border border-white/10 focus:border-[#B88746]/60 focus:bg-white/[0.07] transition-all rounded-xl text-base text-white placeholder:text-white/20 font-medium outline-none" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[['email','Email','you@company.com',Mail,'email'],['phone','Phone','+91 98765 43210',Phone,'tel']].map(([n,l,p,Icon,t]) => (
                <div key={n} className="space-y-3">
                  <label className="text-white text-[11px] uppercase tracking-[0.2em] font-bold ml-1 block" style={{fontFamily:'var(--font-mono)'}}>{l}</label>
                  <div className="relative group">
                    <Icon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B88746] transition-transform" />
                    <input type={t} name={n} value={form[n]} onChange={change} placeholder={p} required={n==='email'}
                      className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border border-white/10 focus:border-[#B88746]/60 focus:bg-white/[0.07] transition-all rounded-xl text-base text-white placeholder:text-white/20 font-medium outline-none" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <label className="text-white text-[11px] uppercase tracking-[0.2em] font-bold ml-1 block" style={{fontFamily:'var(--font-mono)'}}>Message</label>
              <div className="relative group">
                <MessageSquare size={16} className="absolute left-5 top-6 text-[#B88746] transition-transform" />
                <textarea name="message" value={form.message} onChange={change} rows={5} required
                  placeholder="Describe your project or technical inquiry…" 
                  className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border border-white/10 focus:border-[#B88746]/60 focus:bg-white/[0.07] transition-all rounded-xl text-base text-white placeholder:text-white/20 font-medium outline-none resize-none" />
              </div>
            </div>
            <button type="submit" disabled={busy}
              className="btn-flame w-full justify-center flex items-center gap-3 py-5 text-base font-bold tracking-[0.15em] transition-all duration-400 group">
              {busy ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>SEND MESSAGE</span><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" /></>}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
