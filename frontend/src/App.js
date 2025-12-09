// ============================================
// frontend/src/App.js - FIXED VERSION
// ============================================

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(0);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all feature cards and sections
    document.querySelectorAll('.feature-card, .benefit-card, .use-case-item').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Chatbot functions
  const toggleAIChatbot = () => {
    setChatbotOpen(!chatbotOpen);
    const chatbot = document.getElementById('aiChatbot');
    const button = document.getElementById('aiChatbotButton');
    
    if (chatbot && button) {
      chatbot.classList.toggle('active');
      button.classList.toggle('active');
      button.textContent = chatbotOpen ? '🤖' : '✕';
    }
  };

  const sendAIMessage = () => {
    const input = document.getElementById('aiChatInput');
    if (input && input.value.trim()) {
      alert('Message sent: ' + input.value);
      input.value = '';
    }
  };

  const handleAIChatKeypress = (e) => {
    if (e.key === 'Enter') {
      sendAIMessage();
    }
  };

  const insertEmoji = () => {
    const input = document.getElementById('aiChatInput');
    if (input) {
      input.value += '😊';
    }
  };

  const sendQuickMessage = (msg) => {
    const input = document.getElementById('aiChatInput');
    if (input) {
      input.value = msg;
      sendAIMessage();
    }
  };

  const handleLogin = () => {
    alert('Login functionality - Connect to backend auth!');
  };

  const handleGetStarted = () => {
    alert('Get Started - Redirect to signup!');
  };

  const handleScheduleDemo = () => {
    alert('Schedule Demo - Open demo form!');
  };

  const handleUseCaseClick = (index) => {
    setActiveUseCase(index);
    document.querySelectorAll('.use-case-item').forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  const useCases = [
    {
      icon: '🎓',
      title: 'Internship Project Tracking',
      category: 'Students',
      description: 'Track and manage your internship projects from start to finish with comprehensive tools designed for students.'
    },
    {
      icon: '📚',
      title: 'Capstone / Final-Year Projects',
      category: 'Students',
      description: 'Complete your final year projects with guidance and collaboration tools tailored for academic success.'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      category: 'Students',
      description: 'Work seamlessly with your team members using real-time collaboration and communication tools.'
    },
    {
      icon: '💼',
      title: 'Portfolio Building',
      category: 'Students',
      description: 'Build an impressive portfolio showcasing your projects and achievements to potential employers.'
    },
    {
      icon: '🏛️',
      title: 'Centralized Internship Management',
      category: 'Institutions',
      description: 'Manage all student internships from a single platform with comprehensive tracking and reporting.'
    },
    {
      icon: '👨‍🏫',
      title: 'Faculty-Student Collaboration',
      category: 'Institutions',
      description: 'Enable professors to guide multiple projects, review submissions, and provide structured feedback.'
    },
    {
      icon: '✅',
      title: 'Compliance & Accreditation Support',
      category: 'Institutions',
      description: 'Maintain digital records and documentation required for accreditation and compliance standards.'
    },
    {
      icon: '📊',
      title: 'Skill Analytics & Insights',
      category: 'Institutions',
      description: 'Gain insights into student performance and skill development across various projects and programs.'
    }
  ];

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">C</div>
            <span>CollabSpace</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#journey">Project Journey</a>
            <a href="#use-cases">Use Cases</a>
            <a href="#why-choose">Why Choose</a>
          </div>
          <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            🚀 Trusted by 10,000+ Students & Institutions
          </div>
          <h1 className="hero-title">Seamless Project Management</h1>
          <p className="hero-description">
            Track your internship and academic projects from inception to completion. 
            Our intuitive interface helps you stay organized, meet deadlines, and collaborate 
            effectively with your team and mentors.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div className="feature-text">
                <h4>Seamless Project Management</h4>
                <p>Easily track your internship or academic projects from start to finish, all in one place</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-mockup">
          <div className="mockup-image">
            <div className="board-mockup">
              <div className="mockup-header">
                <div className="mockup-title">🎯 Boards Roadmap Planning</div>
                <div className="share-btn">🔗 Share</div>
              </div>
              <div className="task-table">
                <div className="task-row" style={{opacity: 0.7, fontWeight: 600}}>
                  <div>Name</div>
                  <div>Status</div>
                  <div>Type</div>
                  <div>Priority</div>
                  <div>Assignee</div>
                  <div>Due Date</div>
                </div>
                <div className="task-row">
                  <div>Boards PRD card view</div>
                  <div><span className="status-badge status-feature">FEATURE</span></div>
                  <div><span className="status-badge status-in-progress">NEW</span></div>
                  <div>🔴 P0</div>
                  <div>Empty</div>
                  <div>January 17</div>
                </div>
                <div className="task-row">
                  <div>Card dependencies</div>
                  <div><span className="status-badge status-in-progress">READY FOR</span></div>
                  <div><span className="status-badge status-in-progress">EPC at</span></div>
                  <div>🟡 P1</div>
                  <div>Empty</div>
                  <div>February</div>
                </div>
                <div className="task-row">
                  <div>File attachments</div>
                  <div><span className="status-badge status-in-progress">IN REVIEW</span></div>
                  <div><span className="status-badge status-feature">USER STORY</span></div>
                  <div>🟢 P2</div>
                  <div>Empty</div>
                  <div>December</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <div className="section-badge">POWERFUL FEATURES</div>
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-description">
            Comprehensive tools designed for modern project collaboration and management
          </p>
        </div>

        <div className="features-grid">
          {[
            { icon: '📊', title: 'Real-Time Analytics', desc: 'Monitor project progress with interactive dashboards and detailed insights into team performance and milestone completion.' },
            { icon: '🔄', title: 'Live Collaboration', desc: 'Work together in real-time with instant updates, live chat, and seamless file sharing across your entire team.' },
            { icon: '📁', title: 'File Management', desc: 'Upload, organize, and share files effortlessly with drag-and-drop functionality and cloud storage integration.' },
            { icon: '👥', title: 'Team Collaboration', desc: 'Invite team members, assign roles, and manage permissions to ensure smooth project coordination.' },
            { icon: '⏰', title: 'Deadline Tracking', desc: 'Never miss a deadline with automated reminders, calendar integration, and progress notifications.' },
            { icon: '🌐', title: 'Subdomain Projects', desc: 'Each project gets its own custom subdomain for easy sharing and professional presentation.' },
            { icon: '🔒', title: 'Secure & Private', desc: 'Enterprise-grade security with encrypted data, role-based access, and privacy controls.' },
            { icon: '📱', title: 'Mobile Responsive', desc: 'Access your projects anywhere, anytime with our fully responsive design for all devices.' },
            { icon: '🎨', title: 'Custom Workflows', desc: 'Create custom boards, lists, and workflows that match your team\'s unique process.' }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Enhanced Section */}
      <section className="ai-section">
        <div className="ai-container">
          <div className="ai-content">
            <div className="hero-badge">
              🤖 AI-POWERED
            </div>
            <h2>AI-Enhanced Learning</h2>
            <p>
              Leverage smart AI tools to organize tasks, manage timelines, and receive intelligent suggestions. 
              Our AI assistant helps you stay on track and optimize your learning journey.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">🤖</div>
                <div className="feature-text">
                  <h4>AI-Enhanced Collaboration</h4>
                  <p>Use smart AI tools to organize tasks, manage timelines, and stay on top of your deliverables</p>
                </div>
              </div>
            </div>
          </div>

          <div className="comment-mockup">
            <div className="comment-header">
              <span>🎯 B-139</span>
              <span className="comment-badge">🎓 UI Review</span>
            </div>

            <div style={{ background: 'var(--gray-50)', padding: '15px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', color: 'var(--gray-700)' }}>
              Option 1 provides an example for easy access, while Option 2 combines it in the dropdown menu.
            </div>

            <div style={{ fontWeight: 700, color: 'var(--gray-900)', marginBottom: '20px', fontSize: '15px' }}>
              💬 Comments
            </div>

            {[
              { name: 'Kristi Terry', text: 'Once this is finished up reach out to the CEO for approval.', gradient: 'linear-gradient(135deg, var(--primary-blue), var(--accent-purple))' },
              { name: 'Esther Howard', text: 'The info here is really solid. Let\'s explore this more.', gradient: 'linear-gradient(135deg, #10b981, #14b8a6)' },
              { name: 'Courtney Henry', text: 'I love how this is looking. Great work everyone. @all', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' }
            ].map((comment, index) => (
              <div key={index} className="comment-item">
                <div className="comment-avatar" style={{ background: comment.gradient }}></div>
                <div className="comment-content">
                  <div className="comment-author">{comment.name} <span className="comment-time">10:43 AM</span></div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              </div>
            ))}

            <div className="new-messages">New Messages</div>

            {[
              { name: 'Marvin McKinney', text: 'Can you send this over to the marketing department @Josh?', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
              { name: 'Josh Aaron', text: 'Sure, thanks for looking into it @marvin.', gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)' }
            ].map((comment, index) => (
              <div key={index} className="comment-item">
                <div className="comment-avatar" style={{ background: comment.gradient }}></div>
                <div className="comment-content">
                  <div className="comment-author">{comment.name} <span className="comment-time">10:43 AM</span></div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '20px' }}>
              <input type="text" placeholder="Reply..." style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '10px', fontSize: '14px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mentor-Guided Section */}
      <section className="features-section" style={{ background: 'var(--gray-50)' }}>
        <div className="ai-container">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '30px' }}>😮</div>
            <h2 style={{ fontSize: '56px', fontWeight: '900', color: 'var(--gray-900)', marginBottom: '25px' }}>
              Mentor-Guided Collaboration
            </h2>
            <p style={{ fontSize: '20px', color: 'var(--gray-600)', maxWidth: '800px', margin: '0 auto 40px' }}>
              Connect directly with faculty and industry mentors for guidance and feedback. 
              Multiple view options help you and your mentors track progress effectively across different project phases.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px', flexWrap: 'wrap' }}>
          {['Board', 'List', 'Calendar', 'Gallery'].map((view, index) => (
            <button 
              key={index}
              className="filter-btn" 
              style={{ 
                background: index === 3 ? 'var(--accent-orange)' : 'var(--gray-200)', 
                color: index === 3 ? 'white' : 'var(--gray-700)', 
                padding: '12px 24px', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              {view}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '900px', margin: '60px auto' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--gray-900)', marginBottom: '5px' }}>📊 Company Goals & OKRs</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>FY24 target goals and OKRs</p>
              </div>
              <button className="share-btn" style={{ background: 'var(--primary-blue)', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>🔗 Share</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { icon: '👥', text: '🎯 Add 10 new customers to the EU', color: 'var(--gray-700)' },
                { icon: '📢', text: '🎓 Generate more Marketing Qualified Leads (MQLs)', color: 'var(--gray-700)' },
                { icon: '🎯', text: '👤 Hit company global sales target', color: 'var(--gray-700)' },
                { icon: '📊', text: '📉 Improve customer NPS score', color: '#ef4444' },
                { icon: '✈️', text: '📈 Increase customer retention', color: '#f59e0b' },
                { icon: '📱', text: '📈 Increase user signups by 30%', color: '#f59e0b' }
              ].map((goal, index) => (
                <div key={index} style={{ background: 'var(--gray-50)', borderRadius: '15px', padding: '25px', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>{goal.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: goal.color, marginBottom: '5px' }}>{goal.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="use-cases-section">
        <div className="section-header">
          <div className="section-badge">REAL-WORLD APPLICATIONS</div>
          <h2 className="section-title">Real-World Use Cases 🙌</h2>
          <p className="section-description">
            See how CollabSpace transforms project management for students, institutions, and industry partners.
          </p>
        </div>

        <div className="use-cases-grid">
          <div className="use-cases-list">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className={`use-case-item ${index === activeUseCase ? 'active' : ''}`}
                onClick={() => handleUseCaseClick(index)}
              >
                <div className="use-case-icon">{useCase.icon}</div>
                <div className="use-case-text">
                  <h4>{useCase.title}</h4>
                  <p>{useCase.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="use-case-detail">
            <div className="section-badge" style={{ display: 'inline-block', marginBottom: '20px' }}>
              {useCases[activeUseCase].category}
            </div>
            <h3>{useCases[activeUseCase].title}</h3>
            <p>{useCases[activeUseCase].description}</p>
            <div className="use-case-features">
              <p>
                Empower faculty to efficiently manage multiple student projects with streamlined review processes, 
                structured feedback systems, and progress monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="why-choose" className="benefits-section">
        <div className="benefits-container">
          <div className="section-header">
            <div className="section-badge">BENEFITS</div>
            <h2 className="section-title">Why Choose <span style={{ color: 'var(--primary-blue)' }}>CollabSpace?</span></h2>
            <p className="section-description">
              Tailored solutions for every stakeholder in the academic ecosystem
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card blue">
              <div className="benefit-for">FOR</div>
              <h3 className="benefit-title">Students</h3>
              <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                Transform your academic journey into career success
              </div>
              <div className="benefit-list">
                {[
                  { icon: '📈', title: 'Structured Growth', desc: 'Manage all projects in one place' },
                  { icon: '👥', title: 'Mentor Access', desc: 'Direct faculty & industry guidance' },
                  { icon: '🤖', title: 'AI Assistance', desc: 'Smart suggestions & automation' },
                  { icon: '🚀', title: 'Career Edge', desc: 'Build impressive portfolios' }
                ].map((item, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-item-icon">{item.icon}</div>
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="benefit-cta" onClick={handleGetStarted}>Start Your Journey</button>
            </div>

            <div className="benefit-card teal">
              <div className="benefit-for">FOR</div>
              <h3 className="benefit-title">Institutions</h3>
              <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                Streamline project management across your institution
              </div>
              <div className="benefit-list">
                {[
                  { icon: '📊', title: 'Centralized Analytics', desc: 'Track all students & projects' },
                  { icon: '🤝', title: 'Seamless Coordination', desc: 'Connect faculty, mentors & students' },
                  { icon: '✅', title: 'Accreditation Ready', desc: 'Digital records for compliance' },
                  { icon: '📈', title: 'Scalable System', desc: 'From class to university-wide' },
                  { icon: '💰', title: 'Cost Efficient', desc: 'Reduce administrative overhead' }
                ].map((item, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-item-icon">{item.icon}</div>
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="benefit-cta" onClick={handleScheduleDemo}>Schedule Demo</button>
            </div>

            <div className="benefit-card orange">
              <div className="benefit-for">FOR</div>
              <h3 className="benefit-title">Industry</h3>
              <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                Connect with future talent through real projects
              </div>
              <div className="benefit-list">
                {[
                  { icon: '🎯', title: 'Talent Pipeline', desc: 'Direct access to skilled students' },
                  { icon: '⚡', title: 'Faster Hiring', desc: 'Evaluate through real work' },
                  { icon: '📊', title: 'Real-Time Tracking', desc: 'Monitor project progress' },
                  { icon: '💬', title: 'Easy Collaboration', desc: 'Seamless communication tools' },
                  { icon: '🌉', title: 'Bridge the Gap', desc: 'Shape skills to your needs' }
                ].map((item, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-item-icon">{item.icon}</div>
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="benefit-cta" onClick={handleGetStarted}>Partner With Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {[
            { number: '10K+', label: 'Active Students' },
            { number: '500+', label: 'Partner Institutions' },
            { number: '95%', label: 'Success Rate' },
            { number: '100+', label: 'Industry Partners' }
          ].map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Projects?</h2>
        <p>Join thousands of students and institutions already using CollabSpace</p>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={handleGetStarted}>Get Started Free</button>
          <button className="cta-button secondary" onClick={handleScheduleDemo}>Schedule a Demo</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">C</div>
              <span>CollabSpace</span>
            </div>
            <p>The ultimate platform for seamless project collaboration with real-time features and advanced analytics.</p>
          </div>

          {[
            { title: 'Product', links: ['Features', 'Use Cases', 'Pricing', 'Integrations'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Resources', links: ['Documentation', 'Help Center', 'Community', 'API'] }
          ].map((section, index) => (
            <div key={index} className="footer-links">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}><a href={`/${link.toLowerCase().replace(' ', '-')}`}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          © 2025 CollabSpace. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </footer>

      {/* AI Chatbot */}
      <div className="ai-chatbot-container" id="aiChatbot">
        <div className="ai-chatbot-header">
          <div className="ai-chatbot-header-content">
            <div className="ai-bot-avatar">🤖</div>
            <div className="ai-bot-info">
              <h3>CollabSpace AI Assistant</h3>
              <div className="ai-bot-status">
                <span className="status-dot"></span>
                Online - Ready to help!
              </div>
            </div>
          </div>
          <button className="ai-chatbot-close" onClick={toggleAIChatbot}>×</button>
        </div>

        <div className="ai-chatbot-messages" id="aiChatMessages">
          <div className="ai-welcome-message">
            <h4>👋 Welcome to CollabSpace AI!</h4>
            <p>I'm here to help you with project management, team collaboration, and answer any questions you have about CollabSpace.</p>
          </div>
        </div>

        <div className="ai-typing-indicator" id="aiTypingIndicator">
          <div className="ai-message-avatar" style={{ background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-purple))', color: 'white' }}>
            🤖
          </div>
          <div className="ai-typing-dots">
            <div className="ai-typing-dot"></div>
            <div className="ai-typing-dot"></div>
            <div className="ai-typing-dot"></div>
          </div>
        </div>

        <div className="ai-quick-actions">
          <div className="ai-quick-actions-label">Quick Actions:</div>
          <div className="ai-quick-buttons">
            <button className="ai-quick-button" onClick={() => sendQuickMessage('How do I create a project?')}>
              📝 Create Project
            </button>
            <button className="ai-quick-button" onClick={() => sendQuickMessage('Tell me about features')}>
              ✨ Features
            </button>
            <button className="ai-quick-button" onClick={() => sendQuickMessage('How does file sharing work?')}>
              📁 File Sharing
            </button>
            <button className="ai-quick-button" onClick={() => sendQuickMessage('Pricing information')}>
              💰 Pricing
            </button>
          </div>
        </div>

        <div className="ai-chatbot-input">
          <div className="ai-input-wrapper">
            <input
              type="text"
              id="aiChatInput"
              placeholder="Ask me anything..."
              onKeyPress={handleAIChatKeypress}
            />
            <button className="ai-input-emoji" onClick={insertEmoji}>😊</button>
          </div>
          <button className="ai-send-button" id="aiSendButton" onClick={sendAIMessage}>
            ➤
          </button>
        </div>
      </div>

      <button className="ai-chatbot-button" id="aiChatbotButton" onClick={toggleAIChatbot}>
        🤖
      </button>
    </div>
  );
}

export default App;