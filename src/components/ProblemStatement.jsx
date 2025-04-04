import React from 'react';
import Hologram from './Hologram';

const ProblemStatement = () => {
  return (
    <section id="problem" className="section bg-gradient-light relative">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Problem statement text */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-darker">
              The Problem <span className="gradient-text">We Solve</span>
            </h2>
            <div className="space-y-4">
              <p className="text-text-primary font-medium leading-relaxed">
                Creating high-quality academic content is <span className="text-primary font-semibold">time-consuming</span> and often <span className="text-primary font-semibold">stressful</span>. Students and researchers face:
              </p>
              <ul className="space-y-3">
                {problemPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-text-primary font-medium">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 text-text-darker">
                Ready to Transform Your Content Creation?
              </h3>
              <p className="text-text-primary font-medium leading-relaxed">
                UNIGEN combines AI power with academic standards to revolutionize how you create research papers, presentations, and educational content.
              </p>
            </div>
          </div>
          
          {/* 3D Hologram illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <Hologram size="xl" color="primary" className="mt-6 mb-10 lg:mb-0">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l6.16-3.422a12 12 0 01.665 6.479A11.955 11.955 0 0112 20.9a11.955 11.955 0 01-6.824-2.998a12 12 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12 12 0 01.665 6.479A11.955 11.955 0 0112 20.9a11.955 11.955 0 01-6.824-2.998a12 12 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <h3 className="text-base font-semibold mt-4">AI-Powered Solution</h3>
              </div>
            </Hologram>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-l from-primary/5 to-transparent opacity-70 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

// Problem points
const problemPoints = [
  "Struggling with deadlines and multiple assignments at once",
  "Difficulty in structuring complex academic arguments",
  "Hours wasted formatting documents to meet specific standards",
  "Limited access to quality research sources and insights",
  "Writer's block when facing tough academic topics"
];

export default ProblemStatement;