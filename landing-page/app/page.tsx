'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import './playbook.css';

const CORRECT_PASSWORD = 'growth1234@';

interface Section {
  id: string;
  number: string;
  title: string;
  tag: string;
  parentId?: string;
}

const SECTIONS: Section[] = [
  { id: 'positioning', number: '01', title: 'Positioning', tag: 'Who Growth Station is, and who it isn\'t' },
  { id: 'uvp', number: '02', title: 'Unique Value Proposition', tag: 'What makes Growth Station different' },
  { id: 'goals', number: '03', title: 'Goals Cascade', tag: 'Business → Marketing → Content → Social Media' },
  { id: 'audience', number: '04', title: 'Target Audience — Deep Level', tag: 'Ambitious business owners & decision-makers' },
  { id: 'funnel', number: '05', title: 'Marketing Funnel', tag: 'Customer journey stages' },
  { id: 'pillars', number: '06', title: 'Strategic Content Pillars', tag: 'Growth Station doesn\'t sell marketing — it sells strategic thinking' },
  { id: 'calendar', number: '07', title: 'Content Calendar', tag: '12-post launch calendar — captions, scripts & shoot notes' },
];

const SUBSECTIONS: Section[] = [
  { id: 'calendar-phase1', number: '07.1', title: 'Phase 1: Launch Posts', tag: 'Initial content for brand introduction', parentId: 'calendar' },
  { id: 'calendar-phase2', number: '07.2', title: 'Phase 2: Educational Content', tag: 'Strategy and educational posts', parentId: 'calendar' },
  { id: 'calendar-phase3', number: '07.3', title: 'Phase 3: Engagement & Viral', tag: 'Engagement and viral content', parentId: 'calendar' },
];

