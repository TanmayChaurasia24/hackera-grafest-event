

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import MatrixBackground from '@/components/MatrixBackground';
import Banner from "@/images/HackEra_Banner_updated.jpg"
const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to challenges if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/challenges');
    }
  }, [isAuthenticated, navigate]);

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
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-card/50 backdrop-blur p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-secondary mb-1 mrrobot-heading">Web Exploitation</h3>
                  <p className="text-muted-foreground text-sm body-content">Test your skills against vulnerable web applications</p>
                </div>
                
                <div className="bg-card/50 backdrop-blur p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-secondary mb-1 mrrobot-heading">Cryptography</h3>
                  <p className="text-muted-foreground text-sm body-content">Crack codes and decipher encrypted messages</p>
                </div>
                
                <div className="bg-card/50 backdrop-blur p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-secondary mb-1 mrrobot-heading">Network Security</h3>
                  <p className="text-muted-foreground text-sm body-content">Analyze and exploit network vulnerabilities</p>
                </div>
              </div>
            </div>
          </div>
          
          <div id="login-section" className="flex justify-center w-full">
            <LoginForm />
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
