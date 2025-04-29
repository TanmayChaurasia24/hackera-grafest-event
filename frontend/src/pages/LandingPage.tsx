
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import MatrixBackground from '@/components/MatrixBackground';
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Code, Bug, Shield } from "lucide-react";
import Banner from "@/images/HackEra_Banner_updated.jpg";

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to challenges if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/challenges');
    }
  }, [isAuthenticated, navigate]);

  // Cybersecurity jokes for the "Are You Nervous?" section
  const securityJokes = [
    {
      joke: "Why don't hackers get sick?",
      punchline: "Because they have good firewalls!"
    },
    {
      joke: "What do you call a computer that sings?",
      punchline: "A Dell!"
    },
    {
      joke: "Why was the computer cold?",
      punchline: "It left its Windows open!"
    }
  ];

  // CTF categories with brief descriptions
  const ctfCategories = [
    {
      title: "Web Exploitation",
      description: "Test your skills against vulnerable web applications",
      icon: <Code className="h-6 w-6 text-secondary" />
    },
    {
      title: "Cryptography",
      description: "Crack codes and decipher encrypted messages",
      icon: <Lock className="h-6 w-6 text-secondary" />
    },
    {
      title: "Network Security",
      description: "Analyze and exploit network vulnerabilities",
      icon: <Shield className="h-6 w-6 text-secondary" />
    },
    {
      title: "Binary Exploitation",
      description: "Exploit vulnerabilities in compiled applications",
      icon: <Bug className="h-6 w-6 text-secondary" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MatrixBackground />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center relative body-content">
        {/* Hero Section */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={Banner}
                  alt="HACK=ERA" 
                  className="w-full md:max-w-lg"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-primary mrrobot-heading">
                THE ULTIMATE CTF CHALLENGE
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Join Graphic Era's premier cybersecurity competition during Grafest. 
                Test your hacking skills, solve challenges, and compete for the top spot 
                on our leaderboard.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  onClick={() => {
                    const formElement = document.getElementById('login-section');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/20"
                >
                  Learn More
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {ctfCategories.map((category, index) => (
                  <div key={index} className="bg-card/50 backdrop-blur p-4 rounded-lg border border-border transition-all hover:border-secondary hover:shadow-md hover:shadow-secondary/20">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="font-semibold text-secondary mb-1 mrrobot-heading">{category.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm body-content">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div id="login-section" className="flex justify-center w-full">
            <LoginForm />
          </div>
        </div>
        
        {/* Are You Nervous? Section with Cyber Security Jokes */}
        <div className="w-full max-w-6xl mt-20 py-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-secondary mrrobot-heading mb-4 neon-text">ARE YOU NERVOUS?</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Take a break from the intensity with these cybersecurity jokes before you dive into our challenges!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityJokes.map((joke, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-border hover:border-secondary transition-all overflow-hidden">
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                  <p className="text-xl font-medium text-gray-200 mb-4 h-16 flex items-center justify-center">{joke.joke}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-primary font-semibold">{joke.punchline}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Why Participate Section */}
        <div className="w-full max-w-6xl mt-20 py-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-secondary mrrobot-heading mb-4">WHY PARTICIPATE</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Beyond the thrill of the competition, there are many reasons to join HACK=ERA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/40 backdrop-blur p-8 rounded-lg border border-border hover:border-primary transition-all">
              <h3 className="text-xl font-bold text-primary mrrobot-heading mb-4">SHARPEN YOUR SKILLS</h3>
              <p className="text-gray-300 mb-4">
                Our challenges are designed to test and improve your cybersecurity knowledge across multiple domains.
                Each task mimics real-world scenarios you might face as a security professional.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Hands-on experience with common vulnerabilities</li>
                <li>Practice ethical hacking techniques</li>
                <li>Learn to think like both attacker and defender</li>
              </ul>
            </div>
            
            <div className="bg-card/40 backdrop-blur p-8 rounded-lg border border-border hover:border-secondary transition-all">
              <h3 className="text-xl font-bold text-secondary mrrobot-heading mb-4">WIN BIG PRIZES</h3>
              <p className="text-gray-300 mb-4">
                HACK=ERA isn't just about the thrill of the hunt - we've got exciting rewards for our top performers!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">₹20,000 First Prize</p>
                    <p className="text-sm text-gray-400">For the team that conquers all</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">Internship Opportunities</p>
                    <p className="text-sm text-gray-400">With leading cybersecurity firms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">Tech Gadgets & Swag</p>
                    <p className="text-sm text-gray-400">Exclusive HACK=ERA merchandise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Countdown Timer Section */}
        <div className="w-full max-w-6xl mt-20 py-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary mrrobot-heading mb-4">THE CLOCK IS TICKING</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Are you ready to take on the challenge? Register now before time runs out!
            </p>
            
            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
              <div className="bg-card/60 backdrop-blur border border-secondary p-4 rounded-lg neon-border">
                <p className="text-3xl font-bold text-secondary">15</p>
                <p className="text-xs text-gray-400">DAYS</p>
              </div>
              <div className="bg-card/60 backdrop-blur border border-secondary p-4 rounded-lg neon-border">
                <p className="text-3xl font-bold text-secondary">10</p>
                <p className="text-xs text-gray-400">HOURS</p>
              </div>
              <div className="bg-card/60 backdrop-blur border border-secondary p-4 rounded-lg neon-border">
                <p className="text-3xl font-bold text-secondary">36</p>
                <p className="text-xs text-gray-400">MINUTES</p>
              </div>
              <div className="bg-card/60 backdrop-blur border border-secondary p-4 rounded-lg neon-border">
                <p className="text-3xl font-bold text-secondary">24</p>
                <p className="text-xs text-gray-400">SECONDS</p>
              </div>
            </div>
            
            <Button 
              variant="default" 
              size="lg" 
              className="bg-primary hover:bg-primary/80 text-primary-foreground mt-8"
              onClick={() => {
                const formElement = document.getElementById('login-section');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Register Now
            </Button>
          </div>
        </div>
        
        {/* Event Information */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-secondary mrrobot-heading">Event Details</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-card/50 backdrop-blur p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-primary mb-2 mrrobot-heading">Date</h3>
              <p className="text-muted-foreground body-content">October 15-16, 2025</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-primary mb-2 mrrobot-heading">Time</h3>
              <p className="text-muted-foreground body-content">10:00 AM - 5:00 PM</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-primary mb-2 mrrobot-heading">Venue</h3>
              <p className="text-muted-foreground body-content">Graphic Era University, Dehradun</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-background border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground body-content">
          <p>© {new Date().getFullYear()} HACK=ERA CTF Challenge | Powered by Grafest, Graphic Era Deemed University</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
