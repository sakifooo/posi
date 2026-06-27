/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingCart, Star, Plus, Minus, Trash2, X, Sparkles, Send } from 'lucide-react';
import { Language, Book, CartItem } from '../types';
import { translations } from '../translations';

interface StoreProps {
  language: Language;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export default function Store({
  language,
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen,
}: StoreProps) {
  const t = translations[language].store;
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'SD' | 'SMP' | 'SMA'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(false);

  // Sample POSI Book Catalog
  const booksCatalog: Book[] = [
    {
      id: 'book-1',
      title: 'Kunci Emas OSN Matematika SD/MI',
      image: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      level: 'SD',
      subject: 'Matematika',
      price: 115000,
      originalPrice: 135000,
      rating: 4.9,
      reviewsCount: 142,
      isBestSeller: true,
    },
    {
      id: 'book-2',
      title: 'Diktat Lengkap Olimpiade IPA SD',
      image: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
      level: 'SD',
      subject: 'IPA',
      price: 120000,
      originalPrice: 140000,
      rating: 4.8,
      reviewsCount: 98,
    },
    {
      id: 'book-3',
      title: 'Kunci Emas OSN Matematika SMP',
      image: 'linear-gradient(135deg, #7c2d12 0%, #f97316 100%)',
      level: 'SMP',
      subject: 'Matematika',
      price: 135000,
      originalPrice: 160000,
      rating: 4.9,
      reviewsCount: 215,
      isBestSeller: true,
    },
    {
      id: 'book-4',
      title: 'Kupas Tuntas OSN IPS SMP',
      image: 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)',
      level: 'SMP',
      subject: 'IPS',
      price: 125000,
      originalPrice: 150000,
      rating: 4.7,
      reviewsCount: 84,
    },
    {
      id: 'book-5',
      title: 'Masterbook OSN Fisika SMA/MA',
      image: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
      level: 'SMA',
      subject: 'Fisika',
      price: 165000,
      originalPrice: 195000,
      rating: 5.0,
      reviewsCount: 312,
      isBestSeller: true,
    },
    {
      id: 'book-6',
      title: 'Masterbook OSN Kimia SMA/MA',
      image: 'linear-gradient(135deg, #881337 0%, #f43f5e 100%)',
      level: 'SMA',
      subject: 'Kimia',
      price: 155000,
      originalPrice: 185000,
      rating: 4.9,
      reviewsCount: 176,
    },
    {
      id: 'book-7',
      title: 'Panduan Praktis OSN Biologi SMA',
      image: 'linear-gradient(135deg, #14532d 0%, #22c55e 100%)',
      level: 'SMA',
      subject: 'Biologi',
      price: 160000,
      originalPrice: 190000,
      rating: 4.8,
      reviewsCount: 154,
    },
  ];

