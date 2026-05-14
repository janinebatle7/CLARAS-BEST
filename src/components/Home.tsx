import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    { name: "Bibingka", price: "P120.00", image: "/bibingka.jpg" },
    { name: "Puto", price: "P100.00", image: "/puto.jpg" },
    { name: "Kutsinta", price: "P100.00", image: "/kutsinta.jpg" },
    { name: "Sapin-Sapin", price: "P120.00", image: "/sapin-sapin.jpg" },
    { name: "Suman", price: "P90.00", image: "/suman.jpg" },
  ];

  return (
    <div className="bg-[#FCF8F1] min-h-screen font-sans text-[#4A0E0E]">
      {/* Header / Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#801B1B] rounded-full flex items-center justify-center text-white font-bold text-xl">C</div>
            <span className="font-serif font-bold text-xl tracking-tight uppercase text-[#801B1B]">Clara's Best</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
            <button onClick={() => navigate('/')} className="hover:text-[#801B1B] transition">Home</button>
            <button className="hover:text-[#801B1B] transition">Kakanin Menu</button>
            <button className="hover:text-[#801B1B] transition">About Us</button>
            <button className="hover:text-[#801B1B] transition">Contact Us</button>
          </nav>

          {/* Login Button Feature */}
          <button 
            onClick={() => navigate('/login')}
            className="bg-[#801B1B] text-white px-5 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-black transition shadow-lg"
          >
            <span className="text-lg">👤</span> LOGIN
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-6xl font-serif italic text-[#801B1B] leading-tight">
            Authentic Pinoy Kakanin Delicacies, <br />
            <span className="block not-italic font-bold text-black mt-2">Made with Love ♡</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-md">
            Enjoy your favorite Filipino rice delicacies. Freshly made, traditionally loved.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#801B1B] text-white px-8 py-4 rounded-md font-bold flex items-center gap-2 hover:bg-black transition transform hover:-translate-y-1"
            >
              ORDER NOW 🛍️
            </button>
            <button className="border-2 border-[#801B1B] text-[#801B1B] px-8 py-4 rounded-md font-bold hover:bg-[#801B1B] hover:text-white transition">
              BOOK RESERVATION 🗓️
            </button>
          </div>
        </div>
        
        {/* Main Image Plate */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="relative w-96 h-96 rounded-full border-[12px] border-[#801B1B]/10 overflow-hidden shadow-2xl animate-fade-in">
            <img 
              src="/hero-kakanin-plate.jpg" 
              alt="Kakanin Selection" 
              className="object-cover w-full h-full hover:scale-110 transition duration-700" 
            />
          </div>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-16 border-y border-gray-100 bg-white">
        {[
          { label: "WIDE SELECTION", desc: "Choose from a variety of traditional kakanin.", icon: "🛍️" },
          { label: "FRESH & QUALITY", desc: "Made with premium ingredients for the best taste.", icon: "✨" },
          { label: "EASY ORDERING", desc: "Walk-in or reservation ordering made simple.", icon: "🚚" },
          { label: "ORDER TRACKING", desc: "Track your orders in real-time with ease.", icon: "📍" },
        ].map((feature, i) => (
          <div key={i} className="text-center space-y-3">
            <div className="text-4xl">{feature.icon}</div>
            <h3 className="font-bold text-sm uppercase tracking-widest">{feature.label}</h3>
            <p className="text-xs text-gray-500 px-6 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Best Sellers Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="italic text-[#801B1B] font-serif text-lg">Our Best Sellers 🌿</span>
            <h2 className="text-4xl font-bold mt-2">Favorite Kakanin</h2>
          </div>
          <button className="text-[#801B1B] font-bold border-b-2 border-[#801B1B] pb-1 hover:text-black hover:border-black transition">
            VIEW ALL MENU
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition duration-300">
              <div className="h-48 bg-gray-50 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
              </div>
              <div className="p-5 text-center space-y-3">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="text-[#801B1B] font-bold text-xl">{item.price}</p>
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-[#801B1B] text-white py-3 rounded-lg text-xs font-black uppercase tracking-tighter hover:bg-black transition"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="bg-[#1A1A1A] text-gray-400 py-16 px-8 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h5 className="text-white font-bold uppercase tracking-widest">Store Hours</h5>
            <div className="space-y-1">
              <p>Monday - Sunday</p>
              <p className="text-white font-semibold">8:00 AM - 8:00 PM</p>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold uppercase tracking-widest">Location</h5>
            <p className="leading-relaxed">Poblacion, City of San Jose del Monte, Bulacan</p>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold uppercase tracking-widest">Contact Us</h5>
            <div className="space-y-1">
              <p>📞 0923 456 7890</p>
              <p>📧 clarasbest.kakanin@gmail.com</p>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold uppercase tracking-widest">Follow Us</h5>
            <div className="flex gap-4 text-2xl">
              <button className="hover:text-white transition">facebook</button>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 border-t border-white/10 pt-8 text-xs tracking-widest opacity-50">
          © 2025 CLARA'S BEST KAKANIN DELICACIES. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default Home;
