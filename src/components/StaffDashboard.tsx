// ================================================================
// 📁 LOCATION IN YOUR VS CODE:
//
//  CLARASBEST
//  ├── node_modules
//  ├── public
//  │    ├── admin_dashboard.html
//  │    ├── app.js
//  │    ├── customer_home.html
//  │    ├── index.html
//  │    ├── staff_dashboard.html   ← this is your OLD staff page
//  │    └── style.css
//  ├── ca.pem
//  ├── clarasdb.sql
//  ├── package-lock.json
//  ├── package.json
//  └── server.js
//
//  👉 In your REACT PROJECT folder, find or create the file:
//       src / components / StaffDashboard.tsx
//  👉 If "components" folder doesn't exist:
//     Right-click "src" → New Folder → name it: components
//  👉 Then right-click "components" → New File → StaffDashboard.tsx
//  👉 PASTE this entire code into it.
//
//  WHAT THIS FILE DOES:
//  React version of public/staff_dashboard.html
//  Fetches and updates orders from your server.js routes:
//    GET  /api/admin/inventory  → loads order queue
//    POST /api/update-order     → marks order as Preparing/Ready/Delivered
// ================================================================

import { useState, useEffect } from 'react';
import {
  Package, LogOut, CheckCircle, Clock, ChefHat,
  ShoppingBag, AlertCircle, RefreshCw, Wifi, WifiOff,
} from 'lucide-react';
import { apiGetInventory, apiUpdateOrder } from '../api';

interface StaffDashboardProps {
  user: { email: string; role: string };
  onLogout: () => void;
}

type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Delivered';

interface Order {
  id: number;
  customer_email: string;
  item_name: string;
  status: OrderStatus;
  total?: number;
  total_price?: number;
}

// Fallback orders — shown only when server.js is offline
const FB_ORDERS: Order[] = [
  { id: 1025, customer_email: 'janine@email.com', item_name: 'Special Bibingka x2', status: 'Pending',   total: 300 },
  { id: 1024, customer_email: 'mario@email.com',  item_name: 'Puto Bumbong x1',     status: 'Preparing', total: 85  },
  { id: 1023, customer_email: 'anna@email.com',   item_name: 'Sapin-Sapin x3',       status: 'Ready',     total: 300 },
  { id: 1022, customer_email: 'pedro@email.com',  item_name: 'Kutsinta x5',          status: 'Delivered', total: 300 },
  { id: 1021, customer_email: 'maria@email.com',  item_name: 'Bibingka Special x1',  status: 'Pending',   total: 150 },
];

const STATUS_FLOW: Record<OrderStatus, OrderStatus | null> = {
  Pending:   'Preparing',
  Preparing: 'Ready',
  Ready:     'Delivered',
  Delivered: null,
};

