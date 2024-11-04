import React, { useState, useEffect } from 'react';
import { 
  Linkedin, Mail, Phone, MapPin, ChevronDown, Award, 
  Building, Users, LineChart, Code, Server, Shield, Cloud
} from 'lucide-react';

import { LucideIcon } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  skills: string[];
}

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  tech?: string[];
}

interface StatProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

// Utility Components
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      setCount(Math.min(Math.floor((progress / duration) * value), value));
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);
  
  return <span>{count}</span>;
};

const SkillCard: React.FC<SkillCardProps> = ({ icon: Icon, title, skills }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center mb-4">
        <Icon className={`h-8 w-8 ${isHovered ? 'text-blue-600' : 'text-gray-600'} transition-colors`} />
        <h3 className="text-xl font-bold ml-3">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, company, description, achievements, tech }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-blue-200 group">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
      <div className="mb-1 text-blue-600 font-semibold">{year}</div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <h4 className="text-lg text-blue-600 mb-2">{company}</h4>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700 transition-colors mb-4"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
        
        {isExpanded && (
          <>
            <div className="mb-4">
              <h5 className="font-semibold mb-2">Key Achievements:</h5>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
            
            {tech && (
              <div>
                <h5 className="font-semibold mb-2">Technologies Used:</h5>
                <div className="flex flex-wrap gap-2">
                  {tech.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Stat: React.FC<StatProps> = ({ icon: Icon, value, label }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
    <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
    <div className="text-3xl font-bold text-gray-800 mb-1">
      <AnimatedCounter value={value} />
      <span className="text-blue-600">+</span>
    </div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const Portfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-600">AC</div>
            <div className="flex gap-6">
              {['About', 'Skills', 'Experience', 'Patents'].map((item) => (
                <button 
                  key={item}
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${
                    scrolled ? 'py-2' : 'py-1'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-32 pb-24">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="container mx-auto px-4 relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Alen Capalik
            <span className="block text-3xl md:text-4xl text-blue-200 mt-2">
              Technology Leader & Innovator
            </span>
          </h1>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="mailto:alen@wiretap.net" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all hover:transform hover:-translate-y-1">
              <Mail className="h-5 w-5" />
              <span>alen@wiretap.net</span>
            </a>
            <a href="tel:310-310-9973" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all hover:transform hover:-translate-y-1">
              <Phone className="h-5 w-5" />
              <span>310-310-9973</span>
            </a>
            <a href="https://www.linkedin.com/in/alencapalik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all hover:transform hover:-translate-y-1">
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Stat icon={Users} value={25} label="Years Experience" />
          <Stat icon={Building} value={100} label="Team Members Led" />
          <Stat icon={Award} value={3} label="Patents" />
          <Stat icon={LineChart} value={50} label="Million $ Raised" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Skills Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard 
              icon={Code}
              title="Programming Languages"
              skills={['C', 'C++', 'Python', 'Go', 'Rust']}
            />
            <SkillCard 
              icon={Cloud}
              title="Cloud & Infrastructure"
              skills={['AWS', 'Azure', 'GCP', 'Oracle Cloud', 'Kubernetes', 'Docker']}
            />
            <SkillCard 
              icon={Server}
              title="Big Data Technologies"
              skills={['Apache Spark', 'Apache Kafka', 'Cloudera', 'Apache Arrow']}
            />
            <SkillCard 
              icon={Shield}
              title="Security Expertise"
              skills={['Intrusion Detection', 'Network Security', 'Threat Analysis']}
            />
            <SkillCard 
              icon={Users}
              title="Leadership"
              skills={['Corporate Leadership', 'Team Building', 'Executive Management']}
            />
            <SkillCard 
              icon={Building}
              title="Business Development"
              skills={['Enterprise Sales', 'Venture Capital', 'Strategic Partnerships']}
            />
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Professional Journey</h2>
          
          <div className="space-y-6">
            <TimelineItem 
              year="2016 - Present"
              title="Founder and CEO"
              company="FASTDATA.io, Inc."
              description="Leading the development of revolutionary GPU-based streaming data processing technology."
              achievements={[
                "Designed and developed PlasmaENGINE - 100x faster than market competitors",
                "Led cloud implementation across AWS, Azure, GCP, and Oracle Cloud",
                "Secured $6.5M in funding, including investment from NVIDIA",
                "Built and led world-class engineering team",
                "Established partnerships with Fortune 500 companies"
              ]}
              tech={['C++', 'CUDA', 'Python', 'Kubernetes', 'Docker', 'Cloud Platforms']}
            />
            
            <TimelineItem 
              year="2004 - 2017"
              title="Founder, CTO and Board Member"
              company="CounterTack (now GoSecure)"
              description="Pioneer in enterprise-level cybersecurity solutions and threat detection."
              achievements={[
                "Grew company from founding to 100+ employees",
                "Designed and developed CounterTack Sentinel",
                "Raised over $50M in venture capital",
                "Served 13+ years on Board of Directors",
                "Established company as leader in advanced persistent threat protection"
              ]}
              tech={['Security Architecture', 'Threat Detection', 'Enterprise Software']}
            />
            
            <TimelineItem 
              year="2001 - 2004"
              title="Chief Technology Officer"
              company="Tradeware Systems LLC"
              description="Led technology strategy for Wall Street trading software company."
              achievements={[
                "Managed infrastructure handling $30B daily trading volume",
                "Led team of 40 engineers and developers",
                "Implemented enterprise-wide security protocols",
                "Designed real-time trading software infrastructure"
              ]}
              tech={['Trading Systems', 'Network Security', 'Infrastructure Design']}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© {new Date().getFullYear()} Alen Capalik. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:alen@wiretap.net" className="hover:text-blue-400 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/alencapalik" className="hover:text-blue-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
