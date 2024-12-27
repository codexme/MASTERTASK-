import React from 'react';

const faqs = [
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards and PayPal.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No, all plans are subscription-based and can be cancelled at any time.',
  },
  {
    question: 'What happens when I reach my task limit?',
    answer: 'You will be notified when you are approaching your limit. You can upgrade your plan at any time to increase your limit.',
  },
  {
    question: 'How does the AI functionality work?',
    answer: 'Our AI analyzes your work patterns and task history to provide intelligent suggestions for task prioritization, scheduling, and automation.',
  },
];

export default function PricingFAQ() {
  return (
    <div className="mt-24 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((faq) => (
          <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}