import React, { useState } from 'react';
import { X, User, FileText, Calendar, PlusCircle } from 'lucide-react';
import { Order } from '../types/order';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newOrder: Omit<Order, 'id' | 'status'>) => void;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const [errors, setErrors] = useState<{
    customer?: string;
    description?: string;
    deliveryDate?: string;
  }>({});

  if (!isOpen) return null;

  const validate = () => {
    const trimmedCustomer = customer.trim();
    const trimmedDescription = description.trim();
    const trimmedDeliveryDate = deliveryDate.trim();

    const newErrors: {
      customer?: string;
      description?: string;
      deliveryDate?: string;
    } = {};

    if (!trimmedCustomer) {
      newErrors.customer = 'Mijoz ismi kiritilishi shart';
    }

    if (!trimmedDescription) {
      newErrors.description = 'Buyurtma tavsifi kiritilishi shart';
    }

    if (!trimmedDeliveryDate) {
      newErrors.deliveryDate = 'Topshirish sanasi tanlanishi shart';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      customer: customer.trim(),
      description: description.trim(),
      deliveryDate: deliveryDate.trim(),
    });

    // Reset fields
    setCustomer('');
    setDescription('');
    setDeliveryDate('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-modal border border-[#EEE8E1] overflow-hidden animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EEE8E1] bg-[#FAF8F5]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#70452F]/10 text-[#70452F] flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-[#29231F]">
                Yangi buyurtma qo‘shish
              </h2>
              <p className="text-xs text-[#8D8178]">
                Barcha maydonlarni to‘ldirish majburiydir
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8D8178] hover:text-[#29231F] hover:bg-white transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 1. Mijoz ismi */}
          <div className="space-y-1.5">
            <label
              htmlFor="customer-name"
              className="block text-xs font-semibold text-[#29231F] uppercase tracking-wider"
            >
              Mijoz ismi <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8D8178]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="customer-name"
                type="text"
                value={customer}
                onChange={(e) => {
                  setCustomer(e.target.value);
                  if (errors.customer) {
                    setErrors((prev) => ({ ...prev, customer: undefined }));
                  }
                }}
                placeholder="Masalan: Sinovchi 04"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#29231F] placeholder-[#8D8178]/60 bg-white focus:outline-none focus:ring-2 focus:ring-[#70452F]/20 transition-all ${
                  errors.customer
                    ? 'border-rose-400 focus:border-rose-500 ring-rose-100'
                    : 'border-[#EEE8E1] focus:border-[#70452F]'
                }`}
              />
            </div>
            {errors.customer && (
              <p className="text-xs font-medium text-rose-600 mt-1 animate-fade-in">
                {errors.customer}
              </p>
            )}
          </div>

          {/* 2. Buyurtma tavsifi */}
          <div className="space-y-1.5">
            <label
              htmlFor="order-description"
              className="block text-xs font-semibold text-[#29231F] uppercase tracking-wider"
            >
              Buyurtma tavsifi <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 flex items-start pointer-events-none text-[#8D8178]">
                <FileText className="w-4 h-4" />
              </div>
              <textarea
                id="order-description"
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) {
                    setErrors((prev) => ({ ...prev, description: undefined }));
                  }
                }}
                placeholder="Masalan: 1 ta asal tort yoki 15 ta shokoladli kapkeyk"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#29231F] placeholder-[#8D8178]/60 bg-white focus:outline-none focus:ring-2 focus:ring-[#70452F]/20 resize-none transition-all ${
                  errors.description
                    ? 'border-rose-400 focus:border-rose-500 ring-rose-100'
                    : 'border-[#EEE8E1] focus:border-[#70452F]'
                }`}
              />
            </div>
            {errors.description && (
              <p className="text-xs font-medium text-rose-600 mt-1 animate-fade-in">
                {errors.description}
              </p>
            )}
          </div>

          {/* 3. Topshirish sanasi */}
          <div className="space-y-1.5">
            <label
              htmlFor="delivery-date"
              className="block text-xs font-semibold text-[#29231F] uppercase tracking-wider"
            >
              Topshirish sanasi <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8D8178]">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                id="delivery-date"
                type="date"
                value={deliveryDate}
                onChange={(e) => {
                  setDeliveryDate(e.target.value);
                  if (errors.deliveryDate) {
                    setErrors((prev) => ({ ...prev, deliveryDate: undefined }));
                  }
                }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#29231F] bg-white focus:outline-none focus:ring-2 focus:ring-[#70452F]/20 transition-all ${
                  errors.deliveryDate
                    ? 'border-rose-400 focus:border-rose-500 ring-rose-100'
                    : 'border-[#EEE8E1] focus:border-[#70452F]'
                }`}
              />
            </div>
            {errors.deliveryDate && (
              <p className="text-xs font-medium text-rose-600 mt-1 animate-fade-in">
                {errors.deliveryDate}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#EEE8E1]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-[#EEE8E1] text-sm font-medium text-[#8D8178] hover:text-[#29231F] hover:bg-[#FAF8F5] transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#70452F] text-white text-sm font-semibold hover:bg-[#5B3724] active:scale-[0.98] transition-all shadow-sm"
            >
              Qo‘shish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
