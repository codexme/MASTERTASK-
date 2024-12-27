import React from 'react';

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Product Lead',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80',
    quote: 'Building the future of task management with AI.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Tech Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80',
    quote: 'Pushing the boundaries of what\'s possible with AI.',
  },
  {
    name: 'Emily Thompson',
    role: 'AI Research',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300&q=80',
    quote: 'Making AI accessible and practical for everyone.',
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full object-cover w-full h-full"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500 ring-offset-2"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-blue-500 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 italic">&ldquo;{member.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}