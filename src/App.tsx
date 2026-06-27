/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';

import { Language, CartItem } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Events from './components/Events';
import CBTSystem from './components/CBTSystem';
import Blog from './components/Blog';
import Footer from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('id');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Dynamic Head SEO Tag Modifier when language or page changes
  useEffect(() => {
    const titleText = language === 'id' 
      ? 'POSI - Pusat Olimpiade Sains Indonesia | Platform Kompetisi & Pelatihan No. 1'
      : 'POSI - Center of Indonesian Science Olympiads | No. 1 Competition Platform';
    document.title = titleText;
  }, [language]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 selection:bg-amber-400 selection:text-blue-950">
      
      {/* Navigation Header bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main router rendering area */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <div className="space-y-0">
            <Hero language={language} onNavigate={setCurrentTab} />
            <Programs language={language} onNavigate={setCurrentTab} />
            
            {/* Live Events Highlight segment */}
            <div className="bg-slate-50 border-t border-slate-100">
              <Events language={language} />
            </div>

            {/* Testimonials success stories slider segment */}
            <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-950 to-blue-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="text-xs font-bold text-amber-300 tracking-widest uppercase">
                    {language === 'id' ? 'Kisah Sukses Juara' : 'Our Champions Stories'}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    {language === 'id' ? 'Testimoni Alumni POSI' : 'POSI Alumni Success Stories'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                    <p className="text-slate-200 text-sm leading-relaxed italic mb-6">
                      {language === 'id' 
                        ? '"Materi bimbingan dan pembahasan soal di buku POSI sangat akurat dengan kisi-kisi OSN Kabupaten hingga Provinsi. Kunci pembahasan taktisnya mempermudah saya memahami soal-soal tingkat lanjut. Puncaknya saya berhasil membawa pulang Medali Emas OSN Astronomi SMA!"'
                        : '"The practice materials and guidebooks from POSI are incredibly accurate for local and provincial levels. The shortcut formulas simplified hard astronomical concepts. Thanks to POSI, I won Gold Medal in National Astronomy Olympiad!"'}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-400 text-blue-950 rounded-full flex items-center justify-center font-bold text-base shadow-md">
                        SA
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Siti Aminah</p>
                        <p className="text-xs text-amber-300">{language === 'id' ? 'Peraih Medali Emas OSN Astronomi SMA' : 'OSN Astronomy Gold Medalist'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                    <p className="text-slate-200 text-sm leading-relaxed italic mb-6">
                      {language === 'id' 
                        ? '"Sebagai guru pendamping olimpiade, modul pembinaan POSI memberikan referensi soal berkualitas tinggi. Sistem ujian CBT simulasi mandirinya sangat membantu siswa kami terbiasa mengelola waktu pengerjaan. Sangat direkomendasikan untuk seluruh sekolah!"'
                        : '"As a science olympiad teacher advisor, POSI coaching modules are outstanding reference books. The online computerized testing mock environments allowed our pupils to practice under real KSN conditions. Highly recommended!"'}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-base shadow-md">
                        HF
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Hendri Fauzi, S.Si</p>
                        <p className="text-xs text-amber-300">{language === 'id' ? 'Guru Pembimbing SMP IT Medan' : 'SMP IT Medan Olympiad Advisor'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Blog language={language} />
          </div>
        )}

        {currentTab === 'programs' && (
          <Programs language={language} onNavigate={setCurrentTab} />
        )}

        {currentTab === 'events' && (
          <Events language={language} />
        )}

        {currentTab === 'cbt' && (
          <CBTSystem language={language} />
        )}

        {currentTab === 'blog' && (
          <Blog language={language} />
        )}

        {currentTab === 'contact' && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {language === 'id' ? 'Hubungi Kami' : 'Contact Channels'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  {language === 'id' ? 'Ada Pertanyaan? Kami Siap Membantu' : 'Any Questions? Feel Free to Reach Out'}
                </h2>
                <p className="text-slate-500 text-sm">
                  {language === 'id' 
                    ? 'Tim layanan pelanggan POSI siap menjawab pertanyaan seputar kompetisi, pemesanan buku, dan kemitraan sekolah.' 
                    : 'Our friendly customer representatives are ready to assist with competitions, bookstore orders, or institutional deals.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Contact Form Details (7 cols) */}
                <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl space-y-6">
                  <h3 className="text-lg font-black text-slate-900">
                    {language === 'id' ? 'Kirim Pesan Langsung' : 'Direct Message'}
                  </h3>

                  {contactSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex items-center gap-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      <div>
                        <p className="font-extrabold text-sm">{language === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}</p>
                        <p className="text-xs mt-1">{language === 'id' ? 'Tim admin POSI akan segera membalas email Anda secepatnya.' : 'POSI support team will answer your inquiries shortly.'}</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600">{language === 'id' ? 'Nama Lengkap' : 'Full Name'}</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                            placeholder="Ahmad Fauzi"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600">Alamat Email</label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                            placeholder="fauzi@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">{language === 'id' ? 'Subjek / Perihal' : 'Subject'}</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                          placeholder="e.g. Kemitraan Kompetisi Sekolah"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">{language === 'id' ? 'Isi Pesan Anda' : 'Your Message'}</label>
                        <textarea
                          required
                          rows={4}
                          className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                          placeholder="Tulis pesan lengkap Anda..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        {language === 'id' ? 'Kirim Sekarang' : 'Submit Inquiries'}
                      </button>
                    </form>
                  )}
                </div>

                {/* FAQ panel & Contacts Info channels (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Channels Card */}
                  <div className="bg-blue-900 text-white p-6 rounded-[2rem] border border-slate-100 shadow-xl space-y-4">
                    <h3 className="text-base font-black uppercase tracking-wide">{language === 'id' ? 'Kontak Cepat' : 'Quick Contacts'}</h3>
                    
                    <div className="space-y-4 text-xs text-slate-200">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <span>Jl. Polonia No. 100, Polonia, Medan, Sumatera Utara 20157</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>+62 812-3456-7890</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>info@posi.id</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Academic FAQs list */}
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl space-y-4">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <HelpCircle className="w-4.5 h-4.5 text-blue-600" />
                      <span>{language === 'id' ? 'Tanya Jawab Populer' : 'Frequently Asked Questions'}</span>
                    </h3>

                    <div className="space-y-3.5 text-xs text-slate-500 leading-relaxed">
                      <div>
                        <p className="font-extrabold text-slate-800 mb-1">
                          {language === 'id' ? '1. Bagaimana cara mengikuti simulasi CBT?' : '1. How to practice with CBT simulator?'}
                        </p>
                        <p>
                          {language === 'id' 
                            ? 'Pilih menu "Simulasi CBT", tentukan tingkat jenjang (SD/SMP/SMA) beserta mata pelajaran, masukkan nama Anda lalu mulai ujian secara gratis.' 
                            : 'Click on CBT Simulator tab, choose educational level and subject of interest, submit your name and start practicing instantly.'}
                        </p>
                      </div>

                      <div>
                        <p className="font-extrabold text-slate-800 mb-1">
                          {language === 'id' ? '2. Kapan buku OSN akan dikirimkan?' : '2. When will the OSN books be shipped?'}
                        </p>
                        <p>
                          {language === 'id' 
                            ? 'Setelah checkout via WhatsApp, tim logistik POSI Store akan memproses pesanan Anda dalam 1x24 jam kerja menggunakan kurir pilihan.' 
                            : 'After checking out through WhatsApp channel, order processing takes 24 hours under our logistic teams using top local couriers.'}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer information section */}
      <Footer language={language} onNavigate={setCurrentTab} />

      {/* Floating Action Buttons / Widgets (Bottom Right) */}
      <div id="floating-actions" className="fixed bottom-6 right-6 flex flex-col items-end gap-3.5 z-50">
        {/* POSI Informasi Android App Floating Badge */}
        <a
          id="floating-posi-informasi"
          href="https://posi.id/POSI%20Informasi%20v.1.apk"
          download
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs rounded-full shadow-lg shadow-teal-500/30 hover:shadow-xl hover:scale-105 active:translate-y-[1px] transition-all group cursor-pointer"
          title="Download POSI Informasi APK"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-android"><path d="M12 5a1 1 0 0 0-1-1v0a1 1 0 0 0-1 1v0h4v0Z"/><path d="M8 8H16V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8Z"/><path d="M5 10v4"/><path d="M19 10v4"/></svg>
          <span>POSI Informasi APK</span>
        </a>

        {/* Language Selector Floating Button */}
        <button
          id="floating-lang-toggle"
          onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-full shadow-lg hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe text-blue-600"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          <span>{language === 'id' ? 'ID' : 'EN'}</span>
        </button>
      </div>

    </div>
  );
}
