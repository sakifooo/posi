/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Globe, ShoppingBag, BookOpen, User, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  cartCount,
  onCartClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language].nav;

  const menuItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'tutorial', label: t.tutorial },
    { id: 'competitions', label: t.competitions },
    { id: 'news', label: t.news },
    { id: 'results', label: t.results },
    { id: 'leaderboard', label: t.leaderboard },
    { id: 'careers', label: t.careers },
    { id: 'contact', label: t.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 transition-all">
      {/* Top Promotional Mini-bar matching the sleek color theme */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-2 px-6 flex justify-between items-center text-center font-medium border-b border-slate-800">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded-full text-[9px] tracking-wider">LIVE</span>
          <span>
            {language === 'id' 
              ? 'Pendaftaran Kompetisi Sains Indonesia (KSI) 2026 Kini Dibuka!' 
              : 'Registration for Indonesia Science Competition (KSI) 2026 is Now Open!'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-400">
          <span>{translations[language].footer.phone}</span>
          <span>|</span>
          <span>{translations[language].footer.email}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo Identity */}
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="https://posi.id/images/Logo%20POSI%20(Pusat%20Olimpiade%20Sains%20Indonesia).png" 
              alt="POSI Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 h-full">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`h-full px-1 flex items-center text-sm font-semibold transition-all duration-200 border-b-2 relative -bottom-[1px] cursor-pointer ${
                  currentTab === item.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-blue-600 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions & Custom Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Login / Sign In Button */}
            <button
              id="nav-action-login"
              onClick={() => setCurrentTab('cbt')}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:text-blue-600 active:translate-y-[1px] transition-all cursor-pointer gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide h-3.5 w-3.5"><path d="m10 17 5-5-5-5"></path><path d="M15 12H3"></path><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path></svg>
              <span>{t.login}</span>
            </button>

            {/* Register Button */}
            <button
              id="nav-action-register"
              onClick={() => setCurrentTab('cbt')}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-blue-600 border border-blue-500 rounded-full shadow-md hover:bg-blue-700 active:translate-y-[1px] transition-all cursor-pointer gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide h-3.5 w-3.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
              <span>{t.register}</span>
            </button>
          </div>

          {/* Mobile elements (Translate, Burger) */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 border border-slate-200/50 focus:outline-none transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide Down Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-inner animate-fadeIn">
          <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  currentTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 pb-2 border-t border-slate-100 px-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setCurrentTab('cbt');
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide h-4 w-4"><path d="m10 17 5-5-5-5"></path><path d="M15 12H3"></path><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path></svg>
                <span>{t.login}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentTab('cbt');
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                <span>{t.register}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