  const filteredBooks = booksCatalog.filter((bk) => {
    const matchesLevel = selectedLevel === 'All' || bk.level === selectedLevel;
    const matchesSearch =
      bk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bk.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.id === book.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (bookId: string, amount: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const discountAmount = promoDiscount ? subtotal * 0.15 : 0;
  const deliveryFee = subtotal > 0 ? 15000 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'OSN2026') {
      setPromoDiscount(true);
    } else {
      alert(language === 'id' ? 'Kode promo tidak valid!' : 'Invalid promo code!');
    }
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    
    // Build a stylized WhatsApp Message
    let message = language === 'id' 
      ? `Halo Admin POSI Store, saya ingin memesan buku berikut:\n\n`
      : `Hello POSI Store Admin, I would like to order the following books:\n\n`;
    
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.book.title}* (${item.book.level}) - ${item.quantity}x\n`;
    });

    message += `\n*Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}`;
    if (promoDiscount) {
      message += `\n*Diskon (15%):* -Rp ${discountAmount.toLocaleString('id-ID')}`;
    }
    message += `\n*Ongkos Kirim:* Rp ${deliveryFee.toLocaleString('id-ID')}`;
    message += `\n*Total Tagihan:* *Rp ${total.toLocaleString('id-ID')}*\n\n`;
    message += language === 'id' 
      ? `Mohon infokan detail nomor rekening untuk pembayaran. Terima kasih!` 
      : `Please send payment account details. Thank you!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
            {language === 'id' ? 'Toko Buku Resmi POSI' : 'POSI Bookstore'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-500 text-sm">
            {t.subtitle}
          </p>
        </div>

        {/* Catalog Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['All', 'SD', 'SMP', 'SMA'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedLevel === lvl
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                }`}
              >
                {lvl === 'All' ? t.filterAll : lvl === 'SD' ? t.filterSD : lvl === 'SMP' ? t.filterSMP : t.filterSMA}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-blue-500 focus:shadow-md transition-all"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-slate-50 rounded-3xl p-5 border border-slate-100 hover:bg-white hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Book Cover Graphic (Realistic CSS gradient cover) */}
                <div
                  style={{ background: book.image }}
                  className="w-full h-56 rounded-2xl shadow-md p-4 flex flex-col justify-between text-white relative overflow-hidden mb-5 group"
                >
                  {/* Embossed shiny ribbon */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold bg-white/25 border border-white/20 px-2 py-0.5 rounded uppercase tracking-wide">
                      {book.level}
                    </span>
                    {book.isBestSeller && (
                      <span className="text-[9px] font-black bg-amber-400 text-slate-900 px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                        {t.bestSeller}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 z-10">
                    <p className="text-[9px] font-semibold text-amber-300 uppercase tracking-widest">{book.subject}</p>
                    <h4 className="text-sm font-black tracking-tight leading-snug text-white line-clamp-3">
                      {book.title}
                    </h4>
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-slate-200 border-t border-white/10 pt-2 z-10">
                    <span>POSI ACADEMIC</span>
                    <span className="font-bold">EDISI 2026</span>
                  </div>
                </div>

                {/* Rating & reviews */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(book.rating) ? 'fill-amber-400' : ''}`} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{book.rating}</span>
                  <span className="text-[10px] text-slate-400">({book.reviewsCount})</span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 mb-3 line-clamp-2 min-h-[40px]">
                  {book.title}
                </h3>
              </div>

              {/* Price & Cart CTA */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-blue-800">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(book.price)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(book.originalPrice)}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <button
                    onClick={() => addToCart(book)}
                    className="col-span-4 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t.addToCart}</span>
                  </button>

                  <button
                    onClick={() => {
                      // Instantly direct order book via WhatsApp
                      const waText = language === 'id' 
                        ? `Halo POSI Store, saya tertarik membeli buku: *${book.title}* seharga Rp ${book.price.toLocaleString('id-ID')}. Mohon infokan kelanjutan order.`
                        : `Hello POSI Store, I want to purchase book: *${book.title}* at price Rp ${book.price.toLocaleString('id-ID')}. How to proceed?`;
                      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(waText)}`, '_blank');
                    }}
                    title={t.buyNow}
                    className="col-span-1 flex items-center justify-center bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 border border-slate-200 rounded-xl transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart Sliding Drawer Overlay */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
            
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slideLeft">
                
                {/* Cart Header */}
                <div className="p-6 bg-blue-900 text-white flex justify-between items-center shadow-md">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-black tracking-tight">{t.cartTitle}</h3>
                    <span className="bg-amber-400 text-blue-950 font-bold px-2 py-0.5 rounded-full text-xs">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                      <div className="p-4 bg-slate-100 rounded-full">
                        <ShoppingCart className="w-10 h-10 text-slate-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-500">{t.emptyCart}</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.book.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        {/* Book thumbnail cover representation */}
                        <div
                          style={{ background: item.book.image }}
                          className="w-16 h-20 rounded-lg flex flex-col justify-between p-2 text-white shrink-0"
                        >
                          <span className="text-[7px] font-bold bg-white/20 px-1 rounded uppercase w-fit">{item.book.level}</span>
                          <span className="text-[7px] font-black line-clamp-2">{item.book.subject}</span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-black text-slate-800 line-clamp-2 leading-tight">
                              {item.book.title}
                            </h4>
                            <p className="text-xs font-extrabold text-blue-700 mt-1">
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.book.price)}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.book.id, -1)}
                                className="p-1 hover:bg-slate-50 text-slate-600"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.book.id, 1)}
                                className="p-1 hover:bg-slate-50 text-slate-600"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.book.id)}
                              className="text-slate-400 hover:text-red-500 p-1"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Cart Checkout Summary Panel */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                    
                    {/* Promo coupon inputs */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={t.promoPlaceholder}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoDiscount}
                        className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoDiscount}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-lg transition-all"
                      >
                        {t.applyPromo}
                      </button>
                    </div>

                    {promoDiscount && (
                      <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-emerald-600" />
                        <span>{t.promoApplied}</span>
                      </p>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-slate-500">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-700">Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      
                      {promoDiscount && (
                        <div className="flex justify-between text-emerald-600">
                          <span>{language === 'id' ? 'Diskon (15%)' : 'Discount (15%)'}</span>
                          <span className="font-bold">-Rp {discountAmount.toLocaleString('id-ID')}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>{language === 'id' ? 'Estimasi Ongkir' : 'Estimated Delivery'}</span>
                        <span className="font-bold text-slate-700">Rp {deliveryFee.toLocaleString('id-ID')}</span>
                      </div>

                      <div className="flex justify-between text-sm text-slate-900 font-extrabold pt-2 border-t border-slate-200">
                        <span>Total Tagihan</span>
                        <span className="text-blue-900">Rp {total.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    {/* Submit Order Link to WhatsApp */}
                    <button
                      onClick={handleCheckoutWhatsApp}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-blue-950 font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{t.checkout}</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
