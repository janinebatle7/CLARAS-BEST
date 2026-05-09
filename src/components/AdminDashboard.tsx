// ================================================================
// 📁 LOCATION IN YOUR VS CODE:
//
//  CLARASBEST
//  ├── node_modules
//  ├── public
//  │    ├── admin_dashboard.html   ← this is your OLD admin page
//  │    ├── app.js
//  │    ├── customer_home.html
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
//       src / components / AdminDashboard.tsx
//  👉 If "components" folder doesn't exist:
//     Right-click "src" → New Folder → name it: components
//  👉 Then right-click "components" → New File → AdminDashboard.tsx
//  👉 PASTE this entire code into it.
//
//  WHAT THIS FILE DOES:
//  React version of public/admin_dashboard.html
//  Fetches live data from your server.js routes:
//    GET  /api/admin/stats
//    GET  /api/admin/staff
//    GET  /api/admin/sales
//    GET  /api/admin/inventory
// ================================================================

import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, FileText, Package, Settings,
  LogOut, Plus, TrendingUp, DollarSign, UserCheck, Printer,
  Wifi, WifiOff, RefreshCw,
} from 'lucide-react';
import { apiGetStats, apiGetStaff, apiGetSales, apiGetInventory } from '../api';

interface AdminDashboardProps {
  user: { email: string; role: string };
  onLogout: () => void;
}

// Fallback data — shown only when server.js is offline
const FB_STATS = {
  totalSales: 45850,
  totalUsers: 24,
  activeDeliveries: 8,
  stockVolume: 156,
};
const FB_USERS = [
  { id: 1, email: 'janine@email.com',     role: 'Customer' },
  { id: 2, email: 'mario@email.com',      role: 'Customer' },
  { id: 3, email: 'staff@clarasbest.com', role: 'Staff'    },
  { id: 4, email: 'admin@clarasbest.com', role: 'Admin'    },
];
const FB_SALES = [
  { id: 1025, item_name: 'Bibingka Special', customer_email: 'janine@email.com', total_price: 300, status: 'Delivered' },
  { id: 1024, item_name: 'Puto Bumbong',     customer_email: 'mario@email.com',  total_price: 170, status: 'Delivered' },
  { id: 1023, item_name: 'Sapin-Sapin',      customer_email: 'anna@email.com',   total_price: 200, status: 'Preparing' },
  { id: 1022, item_name: 'Kutsinta',         customer_email: 'pedro@email.com',  total_price: 120, status: 'Delivered' },
];
const FB_INVENTORY = [
  { id: 1, name: 'Bibingka Special', stock: 45, price: 150 },
  { id: 2, name: 'Puto Bumbong',     stock: 32, price: 85  },
  { id: 3, name: 'Sapin-Sapin',      stock: 28, price: 100 },
  { id: 4, name: 'Kutsinta',         stock: 51, price: 60  },
];