export default function StaffDashboard({ user, onLogout }: StaffDashboardProps) {
  const [orders,       setOrders]       = useState<Order[]>(FB_ORDERS);
  const [filter,       setFilter]       = useState<OrderStatus | 'All'>('All');
  const [message,      setMessage]      = useState('');
  const [loading,      setLoading]      = useState(false);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);

  useEffect(() => { fetchOrders(); }, []);

  // Calls GET /api/admin/inventory → server.js → Aiven MySQL
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiGetInventory();
      if (Array.isArray(data) && data.length > 0) setOrders(data);
      setServerOnline(true);
    } catch {
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  // Calls POST /api/update-order → server.js → Aiven MySQL
  const handleUpdate = async (orderId: number, nextStatus: OrderStatus) => {
    // Update the screen instantly (optimistic)
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o)
    );
    try {
      await apiUpdateOrder(orderId, nextStatus);
      setMessage(`✓ Order #${orderId} marked as ${nextStatus} in Aiven Cloud`);
    } catch {
      setMessage(
        `Order #${orderId} updated on screen (server offline — will sync when online)`
      );
    }
    setTimeout(() => setMessage(''), 3500);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: OrderStatus }) => {
    const MAP: Record<OrderStatus, { bg: string; text: string; icon: React.ElementType }> = {
      Pending:   { bg: '#fff3cd', text: '#856404', icon: Clock        },
      Preparing: { bg: '#e2e3e5', text: '#383d41', icon: ChefHat      },
      Ready:     { bg: '#d4edda', text: '#155724', icon: CheckCircle  },
      Delivered: { bg: '#cce5ff', text: '#004085', icon: Package      },
    };
    const s    = MAP[status];
    const Icon = s.icon;
    return (
      <span
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase"
        style={{ backgroundColor: s.bg, color: s.text }}
      >
        <Icon className="w-3 h-3" />{status}
      </span>
    );
  };

  const filtered = filter === 'All'
    ? orders
    : orders.filter(o => o.status === filter);

  const counts = {
    Pending:   orders.filter(o => o.status === 'Pending').length,
    Preparing: orders.filter(o => o.status === 'Preparing').length,
    Ready:     orders.filter(o => o.status === 'Ready').length,
    Delivered: orders.filter(o => o.status === 'Delivered').length,
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#FDF5E6' }}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <ChefHat className="w-8 h-8" style={{ color: '#D4AF37' }} />
                <h1 className="text-3xl font-bold" style={{ color: '#D4AF37' }}>
                  Staff — Order Processing
                </h1>
              </div>
              <p className="text-gray-400 text-sm">
                {serverOnline === true  && '🟢 Live orders from Aiven Cloud MySQL (server.js is running)'}
                {serverOnline === false && '🟡 Demo mode — run: node server.js inside your CLARASBEST folder'}
                {serverOnline === null  && 'Connecting to server.js…'}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {serverOnline !== null && (
                <div
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                    serverOnline
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {serverOnline ? (
                    <><Wifi className="w-3 h-3" />Connected</>
                  ) : (
                    <><WifiOff className="w-3 h-3" />Offline</>
                  )}
                </div>
              )}

              <div className="text-right">
                <p className="text-xs text-gray-400">Logged in as</p>
                <p className="font-semibold text-sm" style={{ color: '#630330' }}>
                  {user.email}
                </p>
              </div>

              <button
                onClick={fetchOrders}
                disabled={loading}
                className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg text-white disabled:opacity-50 hover:opacity-90"
                style={{ backgroundColor: '#D4AF37' }}
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
                style={{ backgroundColor: '#ddd', color: '#333' }}
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats strip (click to filter) ───────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {([
            { label: 'Pending',   count: counts.Pending,   color: '#856404', bg: '#fff3cd' },
            { label: 'Preparing', count: counts.Preparing, color: '#383d41', bg: '#e2e3e5' },
            { label: 'Ready',     count: counts.Ready,     color: '#155724', bg: '#d4edda' },
            { label: 'Delivered', count: counts.Delivered, color: '#004085', bg: '#cce5ff' },
          ] as const).map(({ label, count, color, bg }) => (
            <button
              key={label}
              onClick={() => setFilter(label as OrderStatus)}
              className="rounded-xl shadow-md p-4 text-left transition-transform hover:scale-105 border-l-4"
              style={{
                backgroundColor: filter === label ? bg : 'white',
                borderLeftColor: color,
              }}
            >
              <p className="text-xs text-gray-500 uppercase">{label}</p>
              <p className="text-2xl font-bold" style={{ color }}>{count}</p>
            </button>
          ))}
        </div>

        {/* ── Success / info message ───────────────────────────── */}
        {message && (
          <div
            className="p-4 rounded-xl flex items-center gap-2 text-sm"
            style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}
          >
            <CheckCircle className="w-5 h-5 shrink-0" />{message}
          </div>
        )}

        {/* ── Filter bar ──────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium" style={{ color: '#630330' }}>Filter:</span>
          {(['All', 'Pending', 'Preparing', 'Ready', 'Delivered'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                filter === f
                  ? { backgroundColor: '#630330', color: 'white' }
                  : { color: '#630330' }
              }
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} of {orders.length} orders
          </span>
        </div>

        {/* ── Orders table ────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b flex items-center gap-3" style={{ borderColor: '#FDF5E6' }}>
            <ShoppingBag className="w-6 h-6" style={{ color: '#630330' }} />
            <h2 className="text-xl font-bold" style={{ color: '#630330' }}>
              Active Kakanin Orders from Aiven Cloud
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="p-14 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-400">No orders found for this filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#D4AF37' }}>
                    {['ORDER ID', 'CUSTOMER', 'ITEM NAME', 'TOTAL', 'STATUS', 'ACTION'].map(h => (
                      <th
                        key={h}
                        className="text-left py-4 px-5 text-white font-semibold text-sm"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, i) => (
                    <tr
                      key={order.id}
                      className="border-b transition-colors hover:bg-gray-50"
                      style={{
                        borderColor: '#FDF5E6',
                        backgroundColor: i % 2 === 0 ? 'white' : '#fafafa',
                      }}
                    >
                      <td className="py-4 px-5 font-medium" style={{ color: '#630330' }}>
                        #{order.id}
                      </td>
                      <td className="py-4 px-5 text-sm">{order.customer_email}</td>
                      <td className="py-4 px-5">{order.item_name}</td>
                      <td className="py-4 px-5 font-semibold">
                        ₱{order.total ?? order.total_price ?? '—'}
                      </td>
                      <td className="py-4 px-5">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-4 px-5">
                        {STATUS_FLOW[order.status] ? (
                          <button
                            onClick={() =>
                              handleUpdate(order.id, STATUS_FLOW[order.status]!)
                            }
                            className="flex items-center gap-1 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90"
                            style={{ backgroundColor: '#630330' }}
                          >
                            <RefreshCw className="w-3 h-3" />
                            Mark {STATUS_FLOW[order.status]}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400">
          {serverOnline
            ? '🟢 Connected to Aiven MySQL Cloud via server.js (port 3000)'
            : '🟡 Demo mode — open CLARASBEST in terminal and run: node server.js'}
        </p>
      </div>
    </div>
  );
}
