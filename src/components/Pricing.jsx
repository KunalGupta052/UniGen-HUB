import React from 'react';

const PricingTier = ({ title, price, features, isPopular }) => {
  return (
    <div className={`bg-dark-secondary border ${isPopular ? 'border-neon-blue shadow-glow' : 'border-dark-tertiary'} rounded-xl p-6 flex flex-col h-full relative ${isPopular ? 'transform hover:scale-105' : 'hover:border-neon-blue/30'} transition-all duration-300`}>
      {isPopular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <span className="bg-neon-blue text-dark-bg text-xs font-bold py-1 px-3 rounded-full shadow-glow">
            Most Popular
          </span>
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold text-white">${price}</span>
        {price > 0 && <span className="text-gray-400 ml-1">/month</span>}
      </div>
      <div className="flex-grow">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="h-5 w-5 text-neon-blue flex-shrink-0 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
        isPopular
          ? 'bg-neon-blue/20 text-white border border-neon-blue shadow-glow hover:bg-neon-blue/30'
          : 'bg-dark-tertiary text-white border border-dark-tertiary hover:border-neon-blue/30'
      }`}>
        {price === 0 ? 'Start Free Trial' : 'Subscribe Now'}
      </button>
    </div>
  );
};

const Pricing = () => {
  const pricingTiers = [
    {
      title: 'Free',
      price: 0,
      features: [
        '5 AI generations per day',
        'Basic content templates',
        'Standard output quality',
        'Email support',
      ],
      isPopular: false,
    },
    {
      title: 'Pro',
      price: 29,
      features: [
        'Unlimited AI generations',
        'All advanced templates',
        'Premium output quality',
        'Priority support',
        'Custom branding',
        'API access',
      ],
      isPopular: true,
    },
    {
      title: 'Enterprise',
      price: 99,
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integration',
        'Advanced analytics',
        'SLA guarantees',
        'Team collaboration',
        'Custom AI model training',
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg">
            Choose the plan that works best for you and your team. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              title={tier.title}
              price={tier.price}
              features={tier.features}
              isPopular={tier.isPopular}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Need a custom plan for your specific needs?
          </p>
          <button className="bg-dark-tertiary text-white py-3 px-6 rounded-lg hover:bg-dark-tertiary/80 transition-colors border border-dark-tertiary">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 