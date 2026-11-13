import React, { useState, useMemo } from 'react';
import { Order, OrderFilter } from '../types/order';
import { formatDate } from '../lib/utils';
import { StatusBadge } from './StatusBadge';
import {
  Search,
  X,
  Eye,
  Check,
  Calendar,
  ShoppingBag,
  Filter,
  Plus
} from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onCompleteOrder: (orderId: number) => void;
  onAddNewOrder: () => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onSelectOrder,
  onCompleteOrder,
  onAddNewOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<OrderFilter>('Barchasi');

  // Filter & Search logic operates on real data
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (selectedFilter !== 'Barchasi' && order.status !== selectedFilter) {
        return false;
      }

      // Search query filter (matches customer name or order description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesCustomer = order.customer.toLowerCase().includes(query);
        const matchesDescription = order.description.toLowerCase().includes(query);
        return matchesCustomer || matchesDescription;
      }

      return true;
    });
  }, [orders, selectedFilter, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedFilter !== 'Barchasi';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedFilter('Barchasi');
  };

  const counts = {
    all: orders.length,
    yangi: orders.filter((o) => o.status === 'Yangi').length,
    tayyor: orders.filter((o) => o.status === 'Tayyor').length,
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EEE8E1] shadow-soft overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 sm:p-6 border-b border-[#EEE8E1] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#29231F] flex items-center gap-2">
              <span>Buyurtmalar ro‘yxati</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#70452F] border border-[#EEE8E1]">
                {filteredOrders.length} ta
              </span>
            </h2>
            <p className="text-xs text-[#8D8178] mt-0.5">
              Barcha qandolatchilik buyurtmalarini ko‘rish, qidirish va boshqarish
            </p>
          </div>

          {/* New order shortcut */}
          <button
            type="button"
            onClick={onAddNewOrder}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#70452F] text-white text-xs sm:text-sm font-semibold hover:bg-[#5B3724] active:scale-[0.98] transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi buyurtma</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8D8178]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mijoz ismi yoki buyurtma bo‘yicha qidiring..."
              className="w-full pl-10 pr-9 py-2 text-sm rounded-xl border border-[#EEE8E1] text-[#29231F] placeholder-[#8D8178]/70 bg-[#FAF8F5]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#70452F]/20 focus:border-[#70452F] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8D8178] hover:text-[#29231F]"
                aria-label="Qidiruvni tozalash"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#EEE8E1]">
              <button
                type="button"
                onClick={() => setSelectedFilter('Barchasi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFilter === 'Barchasi'
                    ? 'bg-white text-[#70452F] shadow-sm'
                    : 'text-[#8D8178] hover:text-[#29231F]'
                }`}
              >
                Barchasi ({counts.all})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('Yangi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFilter === 'Yangi'
                    ? 'bg-white text-amber-700 shadow-sm'
                    : 'text-[#8D8178] hover:text-[#29231F]'
                }`}
              >
                Yangi ({counts.yangi})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('Tayyor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFilter === 'Tayyor'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-[#8D8178] hover:text-[#29231F]'
                }`}
              >
                Tayyor ({counts.tayyor})
              </button>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#EEE8E1] text-xs font-medium text-[#8D8178] hover:text-rose-600 hover:border-rose-200 transition-colors bg-white flex-shrink-0"
                title="Filtrlarni tozalash"
              >
                <Filter className="w-3 h-3" />
                <span>Tozalash</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Orders View */}
      {filteredOrders.length === 0 ? (
        /* Friendly Empty State */
        <div className="py-14 px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FAF0E6] flex items-center justify-center text-[#70452F]">
            <ShoppingBag className="w-8 h-8 text-[#D99A66]" />
          </div>
          <h3 className="text-base font-bold text-[#29231F]">
            {hasActiveFilters
              ? 'Mos keluvchi buyurtmalar topilmadi'
              : 'Hozircha hech qanday buyurtma yo‘q'}
          </h3>
          <p className="text-xs sm:text-sm text-[#8D8178] max-w-sm mx-auto mt-1 mb-5">
            {hasActiveFilters
              ? 'Qidiruv so‘zini yoki tanlangan holat filtrini o‘zgartirib ko‘ring.'
              : 'Yangi buyurtma qo‘shish tugmasini bosib birinchi buyurtmani ro‘yxatga oling.'}
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EEE8E1] text-xs font-semibold text-[#70452F] hover:bg-[#FAF8F5] transition-colors"
            >
              <span>Filtrlarni tozalash</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onAddNewOrder}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#70452F] text-white text-xs font-semibold hover:bg-[#5B3724] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Birinchi buyurtmani qo‘shish</span>
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop & Tablet Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EEE8E1] bg-[#FAF8F5]/80 text-[#8D8178] text-[11px] font-bold uppercase tracking-wider">
                  <th scope="col" className="py-3.5 px-6 w-16">
                    T/r
                  </th>
                  <th scope="col" className="py-3.5 px-6">
                    Mijoz
                  </th>
                  <th scope="col" className="py-3.5 px-6">
                    Buyurtma
                  </th>
                  <th scope="col" className="py-3.5 px-6">
                    Topshirish sanasi
                  </th>
                  <th scope="col" className="py-3.5 px-6">
                    Holati
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-right">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEE8E1] text-sm">
                {filteredOrders.map((order, index) => {
                  const isReady = order.status === 'Tayyor';
                  return (
                    <tr
                      key={order.id}
                      onClick={() => onSelectOrder(order)}
                      className="group hover:bg-[#FAF8F5]/70 cursor-pointer transition-colors duration-150"
                    >
                      {/* T/r */}
                      <td className="py-4 px-6 font-semibold text-[#8D8178] text-xs">
                        {index + 1}
                      </td>

                      {/* Mijoz */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FAF0E6] text-[#70452F] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                            {order.customer.slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-[#29231F] block group-hover:text-[#70452F] transition-colors">
                              {order.customer}
                            </span>
                            <span className="text-[11px] text-[#8D8178]">
                              ID: #{order.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Buyurtma */}
                      <td className="py-4 px-6 text-[#29231F] font-medium max-w-xs truncate">
                        {order.description}
                      </td>

                      {/* Topshirish sanasi */}
                      <td className="py-4 px-6 text-[#70452F] font-semibold whitespace-nowrap">
                        {formatDate(order.deliveryDate)}
                      </td>

                      {/* Holati */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>

                      {/* Amallar */}
                      <td
                        className="py-4 px-6 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="inline-flex items-center justify-end gap-2">
                          {/* Complete action if Yangi */}
                          {!isReady && (
                            <button
                              type="button"
                              onClick={() => onCompleteOrder(order.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200/80 text-xs font-semibold transition-all duration-150 shadow-sm"
                              title="Tayyor deb belgilash"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span className="hidden lg:inline">Tayyor</span>
                            </button>
                          )}

                          {/* Details action button */}
                          <button
                            type="button"
                            onClick={() => onSelectOrder(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EEE8E1] text-[#70452F] bg-white hover:bg-[#FAF8F5] text-xs font-semibold transition-all shadow-sm"
                            title="Tafsilotlarni ko‘rish"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#8D8178]" />
                            <span>Batafsil</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden divide-y divide-[#EEE8E1]">
            {filteredOrders.map((order, index) => {
              const isReady = order.status === 'Tayyor';
              return (
                <div
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  className="p-4 space-y-3 hover:bg-[#FAF8F5]/60 active:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#8D8178] px-2 py-0.5 rounded bg-[#FAF0E6]">
                        #{index + 1}
                      </span>
                      <span className="font-bold text-[#29231F] text-sm">
                        {order.customer}
                      </span>
                    </div>
                    <StatusBadge status={order.status} size="sm" />
                  </div>

                  <p className="text-sm text-[#29231F] font-medium leading-snug">
                    {order.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-1.5 text-[#70452F] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#D99A66]" />
                      <span>{formatDate(order.deliveryDate)}</span>
                    </div>

                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!isReady && (
                        <button
                          type="button"
                          onClick={() => onCompleteOrder(order.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Tayyor</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onSelectOrder(order)}
                        className="px-2.5 py-1 rounded-lg border border-[#EEE8E1] text-[#70452F] bg-white text-xs font-medium hover:bg-[#FAF8F5] transition-colors"
                      >
                        Batafsil
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
