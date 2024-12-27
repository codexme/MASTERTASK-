export interface PricingTier {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    description: 'Perfect for getting started',
    features: [
      '10 Tasks',
      'Basic AI Functions',
      'Task Management',
      'File Attachments',
      'Email Support',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 20,
    description: 'Best for professionals',
    features: [
      '100 Tasks',
      'Advanced AI Features',
      'Priority Support',
      'Team Collaboration',
      'Custom Categories',
      'Analytics Dashboard',
      'API Access',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 50,
    description: 'For serious productivity',
    features: [
      'Unlimited Tasks',
      'Premium AI Features',
      '24/7 Priority Support',
      'Advanced Team Features',
      'Custom Integrations',
      'Advanced Analytics',
      'Dedicated Account Manager',
      'Custom Training',
    ],
  },
];

export function calculatePrice(monthlyPrice: number, isYearly: boolean): {
  price: string;
  period: string;
} {
  if (monthlyPrice === 0) {
    return { price: '$0', period: 'forever' };
  }

  if (isYearly) {
    const yearlyPrice = Math.round(monthlyPrice * 12 * 0.9); // 10% discount
    return { price: `$${yearlyPrice}`, period: 'per year' };
  }

  return { price: `$${monthlyPrice}`, period: 'per month' };
}