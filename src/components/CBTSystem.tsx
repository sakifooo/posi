/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Award, BookOpen, Clock, AlertCircle, CheckCircle2, RefreshCw, ChevronLeft, ChevronRight, HelpCircle, FileText, Printer, Sparkles } from 'lucide-react';
import { Language, Question, CBTResult } from '../types';
import { translations } from '../translations';

interface CBTSystemProps {
  language: Language;
}

export default function CBTSystem({ language }: CBTSystemProps) {
  const t = translations[language].cbt;
  const [examState, setExamState] = useState<'setup' | 'running' | 'result'>('setup');
  
  // Setup configuration
  const [studentName, setStudentName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'SD' | 'SMP' | 'SMA'>('SD');
  const [selectedSubject, setSelectedSubject] = useState('Matematika');

  // Exam game state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({}); // questionId -> optionIndex
  const [doubtfulQuestions, setDoubtfulQuestions] = useState<{ [key: number]: boolean }>({}); // questionId -> isDoubtful
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [finalResult, setFinalResult] = useState<CBTResult | null>(null);

  // Subject options based on level
  const subjectsByLevel = {
    SD: ['Matematika', 'IPA'],
    SMP: ['Matematika', 'IPA', 'IPS'],
    SMA: ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Astronomi', 'Ekonomi'],
  };

  // Comprehensive Question Bank (Gold level science questions)
  const questionBank: Question[] = [
    // SD Matematika
    {
      id: 1,
      subject: 'Matematika',
      level: 'SD',
      question: 'Di dalam sebuah kotak terdapat 10 bola merah dan 15 bola putih. Jika 5 bola merah ditambahkan ke dalam kotak, berapa persentase bola merah di dalam kotak sekarang?',
      options: ['40%', '50%', '60%', '45%'],
      correctAnswer: 1, // 50%
      explanation: 'Jumlah bola merah awal = 10, bola putih = 15. Total bola awal = 25. Ditambahkan 5 bola merah, sehingga bola merah menjadi 15, dan total bola menjadi 30. Persentase bola merah sekarang = (15 / 30) * 100% = 50%.',
    },
    {
      id: 2,
      subject: 'Matematika',
      level: 'SD',
      question: 'Pak Fauzi mengendarai mobil dengan kecepatan rata-rata 60 km/jam. Jika ia menempuh jarak 150 km, berapa jam waktu perjalanan yang ia perlukan?',
      options: ['2 Jam', '2.5 Jam', '3 Jam', '1.5 Jam'],
      correctAnswer: 1, // 2.5
      explanation: 'Rumus Waktu (t) = Jarak (s) / Kecepatan (v). Maka t = 150 km / 60 km/jam = 2.5 jam.',
    },
    // SD IPA
    {
      id: 3,
      subject: 'IPA',
      level: 'SD',
      question: 'Bagian mata yang berfungsi untuk mengatur jumlah cahaya yang masuk ke dalam bola mata adalah...',
      options: ['Pupil', 'Retina', 'Kornea', 'Lensa Mata'],
      correctAnswer: 0, // Pupil
      explanation: 'Pupil bertindak sebagai celah lingkaran yang dapat menyusut atau melebar untuk mengontrol intensitas cahaya yang mengenai retina mata.',
    },
    // SMP IPA
    {
      id: 4,
      subject: 'IPA',
      level: 'SMP',
      question: 'Sebuah balok bermassa 5 kg ditarik dengan gaya horizontal sebesar 20 N. Jika koefisien gesek kinetik antara balok dengan lantai adalah 0.2 (g = 10 m/s²), tentukan percepatan balok tersebut!',
      options: ['1 m/s²', '2 m/s²', '3 m/s²', '4 m/s²'],
      correctAnswer: 1, // 2
      explanation: 'Gaya gesek kinetik (fk) = u * N = u * m * g = 0.2 * 5 * 10 = 10 N. Gaya bersih (F_net) = F - fk = 20 - 10 = 10 N. Hukum Newton II: a = F_net / m = 10 / 5 = 2 m/s².',
    },
    // SMA Fisika
    {
      id: 5,
      subject: 'Fisika',
      level: 'SMA',
      question: 'Sebuah kawat lurus panjang dialiri arus listrik sebesar 5 A. Hitung besar induksi magnetik pada titik yang berjarak 10 cm dari kawat tersebut! (u0 = 4pi x 10^-7 Wb/A.m)',
      options: ['10^-5 Tesla', '2 x 10^-5 Tesla', '4 x 10^-5 Tesla', '10^-6 Tesla'],
      correctAnswer: 0, // 10^-5
      explanation: 'Rumus induksi magnetik kawat lurus panjang: B = (u0 * I) / (2 * pi * a). B = (4 * pi * 10^-7 * 5) / (2 * pi * 0.1) = (20 * 10^-7) / 0.2 = 10^-5 Tesla.',
    },
    // SMA Kimia
    {
      id: 6,
      subject: 'Kimia',
      level: 'SMA',
      question: 'Unsur dengan nomor atom 17 dalam tabel periodik memiliki konfigurasi elektron terluar (valensi) sebesar...',
      options: ['3s2 3p5', '3s2 3p6', '2s2 2p5', '4s2 3d10 4p5'],
      correctAnswer: 0, // 3s2 3p5
      explanation: 'Nomor atom 17 adalah Klorin (Cl). Konfigurasi elektron: 1s2 2s2 2p6 3s2 3p5. Kulit terluar berada pada n=3, yaitu 3s2 3p5 dengan 7 elektron valensi.',
    },
  ];

  // Auto update subjects list when level changes
  useEffect(() => {
    const list = subjectsByLevel[selectedLevel];
    if (!list.includes(selectedSubject)) {
      setSelectedSubject(list[0]);
    }
  }, [selectedLevel]);

  // Exam timer logic
  useEffect(() => {
    if (examState !== 'running') return;
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, examState]);

  const handleStartExam = () => {
    if (!studentName.trim()) {
      alert(language === 'id' ? 'Mohon masukkan nama Anda terlebih dahulu!' : 'Please enter your name first!');
      return;
    }
    
    // Filter questions matching chosen config, or fall back to general ones
    let matched = questionBank.filter(
      (q) => q.level === selectedLevel && q.subject === selectedSubject
    );
    if (matched.length === 0) {
      matched = questionBank.filter((q) => q.level === selectedLevel);
    }
    if (matched.length === 0) {
      matched = [questionBank[0], questionBank[1]]; // general default fallback
    }

    setQuestions(matched);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setDoubtfulQuestions({});
    setTimeLeft(600); // 10 minutes
    setExamState('running');
  };

  const handleAnswerSelect = (optionIdx: number) => {
    const activeQ = questions[currentQuestionIdx];
    setUserAnswers((prev) => ({
      ...prev,
      [activeQ.id]: optionIdx,
    }));
  };

  const toggleDoubtful = () => {
    const activeQ = questions[currentQuestionIdx];
    setDoubtfulQuestions((prev) => ({
      ...prev,
      [activeQ.id]: !prev[activeQ.id],
    }));
  };

  const handleSubmitExam = () => {
    let score = 0;
    let correctCount = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === q.correctAnswer) {
        correctCount += 1;
      }
    });

    // Score is calculated as percentage
    score = Math.round((correctCount / questions.length) * 100);

    const resultObj: CBTResult = {
      score,
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      subject: selectedSubject,
      level: selectedLevel,
      participantName: studentName,
      date: new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setFinalResult(resultObj);
    setExamState('result');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-16 bg-slate-50 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SETUP SCREEN */}
        {examState === 'setup' && (
          <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 bg-blue-900 text-white text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl">
                <BookOpen className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-black">{t.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{t.subtitle}</p>
            </div>

            <div className="p-8 space-y-5">
              {/* Full Name field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t.participantLabel}</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                  placeholder="e.g. Ahmad Fauzi"
                />
              </div>

              {/* Levels & Subjects grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t.level}</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value as any)}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="SD">SD/MI</option>
                    <option value="SMP">SMP/MTs</option>
                    <option value="SMA">SMA/MA/SMK</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t.subject}</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    {subjectsByLevel[selectedLevel].map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleStartExam}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200/50 transition-all hover:-translate-y-0.5 mt-4 cursor-pointer"
              >
                {t.startTest}
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE EXAM RUNNING PORTAL */}
        {examState === 'running' && questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main Question Window (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              {/* CBT Header info */}
              <div className="px-6 py-4 bg-blue-900 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-amber-400 text-blue-950 px-2.5 py-1 text-[10px] font-black rounded-lg">
                    {selectedLevel} - {selectedSubject}
                  </span>
                  <span className="text-xs font-medium text-slate-200">
                    {timeLeft <= 0 ? 'Waktu Habis' : `${t.timeRemaining}: `}
                  </span>
                  <span className={`text-sm font-black flex items-center gap-1 ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
                    <Clock className="w-4 h-4" />
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="text-right text-xs">
                  <span className="font-bold text-white">{studentName}</span>
                </div>
              </div>

              {/* Active question panel */}
              <div className="p-8 space-y-6">
                <div>
                  <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block mb-1">
                    {t.questionNo} {currentQuestionIdx + 1}
                  </span>
                  <p className="text-base font-bold text-slate-800 leading-relaxed">
                    {questions[currentQuestionIdx].question}
                  </p>
                </div>

                {/* Multiple choice Options list */}
                <div className="space-y-3">
                  {questions[currentQuestionIdx].options.map((opt, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                    const isSelected = userAnswers[questions[currentQuestionIdx].id] === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-500'
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="text-xs font-semibold leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Action panel */}
                <div className="flex flex-wrap justify-between items-center pt-6 border-t border-slate-100 gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2.5 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{t.prevQuestion}</span>
                    </button>

                    <button
                      onClick={() => setCurrentQuestionIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                      disabled={currentQuestionIdx === questions.length - 1}
                      className="px-4 py-2.5 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer flex items-center gap-1"
                    >
                      <span>{t.nextQuestion}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Ragu-ragu (Doubtful status) Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer bg-amber-50/50 hover:bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={doubtfulQuestions[questions[currentQuestionIdx].id] || false}
                      onChange={toggleDoubtful}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-amber-300"
                    />
                    <span className="text-xs font-bold text-amber-800">
                      {language === 'id' ? 'Ragu-Ragu' : 'Doubtful'}
                    </span>
                  </label>

                  <button
                    onClick={() => {
                      if (confirm(t.confirmSubmit)) {
                        handleSubmitExam();
                      }
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    {t.submitTest}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Question Palette sidebar (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 space-y-5">
              <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <FileText className="w-4.5 h-4.5 text-blue-600" />
                <span>Navigasi Soal Ujian</span>
              </h3>

              {/* Palette Grid numbers */}
              <div className="grid grid-cols-5 gap-2.5">
                {questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isDoubtful = doubtfulQuestions[q.id] || false;
                  const isActive = currentQuestionIdx === idx;

                  let boxColor = 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100';
                  if (isDoubtful) {
                    boxColor = 'bg-amber-400 text-blue-950 border-amber-500';
                  } else if (isAnswered) {
                    boxColor = 'bg-emerald-600 text-white border-emerald-700';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`h-11 rounded-xl border-2 font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center ${boxColor} ${
                        isActive ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Status Map legends */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-[10px] font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-emerald-600 border border-emerald-700 rounded-md"></span>
                  <span>{language === 'id' ? 'Sudah Dijawab' : 'Answered'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-amber-400 border border-amber-500 rounded-md"></span>
                  <span>{language === 'id' ? 'Ragu-Ragu' : 'Doubtful'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-slate-50 border border-slate-200 rounded-md"></span>
                  <span>{language === 'id' ? 'Belum Dijawab' : 'Unanswered'}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* RESULTS SCREEN */}
        {examState === 'result' && finalResult && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Core Statistics grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Score card */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 border border-slate-100/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
                
                <div className="space-y-1 z-10">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">{t.scoreLabel}</span>
                  <h3 className="text-5xl font-black">{finalResult.score}</h3>
                </div>

                <div className="pt-6 border-t border-white/10 text-xs text-slate-300 z-10 flex justify-between items-center">
                  <span>{finalResult.participantName}</span>
                  <span>{finalResult.date}</span>
                </div>
              </div>

              {/* Detailed count cards */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl flex items-center gap-5">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">{t.correctLabel}</p>
                  <p className="text-2xl font-black text-slate-800">
                    {finalResult.correctAnswers} / {finalResult.totalQuestions}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl flex items-center gap-5">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">{language === 'id' ? 'Predikat' : 'Predicate'}</p>
                  <p className="text-2xl font-black text-slate-800">
                    {finalResult.score >= 80 ? 'Emas / Gold' : finalResult.score >= 60 ? 'Perak / Silver' : 'Lulus / Passed'}
                  </p>
                </div>
              </div>
            </div>

            {/* HIGH-FIDELITY PRINTABLE DYNAMIC CERTIFICATE OF ACHIEVEMENT */}
            <div className="bg-white rounded-[2rem] border-8 border-double border-blue-950 p-8 sm:p-12 shadow-2xl relative overflow-hidden max-w-4xl mx-auto" id="printable-certificate">
              {/* Luxury gold and royal blue borders */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-blue-900/10 rounded-full blur-2xl"></div>
              
              <div className="text-center space-y-6 relative z-10">
                {/* Certificate header */}
                <div className="flex flex-col items-center space-y-2">
                  <Award className="w-16 h-16 text-amber-400" />
                  <span className="text-[11px] font-black tracking-[0.3em] text-blue-950 uppercase">PUSAT OLIMPIADE SAINS INDONESIA</span>
                  <div className="h-0.5 w-48 bg-amber-400"></div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 uppercase tracking-wide">
                    {t.certificateTitle}
                  </h3>
                  <p className="text-xs font-serif text-slate-400 italic">No: CERT/{finalResult.subject.toUpperCase()}/{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>

                <div className="space-y-2.5 max-w-2xl mx-auto">
                  <p className="text-xs text-slate-500 font-medium">
                    {t.certificateSubtitle}
                  </p>
                  <p className="text-2xl font-black text-blue-900 border-b-2 border-slate-100 pb-2 w-fit mx-auto px-10">
                    {finalResult.participantName}
                  </p>
                </div>

                <div className="max-w-md mx-auto grid grid-cols-2 gap-4 text-xs">
                  <div className="text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{t.subject}</p>
                    <p className="font-extrabold text-slate-800">{finalResult.subject} ({finalResult.level})</p>
                  </div>
                  <div className="text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{language === 'id' ? 'Nilai / Akreditasi' : 'Score / Grade'}</p>
                    <p className="font-extrabold text-slate-800">{finalResult.score} / A</p>
                  </div>
                </div>

                {/* Director Signatures & Stamp block */}
                <div className="flex justify-between items-end pt-8 max-w-2xl mx-auto">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">{language === 'id' ? 'DIREKTUR POSI' : 'POSI DIRECTOR'}</p>
                    <div className="h-10"></div>
                    <p className="text-xs font-black text-slate-800 border-t border-slate-300 pt-1 px-4">Fahruroji, S.Pd</p>
                  </div>

                  {/* Red stamp logo shape */}
                  <div className="relative flex items-center justify-center w-16 h-16 border-4 border-dashed border-red-500 rounded-full">
                    <span className="text-[9px] font-black text-red-500 uppercase rotate-12">POSI MEDAN</span>
                  </div>

                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">{language === 'id' ? 'TANGGAL' : 'DATE'}</p>
                    <div className="h-10"></div>
                    <p className="text-xs font-bold text-slate-800 border-t border-slate-300 pt-1 px-4">{finalResult.date}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Detailed questions solutions guide */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>{t.explanationTitle}</span>
              </h3>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const selectedOptIdx = userAnswers[q.id];
                  const isCorrect = selectedOptIdx === q.correctAnswer;

                  return (
                    <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-xs font-black text-blue-900 uppercase">Soal {idx + 1}</span>
                        <span className={`px-2.5 py-1 text-[10px] font-black rounded-full uppercase ${
                          isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {isCorrect ? 'Benar / Correct' : 'Salah / Incorrect'}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-800">{q.question}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Jawaban Anda</p>
                          <p className={`font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                            {selectedOptIdx !== undefined ? `${String.fromCharCode(65 + selectedOptIdx)}. ${q.options[selectedOptIdx]}` : 'Tidak dijawab'}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Jawaban Benar</p>
                          <p className="font-semibold text-emerald-600">
                            {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 rounded-xl p-4 text-xs text-slate-600">
                        <p className="font-bold text-blue-900 mb-1">Pembahasan Pembelajaran:</p>
                        <p className="leading-relaxed font-medium">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Back to Home action */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setExamState('setup')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{language === 'id' ? 'Ulangi Simulasi' : 'Restart Test'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl shadow cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'id' ? 'Cetak Hasil / Sertifikat' : 'Print Certificate'}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
