import React, { useState } from 'react';

const DocumentGenerator = () => {
  const [documentType, setDocumentType] = useState('resume');
  const [prompt, setPrompt] = useState('');
  const [preview, setPreview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const documentTypes = [
    { id: 'resume', name: 'Resume/CV' },
    { id: 'cover-letter', name: 'Cover Letter' },
    { id: 'business-proposal', name: 'Business Proposal' },
    { id: 'report', name: 'Report' },
    { id: 'marketing-copy', name: 'Marketing Copy' },
    { id: 'social-media', name: 'Social Media Post' },
    { id: 'email', name: 'Email Template' },
    { id: 'blog-post', name: 'Blog Post' },
  ];

  const handleGenerateDocument = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Mock generation process - would be replaced with actual API call
    setTimeout(() => {
      const generatedContent = mockGenerateDocument(documentType, prompt);
      setPreview(generatedContent);
      setIsGenerating(false);
    }, 1500);
  };

  // Mock function for document generation
  const mockGenerateDocument = (type, promptText) => {
    const templates = {
      'resume': `# Professional Resume\n\n## Professional Summary\n${promptText}\n\n## Experience\n- Led cross-functional team of 8 engineers\n- Increased efficiency by 34% through process improvements\n- Managed $1.2M budget for technical infrastructure\n\n## Skills\n- Project Management\n- Team Leadership\n- Strategic Planning\n- Budget Administration`,
      
      'cover-letter': `Dear Hiring Manager,\n\nI am writing to express my interest in the position at your company. ${promptText}\n\nThrough my previous experience, I've developed strong skills in communication and problem-solving that would make me an excellent fit for this role. I'm particularly drawn to your company's mission to innovate in the industry.\n\nI look forward to discussing how my background aligns with your needs.\n\nSincerely,\nYour Name`,
      
      'business-proposal': `# Business Proposal\n\n## Executive Summary\n${promptText}\n\n## Market Analysis\nThe target market shows significant growth potential with a CAGR of 12% over the next five years.\n\n## Financial Projections\n- Year 1: $120,000\n- Year 2: $350,000\n- Year 3: $780,000\n\n## Implementation Timeline\n1. Phase 1: Research & Development (Q1)\n2. Phase 2: Initial Launch (Q2)\n3. Phase 3: Market Expansion (Q3-Q4)`,
      
      'report': `# Analytical Report\n\n## Summary\n${promptText}\n\n## Key Findings\n1. Primary metrics improved by 28% year-over-year\n2. Customer satisfaction scores reached 92%\n3. New market opportunities identified in the western region\n\n## Recommendations\n- Increase investment in digital marketing channels\n- Implement customer feedback loop\n- Explore partnerships with complementary businesses`,
      
      'marketing-copy': `# Marketing Copy\n\n## Headline\n${promptText}\n\n## Body Copy\nDiscover the difference that sets us apart. Our innovative approach delivers results that speak for themselves. With industry-leading solutions designed for your specific needs, we're transforming expectations and setting new standards.\n\n## Call to Action\nExperience the future today. Contact us for a free consultation.`,
      
      'social-media': `# Social Media Post\n\n📣 ${promptText}\n\nWe're excited to share our journey with you! Join us and be part of something extraordinary. \n\n#Innovation #Growth #Community\n\nLearn more: www.example.com`,
      
      'email': `Subject: Important Update: ${promptText}\n\nDear [Customer],\n\nWe hope this email finds you well. We wanted to inform you about some exciting changes coming to our service.\n\n${promptText}\n\nIf you have any questions, please don't hesitate to contact our support team.\n\nBest regards,\nThe Team`,
      
      'blog-post': `# ${promptText}\n\n## Introduction\nIn today's rapidly evolving landscape, staying ahead requires both insight and adaptability. This post explores key trends and offers practical strategies for implementation.\n\n## Main Points\n1. The changing dynamics of the industry\n2. How new technologies are reshaping possibilities\n3. Strategies for adaptation and growth\n\n## Conclusion\nBy embracing these changes and implementing the suggested approaches, organizations can not only survive but thrive in this new era.`
    };
    
    return templates[type] || `# Generated Document\n\n${promptText}\n\nThis is a generated document based on your prompt. In a real application, this would be generated using an AI model or template system.`;
  };

  return (
    <section id="document-generator" className={`py-16 ${darkMode ? 'bg-dark-bg' : 'bg-light-secondary'} relative overflow-hidden`}>
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Create Your Document
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Select a document type, describe what you want, and our platform will generate a customized document for you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Document Creation Form */}
          <div className={`lg:w-1/2 ${darkMode ? 'bg-dark-secondary' : 'bg-white'} rounded-xl p-6 border ${darkMode ? 'border-dark-tertiary' : 'border-gray-200'}`}>
            <div className="mb-6">
              <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Document Type
              </label>
              <select 
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className={`w-full p-3 rounded-lg ${
                  darkMode 
                    ? 'bg-dark-tertiary text-white border-dark-tertiary focus:border-neon-blue/50' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500'
                } border focus:outline-none focus:ring-1 ${
                  darkMode ? 'focus:ring-neon-blue/50' : 'focus:ring-blue-500'
                }`}
              >
                {documentTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                What would you like in your document?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                placeholder="Describe what you want in your document..."
                className={`w-full p-3 rounded-lg ${
                  darkMode 
                    ? 'bg-dark-tertiary text-white border-dark-tertiary focus:border-neon-blue/50' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500'
                } border focus:outline-none focus:ring-1 ${
                  darkMode ? 'focus:ring-neon-blue/50' : 'focus:ring-blue-500'
                }`}
              ></textarea>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={handleGenerateDocument}
                disabled={isGenerating || !prompt.trim()}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isGenerating || !prompt.trim()
                    ? 'bg-gray-600 cursor-not-allowed'
                    : darkMode
                      ? 'bg-neon-blue/20 text-white border border-neon-blue shadow-glow hover:bg-neon-blue/30'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                {isGenerating ? 'Generating...' : 'Generate Document'}
              </button>
              
              <div className="flex items-center">
                <span className={`mr-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {darkMode ? 'Dark' : 'Light'} Mode
                </span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full flex items-center ${
                    darkMode ? 'bg-dark-tertiary' : 'bg-gray-200'
                  } p-1 transition-colors`}
                >
                  <div className={`w-4 h-4 rounded-full transform transition-transform ${
                    darkMode 
                      ? 'bg-neon-blue translate-x-6' 
                      : 'bg-white translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Document Preview */}
          <div className={`lg:w-1/2 ${darkMode ? 'bg-dark-secondary' : 'bg-white'} rounded-xl p-6 border ${darkMode ? 'border-dark-tertiary' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Document Preview
              </h3>
              
              <div className="flex gap-2">
                <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-dark-tertiary' : 'hover:bg-gray-100'} transition-colors`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </button>
                <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-dark-tertiary' : 'hover:bg-gray-100'} transition-colors`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`h-80 overflow-auto p-4 rounded-lg ${
              darkMode 
                ? 'bg-dark-tertiary text-gray-300' 
                : 'bg-gray-50 text-gray-700'
            } whitespace-pre-wrap`}>
              {isGenerating ? (
                <div className="flex justify-center items-center h-full">
                  <div className={`animate-pulse text-center ${darkMode ? 'text-neon-blue' : 'text-blue-600'}`}>
                    <svg className="w-10 h-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Generating your document...</p>
                  </div>
                </div>
              ) : preview ? (
                preview.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className={`text-xl font-bold mb-2 mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{line.substring(3)}</h2>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-2">{line}</p>;
                  }
                })
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <svg className={`w-16 h-16 mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your document preview will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentGenerator; 