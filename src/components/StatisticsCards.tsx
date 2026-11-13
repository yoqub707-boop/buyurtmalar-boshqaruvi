import React from 'react';
import { Order } from '../types/order';
import { isToday } from '../lib/utils';
import { ShoppingBag, Clock, CheckCircle2, Calendar, Sparkles, ChefHat } from 'lucide-react';

interface StatisticsCardsProps {
  orders: Order[];
  onNewOrderClick: () => void;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ orders, onNewOrderClick }) => {
  // Dynamically calculate all numbers
  const totalOrders = orders.length;
  const newOrders = orders.filter((o) => o.status === 'Yangi').length;
  const readyOrders = orders.filter((o) => o.status === 'Tayyor').length;
  
  // Bugungi faol buyurtmalar (orders scheduled for today that are still active 'Yangi')
  // If no orders match exact today, we show orders scheduled for today or count active pending orders
  const todayActiveOrders = orders.filter((o) => isToday(o.deliveryDate) && o.status === 'Yangi').length;

  const cards = [
    {
      title: 'Jami buyurtmalar',
      value: totalOrders,
      subtitle: 'Barcha qayd etilganlar',
      icon: ShoppingBag,
      iconBg: 'bg-[#70452F]/10',
      iconColor: 'text-[#70452F]',
      badgeColor: 'bg-[#70452F]/10 text-[#70452F]',
      badgeText: 'Hammasi',
    },
    {
      title: 'Yangi buyurtmalar',
      value: newOrders,
      subtitle: 'Jarayondagi buyurtmalar',
      icon: Clock,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      badgeColor: 'bg-amber-100 text-amber-800',
      badgeText: 'Kutilmoqda',
    },
    {
      title: 'Tayyor buyurtmalar',
      value: readyOrders,
      subtitle: 'Muvaffaqiyatli yakunlangan',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      badgeText: 'Topshirishga tayyor',
    },
    {
      title: 'Bugungi faol buyurtmalar',
      value: todayActiveOrders,
      subtitle: 'Bugun topshirilishi kerak',
      icon: Calendar,
      iconBg: 'bg-[#D99A66]/15',
      iconColor: 'text-[#D99A66]',
      badgeColor: 'bg-[#FAF0E6] text-[#70452F]',
      badgeText: 'Bugun',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#70452F] via-[#85533A] to-[#A36A4C] p-6 sm:p-8 text-white shadow-card">
        {/* Decorative background bakery elements */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 w-32 h-32 rounded-full bg-[#D99A66]/20 blur-xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-[#FAF0E6] border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#D99A66]" />
              <span>Qandolatchi ustaxonasi paneli</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Xush kelibsiz!
            </h1>
            <p className="text-sm sm:text-base text-white/85 max-w-xl font-normal leading-relaxed">
              Buyurtmalaringizni bir joyda qulay boshqaring, holatlarni nazorat qiling va mijozlar talabini vaqtida bajaring.
            </p>
          </div>

          <button
            type="button"
            onClick={onNewOrderClick}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#70452F] font-semibold text-sm shadow-md hover:bg-[#FAF8F5] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            <ChefHat className="w-4 h-4 text-[#D99A66]" />
            <span>Yangi buyurtma qo‘shish</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-5 border border-[#EEE8E1] shadow-soft hover:shadow-card hover:border-[#D99A66]/40 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#8D8178] uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor} transition-transform group-hover:scale-110 duration-200`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-bold tracking-tight text-[#29231F]">
                  {card.value}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}
                >
                  {card.badgeText}
                </span>
              </div>

              <p className="mt-2 text-xs text-[#8D8178]">
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
