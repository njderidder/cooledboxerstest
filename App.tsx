import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Button from './components/Button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ShieldCheck, Thermometer, Wind, RefreshCw, ChevronDown, Check, Plus } from 'lucide-react';
import { COLORS, SIZES, Bundle } from './types';

// --- Data ---

const bundles: Bundle[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For trying the fit and feel.',
    includes: ['1 ColdBoxers boxer brief', '1 cooling pad'],
    price: 39,
    cta: 'Get Starter',
    image: 'images/3 medium.png'
  },
  {
    id: 'sauna-set',
    name: 'Sauna Set',
    description: 'Built for real sauna routines and pad swapping.',
    includes: ['3 ColdBoxers boxer briefs', '3 cooling pads'],
    price: 100,
    badge: 'Most Popular',
    cta: 'Get the 3 Pack',
    image: 'images/4 medium.png'
  },
  {
    id: 'rotation',
    name: 'Rotation',
    description: 'Your full weekly lineup. Always ready.',
    includes: ['5 ColdBoxers boxer briefs', '5 cooling pads'],
    price: 155,
    badge: 'Best Value',
    cta: 'Get the 5 Pack',
    image: 'images/5 medium.png'
  }
];

const galleryImages = [
  'images/6 medium.png', 
  'images/7 medium.png', 
  'images/8 medium.png', 
  'images/9 medium.png', 
  'images/10 medium.png',
  'images/11 medium.png', 
  'images/12 medium.png', 
  'images/13 medium.png',
  'images/14 medium.png'
];

const faqs = [
  { q: "How cold is it?", a: "Refreshing, not extreme. The pocket design helps keep cooling controlled and comfortable." },
  { q: "How long does it last?", a: "Each session is designed to deliver strong cooling for at least 20 minutes. Many customers go longer depending on conditions." },
  { q: "When should I use it around the sauna?", a: "Most men prefer after the hot room, or between rounds. It is a simple cooldown habit." },
  { q: "Can I wear it every day?", a: "Yes. Many customers use it daily, and add pads when they want cooling." },
  { q: "How do I wash it?", a: "Remove the pad. Machine wash cold. Air dry or tumble low. Pads wipe clean and are reusable." },
];

const reviews = [
  { text: "Sauna nights feel different now. Simple, premium, and actually discreet.", author: "Verified Buyer" },
  { text: "Feels like high end underwear. The cooling pocket is genius.", author: "Verified Buyer" },
  { text: "Easy habit. I keep a few pads ready and just swap.", author: "Verified Buyer" }
];

// --- Animation Components ---

const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const RevealText = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const ParallaxImage = ({ src, alt, offset = 50 }: { src: string, alt: string, offset?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl w-full h-full relative group bg-neutral-900">
      <motion.img 
        style={{ y, scale: 1.15 }}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-opacity duration-500 opacity-90 group-hover:opacity-100" 
        loading="lazy"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.opacity = '0.5';
        }}
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
    </div>
  );
};

