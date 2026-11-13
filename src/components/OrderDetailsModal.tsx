import React from 'react';
import { X, Check, CheckCircle2, User, FileText, Calendar, Hash, Tag, ChefHat } from 'lucide-react';
import { Order } from '../types/order';
import { formatDate } from '../lib/utils';
import { StatusBadge } from './StatusBadge';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteOrder: (orderId: number) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onCompleteOrder,
}) => {
  if (!isOpen || !order) return null;

  const isCompleted = order.status === 'Tayyor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-modal border border-[#EEE8E1] overflow-hidden animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EEE8E1] bg-[#FAF8F5]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99A66]/15 text-[#70452F] flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-[#70452F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="details-title" className="text-lg font-bold text-[#29231F]">
                  Buyurtma tafsilotlari
                </h2>
                <span className="text-xs font-bold text-[#8D8178] px-2 py-0.5 rounded-full bg-[#EEE8E1]">
                  #{order.id}
                </span>
              </div>
              <p className="text-xs text-[#8D8178]">
                Barcha ma’lumotlar va buyurtma holati
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8D8178] hover:text-[#29231F] hover:bg-white transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status banner */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-[#EEE8E1] bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#8D8178]" />
              <span className="text-xs font-semibold text-[#8D8178] uppercase tracking-wider">
                Joriy holat:
              </span>
            </div>
            <StatusBadge status={order.status} size="lg" />
          </div>

          {/* Details List */}
          <div className="space-y-4 divide-y divide-[#EEE8E1]">
            {/* ID */}
            <div className="flex items-start justify-between pt-3 first:pt-0">
              <span className="text-xs font-medium text-[#8D8178] flex items-center gap-2">
                <Hash className="w-4 h-4 text-[#8D8178]" />
                Tartib raqami (ID):
              </span>
              <span className="text-sm font-bold text-[#29231F]">
                #{order.id}
              </span>
            </div>

            {/* Customer */}
            <div className="flex items-start justify-between pt-3">
              <span className="text-xs font-medium text-[#8D8178] flex items-center gap-2">
                <User className="w-4 h-4 text-[#8D8178]" />
                Mijoz:
              </span>
              <span className="text-sm font-semibold text-[#29231F] text-right">
                {order.customer}
              </span>
            </div>

            {/* Description */}
            <div className="pt-3">
              <span className="text-xs font-medium text-[#8D8178] flex items-center gap-2 mb-1.5">
                <FileText className="w-4 h-4 text-[#8D8178]" />
                Buyurtma tavsifi:
              </span>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EEE8E1] text-sm text-[#29231F] leading-relaxed">
                {order.description}
              </div>
            </div>

            {/* Delivery Date */}
            <div className="flex items-start justify-between pt-3">
              <span className="text-xs font-medium text-[#8D8178] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8D8178]" />
                Topshirish sanasi:
              </span>
              <span className="text-sm font-bold text-[#70452F] tracking-wide">
                {formatDate(order.deliveryDate)}
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-[#EEE8E1] flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#EEE8E1] text-sm font-medium text-[#8D8178] hover:text-[#29231F] hover:bg-[#FAF8F5] transition-colors"
            >
              Yopish
            </button>

            {isCompleted ? (
              <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold cursor-default">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Buyurtma tayyor</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onCompleteOrder(order.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Tayyor deb belgilash</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
