
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
            </div>
          </div>
          
          <div id="login-section" className="flex bg-slate-200 justify-center w-full rounded-lg p-[1px] bg-gradient-to-tr from-purple-600 via-cyan-500 to-yellow-400">
            <LoginForm />
          </div>
        </div>
        
        {/* Are You Nervous? Section with Cyber Security Jokes */}
        <div className="w-full max-w-6xl mt-20 py-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-secondary mrrobot-heading mb-4">ARE YOU NERVOUS?</h2>
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