export default function GrowthStationPlaybook() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('positioning');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = password;
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (currentPassword === CORRECT_PASSWORD) {
        setIsAuthenticated(true);
      } else {
        setError('كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 200;
    
    // Check subsections first
    for (let i = SUBSECTIONS.length - 1; i >= 0; i--) {
      const section = document.getElementById(SUBSECTIONS[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(SUBSECTIONS[i].id);
        return;
      }
    }
    
    // Then check main sections
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = document.getElementById(SECTIONS[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(SECTIONS[i].id);
        break;
      }
    }
  }, []);

  // Set up scroll listener with passive option for better performance
  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Copy to clipboard function
  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  // Memoized navigation
  const navigation = useMemo(() => (
    <nav className="toc" id="toc">
      {SECTIONS.map((section) => (
        <div key={section.id}>
          <a
            href={`#${section.id}`}
            data-id={section.id}
            className={activeSection === section.id ? 'active' : ''}
          >
            <span className="num">{section.number}</span>
            {section.title}
          </a>
          {/* Add subsections for calendar */}
          {section.id === 'calendar' && SUBSECTIONS.map((subsection) => (
            <a
              key={subsection.id}
              href={`#${subsection.id}`}
              data-id={subsection.id}
              className={`subsection ${activeSection === subsection.id ? 'active' : ''}`}
            >
              <span className="num">{subsection.number}</span>
              {subsection.title}
            </a>
          ))}
        </div>
      ))}
    </nav>
  ), [activeSection]);

  // Print handler
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // PDF download handler
  const handleDownloadPDF = useCallback(async () => {
    const element = document.querySelector('.main') as HTMLElement;
    if (!element) return;

    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Growth_Station_Playbook.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Add PDF generation mode class
      document.body.classList.add('pdf-generation-mode');

      // Add a loading state
      const button = document.getElementById('btnPdf');
      if (button) {
        button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>Generating...';
        button.disabled = true;
      }

      html2pdf().set(opt).from(element).save().then(() => {
        // Remove PDF generation mode class
        document.body.classList.remove('pdf-generation-mode');
        
        // Reset button
        if (button) {
          button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></svg><span class="full">Download PDF</span>';
          button.disabled = false;
        }
      }).catch((error) => {
        console.error('PDF generation failed:', error);
        
        // Remove PDF generation mode class on error
        document.body.classList.remove('pdf-generation-mode');
        
        // Reset button on error
        if (button) {
          button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></svg><span class="full">Download PDF</span>';
          button.disabled = false;
        }
      });
    } catch (error) {
      console.error('Failed to load html2pdf:', error);
      alert('Failed to load PDF generation library. Please try again.');
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1>GROWTH STATION</h1>
          <p>أدخل كلمة المرور للوصول إلى استراتيجية التسويق</p>
          
          <form onSubmit={handleLogin}>
            <div className="login-input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="login-error">{error}</div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="playbook-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-dot"></span>
          <h1>GROWTH STATION</h1>
        </div>
        <div className="sidebar-sub">Brand &amp; Growth Playbook</div>

        <div className="sidebar-callout">
          <strong>Strategy before execution.</strong>
          <p>Growth beyond borders. This is the full positioning, audience, funnel, and content-pillar doc — every block below has its own copy button.</p>
        </div>

        {navigation}
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="topbar-title">
            <span className="dot"></span>
            Growth Station · Playbook 2026
          </div>
          <div className="topbar-actions">
            <button className="tb-btn" id="btnPdf" onClick={handleDownloadPDF} title="Save this page as a PDF">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12"/>
                <path d="M7 10l5 5 5-5"/>
                <path d="M4 21h16"/>
              </svg>
              <span className="full">Download PDF</span>
            </button>
            <button className="tb-btn primary" onClick={handlePrint} title="Print this page">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V2h12v7"/>
                <rect x="6" y="14" width="12" height="8"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/>
              </svg>
              <span className="full">Print</span>
            </button>
          </div>
        </div>

        <div className="hero">
          <div className="eyebrow">Cairo · Egypt &amp; GCC</div>
          <h1>Who is Growth Station?</h1>
          <p className="lede">A Cairo-based digital marketing agency built on a single, non-negotiable principle: strategy must come before execution. Every section below is copy-ready — click Copy on any card.</p>
        </div>

        {/* 01 POSITIONING */}
        <PositioningSection copiedId={copiedId} onCopy={copyToClipboard} />

        {/* 02 UVP */}
        <UVPSection copiedId={copiedId} onCopy={copyToClipboard} />

        {/* 03 GOALS CASCADE */}
        <GoalsSection copiedId={copiedId} onCopy={copyToClipboard} />

        {/* 04 TARGET AUDIENCE */}
        <AudienceSection copiedId={copiedId} onCopy={copyToClipboard} />

        {/* 05 MARKETING FUNNEL */}
        <FunnelSection copiedId={copiedId} onCopy={copyToClipboard} />

        {/* 06 CONTENT PILLARS */}
        <PillarsSection copiedId={copiedId} onCopy={copyToClipboard} />

        {/* 07 CONTENT CALENDAR */}
        <CalendarSection copiedId={copiedId} onCopy={copyToClipboard} />

        <footer>
          Growth Station · Brand & Growth Playbook — Strategy Before Execution, Growth Beyond Borders.
        </footer>
      </main>
    </div>
  );
}

// Memoized section components for better performance
const PositioningSection = ({ copiedId, onCopy }: { copiedId: string | null; onCopy: (text: string, id: string) => void }) => (
  <section className="block" id="positioning">
    <div className="block-head">
      <span className="idx">01</span>
      <div>
        <h2>Positioning</h2>
        <div className="tag">Who Growth Station is, and who it isn't</div>
      </div>
    </div>

    <CopyCard id="pos-1" title="Core principle" copiedId={copiedId} onCopy={onCopy}>
      Growth Station is a Cairo-based digital marketing agency built on a single, non-negotiable principle: strategy must come before execution. We are not a production house that simply posts content and calls it marketing. We are a Brand & Growth Partner — a strategic ally that integrates deeply into our clients' businesses to build powerful brands and drive measurable, sustainable growth.
    </CopyCard>

    <CopyCard id="pos-2" title="Origin &amp; who we serve" copiedId={copiedId} onCopy={onCopy}>
      Founded in Nasr City, Cairo, Growth Station serves small and medium enterprises (SMEs) and ambitious startups across Egypt and the GCC region. With a regional vision, we aim to support businesses in scaling beyond local markets and competing effectively in dynamic, fast-growing economies. We exist to bridge the gap between agencies that only execute and the kind of strategic marketing businesses in Egypt and the Gulf truly need to grow, scale, and lead.
    </CopyCard>
  </section>
);

const UVPSection = ({ copiedId, onCopy }: { copiedId: string | null; onCopy: (text: string, id: string) => void }) => (
  <section className="block" id="uvp">
    <div className="block-head">
      <span className="idx">02</span>
      <div>
        <h2>Unique Value Proposition</h2>
        <div className="tag">What makes Growth Station different</div>
      </div>
    </div>

    <PainQuote id="uvp-quote" label="The one-liner" copiedId={copiedId} onCopy={onCopy}>
      Strategy before execution. Growth beyond borders.
    </PainQuote>

    <CopyCard id="uvp-1" title="Full statement" copiedId={copiedId} onCopy={onCopy}>
      Growth Station is not just another marketing agency. We are a Brand & Growth Partner that seamlessly integrates strategy, execution, and measurable outcomes to drive sustainable business growth. We empower companies in Egypt and the GCC to scale, strengthen their brand positioning, and achieve consistent ROI.
    </CopyCard>

    <CopyCard id="uvp-2" title="Key differentiators" copiedId={copiedId} onCopy={onCopy}>
      <ul>
        <li>Strategy-driven approach: every campaign starts with a tailored growth plan.</li>
        <li>Focus on measurable outcomes, not vanity metrics.</li>
        <li>Expertise in both local and regional markets (Egypt + GCC).</li>
        <li>Emphasis on building long-term client partnerships over short-term engagements.</li>
      </ul>
    </CopyCard>
  </section>
);

const GoalsSection = ({ copiedId, onCopy }: { copiedId: string | null; onCopy: (text: string, id: string) => void }) => (
  <section className="block" id="goals">
    <div className="block-head">
      <span className="idx">03</span>
      <div>
        <h2>Goals Cascade</h2>
        <div className="tag">Business → Marketing → Content → Social Media — every post serves a real business purpose</div>
      </div>
    </div>

    <div className="grid-4">
      <CascadeCard id="goal-biz" label="🎯 Business Goals" copiedId={copiedId} onCopy={onCopy}>
        <ul>
          <li>Build a strong market reputation within 6–12 months</li>
          <li>Secure 3–5 high-quality clients in the initial phase</li>
          <li>Develop impactful, results-driven case studies</li>
          <li>Achieve break-even within the first 6 months</li>
          <li>Establish a solid portfolio to support expansion into Egypt and the GCC</li>
        </ul>
      </CascadeCard>

      <CascadeCard id="goal-mkt" label="📈 Marketing Goals" copiedId={copiedId} onCopy={onCopy}>
        <ul>
          <li>Position the agency as an expert in strategy-led growth</li>
          <li>Reach 100,000 targeted users within 3 months</li>
          <li>Generate 20–30 qualified leads within 4 months</li>
          <li>Build trust through insight-driven content</li>
          <li>Attract serious business owners with budget and growth mindset</li>
        </ul>
      </CascadeCard>

      <CascadeCard id="goal-content" label="🧠 Content Goals" copiedId={copiedId} onCopy={onCopy}>
        <ul>
          <li>Shift perception from execution to strategy-driven marketing</li>
          <li>Establish strong authority within 3 months</li>
          <li>Produce 30+ high-value content pieces</li>
          <li>Drive high engagement (saves &amp; shares)</li>
          <li>Use content as a core channel for organic lead generation</li>
          <li>Clearly differentiate Growth Station from execution-focused agencies</li>
        </ul>
      </CascadeCard>

      <CascadeCard id="goal-social" label="📱 Social Media Goals" copiedId={copiedId} onCopy={onCopy}>
        <ul>
          <li>Build a strong, consistent brand presence</li>
          <li>Maintain a steady posting cadence (3–5 posts weekly)</li>
          <li>Grow a targeted, high-quality audience</li>
          <li>Increase engagement rates over time</li>
          <li>Convert platforms into effective lead generation channels</li>
          <li>Showcase strategy, process, and results</li>
        </ul>
      </CascadeCard>
    </div>
  </section>
);

const AudienceSection = ({ copiedId, onCopy }: { copiedId: string | null; onCopy: (text: string, id: string) => void }) => (
  <section className="block" id="audience">
    <div className="block-head">
      <span className="idx">04</span>
      <div>
        <h2>Target Audience — Deep Level</h2>
        <div className="tag">Ambitious business owners &amp; decision-makers in Egypt and the GCC</div>
      </div>
    </div>

    <div className="grid-2">
      <CopyCard id="aud-demo" title="👤 Demographics" copiedId={copiedId} onCopy={onCopy}>
        <ul>
          <li><strong>Age:</strong> 25–45 years</li>
          <li><strong>Gender:</strong> Male &amp; Female</li>
          <li><strong>Education:</strong> University graduates or higher</li>
          <li><strong>Occupation:</strong> Business owners, founders/co-founders, marketing managers, managing directors</li>
          <li><strong>Income:</strong> Medium to high, capable of investing in professional marketing services</li>
          <li><strong>Business type:</strong> SMBs and established startups with validated products/services</li>
          <li><strong>Location:</strong> Egypt (Cairo — Nasr City, New Cairo, Heliopolis, Maadi; Alexandria; 6th of October) and GCC (Saudi Arabia, UAE, Kuwait — Riyadh, Jeddah, Dubai, Abu Dhabi, Kuwait City)</li>
        </ul>
      </CopyCard>

      <CopyCard id="aud-psycho" title="🧠 Psychographics" copiedId={copiedId} onCopy={onCopy}>
        <ul>
          <li><strong>Mindset:</strong> Growth-oriented, ambitious, results-driven</li>
          <li><strong>Core values:</strong> Business scalability and revenue growth, strong brand presence, professionalism and credibility</li>
          <li><strong>Interests:</strong> Business development, marketing trends and strategies, expanding market reach beyond local borders</li>
          <li><strong>Attitude toward marketing:</strong> Values strategic guidance over mere execution; open to innovative approaches with measurable ROI</li>
          <li><strong>Personality:</strong> Decision-makers under pressure, efficiency-focused, time-conscious, open to cross-border partnerships</li>
        </ul>
      </CopyCard>
    </div>

    <CopyCard id="aud-pain" title="⚠️ Pain points" copiedId={copiedId} onCopy={onCopy}>
      <ul>
        <li>Lack of clear, scalable marketing strategy</li>
        <li>Low or inconsistent ROI from previous campaigns</li>
        <li>Agencies that only execute without delivering results</li>
        <li>Weak brand positioning in competitive markets (local &amp; regional)</li>
        <li>Difficulty reaching cross-border or GCC markets effectively</li>
        <li>Limited internal marketing expertise</li>
      </ul>
    </CopyCard>

    <PainQuote id="aud-insight" label="Core pain insight" copiedId={copiedId} onCopy={onCopy}>
      "I want growth that works locally and regionally — not just more ads."
    </PainQuote>

    <CopyCard id="aud-buying" title="💳 Buying behavior" copiedId={copiedId} onCopy={onCopy}>
      <p>
        <strong>Decision process:</strong> Evaluates multiple agencies, focusing on value, expertise, and proven results; interested in agencies that understand regional market dynamics.<br/><br/>
        <strong>Triggers to buy:</strong> Clear demonstration of strategy and business understanding; case studies showing measurable growth in both Egypt and GCC; ability to scale campaigns regionally.<br/><br/>
        <strong>Objections:</strong> "Will this work outside Egypt?" · "Is the ROI worth it for cross-border campaigns?"<br/><br/>
        <strong>Loyalty potential:</strong> High, if results are consistent and the agency provides clear strategic guidance — likely to recommend to regional peers.
      </p>
    </CopyCard>
  </section>
);

const FunnelSection = ({ copiedId, onCopy }: { copiedId: string | null; onCopy: (text: string, id: string) => void }) => (
  <section className="block" id="funnel">
    <div className="block-head">
      <span className="idx">05</span>
      <div>
        <h2>Marketing Funnel</h2>
        <div className="tag">Customer journey stages</div>
      </div>
    </div>

    <FunnelRow id="fn-1" number="01" title="Awareness" copiedId={copiedId} onCopy={onCopy}>
      Introduce Growth Station and its value through educational content, targeting ambitious business owners in Egypt & GCC. Builds credibility and brand recognition.
    </FunnelRow>

    <FunnelRow id="fn-2" number="02" title="Engagement" copiedId={copiedId} onCopy={onCopy}>
      Convert awareness into trust by sharing methodology, mini case studies, and insights. Encourages interaction via DMs, comments, and consultations.
    </FunnelRow>

    <FunnelRow id="fn-3" number="03" title="Conversion" copiedId={copiedId} onCopy={onCopy}>
      Turn qualified leads into clients with strategic service packages, trial consultations, and proposals. Focus on measurable ROI and closing deals.
    </FunnelRow>

    <FunnelRow id="fn-4" number="04" title="Retention &amp; Loyalty" copiedId={copiedId} onCopy={onCopy}>
      Ensure repeat business and referrals through continuous value, performance reports, and exclusive insights. Strengthens long-term partnerships.
    </FunnelRow>
  </section>
);

const PillarsSection = ({ copiedId, onCopy }: { copiedId: string | null; onCopy: (text: string, id: string) => void }) => (
  <section className="block" id="pillars">
    <div className="block-head">
      <span className="idx">06</span>
      <div>
        <h2>Strategic Content Pillars</h2>
        <div className="tag">Growth Station doesn't sell marketing — it sells strategic thinking</div>
      </div>
    </div>

    <PillarCard id="pil-1" number="PILLAR 01" title="Educational &amp; Strategy Content" copiedId={copiedId} onCopy={onCopy}>
      <p><strong>Purpose:</strong> Position Growth Station as a strategic authority by educating the audience on how real, results-driven marketing works.</p>
      <div className="sub">Content focus</div>
      <ul>
        <li>Simplifying complex marketing concepts into actionable insights</li>
        <li>Explaining frameworks, strategies, and growth methodologies</li>
        <li>Teaching business owners how to think beyond execution</li>
      </ul>
      <div className="examples">
        <ul>
          <li>"Why posting daily won't grow your business"</li>
          <li>"The difference between marketing strategy & content execution"</li>
          <li>Step-by-step growth frameworks</li>
        </ul>
      </div>
      <div className="sub">Value</div>
      <p>Builds credibility from zero, establishes thought leadership, and shifts the audience mindset toward strategy-first marketing.</p>
    </PillarCard>

    <PillarCard id="pil-2" number="PILLAR 02 · HIGH AUTHORITY" title="Strategic Thinking &amp; Analysis" copiedId={copiedId} onCopy={onCopy}>
      <p><strong>Purpose:</strong> Demonstrate expertise by showcasing how Growth Station thinks, analyzes, and solves real marketing challenges.</p>
      <div className="sub">Content focus</div>
      <ul>
        <li>Breaking down successful &amp; failed campaigns</li>
        <li>Analyzing brands (Egypt &amp; GCC)</li>
        <li>Explaining the "why" behind results</li>
      </ul>
      <div className="examples">
        <ul>
          <li>"Why this brand is dominating the Saudi market"</li>
          <li>"What this campaign did wrong (and how to fix it)"</li>
          <li>Reverse-engineering successful brands</li>
        </ul>
      </div>
      <div className="sub">Value</div>
      <p>Builds authority without needing clients, proves strategic depth, and positions the agency as a problem-solver — not just a service provider.</p>
    </PillarCard>

    <PillarCard id="pil-3" number="PILLAR 03 · REGIONAL POSITIONING" title="Market &amp; Growth Insights" copiedId={copiedId} onCopy={onCopy}>
      <p><strong>Purpose:</strong> Establish Growth Station as a regional expert with deep understanding of both Egyptian and GCC markets.</p>
      <div className="sub">Content focus</div>
      <ul>
        <li>Market trends and shifts</li>
        <li>Differences between Egypt &amp; GCC audiences</li>
        <li>Business growth opportunities and challenges</li>
      </ul>
      <div className="examples">
        <ul>
          <li>"Key differences between Egyptian & UAE consumers"</li>
          <li>"Top growth opportunities for brands in Saudi Arabia"</li>
          <li>Industry-specific insights</li>
        </ul>
      </div>
      <div className="sub">Value</div>
      <p>Strengthens regional positioning, attracts higher-quality clients, and builds trust with businesses looking to scale beyond borders.</p>
    </PillarCard>

    <PillarCard id="pil-4" number="PILLAR 04 · TRUST" title="Proof &amp; Authority Building" copiedId={copiedId} onCopy={onCopy}>
      <p><strong>Purpose:</strong> Gradually build trust and credibility through visible proof of expertise — even without heavy case studies.</p>
      <div className="sub">Content focus</div>
      <ul>
        <li>Frameworks &amp; proprietary methodologies</li>
        <li>Behind-the-scenes processes</li>
        <li>Early wins, experiments, and insights</li>
        <li>Thought process over just results</li>
      </ul>
      <div className="examples">
        <ul>
          <li>"How we build a marketing strategy from scratch"</li>
          <li>"Our client onboarding process"</li>
          <li>Before/After (even small wins)</li>
        </ul>
      </div>
      <div className="sub">Value</div>
      <p>Bridges the gap of missing case studies, builds trust over time, and prepares the audience for conversion.</p>
    </PillarCard>

    <PainQuote id="pil-note" label="Strategic note" copiedId={copiedId} onCopy={onCopy} customStyle={{ fontSize: '1rem', fontWeight: '500' }}>
      This pillar structure replaces a lack of portfolio with strong thinking, builds authority before scale, and attracts high-quality clients — not random leads. Growth Station doesn't sell marketing… it sells strategic thinking.
    </PainQuote>
  </section>
);

const CalendarSection = ({ copiedId, onCopy }: { copiedId: string | null; onCopy: (text: string, id: string) => void }) => (
  <>
    <section className="block" id="calendar">
      <div className="block-head">
        <span className="idx">07</span>
        <div>
          <h2>Content Calendar</h2>
          <div className="tag">12-post launch calendar — captions, scripts &amp; shoot notes</div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="phase-nav">
        <a href="#calendar-phase1" className="phase-nav-btn">
          <span className="phase-num">07.1</span>
          <span className="phase-title">Phase 1: Launch Posts</span>
        </a>
        <a href="#calendar-phase2" className="phase-nav-btn">
          <span className="phase-num">07.2</span>
          <span className="phase-title">Phase 2: Educational Content</span>
        </a>
        <a href="#calendar-phase3" className="phase-nav-btn">
          <span className="phase-num">07.3</span>
          <span className="phase-title">Phase 3: Engagement &amp; Viral</span>
        </a>
      </div>
    </section>

    {/* Phase 1: Launch Posts */}
    <section className="block sub-section" id="calendar-phase1">
      <div className="block-head">
        <span className="idx">07.1</span>
        <div>
          <h2>Phase 1: Launch Posts</h2>
          <div className="tag">Initial content for brand introduction</div>
        </div>
      </div>

      <div className="cal-grid single-column">
        <CalendarCard id="cal-1" number="01" type="grid" caption="Loading ..." note="Reference: Tov / Logo + Growth Station" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-2" number="02" type="reel" caption="Stay Tuned .. link" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-3" number="03" type="post" caption="(لما نختاره)" note="TOV: Our Slogan · Reference: Your success partner should be — Growth Station" copiedId={copiedId} onCopy={onCopy} />
      </div>
    </section>

    {/* Phase 2: Educational Content */}
    <section className="block sub-section" id="calendar-phase2">
      <div className="block-head">
        <span className="idx">07.2</span>
        <div>
          <h2>Phase 2: Educational Content</h2>
          <div className="tag">Strategy and educational posts</div>
        </div>
      </div>

      <div className="cal-grid single-column">
        <CalendarCard id="cal-4" number="04" type="reel" caption="لو انت اللي بتكتب وتصور وتعمل المونتاچ؟<br/>يبقي أكيد فيه حاجة غلط ..<br/>خليها علينا وإدي العيش لخبازه<br/>لإن كل اللي براندك محتاجه — موجود في مكان واحد" note="IN: هنعمل cover لكل الريلز اللي هتنزل علي الأكونت · Script: to be written" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-5" number="05" type="reel" caption="الماركتنج في مصر مش رفاهية! ده &quot;أداة بقاء&quot;<br/>والتسويق الصح هو اللي بيحول الزحمة لفرص، والمنافسة لسيطرة" note="Script: to be written" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-6" number="06" type="carousel" caption={`<span class="slide-tag">SLIDE 1</span><br/>إزاي توصل من 10 آلاف لـ 100 ألف متابع<br/><span class="slide-tag">SLIDE 2</span><br/>بجد! هما قالولك إن الموضوع بالبساطة دي؟<br/><span class="slide-tag">SLIDE 3</span><br/>الحقيقة إن دي خدعة كبيرة. لو كانت بالسهولة دي، كان كل اللي ماشي في الشارع دلوقتي بقى &quot;إنفلونسر&quot; وعنده درع المليون<br/><span class="slide-tag">SLIDE 4</span><br/>شركات الماركتينج بتبيعلك الوهم تحت مسمى &quot;النمو السريع&quot;، بيوهموك إن فيه &quot;زرار سحري&quot; أو &quot;تريكاية معينة&quot; هتخلي حسابك ينفجر في أسبوع<br/><span class="slide-tag">SLIDE 5</span><br/>الحقيقة المرة؟ المتابعين اللي بييجوا بضغطة زرار هما اللي بيدفنوا حسابك للأبد. الخوارزميات مش غبية؛ هي بتدور على تفاعل حقيقي مش أرقام ميتة<br/><span class="slide-tag">SLIDE 6</span><br/>لو عايز تكبر بجد وبشكل منطقي؟ ف المعادلة بسيطة: قيمة حقيقية بتحل مشكلة ✅ استمرارية مرضية لجمهورك ✅ فهم دقيق للي جمهورك محتاجه فعلاً مش اللي أنت عايز تقوله ✅<br/><span class="slide-tag">SLIDE 7</span><br/>خدعوك فقالوا .. لو عايز تبني إمبراطورية مش مجرد رقم على الشاشة، بطل تدور على السهل .. اعمل فولو لو عايز تعرف إزاي تبني جمهور حقيقي بيشتري منك مش بس بيتفرج عليك`} badge="Carousel · 7 slides" fullSpan copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-7" number="07" type="reel" caption="في العصر الحالي .. اللي بيعرف يوصل للناس هو اللي بيكسب<br/>ف لو عايز تبني بيزنس حقيقي! لازم تبني &quot;براند&quot; في عقول الناس الأول.<br/>اعمل فولو عشان تعرف أسرار البيزنس اللي مبيقولوهاش ليك في الكتب." note="Script: to be written" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-8" number="08" type="reel" caption="تفتكر ليه Gen_Z عاملين مشاكل في الشغل؟" note="Script: to be written" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-9" number="09" type="reel" caption="السوق بقى زحمة؟<br/>الكل بيقلد بعضه؟<br/>هقولك إزاي تخرج برا الزحمة دي في 60 ثانية" note="Script: to be written" copiedId={copiedId} onCopy={onCopy} />
      </div>
    </section>

    {/* Phase 3: Engagement & Viral */}
    <section className="block sub-section" id="calendar-phase3">
      <div className="block-head">
        <span className="idx">07.3</span>
        <div>
          <h2>Phase 3: Engagement &amp; Viral</h2>
          <div className="tag">Engagement and viral content</div>
        </div>
      </div>

      <div className="cal-grid single-column">
        <CalendarCard id="cal-10" number="10" type="post" caption="تم تفعيل وضع: بعد العيد<br/>وكل سنة وانتوا طيبين" note="IN: تنشر قبل العيد بكذا يوم · TOV: بعد العيد" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-11" number="11" type="reel" caption="عيدكم مبارك<br/>أعاده الله علينا وعليكم باليمن والبركات" note="IN: نبدل شخصية الراجل بالكاركتر بتاعنا · TOV: عيد أضحى مبارك" copiedId={copiedId} onCopy={onCopy} />
        
        <CalendarCard id="cal-12" number="12" type="reel" caption="انسى كورسات الماركتينج ..<br/>الفراعنة هم اللي اخترعوا الـ Viral Content" note="Script: to be written" copiedId={copiedId} onCopy={onCopy} />
      </div>
    </section>
  </>
);

// Reusable sub-components
const CopyCard = ({ id, title, children, copiedId, onCopy }: { id: string; title: string; children: React.ReactNode; copiedId: string | null; onCopy: (text: string, id: string) => void }) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText.trim();
      onCopy(text, id);
    }
  };

  return (
    <div className="copy-card" data-copy-target={id}>
      <button className={`copy-btn ${copiedId === id ? 'copied' : ''}`} onClick={handleClick} data-copy={id}>
        {copiedId === id ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </>
        )}
      </button>
      <h3>{title}</h3>
      <div id={id}>{children}</div>
    </div>
  );
};

