/* ============================================
   IMPORTS
   ============================================ */

import { useState, useEffect } from 'react';
import { 
  Menu, X, Star, Check, ArrowRight, 
  Zap, Shield, BarChart3, Globe, Users, Mail,
  Sun, Moon
} from 'lucide-react';


/* ============================================
   NAVBAR COMPONENT
   - Sticky header with scroll effect
   - Dark mode toggle with sun/moon animation
   - Mobile hamburger menu
   ============================================ */

const Navbar = () => {
  // State for mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);
  
  // State for navbar background change on scroll
  const [scrolled, setScrolled] = useState(false);
  
  // State for dark mode (true = dark, false = light)
  const [darkMode, setDarkMode] = useState(false);
  
  // State for icon rotation animation during toggle
  const [isAnimating, setIsAnimating] = useState(false);

  // Runs once on mount: set up scroll listener + sync dark mode
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check if dark mode was already set by index.html script
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode: updates state, DOM, and localStorage
  const toggleDark = () => {
    setIsAnimating(true);
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Reset animation flag after 600ms
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Navigation links data
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-[600ms] ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-indigo-600 p-2 rounded-lg transition-transform duration-[600ms] group-hover:rotate-12">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Nexus<span className="text-indigo-600">Flow</span></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-[600ms] relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-[600ms] group-hover:w-full" />
              </a>
            ))}
            
            {/* Dark Mode Toggle Button */}
            <button 
              onClick={toggleDark}
              className="relative p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-[600ms] hover:scale-110 overflow-hidden"
              aria-label="Toggle dark mode"
            >
              <div className={`transition-all duration-[600ms] ${isAnimating ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}`}>
                {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </div>
            </button>

            {/* CTA Button */}
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all duration-[600ms] hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50 hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleDark} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-[600ms]">
              <div className={`transition-all duration-[600ms] ${isAnimating ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}`}>
                {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </div>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 transition-colors duration-[600ms]">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl py-4 px-4 flex flex-col gap-4 transition-all duration-[600ms]">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 block transition-colors duration-[600ms]">
              {link.name}
            </a>
          ))}
          <button className="bg-indigo-600 text-white w-full py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-[600ms]">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};


/* ============================================
   HERO SECTION
   - Main headline with gradient text
   - CTA buttons
   - Floating animated dashboard preview
   ============================================ */

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background gradient decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-50 to-transparent opacity-60 dark:from-indigo-950/30 dark:opacity-40" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-blue-50 to-transparent opacity-60 dark:from-blue-950/30 dark:opacity-40" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge with floating animation */}
        <div className="animate-float inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 animate-[fade-in-up_0.6s_ease-out]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          v2.0 is now live
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
          Build faster with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">
            Intelligent Tools
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop wrestling with complex configurations. NexusFlow gives you the building blocks to create stunning, high-performance web applications in minutes.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all duration-[600ms] hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50 flex items-center justify-center gap-2 group hover:scale-105">
            Start Building Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-[600ms]" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-full font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-[600ms] flex items-center justify-center gap-2 hover:scale-105">
            View Documentation
          </button>
        </div>

        {/* Dashboard Preview Mockup - FLOATING ANIMATION */}
        <div className="mt-16 relative group animate-float">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-[600ms]"></div>
          <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 transition-transform duration-[600ms] group-hover:scale-[1.02]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors duration-[600ms]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors duration-[600ms]" />
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors duration-[600ms]" />
              <div className="ml-4 text-xs text-slate-500 font-mono">App Dashboard</div>
            </div>
            <div className="p-8 grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800 transition-colors duration-[600ms]">
                  <div className="h-2 w-1/3 bg-slate-700 rounded mb-4 animate-pulse" />
                  <div className="h-24 bg-slate-700/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


/* ============================================
   FEATURES SECTION
   - 6 feature cards with icons
   - Hover lift and icon rotation effects
   ============================================ */

