import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    { name: "Bibingka", price: "P120.00", image: "/bibingka.jpg", tag: "Best Seller" },
    { name: "Puto", price: "P100.00", image: "/puto.jpg", tag: "Classic" },
    { name: "Kutsinta", price: "P100.00", image: "/kutsinta.jpg", tag: "Classic" },
    { name: "Sapin-Sapin", price: "P120.00", image: "/sapin-sapin.jpg", tag: "Top Rated" },
    { name: "Suman", price: "P90.00", image: "/suman.jpg", tag: "Traditional" },
  ];

  return (
    <div className="bg-[#FCF8F1] min-h-screen font-sans text-[#331818] selection:bg-[#801B1B] selection:text-white">
      {/* Dynamic Header */}
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-[#801B1B]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#801B1B] rounded-full flex items-center justify-center text-[#FCF8F1] font-bold text-2xl shadow-lg ring-4 ring-[#801B1B]/20">C</div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl leading-none uppercase tracking-tighter text-[#801B1B]">Clara's Best</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Premium Kakanin</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.15em]">
            {['Home', 'Kakanin Menu', 'About Us', 'Contact Us'].map((item) => (
              <button 
                key={item}
                onClick={() => item === 'Home' && navigate('/')}
                className="hover:text-[#801B1B] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#801B1B] transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <button 
            onClick={() => navigate('/login')}
            className="bg-[#801B1B] text-white px-6 py-2.5 rounded-full text-xs font-black flex items-center gap-2 hover:bg-[#331818] hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            <span className="text-base">👤</span> LOGIN
          </button>
        </div>
      </header>

      {/* Elegant Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-10 z-10 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 bg-[#801B1B]/10 rounded-full">
            <span className="text-[#801B1B] text-[10px] font-black uppercase tracking-[0.2em]">✨ 100% Homemade & Fresh</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-serif italic text-[#331818] leading-[0.9] tracking-tighter">
            Authentic <br />
            <span className="not-italic font-black text-[#801B1B] drop-shadow-sm">Pinoy Heart</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
            Handcrafted rice delicacies made with traditional recipes passed down through generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#801B1B] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#331818] transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
            >
              ORDER NOW 🛍️
            </button>
            <button className="bg-white border-2 border-[#801B1B]/20 text-[#801B1B] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-[#801B1B] transition-all">
              RESERVATIONS 🗓️
            </button>
          </div>
        </div>
        
        {/* Visual Showcase - CIRCLE WITH PICTURE */}
        <div className="lg:w-1/2 relative flex justify-center">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[#801B1B]/10 rounded-full blur-3xl transform scale-110"></div>
          
          {/* The Circular Image Frame */}
          <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full border-[16px] border-white shadow-2xl overflow-hidden group ring-1 ring-black/5">
            <img 
              src="/hero-kakanin-plate.jpg" 
              alt="Premium Kakanin Plate" 
              className="w-full h-full object-cover transform transition-transform duration-[4s] ease-out group-hover:scale-110" 
            />
            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#331818]/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Interactive Badge */}
          <div className="absolute top-8 right-8 bg-white p-4 rounded-3xl shadow-2xl animate-bounce flex items-center justify-center border border-gray-50">
            <span className="text-3xl">🧡</span>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "WIDE SELECTION", desc: "Over 20+ varieties of traditional kakanin treats.", icon: "🍱" },
            { label: "FRESH & QUALITY", desc: "Cooked daily using the finest glutinous rice.", icon: "🌾" },
            { label: "EASY ORDERING", desc: "Seamless checkout for your local cravings.", icon: "📲" },
            { label: "FAST DELIVERY", desc: "Warm and fresh kakanin right at your door.", icon: "🛵" },
          ].map((feature, i) => (
            <div key={i} className="text-center group p-6 hover:bg-[#FCF8F1] rounded-3xl transition-colors">
              <div className="text-5xl mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6">{feature.icon}</div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-3 text-[#801B1B]">{feature.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Menu Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <span className="italic text-[#801B1B] font-serif text-2xl">Chef's Recommendations 🌿</span>
            <h2 className="text-5xl font-black tracking-tighter mt-2 uppercase">The Signature Collection</h2>
          </div>
          <button className="px-8 py-3 bg-white border-2 border-[#801B1B] text-[#801B1B] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#801B1B] hover:text-white transition-all">
            EXPLORE ALL MENU
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {products.map((item, index) => (
            <div key={index} className="group relative bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-[#801B1B]/10">
                  <span className="text-[9px] font-black uppercase text-[#801B1B] tracking-widest">{item.tag}</span>
                </div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
                />
              </div>
              <div className="text-center px-2 space-y-2">
                <h4 className="font-black text-lg uppercase tracking-tight">{item.name}</h4>
                <p className="text-[#801B1B] font-black text-xl mb-4 italic">{item.price}</p>
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-[#331818] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#801B1B] transition-all shadow-lg active:scale-95"
                >
                  ADD TO BASKET
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer (Dark Mode) */}
      <footer className="bg-[#1A1A1A] text-gray-400 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#801B1B] rounded-full flex items-center justify-center text-white font-bold">C</div>
              <span className="text-white font-serif font-black text-xl uppercase tracking-tighter">Clara's Best</span>
            </div>
            <p className="text-sm leading-relaxed">The heart of SJDM's traditional rice cakes. Bringing families together through sweet, sticky delicacies.</p>
          </div>
          
          <div className="space-y-8">
            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em]">Hours</h5>
            <div className="text-sm space-y-2">
              <p>Mon — Sun</p>
              <p className="text-[#801B1B] font-bold text-lg">08:00 AM — 08:00 PM</p>
            </div>
          </div>

          <div className="space-y-8">
            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em]">Reach Us</h5>
            <div className="text-sm space-y-4">
              <p className="flex items-center gap-3 italic">📍 SJDM, Bulacan</p>
              <p className="flex items-center gap-3 font-bold text-white tracking-widest">📞 0923 456 7890</p>
            </div>
          </div>

          <div className="space-y-8">
            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em]">Social</h5>
            <div className="flex gap-6">
              <button className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#801B1B] hover:border-[#801B1B] transition-all">FB</button>
              <button className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#801B1B] hover:border-[#801B1B] transition-all">IG</button>
            </div>
          </div>
        </div>
        <div className="text-center mt-24 border-t border-white/5 pt-10 text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">
          © 2025 CLARA'S BEST KAKANIN — TRADITION BORN IN BULACAN
        </div>
      </footer>
    </div>
  );
};

export default Home;
