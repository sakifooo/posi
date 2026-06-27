/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, Info, Calendar, Clock, MapPin, Copy, FileText, ArrowUpRight, 
  MessageCircle, Download, ShieldCheck, Mail, Phone, ShoppingBag, 
  CheckCircle, Sparkles, UserPlus, Zap, ClipboardList, Medal, BrainCircuit, Bot,
  ArrowRight, Star, CheckCircle2
} from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onAddToCart?: (id: string) => void;
  onOpenCart?: () => void;
}

export default function Hero({ language, onNavigate, onAddToCart, onOpenCart }: HeroProps) {
  const [activeCompTab, setActiveCompTab] = useState<'upcoming' | 'past'>('upcoming');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Translations helper
  const isId = language === 'id';

  const t = {
    badge: isId ? 'Pusat Olimpiade Sains Indonesia' : 'Indonesian Science Olympiad Center',
    heroTitle: isId 
      ? 'Jadilah Juara Sekolah Bersama POSI! 🏆' 
      : 'Become a school champion through the Olympiad! 🏆',
    heroDesc: isId
      ? 'Bayangkan namamu dipanggil saat upacara bendera sekolah, fotomu terpajang di mading, dan semua orang mengenalmu sebagai pemenang Olimpiade. Mulai perjalanan prestasimu di sini!'
      : 'Imagine your name being called during the school ceremony, your photo on the bulletin board, and everyone recognizing you as an Olympiad winner. Start your journey here!',
    startExam: isId ? 'Mulai Ujian Sekarang' : 'Start Exam Now',
    viewGuide: isId ? 'Lihat Panduan' : 'View Guide',
    participants: isId ? '10.000+ Peserta' : '10,000+ Participants',
    competitions: isId ? '200+ Kompetisi' : '200+ Competitions',
    schools: isId ? '50+ Sekolah Mitra' : '50+ Partner Schools',
    nationalProgram: isId ? 'Program Nasional POSI' : 'POSI National Program',
    programTitle: isId 
      ? '🎉 Pilih dan ikuti pengalaman kompetisi tingkat nasional terbaik melalui JSO & SHSO Nasional 2026.'
      : '🎉 Choose and join the best national competition experience through JSO & SHSO Nasional 2026.',
    programDesc: isId
      ? 'Kesempatan istimewa bagi para pemenang medali dari seluruh kompetisi POSI untuk bergabung di JSO & SHSO Nasional.'
      : 'A special opportunity for medal winners from all POSI competitions to join JSO & SHSO Nasional.',
    viewFlyer: isId ? 'Lihat pamflet nasional' : 'View national flyer',
    downloadGuide: isId ? 'Unduh buku panduan' : 'Download guidebook',
    contactAdmin: isId ? 'Hubungi admin untuk info' : 'Contact admin for more info',
    adventureTitle: isId ? 'Mulai petualanganmu!' : 'Start your adventure!',
    step1Title: isId ? 'Daftar Akun' : 'Register',
    step1Desc: isId ? 'Lakukan pendaftaran dan cari kompetisi sains yang ingin kamu ikuti.' : 'Perform registration and find the science competition you want to join.',
    step2Title: isId ? 'Ikuti Ujian' : 'Take the Test',
    step2Desc: isId ? 'Kerjakan soal-soal berkualitas tinggi di portal CBT modern kami.' : 'Solve high-quality problems in our modern CBT exam portal.',
    step3Title: isId ? 'Unduh Sertifikat' : 'Get Your Certificate',
    step3Desc: isId ? 'Dapatkan sertifikat resmi dan bagikan prestasimu kepada teman-teman.' : 'Download your official certificate and share achievements with your friends.',
  };

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const upcomingCompetitions = [
    {
      id: 'fsn-sulsel2',
      title: 'FESTIVAL SAINS NASIONAL (FSN) PROVINSI SULAWESI SELATAN 2 TAHUN 2026',
      image: 'https://posi.id/storage/competition/1779258156-banner-oo2nya3vlb.png',
      price: 'Rp 100.000',
      status: isId ? 'Terbuka' : 'Open',
      date: 'Sab, 18 Jul 2026',
      regPeriod: 'Sen, 11 Mei 2026 00:00 - Sab, 27 Jun 2026 23:59',
      target: 'SULAWESI SELATAN',
      count: 134,
      link: 'https://posi.id/Reg2026-FSNSULSEL2',
      juknis: 'https://posi.id/Reg2026-FSNSULSEL2'
    },
    {
      id: 'fsn-sumbar',
      title: 'FESTIVAL SAINS NASIONAL (FSN) PROVINSI SUMATERA BARAT TAHUN 2026',
      image: 'https://posi.id/storage/competition/1782270082-banner-l4bx2d6mvzm.png',
      price: 'Rp 100.000',
      status: isId ? 'Terbuka' : 'Open',
      date: 'Min, 26 Jul 2026',
      regPeriod: 'Sab, 16 Mei 2026 00:00 - Sen, 13 Jul 2026 23:59',
      target: 'SUMATERA BARAT',
      count: 2,
      link: 'https://posi.id/InfoFSN-SUMBAR2026',
      juknis: 'https://posi.id/InfoFSN-SUMBAR2026'
    },
    {
      id: 'fsn-bali',
      title: 'FESTIVAL SAINS NASIONAL (FSN) PROVINSI BALI TAHUN 2026',
      image: 'https://posi.id/storage/competition/1781835150-banner-gxwoft83h9.png',
      price: 'Rp 100.000',
      status: isId ? 'Terbuka' : 'Open',
      date: 'Sab, 8 Agt 2026',
      regPeriod: 'Sen, 15 Jun 2026 00:00 - Min, 19 Jul 2026 23:59',
      target: 'BALI',
      count: 6,
      link: 'https://posi.id/InfoFSN-BALI2026',
      juknis: 'https://posi.id/InfoFSN-BALI2026'
    }
  ];

  const pastCompetitions = [
    {
      id: 'kisaran-so',
      title: 'KISARAN SCIENCE OLYMPIAD (KISARAN SO) TAHUN 2026 se-Provinsi Sumatera Utara',
      image: 'https://posi.id/storage/competition/1782273307-banner-b3hzdrwxby9.png',
      price: 'Rp 120.000',
      status: isId ? 'Belum Dibuka' : 'Coming Soon',
      date: 'Sab, 10 Okt 2026',
      regPeriod: 'Rab, 1 Jul 2026 00:00 - Sab, 3 Okt 2026 23:59',
      target: 'SUMATERA UTARA',
      count: 0,
      link: 'https://posi.id/Info2026-KisaranSO',
      juknis: 'https://posi.id/Info2026-KisaranSO'
    },
    {
      id: 'fsn-sultra',
      title: 'FESTIVAL SAINS NASIONAL (FSN) PROVINSI SULAWESI TENGGARA TAHUN 2026',
      image: 'https://posi.id/storage/competition/1782270082-banner-l4bx2d6mvzm.png',
      price: 'Rp 100.000',
      status: isId ? 'Belum Dibuka' : 'Coming Soon',
      date: 'Sab, 19 Sep 2026',
      regPeriod: 'Sen, 13 Jul 2026 00:00 - Sab, 5 Sep 2026 23:59',
      target: 'SULAWESI TENGGARA',
      count: 0,
      link: 'https://posi.id/InfoFSN-SULTRA2026',
      juknis: 'https://posi.id/InfoFSN-SULTRA2026'
    },
    {
      id: 'fsn-selatan3',
      title: 'FESTIVAL SAINS NASIONAL (FSN) PROVINSI SULAWESI SELATAN TAHUN 2026 JILID 3',
      image: 'https://posi.id/storage/competition/1782197397-banner-z0gezu4lhsq.png',
      price: 'Rp 120.000',
      status: isId ? 'Belum Dibuka' : 'Coming Soon',
      date: 'Min, 6 Sep 2026',
      regPeriod: 'Sen, 29 Jun 2026 00:00 - Min, 23 Agt 2026 23:59',
      target: 'SULAWESI SELATAN',
      count: 0,
      link: 'https://posi.id/InfoFSN2026-SULSEL-Jilid3',
      juknis: 'https://posi.id/InfoFSN2026-SULSEL-Jilid3'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <div className="relative bg-gradient-to-br from-blue-500/5 via-white to-indigo-500/5 py-16 md:py-24 overflow-hidden">
        {/* Dynamic Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Center Logo/Tag Pill */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 text-slate-900 max-w-4xl leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-slate-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('cbt')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold text-base shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.startExam}</span>
                <Trophy className="h-5 w-5 ml-1" />
              </button>

              <button 
                onClick={() => onNavigate('tutorial')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-base shadow hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.viewGuide}</span>
                <Info className="h-5 w-5 ml-1 text-blue-600" />
              </button>
            </div>

            {/* Micro Stats Counter row */}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{t.participants}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-100 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                <span>🏆</span>
                <span>{t.competitions}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-800 border border-purple-100 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                <span>🚀</span>
                <span>{t.schools}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. POSI NATIONAL PROGRAM - JSO & SHSO */}
      <section className="relative bg-white py-14 md:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <article className="overflow-hidden rounded-[2rem] border border-[#8ca0ff]/20 bg-[linear-gradient(135deg,rgba(31,45,124,.97),rgba(54,71,173,.95)_44%,rgba(125,91,255,.92)_100%)] shadow-[0_24px_80px_rgba(49,68,170,.22)]">
            <div className="border-b border-white/10 px-6 py-8 sm:px-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[.22em] text-white">
                <Sparkles className="h-4 w-4 text-amber-300" />
                {t.nationalProgram}
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl leading-snug">
                {t.programTitle}
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-white/80 sm:text-base">
                {t.programDesc}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold border-blue-200/30 bg-white/10 text-blue-50">
                  🏆 JSO Nasional Offline
                </span>
                <span className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold border-violet-200/30 bg-white/10 text-violet-50">
                  🏆 SHSO Nasional Offline
                </span>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-medium text-white/90">
                ⚡ {isId ? 'Kuota Terbatas. Amankan tempatmu sekarang dan cek panduan lengkapnya.' : 'Limited quota. Secure your place and check the complete guidelines now.'}
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
              {/* JSO Card */}
              <article className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.05] backdrop-blur-sm flex flex-col justify-between">
                <div className="bg-white/5 p-4 flex justify-center">
                  <img 
                    src="https://assets.posi.id/banner_competition/jso.jpeg" 
                    alt="JSO Nasional Offline" 
                    className="h-auto max-h-[360px] rounded-[1.2rem] object-contain shadow-lg" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-start gap-3">
                    <Trophy className="mt-0.5 h-5 w-5 text-blue-300 shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white">JSO Nasional Offline</h3>
                      <p className="mt-1 text-sm leading-6 text-white/70">
                        {isId ? 'Jalur khusus untuk siswa terpilih menuju babak offline nasional.' : 'Special route for selected pupils to the offline national round.'}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a href="https://assets.posi.id/banner_competition/jso.jpeg" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between px-4 py-2.5 bg-white/10 text-white rounded-full text-xs font-semibold hover:bg-white/20 transition-all">
                      <span>🔥 {t.viewFlyer}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a href="https://posi.id/InfoJSO-Nasional2026" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between px-4 py-2.5 bg-white/10 text-white rounded-full text-xs font-semibold hover:bg-white/20 transition-all">
                      <span>📘 {t.downloadGuide}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a href="https://wa.me/6282165441975" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-xs font-bold hover:brightness-110 shadow-lg sm:col-span-2 transition-all">
                      <span>📝 {t.contactAdmin}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>

              {/* SHSO Card */}
              <article className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.05] backdrop-blur-sm flex flex-col justify-between">
                <div className="bg-white/5 p-4 flex justify-center">
                  <img 
                    src="https://assets.posi.id/banner_competition/shso.jpeg" 
                    alt="SHSO Nasional Offline" 
                    className="h-auto max-h-[360px] rounded-[1.2rem] object-contain shadow-lg" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-start gap-3">
                    <Trophy className="mt-0.5 h-5 w-5 text-indigo-300 shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white">SHSO Nasional Offline</h3>
                      <p className="mt-1 text-sm leading-6 text-white/70">
                        {isId ? 'Olimpiade bergengsi offline khusus tingkat SMA se-Indonesia.' : 'Offline prestigious science olympiad for High School pupils.'}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a href="https://assets.posi.id/banner_competition/shso.jpeg" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between px-4 py-2.5 bg-white/10 text-white rounded-full text-xs font-semibold hover:bg-white/20 transition-all">
                      <span>🔥 {t.viewFlyer}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a href="https://posi.id/InfoSHSO-Nasional2026" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between px-4 py-2.5 bg-white/10 text-white rounded-full text-xs font-semibold hover:bg-white/20 transition-all">
                      <span>📘 {t.downloadGuide}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a href="https://wa.me/6282277475033" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-xs font-bold hover:brightness-110 shadow-lg sm:col-span-2 transition-all">
                      <span>📝 {t.contactAdmin}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      {/* 3. HOW IT WORKS / ADVENTURE */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-500/5 via-white to-cyan-500/5 relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              <span>{isId ? 'Langkah Bergabung' : 'How to Join'}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 mb-4">
              {t.adventureTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
              <div className="relative flex flex-col items-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-md overflow-visible">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">1</div>
                <div className="mb-6 p-4 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform mt-2">
                  <UserPlus className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{t.step1Title}</h3>
                <p className="text-slate-500 text-sm text-center leading-relaxed">{t.step1Desc}</p>
                <div className="mt-4 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center">
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  {isId ? 'Hanya 2 menit!' : 'Only 2 minutes!'}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
              <div className="relative flex flex-col items-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-md overflow-visible">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">2</div>
                <div className="mb-6 p-4 bg-purple-50 text-purple-600 rounded-full group-hover:scale-110 transition-transform mt-2">
                  <ClipboardList className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">{t.step2Title}</h3>
                <p className="text-slate-500 text-sm text-center leading-relaxed">{t.step2Desc}</p>
                <div className="mt-4 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center">
                  <Trophy className="h-3.5 w-3.5 mr-1" />
                  {isId ? 'Tunjukkan kemampuanmu!' : 'Show your skills!'}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
              <div className="relative flex flex-col items-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-md overflow-visible">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">3</div>
                <div className="mb-6 p-4 bg-amber-50 text-amber-600 rounded-full group-hover:scale-110 transition-transform mt-2">
                  <Medal className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-600 transition-colors">{t.step3Title}</h3>
                <p className="text-slate-500 text-sm text-center leading-relaxed">{t.step3Desc}</p>
                <div className="mt-4 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center">
                  <span>🎉</span>
                  <span className="ml-1">{isId ? 'Bagikan ke teman-temanmu!' : 'Show off to friends!'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Success Stories of Champions */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Trophy className="h-3 w-3" />
                {isId ? 'Kisah Sukses Juara' : 'Success Stories'}
              </div>
              <h3 className="text-2xl font-bold text-slate-800">{isId ? 'Para Juara POSI' : 'POSI Champions'}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">I Gusti Ngurah Raka</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{isId ? 'Siswa Berprestasi' : 'Champion Student'}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{isId ? 'Berkat latihan rutin dengan sistem CBT POSI, saya berhasil memenangkan medali emas di olimpiade sains nasional!' : 'Thanks to regular practice with POSI, I won the gold medal in the national science olympiad!'}"
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Alvin Alvito</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{isId ? 'Siswa Berprestasi' : 'Champion Student'}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{isId ? 'Soal-soal di POSI sangat menantang dan memicu daya pikir kritis. Sangat melatih kesiapan mental ujian saya!' : 'The questions at POSI are challenging and helped me prepare well for the competition!'}"
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Musa Michael Boniardo</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{isId ? 'Siswa Berprestasi' : 'Champion Student'}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{isId ? 'Pembahasan yang sangat detail dan terstruktur di buku panduan POSI mempermudah saya menguasai materi olimpiade secara mandiri.' : 'The detailed discussions helped me understand olympiad material better!'}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPETITION SPOTLIGHT (HIGHLIGHTS) */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold text-sky-800 shadow-sm">
              <Trophy className="h-4 w-4 text-sky-500" />
              <span>{isId ? 'Sorotan Kompetisi' : 'Competition Spotlight'}</span>
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {isId ? 'Pilihan Kompetisi Terpopuler' : 'Competition Highlights'}
            </h2>
            <p className="mt-4 text-slate-500 text-sm max-w-2xl mx-auto">
              {isId ? 'Telusuri kompetisi sains terbaru maupun arsip edisi sebelumnya di satu tempat.' : 'Browse fresh olympiad programs and past editions in one place.'}
            </p>
          </div>

          {/* Tab Filters for Spotlight */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200">
              <button
                onClick={() => setActiveCompTab('upcoming')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCompTab === 'upcoming'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {isId ? 'Kompetisi Mendatang' : 'Upcoming Competitions'}
              </button>
              <button
                onClick={() => setActiveCompTab('past')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCompTab === 'past'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {isId ? 'Kompetisi Sebelumnya' : 'Past Competitions'}
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(activeCompTab === 'upcoming' ? upcomingCompetitions : pastCompetitions).map((comp) => (
              <div 
                key={comp.id}
                className="flex flex-col rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Banner image with tags */}
                <div className="relative min-h-[200px] bg-slate-900 overflow-hidden">
                  <img 
                    src={comp.image} 
                    alt={comp.title} 
                    className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Floating Price Tag */}
                  <div className="absolute right-4 top-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50 shadow-lg text-xs font-black text-blue-700">
                    {comp.price}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 px-5 pb-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">{isId ? 'Kompetisi POSI' : 'POSI Competition'}</p>
                      <h3 className="line-clamp-2 text-base font-extrabold leading-tight text-white">{comp.title}</h3>
                    </div>
                    <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-[10px] font-bold border shrink-0 ${
                      comp.status === 'Terbuka' || comp.status === 'Open'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-amber-200 bg-amber-50 text-amber-700'
                    }`}>
                      {comp.status}
                    </span>
                  </div>
                </div>

                {/* Card Body Information list */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-full">{isId ? 'Offline Fisik' : 'Offline Event'}</span>
                    <span className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold rounded-full">SD</span>
                    <span className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold rounded-full">SMP</span>
                    <span className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold rounded-full">SMA</span>
                  </div>

                  {/* Dates & Details */}
                  <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-500 uppercase text-[9px] tracking-wide">{isId ? 'Tanggal Ujian' : 'Exam Date'}</p>
                        <p className="font-bold text-slate-800">{comp.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-500 uppercase text-[9px] tracking-wide">{isId ? 'Registrasi' : 'Registration'}</p>
                        <p className="font-medium text-slate-800 leading-normal">{comp.regPeriod}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">{language === 'id' ? 'Wilayah Target' : 'Target Region'}</p>
                        <p className="font-bold text-slate-800">{comp.target}</p>
                      </div>
                    </div>
                  </div>

                  {/* Registered count badge */}
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-sky-600" />
                    <span>{comp.count} {isId ? 'peserta terdaftar' : 'registered participants'}</span>
                  </div>

                  {/* Footer Actions */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyLink(`https://posi.id/competitions/${comp.id}`, comp.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedId === comp.id ? (isId ? 'Tersalin' : 'Copied') : 'Copy Link'}</span>
                      </button>
                      <a
                        href={comp.juknis}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-all border border-blue-100"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Juknis</span>
                      </a>
                    </div>

                    <button
                      onClick={() => onNavigate('competitions')}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Lihat Detail Kompetisi</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Action Button: View All */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => onNavigate('competitions')}
            className="flex items-center gap-2 px-8 py-3.5 bg-white border border-blue-200 hover:border-blue-400 text-blue-700 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all hover:bg-blue-50 cursor-pointer"
          >
            <span>{language === 'id' ? 'Lihat Semua Kompetisi' : 'View All Competitions'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>

      {/* mimpi.mu Platform Promotion */}
      <section className="py-20 bg-gradient-to-br from-[#F8FAFC] via-[#EFF6FF] to-[#F5F3FF] relative overflow-hidden border-t border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full text-xs font-bold">
                <Star className="w-4 h-4 fill-indigo-100 text-indigo-600" />
                <span>New Platform</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
                Ace Your Exams with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">mimpi.mu</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl">
                The all-in-one platform for your academic success. From school exams to national olympiads.
              </p>
              
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-semibold">Complete TKA & UTBK Preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">Science Olympiad (OSN) Training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">Madrasah Olympiad (KSM) Materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit h-4 w-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M9 13a4.5 4.5 0 0 0 3-4"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M16 8V5a2 2 0 0 1 2-2"></path><circle cx="16" cy="13" r=".5"></circle><circle cx="18" cy="3" r=".5"></circle><circle cx="20" cy="21" r=".5"></circle><circle cx="20" cy="8" r=".5"></circle></svg>
                  <span className="font-medium">AI-Powered Performance Analysis</span>
                </li>
              </ul>

              <div className="pt-2">
                <a href="https://mimpi.mu" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-base shadow-xl shadow-indigo-100 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  <span>{isId ? 'Coba Gratis Sekarang' : 'Try for Free'}</span>
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Dashboard Mockup Graphics */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10">
                <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center px-6 justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dashboard Siswa</div>
                </div>
                
                <div className="p-6 flex-1 relative bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{isId ? 'Pencapaian Belajar' : 'Learning Progress'}</p>
                      <p className="text-xl font-black text-slate-800">85% <span className="text-xs font-normal text-emerald-500 ml-1">↑ Naik Terus!</span></p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                      📊
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>Matematika Saintek</span>
                        <span>92%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>Fisika Dasar</span>
                        <span>78%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>Biologi Umum</span>
                        <span>88%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex gap-3 items-start">
                    <BrainCircuit className="h-5 w-5 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-indigo-900">{isId ? 'Rekomendasi Belajar AI' : 'AI Recommendation'}</p>
                      <p className="text-[11px] text-indigo-700 leading-relaxed mt-0.5">
                        {isId 
                          ? 'Kemampuan aljabar kamu sangat baik! Fokuskan latihan geometri minggu ini untuk menaikkan nilai akumulasimu.' 
                          : 'You have exceptional algebra strength! Focus on geometry exercises this week to boost total expected scores.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-3 -right-3 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 z-20">
                  <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 border border-yellow-100">🏆</div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">{isId ? 'Target' : 'Goal'}</p>
                    <p className="text-xs font-black text-slate-800">{isId ? 'Medali Emas' : 'Gold Medal'}</p>
                  </div>
                </div>

                <div className="absolute -bottom-3 -left-3 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 z-20">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">🎓</div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">{isId ? 'Impian' : 'Dream'}</p>
                    <p className="text-xs font-black text-slate-800">{isId ? 'Lulus PTN Favorit' : 'Top University'}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ANDROID APP INFO - POSI INFORMASI */}
      <section className="bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/50 py-16 md:py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-blue-400/10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-cyan-400/10 blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
                <Bot className="h-4 w-4 text-emerald-600" />
                <span>Android App</span>
              </span>
              
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl leading-tight">
                POSI Informasi untuk <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">Chat Admin</span> &amp; Notifikasi Penting
              </h2>
              
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Fitur chat realtime admin sekarang tersedia lewat aplikasi Android <strong>POSI Informasi</strong>. Selain chat, aplikasi ini juga untuk menerima berita POSI, pengumuman ujian, dan informasi kompetisi terbaru.
              </p>

              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://posi.id/POSI%20Informasi%20v.1.apk" 
                  download 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
                >
                  <Download className="h-4.5 w-4.5" />
                  <span>Download APK POSI Informasi</span>
                </a>
              </div>

              {/* Install and Security Instructions */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-blue-200 bg-white p-4 text-xs text-slate-600">
                  <p className="mb-2 font-bold text-slate-800">Cara Instal (Android)</p>
                  <ol className="space-y-1 list-decimal pl-4">
                    <li>Klik tombol download APK.</li>
                    <li>Buka file di folder Download.</li>
                    <li>Jika diminta, izinkan instal dari browser ini lalu lanjutkan.</li>
                  </ol>
                </div>
                
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs text-slate-700">
                  <p className="mb-2 flex items-center gap-1.5 font-bold text-emerald-800">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                    <span>Info Keamanan APK</span>
                  </p>
                  <p className="leading-relaxed">
                    APK belum ada di Play Store, jadi beberapa perangkat bisa memberi peringatan “unknown app”. Ini normal untuk APK direct download. Download aman hanya dari website resmi POSI.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Showcase Frame */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-200/40 via-indigo-200/40 to-cyan-200/40 blur-xl"></div>
              <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-500 text-white shadow">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Aplikasi Android</p>
                    <p className="text-sm font-black text-slate-900">Fitur Utama POSI Informasi</p>
                  </div>
                </div>
                
                <ul className="space-y-2.5 text-xs text-slate-700 font-semibold mb-4">
                  <li className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                    <span>Chat realtime dengan admin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    <span>Berita dan update resmi POSI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-cyan-600" />
                    <span>Notifikasi pengumuman ujian</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <span>Informasi kompetisi terbaru</span>
                  </li>
                </ul>

                <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-2 flex justify-center">
                  <div className="w-full h-44 bg-blue-900/10 rounded-xl flex items-center justify-center text-slate-400 font-mono text-[10px]">
                    [ Tampilan Aplikasi Android ]
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SPONSORS / COLLABORATION */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
            Supported by our amazing sponsors
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center opacity-65">
            <div className="flex justify-center font-black text-xl tracking-widest text-slate-400 hover:text-blue-600 transition-colors">ELCI</div>
            <div className="flex justify-center font-black text-xl tracking-widest text-slate-400 hover:text-blue-600 transition-colors">FOTON</div>
            <div className="flex justify-center font-black text-xl tracking-widest text-slate-400 hover:text-blue-600 transition-colors">THINKER</div>
            <div className="flex justify-center font-black text-xl tracking-widest text-slate-400 hover:text-blue-600 transition-colors">MILLENIAL</div>
            <div className="flex justify-center font-black text-xl tracking-widest text-slate-400 hover:text-blue-600 transition-colors">POSI</div>
          </div>
        </div>
      </section>

      {/* 7. POSI STORE BOOKSTORE PREVIEW PROMO */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#eef2fb] via-[#f6f0ff] to-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold border border-blue-200">
                Produk Resmi POSI Store
              </span>
              
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Upgrade persiapan olimpiade dengan buku &amp; merchandise POSI
              </h2>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Koleksi terbaru POSI Store disusun langsung oleh tim mentor olimpiade POSI. Materi terkurasi, soal HOTS, hingga paket fisik &amp; digital untuk SD, SMP, dan SMA. Cocok buat latihan mandiri, bimbel, maupun persiapan kompetisi.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Apa yang kamu dapat?</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600 font-semibold">
                    <li>• Ringkasan materi &amp; pembahasan lengkap</li>
                    <li>• Soal berjenjang dari dasar sampai olimpiade</li>
                    <li>• Akses ke pilihan produk fisik &amp; digital</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Siap checkout cepat</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600 font-semibold">
                    <li>• Keranjang terintegrasi di POSI</li>
                    <li>• Pembayaran aman via Midtrans</li>
                    <li>• Produk tidak terikat kompetisi</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('store')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs hover:brightness-110 shadow-lg cursor-pointer transition-all"
                >
                  Lihat Produk POSI
                </button>
                <button
                  onClick={onOpenCart}
                  className="px-6 py-3 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl text-xs hover:bg-slate-50 shadow-sm cursor-pointer transition-all"
                >
                  Lanjut ke Keranjang
                </button>
              </div>
            </div>

            {/* Bookstore Grid visuals mockups */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-60"></div>
              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-slate-50 p-2 border border-slate-100 shadow-inner">
                    <div className="text-center font-bold text-[10px] text-slate-400">[ SCW B. Inggris SD ]</div>
                  </div>
                  <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-slate-50 p-2 border border-slate-100 shadow-inner">
                    <div className="text-center font-bold text-[10px] text-slate-400">[ JOS MM SMP ]</div>
                  </div>
                  <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-slate-50 p-2 border border-slate-100 shadow-inner">
                    <div className="text-center font-bold text-[10px] text-slate-400">[ SCW MM SMP ]</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-lg">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/80">Promo Terbaru</p>
                  <p className="mt-1 text-base font-extrabold">Bundle hemat buku &amp; merchandise</p>
                  <p className="text-xs text-white/70">Stok terbatas, cek katalog sekarang.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

// Helpers for region targetting
function compKey(id: string) {
  return id;
}

function compFromTitle(id: string) {
  return id;
}

function evtRegion(id: string) {
  if (id.includes('sulsel') || id.includes('SULSEL')) return 'SULAWESI SELATAN';
  if (id.includes('sumbar') || id.includes('SUMBAR')) return 'SUMATERA BARAT';
  if (id.includes('bali') || id.includes('BALI')) return 'BALI';
  if (id.includes('sultra') || id.includes('SULTRA')) return 'SULAWESI TENGGARA';
  return 'SUMATERA UTARA';
}
