// ================================================================
// 📁 LOCATION IN YOUR VS CODE:
//
//  CLARASBEST
//  ├── node_modules
//  ├── public
//  │    ├── admin_dashboard.html
//  │    ├── app.js
//  │    ├── customer_home.html     ← this is your OLD customer page
//  │    ├── index.html
//  │    ├── staff_dashboard.html
//  │    └── style.css
//  ├── ca.pem
//  ├── clarasdb.sql
//  ├── package-lock.json
//  ├── package.json
//  └── server.js
//
//  👉 In your REACT PROJECT folder, find or create the file:
//       src / components / CustomerDashboard.tsx
//  👉 If "components" folder doesn't exist:
//     Right-click "src" → New Folder → name it: components
//  👉 Then right-click "components" → New File → CustomerDashboard.tsx
//  👉 PASTE this entire code into it.
//
//  WHAT THIS FILE DOES:
//  React version of public/customer_home.html
//  Fetches the customer's own orders from your server.js route:
//    GET /api/customer/orders?email=...
// ================================================================

import { useState, useEffect } from 'react';
import {
  LayoutDashboard, ShoppingBag, MessageSquare, User,
  LogOut, ChevronRight, Clock, Package, CheckCircle,
  Calendar, Wifi, WifiOff, RefreshCw,
} from 'lucide-react';
import { apiGetCustomerOrders } from '../api';

interface CustomerDashboardProps {
  user: { email: string; role: string };
  onLogout: () => void;
}

interface CustomerOrder {
  id: number;
  item_name: string;
  created_at: string;
  status: string;
  total_price: number;
}

// Fallback orders — shown only when server.js is offline
const FB_ORDERS: CustomerOrder[] = [
  { id: 1024, item_name: 'Special Bibingka x2', created_at: '2026-01-20', status: 'Preparing',        total_price: 300 },
  { id: 1015, item_name: 'Puto Bumbong x1',     created_at: '2026-01-18', status: 'Ready for Pickup', total_price: 85  },
  { id: 1010, item_name: 'Sapin-Sapin x3',       created_at: '2026-01-15', status: 'Delivered',        total_price: 300 },
];

const MENU_ITEMS = [
  { id: 1, name: 'Special Bibingka', price: 150, description: 'Rice cake with salted egg and cheese'       },
  { id: 2, name: 'Puto Bumbong',     price: 120, description: 'Purple sticky rice with coconut and sugar'  },
  { id: 3, name: 'Sapin-Sapin',      price: 100, description: 'Layered sticky rice cake'                   },
  { id: 4, name: 'Kutsinta',         price: 60,  description: 'Steamed rice cake with coconut flakes'      },
];

type ActiveSection = 'dashboard' | 'orders' | 'feedback' | 'profile';

