import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import PricingCard from './PricingCard';
import PricingFAQ from './PricingFAQ';
import PricingToggle from './PricingToggle';
import AuthForm from '../auth/AuthForm';
import { pricingTiers, calculatePrice } from '../../utils/pricing';

export default function PricingPage() {
  const [showAuth, setShowAuth] = React.useState(false);
  const [isYearly, setIsYearly] = React.useState(false);
  const { user } = useAuthStore();

  if (user) return null;
  if (showAuth) return <AuthForm />;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your needs. All plans include our core features.
          </p>
        </div>

        {/* Pricing Toggle */}
        <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => {
            const { price, period } = calculatePrice(tier.monthlyPrice, isYearly);
            return (
              <PricingCard
                key={tier.name}
                name={tier.name}
                price={price}
                period={period}
                description={tier.description}
                features={tier.features}
                highlighted={tier.highlighted}
                onSelect={() => setShowAuth(true)}
              />
            );
          })}
        </div>

        {/* FAQ Section */}
        <PricingFAQ />

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            30-day money-back guarantee • Cancel anytime • No questions asked
          </p>
        </div>
      </div>
    </div>
  );
}