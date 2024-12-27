import React from 'react';
import { CheckCircle, Star } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  onSelect: () => void;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl bg-white p-8 shadow-lg border transition-all hover:scale-105 ${
        highlighted
          ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
          : 'border-gray-200'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1">
            <Star className="h-4 w-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-x-2">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500">/{period}</span>
        </div>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`mt-8 w-full rounded-lg px-4 py-3 text-center font-medium transition-all ${
          highlighted
            ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {name === 'Free' ? 'Get Started' : 'Subscribe Now'}
      </button>
    </div>
  );
}