const Features = () => {
  const features = [
    { icon: <Zap className="w-6 h-6 text-amber-500" />, title: "Lightning Fast", desc: "Optimized for speed with zero-config builds and instant HMR." },
    { icon: <Shield className="w-6 h-6 text-emerald-500" />, title: "Enterprise Security", desc: "Built-in authentication, authorization, and data protection." },
    { icon: <BarChart3 className="w-6 h-6 text-blue-500" />, title: "Real-time Analytics", desc: "Monitor your application performance with live dashboards." },
    { icon: <Globe className="w-6 h-6 text-indigo-500" />, title: "Global Edge Network", desc: "Deploy to 35+ regions worldwide with a single click." },
    { icon: <Users className="w-6 h-6 text-rose-500" />, title: "Team Collaboration", desc: "Real-time multiplayer editing and code review tools." },
    { icon: <Mail className="w-6 h-6 text-cyan-500" />, title: "Smart Notifications", desc: "AI-powered alerts that filter noise and surface critical issues." },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to scale</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Powerful features that help you build, deploy, and manage your applications without the hassle.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-slate-900/50 hover:-translate-y-2 transition-all duration-[600ms] group cursor-pointer">
              <div className="bg-slate-50 dark:bg-slate-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-[600ms]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ============================================
   TESTIMONIALS SECTION
   - 3 customer reviews with star ratings
   - Staggered star animation on hover
   ============================================ */

const Testimonials = () => {
  const testimonials = [
    { name: "Sarah Chen", role: "CTO at TechFlow", text: "NexusFlow reduced our deployment time by 80%. The developer experience is simply unmatched in the industry." },
    { name: "Marcus Johnson", role: "Lead Developer", text: "I was skeptical at first, but the real-time collaboration features changed how our team works entirely." },
    { name: "Elena Rodriguez", role: "Product Manager", text: "The analytics dashboard gives us insights we never had before. It's like having a data scientist on the team." },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">Trusted by developers worldwide</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl relative hover:shadow-xl dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-[600ms] group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-125 transition-transform duration-[600ms]" style={{transitionDelay: `${i * 100}ms`}} />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold group-hover:scale-110 transition-transform duration-[600ms]">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ============================================
   PRICING SECTION
   - 3 pricing tiers (Starter, Pro, Enterprise)
   - Monthly/Annual toggle with price update
   - "Most Popular" badge on Pro plan
   ============================================ */

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? 0 : 0,
      desc: "Perfect for side projects and hobbyists.",
      features: ["1 Project", "Community Support", "Basic Analytics", "1 Team Member"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: isAnnual ? 29 : 39,
      desc: "For professional developers and small teams.",
      features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "10 Team Members", "Custom Domains"],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: isAnnual ? 99 : 129,
      desc: "For large organizations with advanced needs.",
      features: ["Everything in Pro", "SSO & SAML", "Dedicated Support", "Unlimited Team Members", "SLA Guarantee"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-slate-400 text-lg">Choose the plan that fits your needs. No hidden fees.</p>
        </div>

        {/* Monthly/Annual Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`text-sm font-medium transition-colors duration-[600ms] ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-8 bg-indigo-600 rounded-full p-1 transition-colors duration-[600ms] hover:bg-indigo-500"
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-[600ms] ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-medium transition-colors duration-[600ms] ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Annual <span className="text-indigo-400 text-xs ml-1">Save 20%</span></span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-2xl border transition-all duration-[600ms] hover:-translate-y-2 hover:shadow-2xl ${plan.popular ? 'bg-indigo-600 border-indigo-500 scale-105 shadow-2xl shadow-indigo-900/50 hover:bg-indigo-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-bounce">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold transition-all duration-[600ms]">${plan.price}</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <p className="text-slate-300 mb-6 text-sm">{plan.desc}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm group/item">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-[600ms]" />
                    <span className="text-slate-200 group-hover/item:text-white transition-colors duration-[600ms]">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-[600ms] hover:scale-105 ${plan.popular ? 'bg-white text-indigo-600 hover:bg-slate-100 hover:shadow-lg' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ============================================
   CONTACT SECTION
   - Form with name, email, message fields
   - Validation and success state
   ============================================ */

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-slate-900/50 p-8 md:p-12 transition-all duration-[600ms] hover:shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Get in touch</h2>
            <p className="text-slate-600 dark:text-slate-400">Have questions? We'd love to hear from you.</p>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 outline-none transition-all duration-[600ms] hover:border-indigo-300 dark:hover:border-indigo-600"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 outline-none transition-all duration-[600ms] hover:border-indigo-300 dark:hover:border-indigo-600"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 outline-none transition-all duration-[600ms] hover:border-indigo-300 dark:hover:border-indigo-600 resize-none"
                  placeholder="How can we help you?"
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all duration-[600ms] shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:shadow-xl hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};


/* ============================================
   FOOTER COMPONENT
   - Logo, description, and link columns
   ============================================ */

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white group cursor-pointer">
              <Zap className="w-6 h-6 text-indigo-500 group-hover:rotate-12 transition-transform duration-[600ms]" />
              <span className="text-xl font-bold">NexusFlow</span>
            </div>
            <p className="max-w-sm hover:text-slate-300 transition-colors duration-[600ms]">Making the world more productive, one application at a time.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Integrations', 'Pricing', 'Changelog'].map(item => (
                <li key={item}><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-[600ms]">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Contact'].map(item => (
                <li key={item}><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-[600ms]">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="hover:text-slate-300 transition-colors duration-[600ms]">© 2026 NexusFlow Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-[600ms]">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-[600ms]">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


/* ============================================
   MAIN APP COMPONENT
   - Renders all sections in order
   ============================================ */

function App() {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;