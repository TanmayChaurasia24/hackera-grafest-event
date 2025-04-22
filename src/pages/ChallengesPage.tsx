
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Lock, Shield, Database, Network, Key } from 'lucide-react';
import MatrixBackground from '@/components/MatrixBackground';
import { useToast } from '@/components/ui/use-toast';

// Challenge types and difficulty levels
type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Extreme';

type Challenge = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  points: number;
  completedCount: number;
  totalCount: number;
  icon: React.ElementType;
  ipAddress?: string;
};

// Mock challenges data
const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Web Exploitation Basics',
    description: 'Learn basic web security vulnerabilities including XSS, CSRF, and SQLi',
    category: 'Web Security',
    difficulty: 'Easy',
    points: 100,
    completedCount: 1,
    totalCount: 5,
    icon: Code,
    ipAddress: '192.168.1.10',
  },
  {
    id: '2',
    title: 'Crack the Hash',
    description: 'Practice your hash cracking skills and decrypt various password hashes',
    category: 'Cryptography',
    difficulty: 'Medium',
    points: 150,
    completedCount: 0,
    totalCount: 4,
    icon: Key,
    ipAddress: '192.168.1.11',
  },
  {
    id: '3',
    title: 'Network Penetration',
    description: 'Analyze and exploit network vulnerabilities in a controlled environment',
    category: 'Network Security',
    difficulty: 'Hard',
    points: 200,
    completedCount: 0,
    totalCount: 6,
    icon: Network,
    ipAddress: '192.168.1.12',
  },
  {
    id: '4',
    title: 'SQL Injection Master',
    description: 'Advanced SQL injection techniques and database exploitation',
    category: 'Database Security',
    difficulty: 'Medium',
    points: 175,
    completedCount: 2,
    totalCount: 5,
    icon: Database,
    ipAddress: '192.168.1.13',
  },
  {
    id: '5',
    title: 'Authentication Bypass',
    description: 'Find ways to bypass authentication mechanisms and gain unauthorized access',
    category: 'Authentication',
    difficulty: 'Medium',
    points: 150,
    completedCount: 0,
    totalCount: 3,
    icon: Lock,
    ipAddress: '192.168.1.14',
  },
  {
    id: '6',
    title: 'Reverse Engineering Challenge',
    description: 'Analyze and reverse engineer compiled code to find vulnerabilities',
    category: 'Reverse Engineering',
    difficulty: 'Extreme',
    points: 300,
    completedCount: 0,
    totalCount: 4,
    icon: Shield,
    ipAddress: '192.168.1.15',
  },
];

// Helper to get difficulty color
const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-500/20 text-green-500 hover:bg-green-500/30';
    case 'Medium': return 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30';
    case 'Hard': return 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30';
    case 'Extreme': return 'bg-red-500/20 text-red-500 hover:bg-red-500/30';
    default: return 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30';
  }
};

const ChallengesPage: React.FC = () => {
  const { toast } = useToast();

  // Show welcome toast on first load
  React.useEffect(() => {
    toast({
      title: "Welcome to Challenges",
      description: "Select a challenge to begin your hacking journey.",
    });
  }, []);

  return (
    <div className="min-h-screen">
      <MatrixBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2 text-primary neon-text-primary">Challenges</h1>
          <p className="text-muted-foreground">
            Select a challenge to test your cybersecurity skills. Each challenge contains 
            multiple questions and a dedicated environment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
              <Card className="h-full border border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 bg-card/70 backdrop-blur-md overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant="outline" 
                      className={`${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="secondary">{challenge.points} pts</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <challenge.icon className="h-5 w-5 text-secondary" />
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm">{challenge.description}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-secondary">{challenge.category}</span>
                      <span className="text-muted-foreground">
                        {challenge.completedCount}/{challenge.totalCount} completed
                      </span>
                    </div>
                    <Progress 
                      value={(challenge.completedCount / challenge.totalCount) * 100} 
                      className="h-1 bg-muted"
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-border pt-4 text-xs text-muted-foreground">
                  <div className="w-full flex justify-between items-center">
                    <span className="font-mono">IP: {challenge.ipAddress}</span>
                    <Badge variant="outline" className="text-secondary group-hover:bg-secondary/10 transition-colors">
                      View Challenge
                    </Badge>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
