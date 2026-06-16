'use client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { motion } from 'framer-motion';
import { Train, Building2, Factory, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Gauge, Wind, Zap, Wrench, Globe, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ease = [.22, 1, .36, 1];

const industries = [
  {
    Icon: Train,
    title: 'Indian Railways',
    subtitle: 'Rolling Stock & Infrastructure',
    image: '/images/ind-train.jpg',
    tag: 'Primary Sector',
    tagColor: '#E3510F',
    desc: 'AND Hitech has been a trusted RDSO-approved vendor for Indian Railways since 2015, supplying precision-engineered components for LHB coaches, freight wagons, and locomotive systems across the national network.',
    stats: [
      { n: '10+', l: 'Years Supply History' },
      { n: 'RDSO', l: 'Approved Vendor' },
      { n: 'LHB', l: 'Coach Specialist' },
    ],
    features: [
      { Icon: Gauge, label: 'Axle-Mounted Brake Discs', desc: 'Precision-machined to RDSO standards for LHB and ICF rolling stock' },
      { Icon: Wind, label: 'Air Suspension Systems', desc: 'Advanced levelling valve assemblies for ride quality and safety' },
      { Icon: Zap, label: 'HVAC & RMPU Units', desc: 'Roof-mounted package units engineered for Indian climatic conditions' },
      { Icon: Wrench, label: 'LHB Dampers', desc: 'Vertical & lateral shock absorbers for improved coach stability' },
    ],
    products: ['Axle Brake Disc', 'Air Suspension', 'RMPU LHB', 'LHB Dampers', 'Brake Pads', 'Brake Blocks'],
    cta: 'View LHB Products',
    ctaHref: '/products?cat=LHB',
  },
  {
    Icon: Building2,
    title: 'Metro Rail & Urban Transit',
    subtitle: 'HVAC & Precision Components',
    image: '/images/industries/industry-02.jpg',
    tag: 'Growing Sector',
    tagColor: '#3B82F6',
    desc: 'As India\'s urban rail network expands rapidly, AND Hitech is positioned as a premier supplier of climate control systems and precision components for metro operators including Delhi Metro, Mumbai Metro, and other emerging networks.',
    stats: [
      { n: '5+', l: 'Metro Networks' },
      { n: 'HVAC', l: 'Systems Specialist' },
      { n: '24/7', l: 'Maintenance Support' },
    ],
    features: [
      { Icon: Wind, label: 'Saloon HVAC Units', desc: 'High-efficiency climate control for passenger comfort in underground systems' },
      { Icon: Gauge, label: 'Wheel-Mounted Brake Discs', desc: 'Delhi Metro and standard gauge metro-specific configurations' },
      { Icon: Zap, label: 'Driver Cab HVAC', desc: 'Compact, high-reliability units for operator environment control' },
      { Icon: Wrench, label: 'Electronic Controls', desc: 'Intelligent control panels for integrated train management' },
    ],
    products: ['Metro Brake Disc', 'Saloon HVAC', 'Cab HVAC', 'Electronic Controls'],
    cta: 'View Metro Products',
    ctaHref: '/products?cat=Metro',
  },
  {
    Icon: Globe,
    title: 'Vande Bharat Platform',
    subtitle: 'Semi-High Speed Components',
    image: '/images/products/vande-bharat-door/main.jpg',
    tag: 'Premium Segment',
    tagColor: '#8B5CF6',
    desc: 'The Vande Bharat Express represents India\'s flagship semi-high-speed rail initiative. AND Hitech has developed a dedicated product portfolio for this platform — including plug doors, brake discs, and coupler systems manufactured to the highest precision standards.',
    stats: [
      { n: '160', l: 'km/h Operations' },
      { n: 'RDSO', l: 'Type Approved' },
      { n: '100%', l: 'Make in India' },
    ],
    features: [
      { Icon: Gauge, label: 'Wheel-Mounted Brake Discs', desc: 'High-speed certified brake discs for Vande Bharat operations' },
      { Icon: Wrench, label: 'Single Leaf Plug Door', desc: 'Pneumatically-operated doors built to Vande Bharat specifications' },
      { Icon: Zap, label: 'IV Coupler System', desc: 'Inter-vehicle couplers for semi-high-speed articulation' },
      { Icon: Gauge, label: 'Pantograph', desc: 'Current collection systems for electrified high-speed operations' },
    ],
    products: ['WM Brake Disc VB', 'Plug Door', 'IV Coupler', 'Pantograph'],
    cta: 'View Vande Bharat Products',
    ctaHref: '/products?cat=Vande Bharat',
  },
  {
    Icon: Factory,
    title: 'Track Maintenance & Infrastructure',
    subtitle: 'Tooling & Equipment',
    image: '/images/products/tamping-tool-main.jpg',
    tag: 'Infrastructure',
    tagColor: '#F59E0B',
    desc: 'Track geometry and maintenance is critical to safe railway operations. AND Hitech manufactures specialised tamping tools and maintenance equipment used by Indian Railways\' maintenance divisions for track laying, ballast compaction, and alignment operations.',
    stats: [
      { n: '3', l: 'Tool Variants' },
      { n: 'OEM', l: 'Grade Quality' },
      { n: 'Pan-India', l: 'Distribution' },
    ],
    features: [
      { Icon: Wrench, label: 'Tamping Tools', desc: 'Precision-forged tamping tools for ballast compaction and track setting' },
      { Icon: Gauge, label: 'Track Alignment Tools', desc: 'Specialty tooling for geometric alignment of railway tracks' },
      { Icon: Zap, label: 'Custom Fabrication', desc: 'Engineered-to-order tooling solutions for specific maintenance requirements' },
      { Icon: ShieldCheck, label: 'Quality Certification', desc: 'All tools produced to applicable RDSO and ISO standards' },
    ],
    products: ['Tamping Tools', 'Track Tools'],
    cta: 'View Track Products',
    ctaHref: '/products?cat=Track',
  },
  {
    Icon: ShieldCheck,
    title: 'Precision Contract Manufacturing',
    subtitle: 'OEM & Custom Engineering',
    image: '/images/infra/infra-1.jpg',
    tag: 'Contract Mfg',
    tagColor: '#10B981',
    desc: 'Beyond product lines, AND Hitech operates as a trusted contract manufacturing partner for OEMs, EPC contractors, and industrial clients requiring high-precision metal components, assemblies, and sub-assemblies to exacting tolerances.',
    stats: [
      { n: '5-axis', l: 'CNC Machining' },
      { n: 'DN', l: 'Solutions Equipment' },
      { n: 'Sub-μm', l: 'Tolerances' },
    ],
    features: [
      { Icon: Gauge, label: 'CNC Precision Machining', desc: '5-axis CNC centres with sub-micron tolerances for critical components' },
      { Icon: Wrench, label: 'Custom Fabrication', desc: 'Rapid prototyping through to full production runs' },
      { Icon: Award, label: 'Quality Assurance', desc: 'CMM inspection with full dimensional reports and traceability' },
      { Icon: Zap, label: 'Surface Finishing', desc: 'Heat treatment, anodising, powder coating and precision grinding' },
    ],
    products: ['CNC Machining', 'Assembly Work', 'Custom Engineering'],
    cta: 'Discuss Requirements',
    ctaHref: '/contact',
  },
];

export default function Industries() {
  return (
    <div className="bg-[#07080C] min-h-screen">
      <Head>
        <title>Industries We Serve | AND Hitech Industries</title>
        <meta name="description" content="AND Hitech serves Indian Railways, Metro networks, Vande Bharat platform, track maintenance, and precision contract manufacturing — RDSO approved, ISO certified." />
      </Head>
      <Header />
      <PageBanner
        title="Industries We Serve"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Industries"
      />

      {/* ── INTRO SECTION ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#07080C' }}>
        <div className="absolute inset-0 bg-grid-eng opacity-40 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
              <span className="eyebrow mb-5 block">Our Market Reach</span>
              <h2 className="display-md mb-6">Driving Innovation Across<br /><span style={{ color: '#E3510F' }}>Key Railway Sectors</span></h2>
              <p className="text-[#9BA5B4] text-base leading-relaxed mb-8">
                From high-speed Vande Bharat trains to urban metro systems and mainline freight — AND Hitech delivers precision-engineered solutions across the full spectrum of Indian rail transportation.
              </p>
              <div className="flex flex-wrap gap-3">
                {['RDSO Approved', 'ISO 9001:2015', 'Make in India', 'Government Trusted'].map(badge => (
                  <span key={badge} className="badge text-[.58rem]">{badge}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .15, duration: .8 }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: '10+', l: 'Years Experience' },
                  { n: '5+', l: 'Sectors Served' },
                  { n: '500+', l: 'Projects Delivered' },
                  { n: '100%', l: 'RDSO Compliant' },
                ].map(({ n, l }) => (
                  <div key={l} className="bento-cell p-6 text-center group cursor-default">
                    <div className="text-[2.2rem] font-bold text-[#EDF0F5] group-hover:text-[#E3510F] transition-colors" style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }}>{n}</div>
                    <div className="text-[#4E5A6E] text-[.70rem] uppercase tracking-[.18em] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY DEEP-DIVES ── */}
      <section className="relative overflow-hidden" style={{ background: '#050608' }}>
        <div className="max-w-screen-xl mx-auto px-5 md:px-10">
          <div className="space-y-0">
            {industries.map(({ Icon, title, subtitle, image, tag, tagColor, desc, stats, features, products: prods, cta, ctaHref }, idx) => {
              const rev = idx % 2 === 1;
              return (
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }} transition={{ duration: .85 }}
                  className={`py-20 md:py-28 border-b border-white/[.04] last:border-0 flex flex-col ${rev ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-14 lg:gap-20 items-start`}
                >
                  {/* Image side */}
                  <div className="w-full lg:w-1/2 relative group flex-shrink-0">
                    <div className="rounded-2xl overflow-hidden border border-white/[.06] relative" style={{ height: 400 }}>
                      <Image src={image} alt={title} fill
                        className="object-cover opacity-65 group-hover:opacity-85 group-hover:scale-[1.03] transition-all duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/70 via-transparent to-transparent" />
                      {/* Tag */}
                      <div className="absolute top-5 left-5">
                        <span className="badge text-[.54rem]" style={{ borderColor: `${tagColor}30`, background: `${tagColor}12`, color: tagColor }}>
                          {tag}
                        </span>
                      </div>
                    </div>
                    {/* Stats below image */}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {stats.map(({ n, l }) => (
                        <div key={l} className="bento-cell p-4 text-center">
                          <div className="text-[1.4rem] font-bold text-[#EDF0F5]" style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }}>{n}</div>
                          <div className="text-[#4E5A6E] text-[.60rem] uppercase tracking-[.15em] mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="w-full lg:w-1/2 space-y-7">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${tagColor}15`, border: `1px solid ${tagColor}25` }}>
                          <Icon size={18} style={{ color: tagColor }} />
                        </div>
                        <div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.28em', color: tagColor, textTransform: 'uppercase' }} className="block">{subtitle}</span>
                        </div>
                      </div>
                      <h3 className="display-md mb-4" style={{ lineHeight: .95 }}>
                        {title}
                      </h3>
                      <p className="text-[#9BA5B4] text-[.92rem] leading-relaxed">{desc}</p>
                    </div>

                    {/* Feature cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {features.map(({ Icon: FIcon, label, desc: fDesc }) => (
                        <div key={label} className="bento-cell p-4 group cursor-default">
                          <FIcon size={15} className="text-[#E3510F] mb-2.5 group-hover:scale-110 transition-transform" />
                          <div className="text-[#EDF0F5] text-[.76rem] font-medium mb-1 group-hover:text-white">{label}</div>
                          <div className="text-[#3D4A5C] text-[.68rem] leading-relaxed">{fDesc}</div>
                        </div>
                      ))}
                    </div>

                    {/* Product tags */}
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.50rem', letterSpacing: '.28em', color: '#3D4A5C', textTransform: 'uppercase' }} className="mb-3">
                        Key Products
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {prods.map(p => (
                          <span key={p} className="px-3 py-1 rounded-full border border-white/[.06] text-[#6A7888] text-[.68rem]"
                            style={{ background: 'rgba(255,255,255,.02)' }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4 pt-2">
                      <Link href={ctaHref} className="btn-flame group inline-flex items-center gap-2 py-3 px-7 text-[.66rem]">
                        <span>{cta}</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link href="/contact" className="btn-ghost inline-flex items-center gap-2 group">
                        <span className="text-[#EDF0F5]">Get Technical Spec</span>
                        <ChevronRight size={12} className="text-[#E3510F]" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#0B0E15' }}>
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.25),transparent)' }} />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
            <span className="eyebrow mb-5 block mx-auto w-fit">Ready to Partner?</span>
            <h2 className="display-md mb-6 max-w-2xl mx-auto">
              Your Industry. Your Requirements.<br /><span style={{ color: '#E3510F' }}>Our Engineering.</span>
            </h2>
            <p className="text-[#6A7888] text-base max-w-xl mx-auto mb-10">
              Contact our sector-specific engineering team to discuss your project requirements, technical specifications, or partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-flame group inline-flex items-center gap-2">
                <span>Start a Technical Discussion</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/products" className="btn-wire inline-flex items-center gap-2">
                <span>Browse Full Product Range</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
