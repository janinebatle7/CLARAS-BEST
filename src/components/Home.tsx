import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-[#4A1D1F]">
      {/* Header matching photo_6060131342525075399_y_2.jpg */}
      <header className="bg-white border-b border-gray-100 py-4 px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Clara's Best Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[#801B1B] text-lg leading-tight uppercase">Clara's Best</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Kakanin Delicacies</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-gray-700">
            {['Home', 'Kakanin Menu', 'Order Now', 'Reservations', 'Track Order', 'About Us', 'Contact Us'].map((item) => (
              <button key={item} className="hover:text-[#801B1B] transition-colors relative border-b-2 border-transparent hover:border-[#801B1B] pb-1">
                {item}
              </button>
            ))}
          </nav>

          <button 
            onClick={() => navigate('/login')}
            className="bg-[#801B1B] text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#601414] transition-all"
          >
            <span className="text-sm">👤</span> Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#801B1B] leading-tight">
            Authentic Pinoy <br />
            Kakanin Delicacies, <br />
            <span className="italic font-serif font-normal text-[#D4A373]">Made with Love ♡</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Enjoy your favorite Filipino rice delicacies. Freshly made, traditionally loved.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#801B1B] text-white px-8 py-3 rounded-md font-bold text-sm flex items-center gap-2 shadow-lg">
              ORDER NOW 🛍️
            </button>
            <button className="bg-white border-2 border-[#801B1B] text-[#801B1B] px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2">
              BOOK RESERVATION 🗓️
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="rounded-full overflow-hidden border-[12px] border-[#FAF7F2] shadow-2xl">
            <img src="/hero-plate.jpg" alt="Kakanin Plate" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Feature Section matching photo_6060131342525075399_y_2.jpg */}
      <section className="bg-[#FDFBF7] py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "WIDE SELECTION", desc: "Choose from a variety of traditional kakanin.", icon: "🛍️" },
            { label: "FRESH & QUALITY", desc: "Made with premium ingredients for the best taste.", icon: "✅" },
            { label: "EASY ORDERING", desc: "Walk-in or reservation ordering made simple.", icon: "🚛" },
            { label: "ORDER TRACKING", desc: "Track your orders in real-time with ease.", icon: "📦" },
          ].map((f, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="text-4xl mb-4 opacity-80">{f.icon}</div>
              <h3 className="font-bold text-xs tracking-widest mb-2 text-[#801B1B]">{f.label}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-[180px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="italic text-[#D4A373] font-serif text-xl">Our Best Sellers 🌿</span>
            <h2 className="text-4xl font-serif font-bold text-[#801B1B] mt-1">Favorite Kakanin</h2>
          </div>
          <button className="text-xs font-bold border-b-2 border-[#801B1B] pb-1 uppercase tracking-widest">View All Menu</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((item, i) => (
            <div key={i} className="group">
              <div className="rounded-2xl overflow-hidden mb-4 shadow-md bg-white p-2">
                <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-xl" />
              </div>
              <div className="text-center space-y-1">
                <h4 className="font-bold text-sm text-[#4A1D1F]">{item.name}</h4>
                <p className="text-[#801B1B] font-bold text-xs">{item.price}</p>
                <button className="w-full mt-2 bg-[#801B1B] text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A1D1F] transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section matching photo_6060131342525075399_y_2.jpg */}
      <section className="bg-[#FAF7F2] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
             <div className="rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://thumbs.dreamstime.com/b/basket-philippine-rice-cakes-puto-filipino-steamed-rice-cakes-traditionally-made-slightly-fermented-rice-dough-194855057.jpg" alt="About Plate" className="w-full" />
             </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <span className="italic text-[#D4A373] font-serif text-xl">About Us</span>
            <h2 className="text-4xl font-serif font-bold text-[#801B1B]">A Tradition Worth Sharing ♡</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Clara's Best Kakanin Delicacies is dedicated to bringing you the rich and authentic flavors of Filipino kakanin. Each delicacy is carefully prepared using traditional recipes passed down through generations.
            </p>
            <button className="bg-[#801B1B] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest">
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer matching photo_6060131342525075399_y_2.jpg */}
      <footer className="bg-white border-t border-gray-100 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-[#4A1D1F]">
          <div className="flex gap-4">
            <span className="text-2xl">🕒</span>
            <div>
              <h5 className="font-bold text-[11px] uppercase tracking-widest mb-2">Store Hours</h5>
              <p className="text-[11px] text-gray-500">Mon - Sun<br/>8:00 AM - 8:00 PM</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <h5 className="font-bold text-[11px] uppercase tracking-widest mb-2">Location</h5>
              <p className="text-[11px] text-gray-500">Poblacion, City of<br/>San Jose del Monte, Bulacan</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">📞</span>
            <div>
              <h5 className="font-bold text-[11px] uppercase tracking-widest mb-2">Contact Us</h5>
              <p className="text-[11px] text-gray-500">0923 456 7890<br/>clarasbest.kakanin@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl text-blue-600">f</span>
            <div>
              <h5 className="font-bold text-[11px] uppercase tracking-widest mb-2">Follow Us</h5>
              <p className="text-[11px] text-gray-500">Follow us on Facebook<br/>for updates and promos!</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          © 2025 Clara's Best Kakanin Delicacies. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
