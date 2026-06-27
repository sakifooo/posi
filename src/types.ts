/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'id' | 'en';

export interface Event {
  id: string;
  title: { id: string; en: string };
  image: string;
  date: string;
  type: 'online' | 'offline';
  price: number;
  level: 'SD' | 'SMP' | 'SMA' | 'Guru' | 'Umum';
  subjects: string[];
  registeredCount: number;
}

export interface Book {
  id: string;
  title: string;
  image: string;
  level: 'SD' | 'SMP' | 'SMA' | 'Semua';
  subject: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Question {
  id: number;
  subject: string;
  level: 'SD' | 'SMP' | 'SMA';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CBTResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  subject: string;
  level: string;
  participantName: string;
  date: string;
}
