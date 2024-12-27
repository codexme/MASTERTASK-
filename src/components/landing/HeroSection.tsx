import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
}

export default function HeroSection({ onGetStarted, onViewPricing }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80"
          alt="Team collaboration"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Task Management Powered by{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience the future of productivity with AI-driven task management.
          Let our intelligent system help you organize, prioritize, and complete tasks efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={onViewPricing}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200"
          >
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
}