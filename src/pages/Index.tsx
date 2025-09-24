import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Train,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Construction,
  ArrowRight,
  Clock as ClockIcon,
  Shield as ShieldIcon,
  ChevronRight,
  Brain,
  Leaf,
  Users,
  Shield,
  Smartphone,
  Route,
  Clock,
  CreditCard,
  Zap,
  TreePine,
  IndianRupee,
  Navigation as NavigationIcon,
  Star,
  Menu,
  X,
  Network,
  Volume2,
  Bus,
  Car,
  Bike,
  Heart,
  AirVent,
  Armchair,
  Building,
  Accessibility,
  Wifi,
  QrCode,
  MessageSquare,
  Headphones, 
  Award,
  ChevronDown,
  Calendar
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/metro.png"; 
import parallaxImage from "@/assets/metro2.png";

const Footer = () => {
  return (
    <footer id="contact" 
    className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-white/10">
                <Train className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KMRL</h3>
                <p className="text-sm text-white/70">Kochi Metro Rail Limited</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Kerala's premier urban transportation system, connecting communities 
              with intelligent, sustainable, and innovative metro services.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "About KMRL",
                "Routes & Stations", 
                "Fare Calculator",
                "Smart Card Services",
                "Mobile App",
                "Careers"
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-1" />
                <div>
                  <p className="text-white font-medium">Head Office</p>
                  <p className="text-white/70 text-sm">
                    KMRL House, Muttom, Aluva<br />
                    Ernakulam, Kerala 683101
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-white font-medium">Helpline</p>
                  <p className="text-white/70 text-sm">+91 1800 23000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-white/70 text-sm">info@kochimetro.org</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Send Feedback</h4>
            <form className="space-y-4">
              <Input 
                placeholder="Your Email" 
                type="email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-secondary"
              />
              <Textarea 
                placeholder="Your Message"
                rows={4}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-secondary resize-none"
              />
              <Button className="w-full bg-secondary hover:bg-secondary-glow text-white">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="glass-card p-4 rounded-xl bg-white/5">
              <h5 className="font-semibold text-white mb-2">24/7 Operations</h5>
              <p className="text-white/70 text-xs">Daily Service Hours</p>
            </div>
            <div className="glass-card p-4 rounded-xl bg-white/5">
              <h5 className="font-semibold text-white mb-2">Smart Ticketing</h5>
              <p className="text-white/70 text-xs">Contactless Payments</p>
            </div>
            <div className="glass-card p-4 rounded-xl bg-white/5">
              <h5 className="font-semibold text-white mb-2">Free WiFi</h5>
              <p className="text-white/70 text-xs">All Stations & Trains</p>
            </div>
            <div className="glass-card p-4 rounded-xl bg-white/5">
              <h5 className="font-semibold text-white mb-2">Green Energy</h5>
              <p className="text-white/70 text-xs">100% Solar Powered</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © 2025 Kochi Metro Rail Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      <div 
        className="absolute inset-0 parallax-element animate-parallax-slow"
        style={{
          backgroundImage: `url(${ parallaxImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      <div className="absolute top-20 right-10 animate-float">
        <div className="glass-card p-4 rounded-2xl">
          <MapPin className="h-6 w-6 text-secondary" />
        </div>
      </div>
      
      <div className="absolute top-40 left-10 animate-float" style={{animationDelay: '2s'}}>
        <div className="glass-card p-4 rounded-2xl">
          <ClockIcon className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="absolute bottom-40 right-20 animate-float" style={{animationDelay: '4s'}}>
        <div className="glass-card p-4 rounded-2xl">
          <ShieldIcon className="h-6 w-6 text-secondary" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-slide-up">
            Kochi Metro
            <span className="block gradient-text bg-gradient-to-r from-secondary-glow to-primary-glow bg-clip-text ">
              Rail Limited
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed animate-slide-up max-w-3xl mx-auto" style={{animationDelay: '0.2s'}}>
            Kochi Metro Rail Limited connects the city with fast, eco-friendly, and modern metro services, redefining everyday travel across Kochi.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              className="glass-button text-lg px-8 py-4 hover:glow-primary group"
              onClick={() => navigate('/dashboard')}
            >
              Go To Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-button border-white/30  hover:bg-white/20 text-lg px-8 py-4"
            >
              Download App
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform card-3d">
              <div className="text-3xl font-bold text-white mb-2">27 km</div>
              <div className="text-white/70">Total Length</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform card-3d">
              <div className="text-3xl font-bold text-white mb-2">40+</div>
              <div className="text-white/70">Stations</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform card-3d">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/70">Green Energy</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform card-3d">
              <div className="text-3xl font-bold text-white mb-2">6 Min</div>
              <div className="text-white/70">Avg Frequency</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

// const ParallaxImageSection = () => {
//   return (
//     <section className="relative h-screen overflow-hidden">
//       {/* Parallax Background Image */}
//       <div 
//         className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url(${parallaxImage})`, // Modern metro/train image
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-secondary/70"></div>
//       </div>

//       {/* Content Overlay */}
//       <div className="relative z-10 flex items-center justify-center h-full">
//         <div className="text-center max-w-4xl mx-auto px-6">
//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
//             Experience the Future
//             <span className="block gradient-text bg-gradient-to-r from-secondary-glow to-primary-glow bg-clip-text text-transparent">
//               of Urban Transit
//             </span>
//           </h2>
//           <p className="text-xl text-white/90 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
//             Where technology meets sustainability in Kerala's premier metro system
//           </p>
          
//           {/* Floating Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
//             <div className="glass-card p-6 rounded-2xl text-center">
//               <div className="text-3xl font-bold text-white mb-2">2M+</div>
//               <div className="text-white/70">Daily Passengers</div>
//             </div>
//             <div className="glass-card p-6 rounded-2xl text-center">
//               <div className="text-3xl font-bold text-white mb-2">98%</div>
//               <div className="text-white/70">On-Time Performance</div>
//             </div>
//             <div className="glass-card p-6 rounded-2xl text-center">
//               <div className="text-3xl font-bold text-white mb-2">Zero</div>
//               <div className="text-white/70">Carbon Emissions</div>
//             </div>
//             <div className="glass-card p-6 rounded-2xl text-center">
//               <div className="text-3xl font-bold text-white mb-2">24/7</div>
//               <div className="text-white/70">Smart Monitoring</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Animated Elements */}
//       <div className="absolute top-20 left-10 animate-float">
//         <div className="glass-card p-4 rounded-2xl">
//           <Zap className="h-6 w-6 text-secondary" />
//         </div>
//       </div>
      
//       <div className="absolute bottom-40 right-20 animate-float" style={{animationDelay: '3s'}}>
//         <div className="glass-card p-4 rounded-2xl">
//           <Leaf className="h-6 w-6 text-primary" />
//         </div>
//       </div>
//     </section>
//   );
// };
const ParallaxImageSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${parallaxImage})`, // Kochi Metro/train image
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-secondary/70"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Kochi Metro Rail Limited
            <span className="block gradient-text bg-gradient-to-r from-secondary-glow to-primary-glow bg-clip-text text-transparent">
              Transforming Urban Mobility
            </span>
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            A sustainable, inclusive, and world-class metro system redefining public transport in Kerala.
          </p>
          
          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-white/70">Operational Stations</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-white mb-2">40 km</div>
              <div className="text-white/70">Metro Corridor</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/70">Renewable Energy Goals</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">Smart Operations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="glass-card p-4 rounded-2xl">
          <Zap className="h-6 w-6 text-secondary" />
        </div>
      </div>
      
      <div className="absolute bottom-40 right-20 animate-float" style={{animationDelay: '3s'}}>
        <div className="glass-card p-4 rounded-2xl">
          <Leaf className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
};
const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about", type: "anchor" },
    { label: "Services", href: "#services", type: "anchor" }, 
    { label: "Routes & Fares", href: "#routes-fares", type: "anchor" },
    { label: "News & Updates", href: "#news-updates", type: "anchor" },
    { label: "Contact", href: "#contact", type: "anchor" }
  ] as const;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? "glass-card shadow-lg backdrop-blur-xl" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-primary/10 backdrop-blur-sm">
              <Train className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">KMRL</h1>
              <p className="text-xs text-muted-foreground">Kochi Metro</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.type === 'anchor') {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(item.href);
                      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-foreground/80 hover:text-primary transition-all duration-300 relative group text-sm font-medium"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className="text-foreground/80 hover:text-primary transition-all duration-300 relative group text-sm font-medium"
                >
                  {item.label}
                  <span className="pointer-events-none absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </button>
              );
            })}
            <Button variant="default" className="glass-button hover:glow-primary" onClick={() => navigate('/dashboard')}>
              Access Dashboard
            </Button>
          </div>

          <Button
            variant="ghost" 
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 glass-card rounded-2xl animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                if (item.type === 'anchor') {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-foreground/80 hover:text-primary transition-colors py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        const el = document.querySelector(item.href);
                        if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <button
                    key={item.label}
                    onClick={() => { setIsMobileMenuOpen(false); navigate(item.href); }}
                    className="text-left text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                  </button>
                );
              })}
              <Button variant="default" className="glass-button w-full mt-4" onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }}>
                Get Smart Card
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const RouteSection = () => {
  const [selectedRoute, setSelectedRoute] = useState("blue-line");
  const [showFullMap, setShowFullMap] = useState(false);

  type RouteType = {
    name: string;
    description: string;
    stations: number;
    distance: string;
    color: string;
    textColor: string;
    bgColor: string;
    status: "operational" | "under-construction";
    expectedCompletion?: string;
    features: readonly string[];
    highlights: readonly {
      station: string;
      time: string;
      fare: string;
    }[];
  };

  const routes: Record<string, RouteType> = {
    "blue-line": {
      name: "Blue Line/Phase 1",
      description: "Aluva to Tripunithura",
      stations: 22,
      distance: "25.6 km",
      color: "bg-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-600/10",
      status: "operational",
      features: ["Airport Connectivity", "City Center Access", "Heritage Route"],
      highlights: [
        { station: "Aluva", time: "05:00 AM", fare: "₹10-50" },
        { station: "Kaloor", time: "20 mins", fare: "₹15-35" },
        { station: "MG Road", time: "35 mins", fare: "₹25-45" },
        { station: "Tripunithura", time: "45 mins", fare: "₹35-50" },
        // { station: "Tripunithura", time: "55 mins", fare: "₹45-60" }
      ]
    },
    "pink-line": {
      name: "Pink Line/Phase 2", 
      description: "Palarivattom to Kakkanad (Phase 2)",
      stations: 11,
      distance: "11.2 km",
      color: "bg-pink-600",
      textColor: "text-pink-600",
      bgColor: "bg-pink-600/10",
      status: "under-construction",
      expectedCompletion: "2027",
      features: ["IT Corridor", "Infopark Connectivity", "Modern Infrastructure"],
      highlights: [
        { station: "Palarivattom", time: "TBA", fare: "₹10-35" },
        { station: "JLN Stadium", time: "TBA", fare: "₹15-30" },
        { station: "Kaloor Stadium", time: "TBA", fare: "₹20-35" },
        { station: "Kakkanad", time: "TBA", fare: "₹25-35" }
      ]
    }
  } as const;

  const currentRoute = routes[selectedRoute as keyof typeof routes];

  // Cute Metro Map Component
  const MetroMap = () => (
    <div className="relative w-full h-auto bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-6 ">
  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

  {/* Blue Line */}
  <div className="relative mb-15"> {/* added spacing */}
    <div className="flex items-center mb-4">
      <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
      <span className="text-sm font-medium text-gray-700">Blue Line (Operational)</span>
    </div>

    {/* Blue Line Path */}
    <svg width="100%" height="120" className="mb-6">
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d="M 20 60 Q 100 20 180 60 Q 260 100 340 60"
        stroke="url(#blueGradient)"
        strokeWidth="6"
        fill="none"
        className={selectedRoute === "blue-line" ? "opacity-100" : "opacity-50"}
      />
      {/* Blue Line Stations */}
      {[
        { name: "Aluva", x: 20, y: 60 },
        { name: "Kaloor", x: 120, y: 40 },
        { name: "MG Road", x: 220, y: 80 },
        { name: "Tripunithura", x: 340, y: 60 },
        // { name: "Tripunithura", x: 420, y: 60 },
      ].map((station, i) => (
        <g key={i}>
          <circle
            cx={station.x}
            cy={station.y}
            r="8"
            fill="#2563eb"
            className={selectedRoute === "blue-line" ? "opacity-100" : "opacity-50"}
          />
          <text
            x={station.x}
            y={station.y - 15}
            textAnchor="middle"
            className="text-xs font-medium fill-gray-700"
          >
            {station.name}
          </text>
        </g>
      ))}
    </svg>
  </div>

  {/* Pink Line */}
  <div className="relative mt-10"> {/* added spacing */}
    <div className="flex items-center mb-4">
      <div className="w-3 h-3 bg-pink-600 rounded-full mr-2"></div>
      <span className="text-sm font-medium text-gray-700">Pink Line (Under Construction)</span>
      <Construction className="w-4 h-4 ml-2 text-orange-500" />
    </div>

    {/* Pink Line Path */}
    <svg width="100%" height="160">
      <defs>
        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0.8" />
        </linearGradient>
        <pattern id="constructionPattern" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="none" />
          <path d="M0,8 L8,0" stroke="#f59e0b" strokeWidth="1" />
        </pattern>
      </defs>
      <path
        d="M 60 40 Q 140 80 220 40 Q 300 0 380 40"
        stroke="url(#pinkGradient)"
        strokeWidth="6"
        fill="none"
        strokeDasharray="10,5"
        className={selectedRoute === "pink-line" ? "opacity-100" : "opacity-50"}
      />
      {/* Pink Line Stations */}
      {[
        { name: "Palarivattom", x: 60, y: 40 },
        { name: "JLN Stadium", x: 160, y: 60 },
        { name: "Kaloor Stadium", x: 260, y: 30 },
        { name: "Kakkanad", x: 380, y: 40 },
      ].map((station, i) => (
        <g key={i}>
          <circle
            cx={station.x}
            cy={station.y}
            r="8"
            fill="url(#constructionPattern)"
            stroke="#e11d48"
            strokeWidth="2"
            className={selectedRoute === "pink-line" ? "opacity-100" : "opacity-50"}
          />
          <text
            x={station.x}
            y={station.y - 15}
            textAnchor="middle"
            className="text-xs font-medium fill-gray-700"
          >
            {station.name}
          </text>
        </g>
      ))}
    </svg>
  </div>
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 text-xs">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span>Operational</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-pink-600 rounded-full opacity-60"></div>
          <span>Under Construction</span>
        </div>
      </div>
    </div>
  );

  // Full Map Modal Component
  const FullMapModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold gradient-text">Complete Route Map</h3>
            <Button variant="ghost" onClick={() => setShowFullMap(false)}>
              ✕
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-8 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Blue Line Detailed */}
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  Blue Line Stations
                </h4>
                <div className="space-y-2">
                  {[
                    "Aluva", "Pulinchodu", "Companypady", "Ambattukavu", "Muttom", 
                    "Kalamassery", "Cusat", "Pathadipalam", "Edapally", "Changampuzha Park",
                    "Palarivattom", "JLN Stadium", "Kaloor", "Town Hall", "Maharaja's College",
                    "Ernakulam South", "Kadavanthra", "Elamkulam", "Vyttila", "Thaikoodam",
                    "Petta", "Mattancherry","Tripunithura"
                  ].map((station, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{station}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pink Line Detailed */}
              <div>
                <h4 className="text-lg font-semibold text-pink-600 mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                  Pink Line Stations (Under Construction)
                  <Construction className="w-4 h-4 text-orange-500" />
                </h4>
                <div className="space-y-2">
                  {[
                    "Palarivattom", "JLN Stadium", "Kaloor Stadium", "Kadavanthra",
                    "Elamkulam", "Vyttila", "Thevara", "SN Junction",
                    "Infopark Phase I", "Infopark Phase II", "Kakkanad"
                  ].map((station, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 opacity-70">
                      <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                      <span className="text-sm">{station}</span>
                      {index === 0 && <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">Connection Point</Badge>}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Expected Completion: 2027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">22</div>
              <div className="text-sm text-gray-600">Blue Line Stations</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">11</div>
              <div className="text-sm text-gray-600">Pink Line Stations</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">36.8km</div>
              <div className="text-sm text-gray-600">Total Network</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="routes-fares" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Explore Our Routes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate through Kochi with our comprehensive metro network. 
            Plan your journey with real-time updates and intelligent route optimization.
          </p>
        </div>

        <div className="flex justify-center mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="glass-card p-2 rounded-2xl inline-flex">
            {Object.entries(routes).map(([key, route]) => (
              <Button
                key={key}
                variant={selectedRoute === key ? "default" : "ghost"}
                className={`mx-1 ${selectedRoute === key ? route.color + ' text-white' : 'text-foreground hover:' + route.bgColor}`}
                onClick={() => setSelectedRoute(key)}
              >
                <div className={`w-3 h-3 rounded-full ${route.color} mr-2`}></div>
                {route.name}
                {route.status === "under-construction" && (
                  <Construction className="w-4 h-4 ml-1" />
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
          {/* Metro Map Card */}
          <Card className="glass-card border-0 card-3d">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Train className="h-6 w-6 text-primary" />
                Interactive Route Map
              </CardTitle>
              <CardDescription className="text-base">
                Visual representation of Kochi Metro network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MetroMap />
              <Button 
                className="w-full glass-button mt-4 hover:scale-95 transition-transform"
                onClick={() => setShowFullMap(true)}
              >
                View Full Route Map
              </Button>
            </CardContent>
          </Card>

          {/* Route Details Card */}
          <Card className="glass-card border-0 card-3d">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-2xl ${currentRoute.bgColor}`}>
                  <NavigationIcon className={`h-8 w-8 ${currentRoute.textColor}`} />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${currentRoute.color}`}></div>
                    {currentRoute.name}
                    {currentRoute.status === "under-construction" && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        <Construction className="h-3 w-3 mr-1" />
                        Under Construction
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {currentRoute.description}
                    {currentRoute.expectedCompletion && (
                      <div className="mt-1 text-orange-600">
                        Expected completion: {currentRoute.expectedCompletion}
                      </div>
                    )}
                  </CardDescription>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${currentRoute.bgColor} text-center`}>
                  <MapPin className={`h-6 w-6 ${currentRoute.textColor} mx-auto mb-2`} />
                  <div className="font-bold text-lg">{currentRoute.stations}</div>
                  <div className="text-sm text-muted-foreground">Stations</div>
                </div>
                <div className={`p-4 rounded-xl ${currentRoute.bgColor} text-center`}>
                  <NavigationIcon className={`h-6 w-6 ${currentRoute.textColor} mx-auto mb-2`} />
                  <div className="font-bold text-lg">{currentRoute.distance}</div>
                  <div className="text-sm text-muted-foreground">Total Distance</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentRoute.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className={`${currentRoute.bgColor} ${currentRoute.textColor} border-0`}>
                    <Star className="h-3 w-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardTitle className="text-xl font-bold">Key Stations</CardTitle>
              <CardDescription>Popular destinations and travel times</CardDescription>
              
              {currentRoute.highlights.map((station, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${currentRoute.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <MapPin className={`h-5 w-5 ${currentRoute.textColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{station.station}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {station.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {station.fare}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showFullMap && <FullMapModal />}
    </section>
  );
};
const UpdatesSection = () => {
  const items = [
    {
      type: "Research Paper",
      title: "AI-driven Predictive Maintenance in Urban Metros",
      blurb:
        "A study on reducing downtime using ML for rolling stock and station assets.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
      cta: { label: "Read Paper", href: "https://arxiv.org" },
    },
    {
      type: "News",
      title: "KMRL expands integrated water-metro services",
      blurb:
        "Faster cross-city commutes with synchronized schedules and unified ticketing.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      cta: { label: "Read Article", href: "https://kochimetro.org/" },
    },
    {
      type: "Update",
      title: "Solar capacity upgrade across depots & stations",
      blurb:
        "Reinforcing our 100% green energy commitment with new installations.",
      img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
      cta: { label: "Learn More", href: "https://kochimetro.org/" },
    },
  ] as const;

  return (
    <section
      id="news-updates"
      className="relative py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden"
    >
      {/* ✨ subtle floating glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,40,120,0.15),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4
              bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-600
              bg-clip-text text-transparent">
            News & Updates ✨
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the latest research, announcements, and stories from KMRL.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
            >
              {/* Image with zoom & overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold
                  rounded-full bg-blue-100 text-blue-700 mb-3">
                  {item.type}
                </span>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 mb-4 text-sm">{item.blurb}</p>

                <a
                  href={item.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 font-medium hover:underline"
                >
                  {item.cta.label}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-200/30 to-sky-200/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main>
        <div id="about" />
        <HeroSection />
        
        {/* <ParallaxImageSection />  */}
        <RouteSection />
        <UpdatesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


