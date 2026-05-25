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
    <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.75 }}
      className="bento-cell p-8 md:p-12 border-gradient-flame relative overflow-hidden">
      {/* Top accent */}
      <div className="h-[2px] bg-gradient-to-r from-[#E3510F] to-transparent w-16 mb-7 rounded-full" />
      <h3 className="text-[#F0F2F5] text-2xl font-bold mb-2" style={{fontFamily:'var(--font-display)'}}>Send Us a Message</h3>
      <p className="text-[#5A6478] text-sm mb-9">Our team typically responds within 24 hours.</p>

      {ok ? (
        <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
          className="bg-emerald-950/50 border border-emerald-500/20 p-10 rounded-xl text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-5">
            <CheckCircle size={28} />
          </div>
          <h4 className="text-emerald-400 font-bold mb-2" style={{fontFamily:'var(--font-display)'}}>Message Sent!</h4>
          <p className="text-emerald-600 text-sm">We&apos;ll get back to you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[['fname','First Name','John',User],['lname','Last Name','Smith',User]].map(([n,l,p,Icon]) => (
              <div key={n} className="space-y-2">
                <label className="text-[#5A6478] text-[10px] uppercase tracking-widest font-medium" style={{fontFamily:'var(--font-mono)'}}>{l}</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D3748]" />
                  <input type="text" name={n} value={form[n]} onChange={change} placeholder={p} required={n==='fname'}
                    className="input-dark pl-11" />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[['email','Email','you@company.com',Mail,'email'],['phone','Phone','+91 98765 43210',Phone,'tel']].map(([n,l,p,Icon,t]) => (
              <div key={n} className="space-y-2">
                <label className="text-[#5A6478] text-[10px] uppercase tracking-widest font-medium" style={{fontFamily:'var(--font-mono)'}}>{l}</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D3748]" />
                  <input type={t} name={n} value={form[n]} onChange={change} placeholder={p} required={n==='email'}
                    className="input-dark pl-11" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-[#5A6478] text-[10px] uppercase tracking-widest font-medium" style={{fontFamily:'var(--font-mono)'}}>Message</label>
            <div className="relative">
              <MessageSquare size={14} className="absolute left-4 top-5 text-[#2D3748]" />
              <textarea name="message" value={form.message} onChange={change} rows={5} required
                placeholder="Describe your project or inquiry…" className="input-dark pl-11 resize-none" />
            </div>
          </div>
          <button type="submit" disabled={busy}
            className="btn-flame w-full justify-center flex items-center gap-3 py-4">
            {busy ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Send Message</span><Send size={14} /></>}
          </button>
        </form>
      )}
    </motion.div>
  );
}
