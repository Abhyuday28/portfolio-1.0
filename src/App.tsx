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
} from 'lucide-react';


interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: 'intern' | 'education' | 'project' | 'achievement' ;
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
    title: 'Bachelor of Technology in Computer Science',
    organization: 'Motihari College of Engineering',
    type: 'education',
    description: 'Pursuing B.Tech in Computer Science and Engineering',
    details: [
      'CGPA: 7.81/10',
      'Relevant Coursework: Data Structures, Algorithms, Database Management',
      'Active participant in coding competitions and hackathons',
      'Member of technical clubs and societies',
    ],
    location: 'Motihari, Bihar',
  },
  {
    id: '2',
    year: '2022',
    title: 'Frontend Developer Trainee',
    organization: 'Antrangini: Training Startup',
    type: 'intern',
    description:
      'Developed proficiency in HTML, CSS, and JavaScript by building frontend projects.',
    details: [
      'Get trained about frontend tech like HTML, CSS & JavaScript',
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
    year: '2024',
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
    technologies: ['HTML', 'CSS', 'JavaScript', 'Githum'],
    link: 'https://abhyuday28.github.io/',
  },
  {
    id: '4',
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
  {
    id: '6',
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

          // Haptic feedback for timeline progression
          // if (clampedItemIndex !== currentVisibleItem) {
          //   haptic.timeline();
          // }
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
              React.js Expert
            </span>
            <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30">
              Node.js
            </span>
            <span className="px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 border border-teal-500/30">
              Full Stack Development
            </span>
            <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-300 border border-green-500/30">
              MongoDB
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
        className="py-12 px-4 sm:px-6 relative"
        style={{ minHeight: '300vh' }}
      >
        <div className="sticky top-16 max-w-7xl mx-auto">
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

          {/* Horizontal Timeline */}
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
                            // haptic.medium();
                          }}
                          // onMouseEnter={() => haptic.light()}
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
                            // haptic.medium();
                          }}
                          // onMouseEnter={() => haptic.light()}
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

                          {item.technologies && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.technologies
                                .slice(0, screenSize === 'mobile' ? 2 : 3)
                                .map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 sm:px-3 py-1 bg-slate-700/50 rounded-full text-xs sm:text-sm text-teal-300"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              {item.technologies.length >
                                (screenSize === 'mobile' ? 2 : 3) && (
                                <span className="px-2 sm:px-3 py-1 bg-slate-700/50 rounded-full text-xs sm:text-sm text-gray-400">
                                  +
                                  {item.technologies.length -
                                    (screenSize === 'mobile' ? 2 : 3)}
                                </span>
                              )}
                            </div>
                          )}

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

                              {item.technologies &&
                                item.technologies.length >
                                  (screenSize === 'mobile' ? 2 : 3) && (
                                  <div className="flex flex-wrap gap-2 mt-4">
                                    {item.technologies
                                      .slice(screenSize === 'mobile' ? 2 : 3)
                                      .map((tech) => (
                                        <span
                                          key={tech}
                                          className="px-2 sm:px-3 py-1 bg-slate-700/50 rounded-full text-xs sm:text-sm text-teal-300"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                  </div>
                                )}

                              {item.link && (
                                <div className="mt-4">
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
                                    // onClick={() => haptic.success()}
                                  >
                                    <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                    View Project
                                  </a>
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
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Technical{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Frontend',
                skills: [
                  'React.js',
                  'JavaScript',
                  'HTML5',
                  'CSS3',
                  'Material-UI',
                ],
              },
              {
                category: 'Backend',
                skills: [
                  'Node.js',
                  'Express.js',
                  'MongoDB',
                  'RESTful APIs',
                  'Socket.io',
                ],
              },
              {
                category: 'Tools & Others',
                skills: ['Git', 'AWS', 'Python', 'Machine Learning', 'Agile'],
              },
            ].map((group) => (
              <div
                key={group.category}
                className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50"
              >
                <h3 className="text-xl font-bold mb-6 text-blue-400">
                  {group.category}
                </h3>
                <div className="space-y-4 flex flex-col items-center">
                  {group.skills.map((skill) => (
                    <div key={skill} className="w-full">
                      <div
                        className="text-center text-gray-300 py-2 px-4 rounded-lg transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 cursor-pointer "
                        // onMouseEnter={() => haptic.light()}
                        // onClick={() => haptic.medium()}
                      >
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Let's{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 text-left">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm always excited to work on new projects and collaborate with
                fellow developers. Let's build something amazing together!
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:abhyuday@example.com"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                  // onMouseEnter={() => haptic.light()}
                  // onClick={() => haptic.medium()}
                >
                  <Mail className="w-5 h-5 mr-3" />
                  rajabhyuday01@gmail.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                  // onMouseEnter={() => haptic.light()}
                  // onClick={() => haptic.medium()}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +91 6360058498
                </a>
                <a
                  href="https://github.com/abhyuday"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                  // onMouseEnter={() => haptic.light()}
                  // onClick={() => haptic.medium()}
                >
                  <Github className="w-5 h-5 mr-3" />
                  https://github.com/Abhyuday28
                </a>
                <a
                  href="https://linkedin.com/in/abhyuday"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                  // onMouseEnter={() => haptic.light()}
                  // onClick={() => haptic.medium()}
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
                // onFocus={() => haptic.light()}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                // onFocus={() => haptic.light()}
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                // onFocus={() => haptic.light()}
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                // onMouseEnter={() => haptic.light()}
                // onClick={() => haptic.success()}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Abhyuday. Built with passion and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
