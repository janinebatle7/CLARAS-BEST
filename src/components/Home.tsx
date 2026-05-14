import React from 'react';
import { cn } from '../utils/cn';

const Home: React.FC = () => {
  const products = [
    { name: "Bibingka", price: "P120.00", image: "/path-to-bibingka.jpg" },
    { name: "Puto", price: "P100.00", image: "/path-to-puto.jpg" },
    { name: "Kutsinta", price: "P100.00", image: "/path-to-kutsinta.jpg" },
    { name: "Sapin-Sapin", price: "P120.00", image: "/path-to-sapin.jpg" },
    { name: "Suman", price: "P90.00", image: "/path-to-suman.jpg" },
  ];

  return (
    <div className="bg-[#FCF8F1] min-h-screen font-sans text-[#4A0E0E]">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-serif italic text-[#801B1B]">
            Authentic Pinoy Kakanin Delicacies, 
            <span className="block not-italic font-bold">Made with Love ♡</span>
          </h1>
          <p className="text-lg text-gray-700">
            Enjoy your favorite Filipino rice delicacies. <br />
            Freshly made, traditionally loved.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#801B1B] text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-[#5E1414] transition">
              ORDER NOW 🛍️
            </button>
            <button className="border-2 border-[#801B1B] text-[#801B1B] px-6 py-3 rounded-md font-semibold hover:bg-[#801B1B] hover:text-white transition">
              BOOK RESERVATION 🗓️
            </button>
          </div>
        </div>
        
        {/* Main Image Plate */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-80 h-80 rounded-full border-8 border-yellow-800/20 overflow-hidden shadow-2xl">
             {/* Replace with your actual circular plate image */}
            <img src="/hero-kakanin-plate.jpg" alt="Kakanin Selection" className="object-cover w-full h-full" />
          </div>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-12 border-y border-gray-200 bg-white">
        {[
          { label: "WIDE SELECTION", desc: "Choose from a variety of traditional kakanin.", icon: "🛍️" },
          { label: "FRESH & QUALITY", desc: "Made with premium ingredients for the best taste.", icon: "✅" },
          { label: "EASY ORDERING", desc: "Walk-in or reservation ordering made simple.", icon: "🚚" },
          { label: "ORDER TRACKING", desc: "Track your orders in real-time with ease.", icon: "📦" },
        ].map((feature, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="text-3xl">{feature.icon}</div>
            <h3 className="font-bold text-sm uppercase tracking-wider">{feature.label}</h3>
            <p className="text-xs text-gray-500 px-4">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Best Sellers Section */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="italic text-[#801B1B] font-serif">Our Best Sellers 🌿</span>
            <h2 className="text-3xl font-bold">Favorite Kakanin</h2>
          </div>
          <button className="text-[#801B1B] font-bold border-b-2 border-[#801B1B]">VIEW ALL MENU</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="h-40 bg-gray-200 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-4 text-center space-y-2">
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-[#801B1B] font-semibold">{item.price}</p>
                <button className="w-full bg-[#801B1B] text-white py-2 rounded text-xs font-bold uppercase hover:bg-black transition">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="bg-[#2D2D2D] text-gray-300 py-10 px-8 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-widest">Store Hours</h5>
            <p>Mon - Sun</p>
            <p>8:00 AM - 8:00 PM</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-widest">Location</h5>
            <p>Poblacion, City of San Jose del Monte, Bulacan</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-widest">Contact Us</h5>
            <p>0923 456 7890</p>
            <p>clarasbest.kakanin@gmail.com</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-widest">Follow Us</h5>
            <p className="hover:text-white cursor-pointer">Facebook</p>
          </div>
        </div>
        <div className="text-center mt-10 border-t border-gray-700 pt-6">
          © 2025 Clara's Best Kakanin Delicacies. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