type ActiveView = 'dashboard' | 'users' | 'reports' | 'inventory' | 'settings';

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView,   setActiveView]   = useState<ActiveView>('dashboard');
  const [stats,        setStats]        = useState(FB_STATS);
  const [userList,     setUserList]     = useState(FB_USERS);
  const [sales,        setSales]        = useState(FB_SALES);
  const [inventory,    setInventory]    = useState(FB_INVENTORY);
  const [loading,      setLoading]      = useState(false);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);
  const [currentDate,  setCurrentDate]  = useState('');

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    );
    fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch live data from your server.js
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, u, sa, inv] = await Promise.all([
        apiGetStats(),      // GET /api/admin/stats
        apiGetStaff(),      // GET /api/admin/staff
        apiGetSales(),      // GET /api/admin/sales
        apiGetInventory(),  // GET /api/admin/inventory
      ]);
      if (s)         setStats(s);
      if (u?.length) setUserList(u);
      if (sa?.length) setSales(sa);
      if (inv?.length) {
        setInventory(
          inv.map((o: { id: number; item_name: string; quantity?: number; price?: number }) => ({
            id:    o.id,
            name:  o.item_name,
            stock: o.quantity ?? 0,
            price: o.price    ?? 0,
          }))
        );
      }
      setServerOnline(true);
    } catch {
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  const addStock = (id: number) =>
    setInventory(prev =>
      prev.map(item => item.id === id ? { ...item, stock: item.stock + 10 } : item)
    );

  // ── SIDEBAR ───────────────────────────────────────────────────
  const Sidebar = () => (
    <div className="w-64 fixed h-full flex flex-col" style={{ backgroundColor: '#630330' }}>
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">CLARA'S BEST</h2>
        <p className="text-xs text-white/40 mt-1">Admin Panel</p>
        {serverOnline !== null && (
          <div
            className={`flex items-center gap-1 mt-2 text-xs font-semibold ${
              serverOnline ? 'text-green-300' : 'text-yellow-300'
            }`}
          >
            {serverOnline ? (
              <><Wifi className="w-3 h-3" /> Aiven Cloud</>
            ) : (
              <><WifiOff className="w-3 h-3" /> Demo Mode</>
            )}
          </div>
        )}
      </div>

      <nav className="flex-1 py-4">
        {([
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'users',     label: 'Users',     icon: Users            },
          { id: 'reports',   label: 'Reports',   icon: FileText         },
          { id: 'inventory', label: 'Inventory', icon: Package          },
          { id: 'settings',  label: 'Settings',  icon: Settings         },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all border-l-4 ${
              activeView === id
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:bg-white/5 hover:text-white border-transparent'
            }`}
            style={activeView === id ? { borderLeftColor: '#D4AF37' } : {}}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-6 py-3 text-xs text-white/40 border-t border-white/10 truncate">
        {user.email}
      </div>
      <button
        onClick={onLogout}
        className="px-6 py-4 flex items-center gap-2 font-bold hover:text-white transition-colors"
        style={{ color: '#D4AF37' }}
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </div>
  );

  // ── DASHBOARD VIEW ────────────────────────────────────────────
  const ViewDashboard = () => (
    <div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
        <h1 className="text-3xl font-bold" style={{ color: '#630330' }}>Admin Panel</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">{currentDate}</span>
          <button
            onClick={fetchAll}
            disabled={loading}
            className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg text-white disabled:opacity-50 hover:opacity-90"
            style={{ backgroundColor: '#630330' }}
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<DollarSign className="w-6 h-6" style={{ color: '#630330' }} />}
          label="Total Automated Sales"
          value={`₱${Number(stats.totalSales).toLocaleString()}`}
          accent="#630330"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" style={{ color: '#D4AF37' }} />}
          label="Active Deliveries"
          value={String(stats.activeDeliveries ?? 0)}
          accent="#D4AF37"
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6" style={{ color: '#630330' }} />}
          label="Registered Users"
          value={String(stats.totalUsers ?? 0)}
          accent="#630330"
        />
      </div>

      {/* Inventory preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4" style={{ color: '#630330' }}>
          Inventory Management
        </h3>
        <TableWrap>
          <thead>
            <tr>
              {['ITEM NAME', 'STOCK', 'PRICE', 'ACTION'].map(h => (
                <th
                  key={h}
                  className="text-left py-3 px-3 font-semibold text-sm border-b-2"
                  style={{ color: '#630330', borderColor: '#FDF5E6' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <TRow key={item.id}>
                <td className="py-4 px-3">{item.name}</td>
                <td className="py-4 px-3">{item.stock} units</td>
                <td className="py-4 px-3">₱{Number(item.price).toFixed(2)}</td>
                <td className="py-4 px-3">
                  <OutlineBtn onClick={() => addStock(item.id)}>
                    <Plus className="w-3 h-3 inline mr-1" />+10 Stock
                  </OutlineBtn>
                </td>
              </TRow>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );

  // ── USERS VIEW ────────────────────────────────────────────────
  const ViewUsers = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#630330' }}>
        Registered Users
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <TableWrap>
          <thead>
            <tr>
              {['ID', 'EMAIL', 'ROLE'].map(h => (
                <th
                  key={h}
                  className="text-left py-3 px-3 font-semibold text-sm border-b-2"
                  style={{ color: '#630330', borderColor: '#FDF5E6' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userList.map(u => (
              <TRow key={u.id}>
                <td className="py-4 px-3">#{u.id}</td>
                <td className="py-4 px-3">{u.email}</td>
                <td className="py-4 px-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      backgroundColor: '#FDF5E6',
                      color: '#630330',
                      borderColor: '#630330',
                    }}
                  >
                    {u.role}
                  </span>
                </td>
              </TRow>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );

  // ── REPORTS VIEW ──────────────────────────────────────────────
  const ViewReports = () => (
    <div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold" style={{ color: '#630330' }}>
          Business Reports
        </h1>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90"
          style={{ backgroundColor: '#630330' }}
        >
          <Printer className="w-4 h-4" /> Print Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          icon={<Package className="w-6 h-6" style={{ color: '#630330' }} />}
          label="Current Stock Volume"
          value={String(stats.stockVolume ?? inventory.reduce((a, i) => a + i.stock, 0))}
          accent="#630330"
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6" style={{ color: '#D4AF37' }} />}
          label="Active Accounts"
          value={String(stats.totalUsers ?? 0)}
          accent="#D4AF37"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-1" style={{ color: '#630330' }}>
          Inventory Valuation Summary
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {serverOnline
            ? '🟢 Live data from Aiven Cloud MySQL (server.js)'
            : '🟡 Demo data — run: node server.js in CLARASBEST folder'}
        </p>
        <TableWrap>
          <thead>
            <tr>
              {['ORDER ID', 'ITEM NAME', 'TOTAL', 'STATUS'].map(h => (
                <th
                  key={h}
                  className="text-left py-3 px-3 font-semibold text-sm border-b-2"
                  style={{ color: '#630330', borderColor: '#FDF5E6' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <TRow key={s.id}>
                <td className="py-4 px-3">#{s.id}</td>
                <td className="py-4 px-3">{s.item_name}</td>
                <td className="py-4 px-3">₱{s.total_price}</td>
                <td className="py-4 px-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      s.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </TRow>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );

  // ── INVENTORY VIEW ────────────────────────────────────────────
  const ViewInventory = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#630330' }}>
        Full Inventory
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <TableWrap>
          <thead>
            <tr>
              {['ID', 'ITEM NAME', 'STOCK LEVEL', 'PRICE', 'ACTION'].map(h => (
                <th
                  key={h}
                  className="text-left py-3 px-3 font-semibold text-sm border-b-2"
                  style={{ color: '#630330', borderColor: '#FDF5E6' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <TRow key={item.id}>
                <td className="py-4 px-3">#{item.id}</td>
                <td className="py-4 px-3 font-medium">{item.name}</td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min((item.stock / 60) * 100, 100)}%`,
                          backgroundColor: item.stock < 20 ? '#dc2626' : '#630330',
                        }}
                      />
                    </div>
                    <span className="text-sm">{item.stock}</span>
                  </div>
                </td>
                <td className="py-4 px-3">₱{Number(item.price).toFixed(2)}</td>
                <td className="py-4 px-3">
                  <button
                    onClick={() => addStock(item.id)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-white text-sm hover:opacity-90"
                    style={{ backgroundColor: '#D4AF37' }}
                  >
                    <Plus className="w-4 h-4" /> Add Stock
                  </button>
                </td>
              </TRow>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );

  // ── SETTINGS VIEW ─────────────────────────────────────────────
  const ViewSettings = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#630330' }}>Settings</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl">
        <h3 className="text-lg font-bold mb-4" style={{ color: '#630330' }}>
          System Configuration
        </h3>

        {/* DB info panel */}
        <div
          className="mb-6 p-4 rounded-xl border text-sm space-y-1"
          style={{ borderColor: '#FDF5E6', backgroundColor: '#FDF5E6' }}
        >
          <p className="font-semibold" style={{ color: '#630330' }}>
            Aiven MySQL Connection (from your server.js)
          </p>
          <p className="text-gray-500">
            Host:{' '}
            <code className="text-xs">
              mysql-38880adb-janine-batle10.e.aivencloud.com:12590
            </code>
          </p>
          <p className="text-gray-500">
            DB: <code className="text-xs">defaultdb</code>
          </p>
          <p className="text-gray-500">
            SSL: <code className="text-xs">ca.pem</code> (in your CLARASBEST folder)
          </p>
          <div
            className={`mt-2 flex items-center gap-2 text-xs font-semibold ${
              serverOnline ? 'text-green-600' : 'text-yellow-600'
            }`}
          >
            {serverOnline ? (
              <><Wifi className="w-3 h-3" /> Connected — server.js is running</>
            ) : (
              <><WifiOff className="w-3 h-3" /> Offline — run: node server.js in CLARASBEST</>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <ToggleRow
            label="Email Notifications"
            sub="Receive alerts for new orders"
            on={true}
          />
          <ToggleRow
            label="Auto-Print Reports"
            sub="Print daily reports automatically"
            on={false}
          />
          <div className="pt-4">
            <button
              className="px-6 py-2 rounded-lg text-white hover:opacity-90"
              style={{ backgroundColor: '#630330' }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const views: Record<ActiveView, React.ReactNode> = {
    dashboard: <ViewDashboard />,
    users:     <ViewUsers />,
    reports:   <ViewReports />,
    inventory: <ViewInventory />,
    settings:  <ViewSettings />,
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FDF5E6' }}>
      <Sidebar />
      <div className="ml-64 flex-1 p-8">{views[activeView]}</div>
    </div>
  );
}

// ── Reusable mini-components ──────────────────────────────────
function StatCard({
  icon, label, value, accent,
}: {
  icon: React.ReactNode; label: string; value: string; accent: string;
}) {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border-t-4 flex items-center justify-between"
      style={{ borderTopColor: accent }}
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold" style={{ color: '#630330' }}>{value}</p>
      </div>
      <div className="p-3 rounded-lg" style={{ backgroundColor: '#FDF5E6' }}>{icon}</div>
    </div>
  );
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">{children}</table>
    </div>
  );
}

function TRow({ children }: { children: React.ReactNode }) {
  return (
    <tr
      className="border-b hover:bg-gray-50 transition-colors"
      style={{ borderColor: '#FDF5E6' }}
    >
      {children}
    </tr>
  );
}

function OutlineBtn({
  onClick, children,
}: {
  onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded text-sm border transition-all hover:text-white hover:bg-[#630330]"
      style={{ borderColor: '#630330', color: '#630330' }}
    >
      {children}
    </button>
  );
}

function ToggleRow({
  label, sub, on,
}: {
  label: string; sub: string; on: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between p-4 border rounded-xl"
      style={{ borderColor: '#eee' }}
    >
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
      <div
        className="w-12 h-6 rounded-full relative cursor-pointer"
        style={{ backgroundColor: on ? '#630330' : '#d1d5db' }}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
            on ? 'right-1' : 'left-1'
          }`}
        />
      </div>
    </div>
  );
}
