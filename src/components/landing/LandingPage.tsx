import React from 'react';
import { Bot, Sparkles, Clock, Shield, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import AuthForm from '../auth/AuthForm';
import PricingPage from '../pricing/PricingPage';
import HeroSection from './HeroSection';
import TeamSection from './TeamSection';

export default function LandingPage() {
  const [showAuth, setShowAuth] = React.useState(false);
  const [showPricing, setShowPricing] = React.useState(false);
  const { user } = useAuthStore();

  if (user) return null;
  if (showAuth) return <AuthForm />;
  if (showPricing) return <PricingPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TaskMaster AI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPricing(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                Pricing
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection 
        onGetStarted={() => setShowAuth(true)}
        onViewPricing={() => setShowPricing(true)}
      />

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Intelligent Features for Smart Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-6 w-6 text-blue-500" />,
                title: 'AI-Powered Insights',
                description:
                  'Get intelligent suggestions for task prioritization and time management based on your work patterns.',
              },
              {
                icon: <Clock className="h-6 w-6 text-blue-500" />,
                title: 'Smart Scheduling',
                description:
                  'Our AI automatically suggests optimal times for tasks based on your productivity patterns and calendar.',
              },
              {
                icon: <Shield className="h-6 w-6 text-blue-500" />,
                title: 'Secure & Private',
                description:
                  'Enterprise-grade security ensures your task data is always protected and private.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Task Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of teams already using TaskMaster AI to work smarter.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TaskMaster AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}