/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, User, ArrowRight, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface BlogProps {
  language: Language;
}

export default function Blog({ language }: BlogProps) {
  const t = translations[language].blog;

  const posts = [
    {
      id: 1,
      title: {
        id: 'Tips Menghadapi Olimpiade Sains Nasional (OSN) 2026',
        en: 'Essential Tips for Preparing National Science Olympiad (OSN) 2026',
      },
      desc: {
        id: 'Pelajari strategi jitu dari peraih medali emas tentang cara membagi waktu belajar, menguasai konsep fisika dan matematika dengan cepat.',
        en: 'Learn top preparation hacks from gold medalists on organizing study schedules and mastering advanced core science concepts.',
      },
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
      date: '2026-06-25',
      author: 'Admin POSI',
    },
    {
      id: 2,
      title: {
        id: 'Silabus Resmi Kompetisi Sains Puspresnas Terbaru',
        en: 'Official Syllabus for Upcoming Puspresnas Science Olympiads',
      },
      desc: {
        id: 'Unduh kisi-kisi dan cakupan materi ujian olimpiade terbaru jenjang SD, SMP, SMA terlengkap dari Pusat Prestasi Nasional.',
        en: 'Download updated curriculum maps and testing benchmarks for Elementary, Junior, and Senior High School levels.',
      },
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
      date: '2026-06-20',
      author: 'Academic Team',
    },
    {
      id: 3,
      title: {
        id: 'Pentingnya Simulasi CBT untuk Melatih Mental Juara',
        en: 'Why CBT Online Practice is Key to Building Medalist Confidence',
      },
      desc: {
        id: 'Menghadapi ujian komputer membutuhkan ketenangan dan manajemen durasi yang solid. Simak mengapa CBT simulator sangat krusial.',
        en: 'Solving advanced problems under computer timers requires emotional control and layout familiarity. Explore why CBT simulators help.',
      },
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      date: '2026-06-15',
      author: 'Fahruroji, S.Pd',
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
            {language === 'id' ? 'Info Akademis' : 'Academic Board'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-500 text-sm">
            {t.subtitle}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="h-48 overflow-hidden bg-slate-200">
                  <img
                    src={post.image}
                    alt={post.title[language]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title[language]}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.desc[language]}
                  </p>
                </div>
              </div>

              {/* Action CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => alert(language === 'id' ? 'Artikel lengkap segera hadir di platform POSI!' : 'Full article soon active on POSI portals!')}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>{t.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