const PainQuote = ({ id, label, children, copiedId, onCopy, customStyle }: { id: string; label: string; children: React.ReactNode; copiedId: string | null; onCopy: (text: string, id: string) => void; customStyle?: React.CSSProperties }) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText.trim();
      onCopy(text, id);
    }
  };

  return (
    <div className="pain-quote" data-copy-target={id}>
      <div className="label">{label}</div>
      <p id={id} style={customStyle}>{children}</p>
      <button className={`copy-btn ${copiedId === id ? 'copied' : ''}`} onClick={handleClick} data-copy={id}>
        {copiedId === id ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
};

const CascadeCard = ({ id, label, children, copiedId, onCopy }: { id: string; label: string; children: React.ReactNode; copiedId: string | null; onCopy: (text: string, id: string) => void }) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText.trim();
      onCopy(text, id);
    }
  };

  return (
    <div className="cascade-card" data-copy-target={id}>
      <button className={`copy-btn ${copiedId === id ? 'copied' : ''}`} onClick={handleClick} data-copy={id}>
        {copiedId === id ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        )}
      </button>
      <div className="cc-label">{label}</div>
      <ul id={id}>{children}</ul>
    </div>
  );
};

const PillarCard = ({ id, number, title, children, copiedId, onCopy }: { id: string; number: string; title: string; children: React.ReactNode; copiedId: string | null; onCopy: (text: string, id: string) => void }) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText.trim();
      onCopy(text, id);
    }
  };

  return (
    <div className="pillar-card" data-copy-target={id}>
      <button className={`copy-btn ${copiedId === id ? 'copied' : ''}`} onClick={handleClick} data-copy={id}>
        {copiedId === id ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </>
        )}
      </button>
      <div className="pc-num">{number}</div>
      <h3>{title}</h3>
      <div id={id}>{children}</div>
    </div>
  );
};

