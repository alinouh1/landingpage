'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import FAQ from '../../components/FAQ';
import '../../components/animations.css';
import '../../components/FAQ.css';

export default function ProtectedPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = 'growth1234@';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (password === correctPassword) {
        setIsAuthenticated(true);
      } else {
        setError('كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  const detailedStrategy = [
    {
      title: "Detailed Positioning Strategy",
      icon: "🎯",
      items: [
        {
          id: "1",
          number: "01",
          question: "What is the detailed brand positioning statement?",
          answer: "<strong>Snooze Brand Positioning Statement:</strong><br/><br/>For modern Saudi women who value both comfort and elegance in their home wear, Snooze provides premium loungewear crafted from the world's finest fabrics. Unlike mass-market alternatives that prioritize either comfort or style, Snooze delivers both without compromise, combining traditional Arabic aesthetic sensibilities with contemporary design principles to create pieces that make women feel confident, relaxed, and beautiful in their own homes."
        },
        {
          id: "2",
          number: "02",
          question: "How do we position against specific competitors?",
          answer: "<strong>Competitive Positioning:</strong><br/><br/><ul><li><strong>vs. International Brands:</strong> More culturally relevant, better understanding of Saudi preferences, localized customer service</li><li><strong>vs. Local Mass Market:</strong> Superior quality, premium positioning, sophisticated designs</li><li><strong>vs. Luxury Brands:</strong> More accessible pricing, approachable brand, practical luxury</li></ul>Our sweet spot is 'accessible luxury' - premium quality at mid-to-high price points."
        },
        {
          id: "3",
          number: "03",
          question: "What are the key positioning pillars?",
          answer: "<strong>Core Positioning Pillars:</strong><br/><br/><ul><li><strong>Quality Excellence:</strong> Uncompromising focus on fabric quality and craftsmanship</li><li><strong>Cultural Relevance:</strong> Designs that resonate with Saudi aesthetics and values</li><li><strong>Modern Elegance:</strong> Contemporary designs that respect tradition</li><li><strong>Sustainable Luxury:</strong> Eco-conscious production without sacrificing quality</li><li><strong>Personal Experience:</strong> Individualized customer journey</li></ul>These pillars guide all brand decisions and communications."
        }
      ]
    },
    {
      title: "Advanced UVP Development",
      icon: "�",
      items: [
        {
          id: "4",
          number: "04",
          question: "What are the specific value propositions for different customer segments?",
          answer: "<strong>Segment-Specific UVPs:</strong><br/><br/><ul><li><strong>For Working Professionals:</strong> 'Transition seamlessly from work to home comfort without sacrificing style'</li><li><strong>For Mothers:</strong> 'Feel beautiful and comfortable while managing your busy family life'</li><li><strong>For Young Women:</strong> 'Express your personal style even in your most relaxed moments'</li><li><strong>For Luxury Seekers:</strong> 'Experience true luxury in everyday home wear'</li></ul>Each segment receives tailored messaging while maintaining brand consistency."
        },
        {
          id: "5",
          number: "05",
          question: "How do we communicate UVP across different channels?",
          answer: "<strong>Channel-Specific UVP Communication:</strong><br/><br/><ul><li><strong>Website:</strong> Detailed fabric information, quality guarantees, sustainability story</li><li><strong>Social Media:</strong> Visual demonstrations of comfort, lifestyle integration, customer testimonials</li><li><strong>Email:</strong> Personalized recommendations, exclusive fabric insights, care tips</li><li><strong>Advertising:</strong> Quick impact statements ('Comfort Meets Elegance'), visual quality demonstrations</li></ul>Consistent core message with channel-appropriate depth and format."
        }
      ]
    },
    {
      title: "Target Audience Deep Dive",
      icon: "👥",
      items: [
        {
          id: "6",
          number: "06",
          question: "What are the detailed audience personas?",
          answer: "<strong>Detailed Customer Personas:</strong><br/><br/><strong>Persona 1: The Professional Woman (30-40)</strong><br/>Working professional, values quality and efficiency, wants to look good even at home, willing to invest in quality.<br/><br/><strong>Persona 2: The Modern Mother (28-38)</strong><br/>Busy mom, needs practical comfort, still wants to feel stylish, values easy care and durability.<br/><br/><strong>Persona 3: The Luxury Seeker (25-45)</strong><br/>High disposable income, appreciates premium brands, values exclusivity and quality over price.<br/><br/><strong>Persona 4: The Trendsetter (22-32)</strong><br/>Fashion-conscious, wants to stay current, values brand image and social proof."
        },
        {
          id: "7",
          number: "07",
          question: "What are the audience journey touchpoints?",
          answer: "<strong>Customer Journey Touchpoints:</strong><br/><br/><ul><li><strong>Awareness:</strong> Social media ads, influencer content, word of mouth, PR features</li><li><strong>Consideration:</strong> Website browsing, social media engagement, reviews, comparison shopping</li><li><strong>Purchase:</strong> Website checkout, customer service contact, payment processing</li><li><strong>Post-Purchase:</strong> Order confirmation, shipping updates, unboxing experience</li><li><strong>Loyalty:</strong> Loyalty program, exclusive offers, referral opportunities, re-engagement</li></ul>Each touchpoint optimized for conversion and brand experience."
        }
      ]
    },
    {
      title: "Marketing Funnel Optimization",
      icon: "📊",
      items: [
        {
          id: "8",
          number: "08",
          question: "What are the specific tactics for each funnel stage?",
          answer: "<strong>Funnel Stage Tactics:</strong><br/><br/><strong>Awareness Stage:</strong><ul><li>Influencer partnerships with macro and micro influencers</li><li>Social media advertising with lookalike audiences</li><li>Content marketing focusing on comfort and lifestyle</li><li>PR and media outreach in lifestyle publications</li></ul><br/><strong>Consideration Stage:</strong><ul><li>Retargeting ads based on website behavior</li><li>Email nurturing with product education</li><li>Social proof through customer testimonials</li><li>Detailed product information and comparisons</li></ul><br/><strong>Conversion Stage:</strong><ul><li>Abandoned cart email sequences</li><li>Limited-time offers and urgency</li><li>Streamlined checkout process</li><li>Multiple payment options</li></ul>"
        },
        {
          id: "9",
          number: "09",
          question: "How do we measure funnel performance?",
          answer: "<strong>Funnel KPIs and Metrics:</strong><br/><br/><ul><li><strong>Awareness:</strong> Reach, impressions, CTR, social engagement rate</li><li><strong>Interest:</strong> Website traffic, time on site, pages per session, bounce rate</li><li><strong>Consideration:</strong> Add to cart rate, product page views, email signups</li><li><strong>Intent:</strong> Checkout initiation, cart abandonment rate</li><li><strong>Purchase:</strong> Conversion rate, AOV, total revenue</li><li><strong>Loyalty:</strong> Repeat purchase rate, CLV, NPS score</li></ul>Regular analysis and optimization based on these metrics."
        }
      ]
    },
    {
      title: "Content Strategy Deep Dive",
      icon: "📝",
      items: [
        {
          id: "10",
          number: "10",
          question: "What is the detailed content calendar?",
          answer: "<strong>Monthly Content Calendar:</strong><br/><br/><strong>Week 1:</strong> Product focus (new arrivals, bestsellers)<br/><strong>Week 2:</strong> Educational content (fabric care, styling tips)<br/><strong>Week 3:</strong> Lifestyle content (customer stories, day-in-life)<br/><strong>Week 4:</strong> Engagement content (Q&A, polls, user-generated content)<br/><br/><strong>Daily Breakdown:</strong><br/>- Monday: Product spotlight<br/>- Tuesday: Educational content<br/>- Wednesday: Customer story<br/>- Thursday: Behind-the-scenes<br/>- Friday: Weekend inspiration<br/>- Saturday: User-generated content<br/>- Sunday: Week recap and tease"
        },
        {
          id: "11",
          number: "11",
          question: "What are the content formats and specifications?",
          answer: "<strong>Content Format Specifications:</strong><br/><br/><strong>Static Posts:</strong><br/>- 1080x1080 or 1080x1350 pixels<br/>- Brand colors and fonts<br/>- High-quality product photography<br/>- Consistent filters and editing<br/><br/><strong>Carousels:</strong><br/>- 1080x1080 per slide<br/>- 5-7 slides maximum<br/>- Clear call-to-action on final slide<br/>- Educational or storytelling format<br/><br/><strong>Reels:</strong><br/>- 9:16 aspect ratio<br/>- 15-60 seconds<br/>- Trending audio when appropriate<br/>- Captions in first 3 seconds<br/>- Clear value proposition"
        }
      ]
    },
    {
      title: "Advanced Advertising Strategy",
      icon: "📱",
      items: [
        {
          id: "12",
          number: "12",
          question: "What are the detailed ad campaign structures?",
          answer: "<strong>Campaign Structure by Platform:</strong><br/><br/><strong>Instagram:</strong><ul><li>Campaign 1: Brand Awareness (broad targeting)</li><li>Campaign 2: Product Consideration (interest-based)</li><li>Campaign 3: Conversion (retargeting)</li><li>Campaign 4: Lookalike Audiences (based on purchasers)</li></ul><br/><strong>Facebook:</strong><ul><li>Campaign 1: Demographic targeting (25-45, Saudi women)</li><li>Campaign 2: Interest targeting (fashion, home decor, luxury)</li><li>Campaign 3: Retargeting (website visitors, engagers)</li><li>Campaign 4: Customer retention (existing customers)</li></ul><br/><strong>TikTok:</strong><ul><li>Campaign 1: Viral content testing</li><li>Campaign 2: Influencer collaborations</li><li>Campaign 3: Trending format experiments</li></ul>"
        },
        {
          id: "13",
          number: "13",
          question: "What are the ad creative best practices?",
          answer: "<strong>Ad Creative Best Practices:</strong><br/><br/><ul><li><strong>Visuals:</strong> High-quality product photography, lifestyle imagery, consistent branding</li><li><strong>Copy:</strong> Clear value proposition, strong CTA, benefit-focused language</li><li><strong>Testing:</strong> A/B test creatives, headlines, CTAs, audiences</li><li><strong>Optimization:</strong> Regular refresh based on performance, seasonal adjustments</li><li><strong>Compliance:</strong> Platform guidelines, cultural sensitivity, truth in advertising</li></ul>Continuous testing and optimization for maximum ROI."
        }
      ]
    }
  ];

  const featuredStrategy = {
    id: "featured",
    question: "What is the overall marketing strategy timeline?",
    answer: "<strong>6-Month Marketing Strategy Timeline:</strong><br/><br/><strong>Month 1-2: Foundation</strong><br/>- Complete brand assets and guidelines<br/>- Build content library<br/>- Set up tracking and analytics<br/>- Initial influencer partnerships<br/><br/><strong>Month 3-4: Launch</strong><br/>- Full campaign launch<br/>- Aggressive advertising<br/>- PR and media outreach<br/>- Launch events and partnerships<br/><br/><strong>Month 5-6: Optimization</strong><br/>- Performance analysis and optimization<br/>- Scale successful campaigns<br/>- Build customer loyalty program<br/>- Plan expansion strategies<br/><br/><strong>Key Milestones:</strong> Launch week, first 1,000 customers, first major influencer partnership, holiday season campaign."
  };

  if (!isAuthenticated) {
    return (
      <div className="sidebar-container">
        <Sidebar activeItem="exclusive" />
        
        <div className="main-content" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '40px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '60px 40px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(40, 53, 62, 0.15)',
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
            direction: 'rtl'
          }} className="fade-in-up">
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#003B0C',
              marginBottom: '10px',
              letterSpacing: '2px'
            }}>
              SNOOZE
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#023404',
              marginBottom: '30px',
              fontWeight: '600'
            }}>
              Detailed Strategy
            </h2>
            <p style={{
              color: '#02441D',
              marginBottom: '30px',
              fontSize: '0.95rem',
              lineHeight: '1.6'
            }}>
              أدخلي كلمة المرور للوصول إلى المحتوى التفصيلي لاستراتيجية التسويق.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخلي كلمة المرور"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e7e7e7',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    direction: 'ltr'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF8500'}
                  onBlur={(e) => e.target.style.borderColor = '#e7e7e7'}
                />
              </div>
              
              {error && (
                <div style={{
                  color: '#dc3545',
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  padding: '10px',
                  backgroundColor: '#fee',
                  borderRadius: '6px',
                  border: '1px solid #fcc'
                }} className="shake">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#003B0C',
                  color: '#dfebf7',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isLoading ? 0.7 : 1
                }}
                className="button-hover"
              >
                {isLoading ? 'جاري التحقق...' : 'عرض الاستراتيجية'}
              </button>
            </form>
            
            <p style={{
              marginTop: '30px',
              fontSize: '0.85rem',
              color: '#02441D'
            }}>
              تلميح: كلمة المرور هي "growth1234@"
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-container">
      <Sidebar activeItem="exclusive" />
      
      <div className="main-content" style={{
        padding: '60px 40px',
        backgroundColor: '#dfebf7',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }} className="fade-in-up">
          <h1 style={{
            fontSize: '2.5rem',
            color: '#003B0C',
            marginBottom: '15px',
            fontWeight: '700'
          }}>
            Detailed Marketing Strategy
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#023404',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Comprehensive deep-dive into Snooze marketing strategy - execution details, timelines, and performance metrics
          </p>
        </div>

        {/* Featured Strategy */}
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto 60px'
        }}>
          <div style={{
            background: '#0a3206',
            borderRadius: '20px',
            padding: '50px',
            color: '#dfebf7',
            marginBottom: '40px'
          }} className="fade-in-up">
            <div style={{
              fontSize: '2rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <span>⭐</span>
              <span style={{ fontWeight: '600' }}>Strategy Timeline Overview</span>
            </div>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '25px',
              lineHeight: '1.4'
            }}>
              {featuredStrategy.question}
            </div>
            <div style={{
              lineHeight: '1.8',
              fontSize: '1.05rem',
              opacity: 0.95
            }} dangerouslySetInnerHTML={{ __html: featuredStrategy.answer }} />
          </div>
        </div>

        {/* Detailed FAQ */}
        <FAQ 
          categories={detailedStrategy}
          showSearch={true}
          layout="cards"
        />

        {/* Additional Resources */}
        <div style={{
          marginTop: '80px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '50px',
          boxShadow: '0 8px 30px rgba(40, 53, 62, 0.12)'
        }} className="fade-in-up">
          <h3 style={{
            fontSize: '2rem',
            color: '#003B0C',
            marginBottom: '40px',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Strategy Implementation Resources
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                title: "Campaign Templates",
                description: "Ready-to-use ad campaign templates and creatives",
                icon: "�"
              },
              {
                title: "Content Calendar",
                description: "Detailed monthly content calendar with deadlines",
                icon: "�"
              },
              {
                title: "Performance Dashboard",
                description: "KPI tracking templates and analytics setup",
                icon: "📊"
              },
              {
                title: "Team Guidelines",
                description: "Role-specific guidelines and best practices",
                icon: "👥"
              }
            ].map((resource, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '30px',
                backgroundColor: '#dfebf7',
                borderRadius: '15px',
                transition: 'transform 0.3s ease'
              }} className="hover-lift">
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px'
                }}>
                  {resource.icon}
                </div>
                <h4 style={{
                  fontSize: '1.3rem',
                  color: '#003B0C',
                  marginBottom: '15px',
                  fontWeight: '600'
                }}>
                  {resource.title}
                </h4>
                <p style={{
                  color: '#023404',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}