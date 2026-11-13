import React from 'react';
import {
  Home,
  ShoppingBag,
  PlusCircle,
  Cake,
  ChefHat,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

export type NavView = 'dashboard' | 'orders';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenNewOrderModal: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenNewOrderModal,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavView,
      label: 'Bosh sahifa',
      icon: Home,
      action: () => {
        onNavigate('dashboard');
        onCloseMobile();
      },
    },
    {
      id: 'orders' as NavView,
      label: 'Buyurtmalar',
      icon: ShoppingBag,
      action: () => {
        onNavigate('orders');
        onCloseMobile();
      },
    },
    {
      id: 'new-order',
      label: 'Yangi buyurtma',
      icon: PlusCircle,
      action: () => {
        onCloseMobile();
        onOpenNewOrderModal();
      },
      isAction: true,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#EEE8E1]">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#EEE8E1] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#70452F] to-[#8D563C] text-white flex items-center justify-center shadow-md shadow-[#70452F]/15">
            <Cake className="w-6 h-6 text-[#FAF0E6]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-[#70452F]">
                Shirin Buyurtma
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D99A66]" />
            </div>
            <p className="text-[11px] font-medium text-[#8D8178] leading-tight">
              Qandolatchi ustaning buyurtmalar daftari
            </p>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-[#8D8178] hover:text-[#29231F] hover:bg-[#FAF8F5]"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#8D8178]">
          Asosiy menyu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150',
                isActive
                  ? 'bg-[#70452F] text-white shadow-sm'
                  : item.isAction
                  ? 'text-[#70452F] hover:bg-[#FAF0E6]/80 font-bold'
                  : 'text-[#29231F] hover:bg-[#FAF8F5] hover:text-[#70452F]'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-5 h-5',
                    isActive ? 'text-white' : item.isAction ? 'text-[#D99A66]' : 'text-[#8D8178]'
                  )}
                />
                <span>{item.label}</span>
              </div>
              {item.isAction && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#D99A66]/20 text-[#70452F]">
                  Tezkor
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bakery Card at Bottom */}
      <div className="p-4 border-t border-[#EEE8E1]">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#FAF0E6] border border-[#EEE8E1] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#70452F]">
            <ChefHat className="w-4 h-4 text-[#D99A66]" />
            <span>Qandolatchi maslahati</span>
          </div>
          <p className="text-xs text-[#8D8178] leading-relaxed">
            Mijozlar buyurtmalarini o‘z vaqtida topshirish va sifatini nazorat qilish uchun doim holatlarni yangilab turing.
          </p>
          <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-[#70452F]">
            <span>Shirin Buyurtma v1.0</span>
            <span className="text-emerald-700 font-bold">● Jonli</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative w-80 max-w-[85%] h-full z-10 animate-slide-in shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