const FunnelRow = ({ id, number, title, children, copiedId, onCopy }: { id: string; number: string; title: string; children: React.ReactNode; copiedId: string | null; onCopy: (text: string, id: string) => void }) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText.trim();
      onCopy(text, id);
    }
  };

  return (
    <div className="funnel-row" data-copy-target={id}>
      <div className="fn-num">{number}</div>
      <div>
        <h3>{title}</h3>
        <p id={id}>{children}</p>
      </div>
      <button className={`copy-btn ${copiedId === id ? 'copied' : ''}`} onClick={handleClick} data-copy={id}>
        {copiedId === id ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
};

const CalendarCard = ({ id, number, type, caption, note, badge, fullSpan, copiedId, onCopy }: { 
  id: string; 
  number: string; 
  type: string; 
  caption: string; 
  note?: string; 
  badge?: string; 
  fullSpan?: boolean; 
  copiedId: string | null; 
  onCopy: (text: string, id: string) => void 
}) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText.trim();
      onCopy(text, id);
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'reel': return 'type-reel';
      case 'post': return 'type-post';
      case 'carousel': return 'type-carousel';
      case 'grid': return 'type-grid';
      default: return '';
    }
  };

  return (
    <div className="cal-card" data-copy-target={id} style={fullSpan ? { gridColumn: '1 / -1' } : undefined}>
      <button className={`copy-btn ${copiedId === id ? 'copied' : ''}`} onClick={handleClick} data-copy={id}>
        {copiedId === id ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </>
        )}
      </button>
      <div className="cal-head">
        <span className="cal-num">{number}</span>
        <span className={`cal-badge ${getBadgeClass(type)}`}>{badge || type}</span>
      </div>
      <div className="cal-caption" id={id} dangerouslySetInnerHTML={{ __html: caption }} />
      {note && <div className="cal-note" dangerouslySetInnerHTML={{ __html: note.replace(/·/g, ' · ') }} />}
    </div>
  );
};