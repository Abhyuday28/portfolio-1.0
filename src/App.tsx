
import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  ExternalLink,
  Github,
  Mail,
  Phone,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Linkedin,
  Globe,
  Database,
  Palette,
  Server,
  Smartphone,
  Monitor,
  Layers,
  FileCode,
  Zap,
  Package,
} from 'lucide-react';

// Technology Icons from react-icons
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiGithub,
  SiExpress,
  SiSocketdotio,
  SiPython,
  SiAmazon,
  SiGit,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { FaCode, FaServer, FaDatabase } from 'react-icons/fa';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: 'intern' | 'education' | 'project' | 'achievement';
  description: string;
  details: string[];
  technologies?: string[];
  link?: string;
  location?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: '2020-2024',
    title: 'B.Tech in Computer Science and Engineering',
    organization: 'Motihari College of Engineering',
    type: 'education',
    description: 'Pursuing B.Tech in Computer Science and Engineering',
    details: [
      'CGPA: 7.81/10',
      'Active participant in coding competitions and hackathons',
      'Relevant Coursework: DSA, DBMS, Computer Network',
      'Member of technical clubs and societies',
    ],
    location: 'Motihari, Bihar',
  },
  {
    id: '2',
    year: '2022',
    title: 'Antrangini: Front End Developer Trainee',
    organization: 'Tech training Startup',
    type: 'intern',
    description:
      'Developed proficiency in HTML, CSS, and JavaScript by building multiple frontend projects.',
    details: [
      'Built responsive web applications using HTML,  CSS & JavaScript',
      'Learned to use Git and Github for version control during the deployment process',
      'Collaborated with cross-functional teams in agile environment',
      'Developed the Frontend of a Demo e-commerce website named Awesome.',
    ],
    technologies: [
      'HTML',
      'css',
      'javaScript',
    ],
    location: 'Remote',
  },
  {
    id: '3',
    year: '2022',
    title: 'Awesome: E-Commmerce',
    organization: 'Personal Project',
    type: 'project',
    description:
      'Frontend project for Online Fashion store',
    details: [
      'Built this with most basic frontend tools i.e. HTML, CSS, JavaScript',
      'Built a complete multi-page e-commerce website, including product listings, cart, checkout, and user authentication pages.',
      'Designed responsive UI with CSS, optimizing layout and styling for all devices',
      'Deployed on github.io',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Github'],
    link: 'https://abhyuday28.github.io/',
  },
  {
    id: '4',
    year: '2023',
    title: 'Web Development Certification',
    organization: 'Online Learning Platform',
    type: 'achievement',
    description:
      'Completed comprehensive web development certification covering modern frameworks and best practices.',
    details: [
      'Mastered full-stack development concepts',
      'Built 10+ projects during certification',
      'Learned industry best practices and design patterns',
      'Achieved 95% score in final assessment',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js'],
  },
  {
    id: '5',
    year: '2024',
    title: 'Nexus-academic',
    organization: 'Academic Project',
    type: 'project',
    description:
      'Nexus is a platform designed for students and faculty to share updates, resources, and announcements within a college network."',
    details: [
      'Fullstack project developed on Next.js',
      'Implemented role-based access control with NextAuth for secure user authentication',
      'Role-Based Access Control: Faculty and students see tailored content and actions based on their roles.',
      'Responsive design for mobile and desktop platforms',
    ],
    technologies: [
      'Next.js',
      'React.js',
      'Node.js',
      'MongoDB',
      'Shadcn/ui',
    ],
    link: 'https://nexus-academic.vercel.app/',
  },
  
];

const typeIcons = {
  intern: Briefcase,
  education: GraduationCap,
  project: Code,
  achievement: Award,
};

const typeColors = {
  intern: 'from-blue-500 to-cyan-500',
  education: 'from-purple-500 to-pink-500',
  project: 'from-green-500 to-teal-500',
  achievement: 'from-yellow-500 to-orange-500',
};

const techIcons: { [key: string]: any } = {
  'HTML': SiHtml5,
  'HTML5': SiHtml5,
  'css': SiCss3,
  'CSS': SiCss3,
  'CSS3': SiCss3,
  'javaScript': SiJavascript,
  'JavaScript': SiJavascript,
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  'MongoDB': SiMongodb,
  'Shadcn/ui': SiReact,
  'Github': SiGithub,
  'Material-UI': FileCode,
  'Express.js': SiExpress,
  'Socket.io': SiSocketdotio,
  'RESTful APIs': FaServer,
  'Git': SiGit,
  'AWS': SiAmazon,
  'Python': SiPython,
  'Machine Learning': FaCode,
  'Agile': FaCode,
  'Tailwind CSS': SiTailwindcss,
  'TypeScript': SiTypescript,
};

const techColors: { [key: string]: string } = {
  'HTML': '#E34F26',
  'HTML5': '#E34F26',
  'css': '#1572B6',
  'CSS': '#1572B6',
  'CSS3': '#1572B6',
  'javaScript': '#F7DF1E',
  'JavaScript': '#F7DF1E',
  'React.js': '#61DAFB',
  'Next.js': '#000000',
  'Node.js': '#339933',
  'MongoDB': '#47A248',
  'Shadcn/ui': '#61DAFB',
  'Github': '#181717',
  'Githum': '#181717',
  'Material-UI': '#007FFF',
  'Express.js': '#000000',
  'Socket.io': '#010101',
  'RESTful APIs': '#FF6B6B',
  'Git': '#F05032',
  'AWS': '#FF9900',
  'Python': '#3776AB',
  'Machine Learning': '#FF6B6B',
  'Agile': '#4CAF50',
  'Tailwind CSS': '#06B6D4',
  'TypeScript': '#3178C6',
};

function App() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [currentVisibleItem, setCurrentVisibleItem] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');

  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxHeight, 1);
      setScrollProgress(progress);

      // Calculate timeline progress based on scroll position within timeline section
      if (timelineRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const timelineTop = timelineRect.top + window.scrollY;
        const timelineHeight = timelineRect.height;

        // Calculate how much of the timeline section has been scrolled through
        const timelineScrollStart = timelineTop - window.innerHeight * 0.1;
        const timelineScrollEnd =
          timelineTop + timelineHeight - window.innerHeight * 0.9;

        if (scrolled >= timelineScrollStart && scrolled <= timelineScrollEnd) {
          const timelineScrollProgress =
            (scrolled - timelineScrollStart) /
            (timelineScrollEnd - timelineScrollStart);
          const clampedProgress = Math.max(
            0,
            Math.min(1, timelineScrollProgress)
          );
          setTimelineProgress(clampedProgress);

          // Calculate which item should be visible based on scroll progress
          const itemIndex = Math.floor(clampedProgress * timelineData.length);
          const clampedItemIndex = Math.max(
            0,
            Math.min(timelineData.length - 1, itemIndex)
          );
          setCurrentVisibleItem(clampedItemIndex);

          // Auto-expand the current visible item
          if (timelineData[clampedItemIndex]) {
            setActiveItem(timelineData[clampedItemIndex].id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentVisibleItem]);

  // Calculate responsive card width and transform values
  const getCardWidth = () => {
    switch (screenSize) {
      case 'mobile':
        return 280; // w-70 equivalent
      case 'tablet':
        return 320; // w-80 equivalent
      default:
        return 384; // w-96 equivalent
    }
  };

  const getCardSpacing = () => {
    switch (screenSize) {
      case 'mobile':
        return 16; // space-x-4
      case 'tablet':
        return 24; // space-x-6
      default:
        return 32; // space-x-8
    }
  };

  const cardWidth = getCardWidth();
  const cardSpacing = getCardSpacing();
  const totalCardWidth = cardWidth + cardSpacing;

  // Calculate transform with proper centering for different screen sizes
  const getTransformValue = () => {
    const viewportWidth = window.innerWidth;
    const containerPadding = screenSize === 'mobile' ? 16 : 24; // px-4 or px-6
    const availableWidth = viewportWidth - containerPadding * 2;

    // Center the first card initially
    const initialOffset = (availableWidth - cardWidth) / 2;

    // Calculate how much to move based on progress
    const maxTransform = (timelineData.length - 1) * totalCardWidth;
    const currentTransform = timelineProgress * maxTransform;

    return initialOffset - currentTransform;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border-4 border-white/20 shadow-2xl">
              <img
                src="/dp.jpg"
                alt="Abhyuday Avatar"
                className="w-28 h-28 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove(
                    'hidden'
                  );
                }}
              />
              <User className="w-16 h-16 text-white hidden" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Abhyuday
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Computer Science Student & Developing Web Developer passionate about
            creating Hands-on software.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30">
              React.js
            </span>
            <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30">
              Front-End Development
            </span>
            <span className="px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 border border-teal-500/30">
              Next.js
            </span>
            <span className="px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 border border-teal-500/30">
              Node.js
            </span>
            <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-300 border border-green-500/30">
              MongoDB
            </span>
            <span className="px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 border border-teal-500/30">
              Full Stack Development
            </span>
          </div>

          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        ref={timelineRef}
        className={`py-12 px-4 sm:px-6 relative ${screenSize === 'mobile' ? '' : ''}`}
        style={{ minHeight: screenSize === 'mobile' ? 'auto' : '300vh' }}
      >
        <div className={`${screenSize === 'mobile' ? 'relative pb-8' : 'sticky top-16'} max-w-7xl mx-auto`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-6">
            My{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          {/* Progress Bar */}
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Conditional Timeline Layout */}
          {screenSize === 'mobile' ? (
            /* Mobile Vertical Timeline */
            <div className="relative max-w-sm mx-auto">
              {/* Vertical Timeline Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 opacity-30"></div>

              <div className="space-y-4">
                {timelineData.map((item, index) => {
                  const Icon = typeIcons[item.type];
                  const isActive = activeItem === item.id;

                  return (
                    <div key={item.id} className="relative flex items-start">
                      {/* Timeline Node */}
                      <div className="absolute left-2 transform -translate-x-1/2 z-10">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                            typeColors[item.type]
                          } 
                            shadow-lg flex items-center justify-center border-2 border-slate-900 relative overflow-hidden
                            ${isActive ? 'scale-110 shadow-xl ring-2 ring-white/20' : ''}`}
                        >
                          <Icon className="w-4 h-4 text-white relative z-10" />
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="ml-10 w-full">
                        <div
                          className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 
                            shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1
                            ${isActive ? 'ring-2 ring-blue-500/50 bg-slate-800/70' : ''}`}
                          onClick={() => {
                            setActiveItem(activeItem === item.id ? null : item.id);
                          }}
                        >
                          {/* Always Visible: Year and Title */}
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-blue-400">
                              {item.year}
                            </span>
                            <div className={`transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          <h3 className="text-base font-bold text-white leading-tight">
                            {item.title}
                          </h3>

                          {/* Expanded Content */}
                          {isActive && (
                            <div className="mt-3 space-y-3 animate-in slide-in-from-top duration-300">
                              <p className="text-purple-300 font-medium text-sm">
                                {item.organization}
                              </p>
                              
                              {item.location && (
                                <div className="flex items-center text-gray-400 text-xs">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {item.location}
                                </div>
                              )}

                              <p className="text-gray-300 leading-relaxed text-sm">
                                {item.description}
                              </p>

                              <div className="pt-2 border-t border-slate-600/50">
                                <ul className="space-y-1">
                                  {item.details.slice(0, 3).map((detail, i) => (
                                    <li key={i} className="flex items-start text-gray-300 text-sm">
                                      <Star className="w-2.5 h-2.5 text-yellow-400 mr-1.5 mt-0.5 flex-shrink-0" />
                                      {detail}
                                    </li>
                                  ))}
                                </ul>

                                {item.link && (
                                  <div className="mt-2">
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-xs"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ExternalLink className="w-2.5 h-2.5 mr-1" />
                                      View Project
                                    </a>
                                  </div>
                                )}
                              </div>

                              {/* Technologies Section */}
                              {item.technologies && (
                                <div className="pt-2">
                                  <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                                    Technologies
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {item.technologies.map((tech) => {
                                      const TechIcon = techIcons[tech] || FileCode;
                                      const techColor = techColors[tech] || '#64FFDA';
                                      return (
                                        <div
                                          key={tech}
                                          className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-700/50 rounded-full text-xs text-white border border-slate-600/30"
                                        >
                                          <TechIcon 
                                            className="w-2.5 h-2.5" 
                                            style={{ color: techColor }}
                                          />
                                          <span>{tech}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Desktop/Tablet Horizontal Timeline */
            <div className="relative">
              {/* Horizontal Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-30"></div>

              {/* Timeline Container */}
              <div className="overflow-hidden">
                <div
                  className="flex min-w-max transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(${getTransformValue()}px)`,
                    gap: `${cardSpacing}px`,
                  }}
                >
                  {timelineData.map((item, index) => {
                    const Icon = typeIcons[item.type];
                    const isActive = activeItem === item.id;
                    const isCurrentItem = index === currentVisibleItem;

                    return (
                      <div
                        key={item.id}
                        className="relative flex-shrink-0"
                        style={{ width: `${cardWidth}px` }}
                      >
                        {/* Timeline Node */}
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
                          <button
                            onClick={() => {
                              setActiveItem(
                                activeItem === item.id ? null : item.id
                              );
                            }}
                            className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-r ${
                              typeColors[item.type]
                            } 
                              shadow-lg hover:shadow-xl transform transition-all duration-300
                              flex items-center justify-center border-4 border-slate-900 relative overflow-hidden
                              ${
                                isActive || isCurrentItem
                                  ? 'scale-125 shadow-2xl ring-4 ring-white/20'
                                  : 'hover:scale-110'
                              }`}
                          >
                            <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white relative z-10" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                          </button>
                        </div>

                        {/* Content Card */}
                        <div className="mt-16 sm:mt-20 mb-10">
                          <div
                            className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 
                              shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1
                              ${
                                isActive || isCurrentItem
                                  ? 'ring-2 ring-blue-500/50 bg-slate-800/70 scale-105'
                                  : ''
                              }`}
                            onClick={() => {
                              setActiveItem(
                                activeItem === item.id ? null : item.id
                              );
                            }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-lg sm:text-xl font-bold text-blue-400">
                                {item.year}
                              </span>
                              {item.location && (
                                <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                                  <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                  <span className="hidden sm:inline">
                                    {item.location}
                                  </span>
                                </div>
                              )}
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-purple-300 font-medium mb-3 text-sm sm:text-base">
                              {item.organization}
                            </p>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-3">
                              {item.description}
                            </p>

                            {/* Expanded Details */}
                            {(isActive || isCurrentItem) && (
                              <div className="mt-6 pt-4 border-t border-slate-600/50 animate-in slide-in-from-top duration-300">
                                <ul className="space-y-2">
                                  {item.details
                                    .slice(0, screenSize === 'mobile' ? 2 : 3)
                                    .map((detail, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start text-gray-300 text-xs sm:text-sm"
                                      >
                                        <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                        {detail}
                                      </li>
                                    ))}
                                </ul>

                                {item.link && (
                                  <div className="mt-4">
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
                                    >
                                      <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                      View Project
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Technologies Section - Always at Bottom */}
                            {item.technologies && (
                              <div className="mt-auto pt-4">
                                <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                                  Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.technologies.map((tech) => {
                                    const TechIcon = techIcons[tech] || FileCode;
                                    const techColor = techColors[tech] || '#64FFDA';
                                    return (
                                      <div
                                        key={tech}
                                        className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-700/50 rounded-full text-xs sm:text-sm text-white hover:bg-slate-600/70 transition-all duration-300 cursor-pointer transform hover:scale-105 border border-slate-600/30 hover:border-slate-500/50"
                                      >
                                        <TechIcon 
                                          className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
                                          style={{ color: techColor }}
                                        />
                                        <span>{tech}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className={`${screenSize === 'mobile' ? 'py-12' : 'py-20'} px-6 bg-slate-800/30`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={`${screenSize === 'mobile' ? 'text-3xl mb-8' : 'text-4xl mb-12'} font-bold text-white`}>
            Technical{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>

          {/* Random Technology Icons */}
          <div className={`relative w-full overflow-hidden ${screenSize === 'mobile' ? 'min-h-[300px]' : 'min-h-[500px]'}`}>
            {[
              { name: 'React.js', icon: SiReact, color: '#61DAFB', delay: '0s' },
              { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', delay: '0.2s' },
              { name: 'HTML5', icon: SiHtml5, color: '#E34F26', delay: '0.4s' },
              { name: 'CSS3', icon: SiCss3, color: '#1572B6', delay: '0.6s' },
              { name: 'Node.js', icon: SiNodedotjs, color: '#339933', delay: '0.8s' },
              { name: 'MongoDB', icon: SiMongodb, color: '#47A248', delay: '1s' },
              { name: 'Next.js', icon: SiNextdotjs, color: '#000000', delay: '1.2s' },
              { name: 'Express.js', icon: SiExpress, color: '#000000', delay: '1.4s' },
              { name: 'Git', icon: SiGit, color: '#F05032', delay: '1.6s' },
              { name: 'GitHub', icon: SiGithub, color: '#181717', delay: '1.8s' },
              { name: 'Python', icon: SiPython, color: '#3776AB', delay: '2s' },
              { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', delay: '2.2s' },
              { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', delay: '2.4s' },
              { name: 'Socket.io', icon: SiSocketdotio, color: '#010101', delay: '2.6s' },
              { name: 'AWS', icon: SiAmazon, color: '#FF9900', delay: '2.8s' },
            ].map((tech, index) => {
              // Generate random positions for each icon
              const positions = [
                { top: '15%', left: '20%' },
                { top: '25%', left: '45%' },
                { top: '15%', left: '70%' },
                { top: '35%', left: '25%' },
                { top: '35%', left: '55%' },
                { top: '35%', left: '80%' },
                { top: '55%', left: '15%' },
                { top: '55%', left: '40%' },
                { top: '55%', left: '65%' },
                { top: '55%', left: '85%' },
                { top: '75%', left: '25%' },
                { top: '75%', left: '50%' },
                { top: '75%', left: '75%' },
                { top: '90%', left: '35%' },
                { top: '90%', left: '65%' },
              ];
              
              const position = positions[index] || { top: '50%', left: '50%' };
              const IconComponent = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    animationDelay: tech.delay,
                    top: position.top,
                    left: position.left
                  }}
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 
                      hover:bg-slate-700/70 transition-all duration-500 cursor-pointer transform hover:scale-125 hover:rotate-12 
                      shadow-lg hover:shadow-2xl animate-pulse hover:animate-none relative overflow-hidden"
                    style={{ 
                      width: screenSize === 'mobile' ? '48px' : '64px',
                      height: screenSize === 'mobile' ? '48px' : '64px'
                    }}
                  >
                    <IconComponent 
                      className={`${screenSize === 'mobile' ? 'w-6 h-6' : 'w-10 h-10'} relative z-10 transition-all duration-300 group-hover:drop-shadow-lg`}
                      style={{
                        color: tech.color,
                        filter: 'brightness(1.1)',
                      }}
                    />
                    
                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"
                      style={{
                        background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                      }}
                    />
                    
                    {/* Tooltip */}
                    <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-3 py-1 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20
                      before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 
                      before:border-4 before:border-transparent before:border-t-slate-900/90 ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                      {tech.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`${screenSize === 'mobile' ? 'py-12' : 'py-20'} px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${screenSize === 'mobile' ? 'text-3xl mb-8' : 'text-4xl mb-12'} font-bold text-white`}>
            Let's{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 text-left">
              <p className={`${screenSize === 'mobile' ? 'text-xl' : 'text-2xl'} text-gray-300 leading-relaxed`}>
                I'm always excited to work on new projects, Let's build something amazing together!
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:abhyuday@example.com"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  rajabhyuday01@gmail.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +91 6360058498
                </a>
                <a
                  href="https://github.com/abhyuday"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Github className="w-5 h-5 mr-3" />
                  https://github.com/Abhyuday28
                </a>
                <a
                  href="https://linkedin.com/in/abhyuday"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-3" />
                  https://www.linkedin.com/in/abhyuday-abd2807/
                </a>
              </div>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${screenSize === 'mobile' ? 'py-6' : 'py-8'} px-6 bg-slate-900/50 border-t border-slate-800`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-gray-400 ${screenSize === 'mobile' ? 'text-sm' : ''}`}>
            © 2025 Abhyuday. Let's Explore the Possibility.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
