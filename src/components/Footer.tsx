/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Award, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export default function Footer({ language, onNavigate }: FooterProps) {
  const t = translations[language].footer;
  const navT = translations[language].nav;

  const quickLinks = [
    { id: 'home', label: navT.home },
    { id: 'competitions', label: navT.competitions },
    { id: 'cbt', label: navT.cbt },
    { id: 'about', label: navT.about },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo Identity segment (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <img 
                src="https://posi.id/images/Logo%20POSI%20(Pusat%20Olimpiade%20Sains%20Indonesia).png" 
                alt="POSI Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t.about}
            </p>
          </div>

          {/* Quick Links segment (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-l-4 border-blue-600 pl-3">
              {t.links}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-blue-500 hover:underline transition-all font-medium text-slate-400 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details segment (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-l-4 border-blue-600 pl-3">
              {t.contact}
            </h4>
            
            <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{t.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{t.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{t.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Foot footer brand copy line */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-center text-[10px] text-slate-500 font-medium">
          <p className="mb-2">{t.copyright}</p>
          <p className="text-[9px] text-slate-600">{language === 'id' ? 'Kloning Desain & Sistem POSI.id 100% Menggunakan Tailwind & React' : 'POSI.id Clone Platform 100% built with Tailwind & React'}</p>
        </div>
      </div>
    </footer>
  );
}
