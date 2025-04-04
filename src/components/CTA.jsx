import { useState, useRef, useEffect } from 'react'

function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  })
  
  const [activeTab, setActiveTab] = useState('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
      })
      
      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }
  
  const tabs = [
    { id: 'contact', label: 'Contact Us' },
    { id: 'demo', label: 'Request Demo' },
  ]
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section py-24 bg-dark-secondary relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,_rgba(0,242,255,0.1),_transparent_60%)]"></div>
        <div className="absolute right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,_rgba(0,242,255,0.05),_transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Content Creation?
          </h2>
          <p className="text-lg text-gray-300">
            Get started with UNIGEN HUB today and experience the future of AI-powered content generation.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto bg-dark-bg/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-neon-blue/20 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-neon-blue border-b-2 border-neon-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Contact Form */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-secondary border border-gray-700 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-secondary border border-gray-700 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div className={activeTab === 'demo' ? 'block' : 'hidden'}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="company">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-secondary border border-gray-700 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    placeholder="Your company"
                    required={activeTab === 'demo'}
                  />
                </div>
                
                <div className={activeTab === 'demo' ? 'block' : 'hidden'}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="role">
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="w-full px-4 py-3 rounded-lg bg-dark-secondary border border-gray-700 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    required={activeTab === 'demo'}
                  >
                    <option value="">Select your role</option>
                    <option value="executive">Executive</option>
                    <option value="manager">Manager</option>
                    <option value="individual">Individual Contributor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="message">
                    {activeTab === 'contact' ? 'Message' : 'What are you interested in?'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-dark-secondary border border-gray-700 text-white focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    placeholder={activeTab === 'contact' ? 'Your message...' : 'Tell us about your needs...'}
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary min-w-[150px] flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center">
                      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Submitted!
                    </span>
                  ) : (
                    activeTab === 'contact' ? 'Send Message' : 'Request Demo'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA 