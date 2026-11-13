import React from 'react';
import { Menu, Plus, Calendar } from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenNewOrderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  onOpenNewOrderModal,
}) => {
  // Format current date in Uzbek style
  const today = new Date();
  const day = today.getDate();
  const monthsUz = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
  ];
  const daysUz = [
    'Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'
  ];
  const dateFormatted = `${daysUz[today.getDay()]}, ${day}-${monthsUz[today.getMonth()]}, ${today.getFullYear()}`;

  return (
    <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white/90 backdrop-blur-md border-b border-[#EEE8E1] px-4 sm:px-8 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[#8D8178] hover:text-[#29231F] hover:bg-[#FAF8F5] transition-colors"
          aria-label="Menyuni ochish"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title & Breadcrumb */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-xl font-extrabold text-[#29231F] tracking-tight">
              Buyurtmalar boshqaruvi
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#16865B] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Faol tizim
            </span>
          </div>
          <p className="hidden sm:flex items-center gap-1.5 text-xs text-[#8D8178] font-medium mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-[#D99A66]" />
            <span>{dateFormatted}</span>
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <button
          type="button"
          onClick={onOpenNewOrderModal}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#70452F] text-white text-xs sm:text-sm font-semibold hover:bg-[#5B3724] active:scale-[0.98] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Yangi buyurtma</span>
          <span className="sm:hidden">Qo‘shish</span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-[#EEE8E1] hidden sm:block" />

        {/* Baker Profile Avatar */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#70452F] to-[#D99A66] p-0.5 shadow-sm">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-extrabold text-xs sm:text-sm text-[#70452F]">
              NQ
            </div>
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs sm:text-sm font-bold text-[#29231F] block leading-tight">
              Nodira Qodirova
            </span>
            <span className="text-[11px] text-[#8D8178] block">
              Bosh qandolatchi
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
