import { useState } from 'react';
import { INITIAL_ORDERS } from './data/initialOrders';
import { Order } from './types/order';
import { Header } from './components/Header';
import { Sidebar, NavView } from './components/Sidebar';
import { StatisticsCards } from './components/StatisticsCards';
import { OrdersTable } from './components/OrdersTable';
import { OrderFormModal } from './components/OrderFormModal';
import { OrderDetailsModal } from './components/OrderDetailsModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export function App() {
  // Orders state initialized with exact required 3 sample orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Modals state
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Navigation & mobile drawer state
  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add new order handler
  const handleAddNewOrder = (newOrderData: Omit<Order, 'id' | 'status'>) => {
    // Generate unique ID strictly greater than any existing ID
    const nextId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;

    const newOrder: Order = {
      id: nextId,
      customer: newOrderData.customer,
      description: newOrderData.description,
      deliveryDate: newOrderData.deliveryDate,
      status: 'Yangi',
    };

    setOrders((prev) => [newOrder, ...prev]);
    addToast('Buyurtma muvaffaqiyatli qo‘shildi!', 'success');
  };

  // Complete order handler (Critical business logic)
  const handleCompleteOrder = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, status: 'Tayyor' as const };
        }
        return ord;
      })
    );

    // If modal is currently open for this order, update selectedOrder as well
    setSelectedOrder((prev) => {
      if (prev && prev.id === orderId) {
        return { ...prev, status: 'Tayyor' };
      }
      return prev;
    });

    addToast('Buyurtma tayyor deb belgilandi!', 'success');
  };

  // View details modal handler
  const handleSelectOrder = (order: Order) => {
    // Pick current up-to-date order from orders state by id
    const current = orders.find((o) => o.id === order.id) || order;
    setSelectedOrder(current);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-[#29231F]">
      {/* Sidebar (Desktop and Mobile) */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'orders') {
            const tableElem = document.getElementById('orders-section');
            if (tableElem) {
              tableElem.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Dashboard Statistics Overview */}
          <section aria-label="Boshqaruv paneli statistikasi">
            <StatisticsCards
              orders={orders}
              onNewOrderClick={() => setIsNewOrderModalOpen(true)}
            />
          </section>

          {/* Orders Management Table Section */}
          <section id="orders-section" aria-label="Buyurtmalar boshqaruvi">
            <OrdersTable
              orders={orders}
              onSelectOrder={handleSelectOrder}
              onCompleteOrder={handleCompleteOrder}
              onAddNewOrder={() => setIsNewOrderModalOpen(true)}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 px-4 sm:px-8 border-t border-[#EEE8E1] bg-white text-center text-xs text-[#8D8178]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-medium">
              © {new Date().getFullYear()} <span className="font-bold text-[#70452F]">SweetOrder</span> — Qandolatchi ustaning buyurtmalar daftari.
            </p>
            <p className="text-[11px]">
              Barcha huquqlar himoyalangan.
            </p>
          </div>
        </footer>
      </div>

      {/* New Order Modal */}
      <OrderFormModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onSubmit={handleAddNewOrder}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedOrder(null);
        }}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
