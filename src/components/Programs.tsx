/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trophy, BookOpen, Layers, Award, ShieldCheck, Cpu } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ProgramsProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export default function Programs({ language, onNavigate }: ProgramsProps) {
  const t = translations[language].programs;

  const cards = [
    {
      id: 'events',
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      title: t.olimpiadeTitle,
      desc: t.olimpiadeDesc,
      color: 'blue',
      badge: language === 'id' ? 'Populer' : 'Popular',
    },
    {
      id: 'store',
      icon: <BookOpen className="w-8 h-8 text-amber-500" />,
      title: t.bukuTitle,
      desc: t.bukuDesc,
      color: 'amber',
      badge: 'POSI Store',
    },
    {
      id: 'cbt',
      icon: <Cpu className="w-8 h-8 text-teal-500" />,
      title: t.cbtTitle,
      desc: t.cbtDesc,
      color: 'teal',
      badge: language === 'id' ? 'Gratis' : 'Free Trial',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
            {language === 'id' ? 'Pilar Layanan Kami' : 'Our Foundations'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-slate-500 text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100/80 hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 bg-white rounded-2xl shadow-sm border border-slate-100/50 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:text-blue-800">
                <span>{language === 'id' ? 'Lihat Selengkapnya' : 'Learn More'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Why POSI? Banner Panel */}
        <div className="mt-20 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-xl text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <span className="text-xs font-extrabold text-amber-400 tracking-wider uppercase mb-3 block">
                {language === 'id' ? 'MENGAPA MEMILIH POSI?' : 'WHY CHOOSE POSI?'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mb-4">
                {language === 'id' 
                  ? 'Mitra Terbaik Pendidikan Sains Berprestasi' 
                  : 'Your Ultimate Partner in Science Education'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {language === 'id'
                  ? 'POSI telah membina ribuan siswa hingga meraih medali di ajang OSN Kabupaten, Provinsi, hingga Tingkat Nasional. Materi pelatihan kami selalu diperbarui mengikuti kisi-kisi terbaru Puspresnas.'
                  : 'POSI has guided thousands of high-achievers to conquer local, provincial, and national-level Olympiads. Our coaching curriculums always align with the newest official syllabus.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-semibold">{language === 'id' ? 'Soal Terakreditasi' : 'Accredited Mock Questions'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-semibold">{language === 'id' ? 'Mentor Medali Emas' : 'Gold Medalist Coaches'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-semibold">{language === 'id' ? 'Analisis CBT Instan' : 'Real-Time CBT Analytics'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-semibold">{language === 'id' ? 'Sertifikat Resmi' : 'Accredited Certificates'}</span>
                </div>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-amber-300">{language === 'id' ? 'Statistik Kelulusan OSN' : 'OSN Pass Statistics'}</span>
                  <span className="text-xs font-bold text-emerald-400">+18% {language === 'id' ? 'Kenaikan' : 'Growth'}</span>
                </div>
                
                {/* Simulated Chart */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>{language === 'id' ? 'Tingkat Kabupaten' : 'District Level'}</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>{language === 'id' ? 'Tingkat Provinsi' : 'Provincial Level'}</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>{language === 'id' ? 'Tingkat Nasional (OSN)' : 'National Level (OSN)'}</span>
                      <span className="font-bold">65%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
