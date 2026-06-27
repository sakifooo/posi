/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Award, MapPin, Search, Tag, X, CheckCircle2, QrCode, Ticket, Printer, Download, Clock } from 'lucide-react';
import { Language, Event } from '../types';
import { translations } from '../translations';

interface EventsProps {
  language: Language;
}

export default function Events({ language }: EventsProps) {
  const t = translations[language].events;
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'SD' | 'SMP' | 'SMA' | 'Guru'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    subject: '',
  });
  const [regSuccess, setRegSuccess] = useState(false);
  const [regTicketCode, setRegTicketCode] = useState('');

  // Sample Events List
  const eventsList: Event[] = [
    {
      id: 'evt-1',
      title: {
        id: 'Kompetisi Sains Indonesia (KSI) 2026',
        en: 'Indonesia Science Competition (KSI) 2026',
      },
      image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=600&q=80',
      date: '2026-07-20',
      type: 'online',
      price: 0,
      level: 'SMA',
      subjects: ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Astronomi', 'Ekonomi', 'Geografi'],
      registeredCount: 4235,
    },
    {
      id: 'evt-2',
      title: {
        id: 'National Science Olympiad (NSO) 2026',
        en: 'National Science Olympiad (NSO) 2026',
      },
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      date: '2026-08-05',
      type: 'online',
      price: 50000,
      level: 'SMP',
      subjects: ['Matematika', 'IPA', 'IPS'],
      registeredCount: 2840,
    },
    {
      id: 'evt-3',
      title: {
        id: 'Olimpiade Sains POSI SD/MI Se-Indonesia',
        en: 'POSI Science Olympiad for Elementary Schools',
      },
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
      date: '2026-07-15',
      type: 'online',
      price: 0,
      level: 'SD',
      subjects: ['Matematika SD', 'IPA SD'],
      registeredCount: 5120,
    },
    {
      id: 'evt-4',
      title: {
        id: 'Diklat Guru Hebat - Strategi Pembinaan OSN',
        en: 'Teacher Training - Strategies for OSN Coaching',
      },
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80',
      date: '2026-08-12',
      type: 'online',
      price: 75000,
      level: 'Guru',
      subjects: ['Sains Terpadu', 'Matematika Terapan'],
      registeredCount: 1205,
    },
    {
      id: 'evt-5',
      title: {
        id: 'POSI Science Championship (PSC) 2026',
        en: 'POSI Science Championship (PSC) 2026',
      },
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      date: '2026-09-01',
      type: 'online',
      price: 0,
      level: 'SMA',
      subjects: ['Fisika', 'Kimia', 'Biologi', 'Kebumian'],
      registeredCount: 3150,
    },
  ];

  const levels = [
    { id: 'All', label: t.filterAll },
    { id: 'SD', label: t.filterSD },
    { id: 'SMP', label: t.filterSMP },
    { id: 'SMA', label: t.filterSMA },
    { id: 'Guru', label: t.filterGuru },
  ];

  const filteredEvents = eventsList.filter((evt) => {
    const matchesLevel = selectedLevel === 'All' || evt.level === selectedLevel;
    const matchesSearch =
      evt.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.subjects.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const handleRegisterClick = (evt: Event) => {
    setActiveEvent(evt);
    setFormData({
      name: '',
      email: '',
      phone: '',
      school: '',
      subject: evt.subjects[0] || '',
    });
    setRegSuccess(false);
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.school || !formData.subject) {
      alert(language === 'id' ? 'Mohon lengkapi semua data!' : 'Please complete all fields!');
      return;
    }
    // Generate simulated registration barcode & ticket ID
    const randomCode = 'POSI-' + Math.floor(100000 + Math.random() * 900000);
    setRegTicketCode(randomCode);
    setRegSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            {language === 'id' ? 'Kanal Kompetisi' : 'Competition Hub'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-500 text-sm">
            {t.subtitle}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          {/* Levels Toggle */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedLevel === lvl.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'id' ? 'Cari olimpiade...' : 'Search competitions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => {
            // Simulated countdown values
            const daysLeft = Math.max(1, Math.floor((new Date(evt.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
            
            return (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                {/* Event Cover Banner */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title[language]}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-extrabold rounded-full shadow-md uppercase tracking-wider">
                      {evt.level}
                    </span>
                    <span className={`px-3 py-1 text-[10px] font-extrabold rounded-full shadow-md uppercase tracking-wider ${
                      evt.type === 'online' ? 'bg-teal-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {evt.type === 'online' ? t.badgeOnline : t.badgeOffline}
                    </span>
                  </div>
                  
                  {/* Countdown Timer Badge */}
                  <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-1.5 text-white text-[11px] font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{daysLeft} {language === 'id' ? 'Hari lagi' : 'Days left'}</span>
                  </div>
                </div>

                {/* Event Contents */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors">
                      {evt.title[language]}
                    </h3>
                    
                    {/* Subject Pill Tags */}
                    <div className="flex flex-wrap gap-1">
                      {evt.subjects.slice(0, 4).map((sub, index) => (
                        <span key={index} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {sub}
                        </span>
                      ))}
                      {evt.subjects.length > 4 && (
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold">
                          +{evt.subjects.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-700">
                        {new Date(evt.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{evt.type === 'online' ? 'CBT Portal POSI' : 'Auditorium USU, Medan'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{t.fee}</p>
                        <p className="text-sm font-extrabold text-blue-700">
                          {evt.price === 0 ? (
                            <span className="text-emerald-600 uppercase font-black">{t.free}</span>
                          ) : (
                            new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              maximumFractionDigits: 0,
                            }).format(evt.price)
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{language === 'id' ? 'Pendaftar' : 'Registered'}</p>
                        <p className="text-xs font-bold text-slate-700">{evt.registeredCount.toLocaleString()} {language === 'id' ? 'Siswa' : 'Students'}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegisterClick(evt)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {t.registerNow}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Registration & Ticket Generating System */}
        {activeEvent && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-scaleUp">
              
              {/* Header */}
              <div className="p-6 bg-blue-900 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{language === 'id' ? 'Formulir Registrasi' : 'Registration Form'}</h3>
                  <p className="text-xs text-slate-300">{activeEvent.title[language]}</p>
                </div>
                <button
                  onClick={() => setActiveEvent(null)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!regSuccess ? (
                /* Registration Inputs Form */
                <form onSubmit={handleSubmitRegistration} className="p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">
                        {language === 'id' ? 'Nama Lengkap Peserta' : "Participant's Full Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                        placeholder="e.g. Ahmad Fauzi"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">
                        {language === 'id' ? 'Pilih Bidang Studi' : 'Select Study Subject'}
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                      >
                        {activeEvent.subjects.map((sub, idx) => (
                          <option key={idx} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Alamat Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                        placeholder="fauzi@example.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">{language === 'id' ? 'Nomor WhatsApp' : 'WhatsApp Number'}</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                        placeholder="e.g. 08123456789"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">
                      {language === 'id' ? 'Nama Sekolah / Institusi' : 'School / Institution Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                      placeholder="e.g. SMA Negeri 1 Medan"
                    />
                  </div>

                  {activeEvent.price > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                      <p className="text-xs font-bold text-amber-800">{language === 'id' ? 'Simulasi Pembayaran Kompetisi' : 'Simulated Competition Payment'}</p>
                      <div className="flex items-center gap-4">
                        <QrCode className="w-12 h-12 text-slate-800" />
                        <div className="text-xs text-slate-600">
                          <p>{language === 'id' ? 'Scan QRIS berikut untuk menyelesaikan pendaftaran.' : 'Scan QRIS code below to finalize payment.'}</p>
                          <p className="font-extrabold text-blue-900 mt-1">{language === 'id' ? 'Total Tagihan:' : 'Total Invoice:'} {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(activeEvent.price)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveEvent(null)}
                      className="px-5 py-2.5 border border-slate-200 text-xs font-bold rounded-xl hover:bg-slate-50 text-slate-600"
                    >
                      {language === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                    
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      {language === 'id' ? 'Kirim Pendaftaran' : 'Submit Registration'}
                    </button>
                  </div>
                </form>
              ) : (
                /* Beautiful High-Fidelity Ticket Output */
                <div className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full mb-2">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">{t.registerSuccess}</h4>
                    <p className="text-xs text-slate-500">{language === 'id' ? 'Terima kasih pendaftaran Anda telah tercatat pada sistem kami.' : 'Thank you, your registration is completed on our servers.'}</p>
                  </div>

                  {/* Printable Ticket Shape */}
                  <div id="print-ticket" className="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-gradient-to-r from-slate-50 to-white relative shadow-sm overflow-hidden">
                    {/* Punch Hole effects left and right */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full border border-slate-200"></div>
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full border border-slate-200"></div>

                    <div className="flex flex-col sm:flex-row justify-between gap-6">
                      <div className="space-y-3.5 flex-1">
                        <div className="flex items-center gap-2">
                          <Ticket className="w-5 h-5 text-blue-600" />
                          <span className="text-xs font-black text-blue-900 tracking-wide uppercase">{t.ticketTitle}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{language === 'id' ? 'Nama Lengkap' : 'Full Name'}</p>
                          <p className="text-sm font-black text-slate-800">{formData.name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{language === 'id' ? 'Bidang Studi' : 'Study Field'}</p>
                            <p className="text-xs font-bold text-slate-700">{formData.subject}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{language === 'id' ? 'Tingkat' : 'Education Level'}</p>
                            <p className="text-xs font-bold text-slate-700">{activeEvent.level}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{language === 'id' ? 'Institusi / Sekolah' : 'School'}</p>
                          <p className="text-xs font-bold text-slate-700">{formData.school}</p>
                        </div>
                      </div>

                      {/* Barcode representation side */}
                      <div className="flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-4 sm:pt-0 sm:pl-6 text-center">
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase mb-2">TICKET ID</span>
                        <p className="text-base font-black text-blue-800 tracking-widest">{regTicketCode}</p>
                        
                        {/* Fake SVG Barcode */}
                        <svg className="w-36 h-10 mt-3 text-slate-800" fill="currentColor" viewBox="0 0 100 30">
                          <rect x="0" y="0" width="2" height="30" />
                          <rect x="4" y="0" width="1" height="30" />
                          <rect x="7" y="0" width="3" height="30" />
                          <rect x="12" y="0" width="1" height="30" />
                          <rect x="15" y="0" width="4" height="30" />
                          <rect x="21" y="0" width="2" height="30" />
                          <rect x="25" y="0" width="1" height="30" />
                          <rect x="28" y="0" width="3" height="30" />
                          <rect x="33" y="0" width="1" height="30" />
                          <rect x="36" y="0" width="2" height="30" />
                          <rect x="40" y="0" width="4" height="30" />
                          <rect x="46" y="0" width="1" height="30" />
                          <rect x="49" y="0" width="3" height="30" />
                          <rect x="54" y="0" width="2" height="30" />
                          <rect x="58" y="0" width="1" height="30" />
                          <rect x="61" y="0" width="4" height="30" />
                          <rect x="67" y="0" width="2" height="30" />
                          <rect x="71" y="0" width="1" height="30" />
                          <rect x="74" y="0" width="3" height="30" />
                          <rect x="79" y="0" width="1" height="30" />
                          <rect x="82" y="0" width="2" height="30" />
                          <rect x="86" y="0" width="4" height="30" />
                          <rect x="92" y="0" width="1" height="30" />
                          <rect x="95" y="0" width="3" height="30" />
                        </svg>
                        <span className="text-[9px] text-slate-400 mt-2">{t.ticketDesc}</span>
                      </div>
                    </div>
                  </div>

                  {/* Document Print & Download buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setActiveEvent(null)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl text-slate-700 transition-all cursor-pointer"
                    >
                      {language === 'id' ? 'Tutup' : 'Close'}
                    </button>
                    
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{language === 'id' ? 'Cetak Kartu' : 'Print Ticket'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
