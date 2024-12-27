import React from 'react';

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export default function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
        Monthly
      </span>
      <button
        onClick={() => onToggle(!isYearly)}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500"
      >
        <span className="sr-only">Toggle billing period</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            isYearly ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
          Yearly
        </span>
        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          Save 10%
        </span>
      </div>
    </div>
  );
}