export default function CustomerDashboard({ user, onLogout }: CustomerDashboardProps) {
  const [activeSection,   setActiveSection]   = useState<ActiveSection>('dashboard');
  const [myOrders,        setMyOrders]        = useState<CustomerOrder[]>(FB_ORDERS);
  const [serverOnline,    setServerOnline]    = useState<boolean | null>(null);
  const [loadingOrders,   setLoadingOrders]   = useState(false);

  // Place order form
  const [selectedItem,    setSelectedItem]    = useState(MENU_ITEMS[0].id);
  const [quantity,        setQuantity]        = useState(1);
  const [reservationDate, setReservationDate] = useState('');
  const [orderSuccess,    setOrderSuccess]    = useState('');

  // Feedback
  const [feedback,        setFeedback]        = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  useEffect(() => { loadOrders(); }, []);

  // Calls GET /api/customer/orders?email=... → server.js → Aiven MySQL
  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await apiGetCustomerOrders(user.email);
      if (Array.isArray(data) && data.length > 0) setMyOrders(data);
      setServerOnline(true);
    } catch {
      setServerOnline(false);
    } finally {
      setLoadingOrders(false);
    }
  };

  const selectedMenuItem = MENU_ITEMS.find(i => i.id === selectedItem);
  const totalPrice = (selectedMenuItem?.price || 0) * quantity;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess('Order placed successfully! Your kakanin will be ready soon.');
    setTimeout(() => {
      setOrderSuccess('');
      setQuantity(1);
      setReservationDate('');
    }, 4000);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSuccess('Thank you for your feedback!');
    setTimeout(() => { setFeedbackSuccess(''); setFeedback(''); }, 3000);
  };

  const getStatusBadge = (status: string) => {
    const MAP: Record<string, { bg: string; text: string }> = {
      'Pending':          { bg: '#fff3cd', text: '#856404' },
      'Approved':         { bg: '#d1ecf1', text: '#0c5460' },
      'Preparing':        { bg: '#e2e3e5', text: '#383d41' },
      'Ready for Pickup': { bg: '#d4edda', text: '#155724' },
      'Ready':            { bg: '#d4edda', text: '#155724' },
      'Delivered':        { bg: '#cce5ff', text: '#004085' },
    };
    const s = MAP[status] ?? { bg: '#eee', text: '#333' };
    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-bold uppercase"
        style={{ backgroundColor: s.bg, color: s.text }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF5E6' }}>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-5 flex-wrap">
            <h1 className="text-2xl font-bold" style={{ color: '#630330' }}>
              CLARA'S BEST
            </h1>

            {/* Server status */}
            {serverOnline !== null && (
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                  serverOnline
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {serverOnline ? (
                  <><Wifi className="w-3 h-3" />Aiven Cloud</>
                ) : (
                  <><WifiOff className="w-3 h-3" />Demo Mode</>
                )}
              </div>
            )}

            <div className="hidden md:flex items-center gap-3">
              {([
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'orders',    label: 'Orders',    icon: ShoppingBag     },
                { id: 'feedback',  label: 'Feedback',  icon: MessageSquare   },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all"
                  style={
                    activeSection === id
                      ? { color: '#630330', backgroundColor: '#FDF5E6' }
                      : { color: '#555' }
                  }
                >
                  <Icon className="w-4 h-4" />{label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection('profile')}
              className="flex items-center gap-2 font-semibold underline text-sm"
              style={{ color: '#630330' }}
            >
              <User className="w-4 h-4" />{user.email}
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold text-sm hover:opacity-90"
              style={{ backgroundColor: '#630330' }}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* ── DASHBOARD ─────────────────────────────────────────── */}
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div
                className="flex items-center justify-between mb-5 pb-4 border-b-2 flex-wrap gap-3"
                style={{ borderColor: '#FDF5E6' }}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6" style={{ color: '#630330' }} />
                  <h2 className="text-xl font-bold" style={{ color: '#630330' }}>
                    Order Monitoring
                  </h2>
                </div>
                <button
                  onClick={loadOrders}
                  disabled={loadingOrders}
                  className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg text-white disabled:opacity-50 hover:opacity-90"
                  style={{ backgroundColor: '#630330' }}
                >
                  <RefreshCw className={`w-3 h-3 ${loadingOrders ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              <div className="space-y-3">
                {myOrders.map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all"
                    style={{ borderColor: '#eee' }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="w-4 h-4" style={{ color: '#630330' }} />
                        <span className="font-bold" style={{ color: '#630330' }}>
                          Order #{order.id}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">
                        Res. Date:{' '}
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          month: 'long', day: 'numeric', year: 'numeric',
                        })}
                      </p>
                      <p className="text-sm font-medium">{order.item_name}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: '#D4AF37' }}>
                        Total: ₱{order.total_price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-center text-gray-400 mt-4">
                {serverOnline === true  && '🟢 Live data from Aiven MySQL Cloud (server.js)'}
                {serverOnline === false && '🟡 Demo mode — run: node server.js inside CLARASBEST folder'}
              </p>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <button
                onClick={() => setActiveSection('orders')}
                className="bg-white p-6 rounded-2xl shadow-lg text-left hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FDF5E6' }}>
                    <ShoppingBag className="w-6 h-6" style={{ color: '#630330' }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: '#630330' }}>
                    Place New Order
                  </h3>
                </div>
                <p className="text-sm text-gray-500">Reserve your favorite kakanin</p>
              </button>

              <button
                onClick={() => setActiveSection('feedback')}
                className="bg-white p-6 rounded-2xl shadow-lg text-left hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FDF5E6' }}>
                    <MessageSquare className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: '#630330' }}>
                    Send Feedback
                  </h3>
                </div>
                <p className="text-sm text-gray-500">Tell us how we did</p>
              </button>
            </div>
          </div>
        )}

        {/* ── PLACE ORDER ───────────────────────────────────────── */}
        {activeSection === 'orders' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <div
              className="flex items-center gap-3 mb-6 pb-4 border-b-2"
              style={{ borderColor: '#FDF5E6' }}
            >
              <ShoppingBag className="w-6 h-6" style={{ color: '#630330' }} />
              <h2 className="text-xl font-bold" style={{ color: '#630330' }}>
                Place Your Order
              </h2>
            </div>

            {orderSuccess && (
              <div
                className="mb-4 p-4 rounded-xl flex items-center gap-2 text-sm"
                style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}
              >
                <CheckCircle className="w-5 h-5 shrink-0" />{orderSuccess}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#630330' }}
                >
                  Select Kakanin:
                </label>
                <select
                  value={selectedItem}
                  onChange={e => setSelectedItem(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {MENU_ITEMS.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} (₱{item.price}) — {item.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#630330' }}
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#630330' }}
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Reservation Date:
                  </span>
                </label>
                <input
                  type="date"
                  value={reservationDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setReservationDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <div className="pt-4 border-t" style={{ borderColor: '#FDF5E6' }}>
                <div className="text-right mb-4">
                  <p className="text-sm text-gray-500">Total Amount:</p>
                  <p className="text-2xl font-bold" style={{ color: '#630330' }}>
                    ₱{totalPrice.toFixed(2)}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Submit Reservation
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── FEEDBACK ──────────────────────────────────────────── */}
        {activeSection === 'feedback' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <div
              className="flex items-center gap-3 mb-6 pb-4 border-b-2"
              style={{ borderColor: '#FDF5E6' }}
            >
              <MessageSquare className="w-6 h-6" style={{ color: '#630330' }} />
              <h2 className="text-xl font-bold" style={{ color: '#630330' }}>Feedback</h2>
            </div>

            {feedbackSuccess && (
              <div
                className="mb-4 p-4 rounded-xl flex items-center gap-2 text-sm"
                style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}
              >
                <CheckCircle className="w-5 h-5 shrink-0" />{feedbackSuccess}
              </div>
            )}

            <form onSubmit={handleSubmitFeedback} className="space-y-5">
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Tell us how we did with your kakanin experience…"
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#630330' }}
              >
                Send Feedback
              </button>
            </form>
          </div>
        )}

        {/* ── PROFILE ───────────────────────────────────────────── */}
        {activeSection === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <div
              className="flex items-center gap-3 mb-6 pb-4 border-b-2"
              style={{ borderColor: '#FDF5E6' }}
            >
              <User className="w-6 h-6" style={{ color: '#630330' }} />
              <h2 className="text-xl font-bold" style={{ color: '#630330' }}>
                Customer Information
              </h2>
            </div>

            <div className="space-y-5">
              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ backgroundColor: '#FDF5E6' }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: '#630330' }}
                >
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Logged in as</p>
                  <p className="text-xl font-bold" style={{ color: '#630330' }}>
                    {user.email}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold border"
                    style={{
                      backgroundColor: '#FDF5E6',
                      color: '#630330',
                      borderColor: '#630330',
                    }}
                  >
                    Customer
                  </span>
                </div>
              </div>

              <div className="p-4 border rounded-xl" style={{ borderColor: '#eee' }}>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="font-semibold" style={{ color: '#630330' }}>{user.email}</p>
              </div>
              <div className="p-4 border rounded-xl" style={{ borderColor: '#eee' }}>
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="font-semibold" style={{ color: '#630330' }}>09123456789</p>
              </div>
              <div className="p-4 border rounded-xl" style={{ borderColor: '#eee' }}>
                <p className="text-sm text-gray-400 mb-1">Default Address</p>
                <p className="font-semibold" style={{ color: '#630330' }}>
                  Hinunangan, Southern Leyte
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