const Marquee = ({ images, reverse = false }: { images: string[], reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden w-full relative group">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-onyx to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-onyx to-transparent z-10" />
      
      <motion.div
        className="flex gap-4 px-2"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="relative w-[300px] h-[400px] shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-white/5 bg-neutral-900">
            <img src={src} alt="Gallery" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main App ---

function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = React.useState(SIZES[1]);
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-onyx text-gray-200 selection:bg-ice-500 selection:text-white overflow-x-hidden font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-neutral-900 to-transparent opacity-60 z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ice-900/10 blur-[150px] rounded-full z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]"
            >
              Sauna heat. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-300 via-ice-400 to-ice-500">
                Managed.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl text-gray-400 mb-10 max-w-lg font-light leading-relaxed border-l-2 border-ice-900 pl-6"
            >
              Premium cooling boxer briefs designed to support fertility by helping reduce unwanted heat exposure. Built for sauna routines.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button onClick={() => document.getElementById('bundles')?.scrollIntoView({behavior: 'smooth'})}>
                Shop Bundles
              </Button>
              <Button variant="secondary" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})}>
                How it works
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm text-gray-400 font-medium"
            >
              {[
                { icon: Thermometer, text: "20 min cooling sessions" },
                { icon: RefreshCw, text: "Swap pads in seconds" },
                { icon: Wind, text: "Bamboo Lyocell comfort" },
                { icon: ShieldCheck, text: "Tight, supportive fit" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white/5 text-ice-400">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative h-[50vh] lg:h-[70vh] w-full flex items-center justify-center">
            <motion.div 
              style={{ y: heroY }}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full z-10"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-ice-500/20 to-transparent mix-blend-overlay z-10" />
                <img 
                  src="images/1 medium.png" 
                  alt="ColdBoxers Hero" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-neutral-900/90 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-2xl z-20 max-w-[200px]"
              >
                <div className="text-ice-400 font-bold text-lg mb-1">Fertility Smart</div>
                <div className="text-xs text-gray-400">Engineered for heat management and comfort.</div>
              </motion.div>
            </motion.div>

            {/* Background blob behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-ice-500/10 blur-[80px] rounded-full -z-10" />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 cursor-pointer hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* PROBLEM / HEAT ADDS UP */}
      <section className="py-32 bg-neutral-900/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeInUp>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">
              Heat adds up.
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
              Sauna sessions feel great. The heat down there does not.
              For men, testicular temperature matters. Sperm production works best in a cooler environment.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              ColdBoxers gives you a clean, simple habit for heat heavy days. No DIY ice tricks. No bulky devices. Just premium underwear that does its job.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* DREAM OUTCOME */}
      <section className="py-32 bg-onyx border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="h-[600px] w-full">
             <ParallaxImage 
               src="images/2 medium.png" 
               alt="Lifestyle Sauna" 
               offset={80}
             />
          </div>
          <div className="space-y-12">
            <div>
              <RevealText text="Keep the lifestyle." className="text-4xl md:text-5xl font-bold text-white block mb-2" />
              <RevealText text="Protect the plan." className="text-4xl md:text-5xl font-bold text-gray-500 block" />
            </div>
            
            <div className="space-y-8">
              <FadeInUp delay={0.2}>
                <div className="flex gap-6 group">
                  <div className="w-1 bg-neutral-800 h-auto group-hover:bg-ice-500 transition-colors duration-500" />
                  <div>
                    <h4 className="text-white font-bold mb-2">Control the Heat</h4>
                    <p className="text-gray-400">Go to the sauna and still feel in control afterward. Build a routine that supports fertility without changing who you are.</p>
                  </div>
                </div>
              </FadeInUp>
              <FadeInUp delay={0.4}>
                <div className="flex gap-6 group">
                  <div className="w-1 bg-neutral-800 h-auto group-hover:bg-ice-500 transition-colors duration-500" />
                  <div>
                    <h4 className="text-white font-bold mb-2">Future Proof</h4>
                    <p className="text-gray-400">ColdBoxers is made for men who want premium comfort now, and peace of mind later.</p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT IS & FEATURES */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900 -skew-y-2 transform origin-top-left -z-10 scale-110" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Cooling built into premium underwear.</h2>
            <p className="text-gray-400 text-lg">
              ColdBoxers is a boxer brief with a discreet front pocket designed for a reusable liquid cooling pad. Insert the pad when you want cooling. Remove it when you do not.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Discreet Pocket", desc: "Holds the pad securely without bulky outlines." },
              { title: "Controlled Cooling", desc: "Feel the difference for at least 20 minutes." },
              { title: "Bamboo Lyocell", desc: "Soft, breathable, and smooth on skin." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-onyx border border-white/5 p-10 rounded-2xl hover:border-ice-500/30 transition-all shadow-lg hover:shadow-ice-500/5 group"
              >
                <div className="mb-6 w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-ice-500 transition-colors">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center text-xs text-gray-600 font-mono uppercase tracking-widest">
            Fabric and dyes: OEKO TEX certified • PFAS tested • skin safe dyes
          </div>
        </div>
      </section>

      {/* GALLERY / IN ACTION */}
      <section className="py-24 bg-black overflow-hidden border-y border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ice-500 mb-2">In Action</h2>
          <p className="text-white text-2xl font-bold">The Routine in Motion</p>
        </div>
        <Marquee images={galleryImages} />
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">
            Chill. Insert. Go.
          </h2>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-900 to-transparent" />

            {[
              { step: "01", title: "Chill", desc: "Place the cooling pad in your freezer for 60 minutes." },
              { step: "02", title: "Insert", desc: "Slide it into the front pocket. The pocket creates a comfortable barrier so it cools without harsh shock." },
              { step: "03", title: "Go", desc: "Enjoy a cooling session for 20 minutes or more. Swap to a fresh pad when the first one warms up." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 bg-black p-4 group"
              >
                <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 mb-8 mx-auto text-3xl font-bold text-ice-500 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] transition-shadow duration-500">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-white group-hover:text-ice-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-center leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 bg-neutral-900/50 p-10 rounded-2xl border border-white/5 max-w-3xl mx-auto backdrop-blur-sm"
          >
             <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
               <span className="w-2 h-8 bg-ice-500 rounded-full" />
               Sauna Routine <span className="text-gray-500 font-normal">Recommended</span>
             </h4>
             <ul className="space-y-4 text-gray-300">
               {[
                 "Pre chill your pads before you leave",
                 "Use one pad after the hot room, or between rounds",
                 "Swap pads every 20 minutes for longer sessions"
               ].map((tip, i) => (
                 <li key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                   <Check className="w-5 h-5 text-ice-500 shrink-0" />
                   {tip}
                 </li>
               ))}
             </ul>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS / BUNDLES */}
      <section id="bundles" className="py-32 bg-onyx relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose your bundle.</h2>
            <p className="text-gray-400 text-lg">All bundles include boxer briefs and reusable liquid cooling pads.</p>
          </div>
          
          {/* Configurator */}
          <div className="max-w-xl mx-auto mb-20 p-8 bg-neutral-900 rounded-2xl border border-white/5 shadow-2xl">
             <div className="mb-8">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Select Color</p>
               <div className="flex gap-4">
                 {COLORS.map((color) => (
                   <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all relative outline-none ${selectedColor.name === color.name ? 'border-ice-500 scale-110 shadow-lg shadow-ice-500/20' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                   >
                     {selectedColor.name === color.name && (
                       <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap text-white bg-black/80 px-2 py-1 rounded">{color.name}</div>
                     )}
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Select Size</p>
               <div className="flex gap-3">
                 {SIZES.map((size) => (
                   <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg border-2 transition-all ${selectedSize === size ? 'bg-white text-black border-white shadow-lg' : 'bg-transparent text-gray-400 border-neutral-800 hover:border-neutral-600'}`}
                   >
                     {size}
                   </button>
                 ))}
               </div>
               <p className="text-xs text-gray-500 mt-4 text-center">Tight supportive fit. If you prefer less compression, size up.</p>
             </div>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {bundles.map((bundle, idx) => (
              <motion.div 
                key={bundle.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className={`relative bg-neutral-900 rounded-2xl overflow-hidden border transition-all duration-300 ${bundle.badge ? 'border-ice-500 shadow-[0_0_50px_rgba(14,165,233,0.1)]' : 'border-white/10 hover:border-white/20'}`}
              >
                {/* Product Image Top */}
                <div className="h-64 overflow-hidden relative group bg-neutral-800">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy"/>
                  {bundle.badge && (
                    <div className="absolute top-4 right-4 z-20 bg-ice-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {bundle.badge}
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
                  <p className="text-gray-400 text-sm h-10 mb-6">{bundle.description}</p>
                  
                  <div className="text-4xl font-bold text-white mb-8">€{bundle.price}</div>
                  
                  <ul className="space-y-4 mb-8">
                    {bundle.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-ice-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    fullWidth 
                    variant={bundle.badge ? 'primary' : 'outline'}
                  >
                    {bundle.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-32 bg-gradient-to-b from-onyx to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-20">Loved for the routine. <br/>Kept for the comfort.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="bg-neutral-900/30 p-10 rounded-2xl border border-white/5 relative group"
              >
                <div className="text-neutral-800 group-hover:text-ice-500/20 transition-colors text-8xl font-serif absolute -top-8 left-6 leading-none select-none">"</div>
                <div className="flex justify-center text-ice-500 mb-6 relative z-10">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-lg">★</span>)}
                </div>
                <p className="text-lg text-gray-300 italic mb-8 relative z-10 leading-relaxed">{review.text}</p>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{review.author}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Rated 4.8/5 by 500+ customers.
          </p>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-5xl font-bold mb-8 leading-tight">Try it. <br/>Keep it if you love it.</h2>
               <Button className="!bg-black !text-white hover:!bg-gray-800" onClick={() => document.getElementById('bundles')?.scrollIntoView({behavior: 'smooth'})}>
                 Shop Risk Free
               </Button>
             </div>
             <div className="grid gap-8">
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-bold mb-3">30 day comfort guarantee.</h3>
                  <p className="text-gray-600">If the fit or feel is not right, return it within 30 days. Simple process. No awkward questions.</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <h3 className="text-xl font-bold mb-3">Free shipping, always.</h3>
                  <p className="text-gray-600">Delivered in discreet packaging to your door.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-onyx">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full py-8 flex items-center justify-between text-left hover:text-ice-300 transition-colors group"
                >
                  <span className="text-xl font-medium">{faq.q}</span>
                  <div className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-45' : ''}`}>
                    <Plus className="w-6 h-6 text-gray-500 group-hover:text-white" />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === idx ? 'auto' : 0, opacity: activeFaq === idx ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 text-gray-400 leading-relaxed text-lg">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Make sauna days fertility smart.</h2>
              <p className="text-gray-400">Premium cooling boxer briefs. Smarter habit.</p>
            </div>
            <Button onClick={() => document.getElementById('bundles')?.scrollIntoView({behavior: 'smooth'})}>
              Shop Bundles
            </Button>
          </div>
          
          <div className="border-t border-white/10 pt-10 text-xs text-gray-600 space-y-6 text-center md:text-left">
            <p className="max-w-4xl">
              ColdBoxers is intended for comfort and personal heat management. It is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary. Consult a healthcare professional for personal medical advice.
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; {new Date().getFullYear()} ColdBoxers. All rights reserved.</p>
              <div className="flex gap-6 mt-6 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Shipping & Returns</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;