
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';
import Cookies from "js-cookie"
const LoginForm: React.FC = () => {
  const [teamid, setteamid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!teamid.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    try {
      await login(teamid, password);
      setTimeout(() => {
        if (Cookies.get('loggedin')) {
          navigate('/challenges');
        }
      }, 100);
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w ">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-xl text-center font-bold">Login to HACK-ERA</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Enter your credentials to access challenges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-destructive/20 border-destructive text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="username">Team Id</Label>
            <Input
              id="teamid"
              placeholder="your-teamID"
              value={teamid}
              onChange={(e) => setteamid(e.target.value)}
              className="bg-background/50 border-border focus:border-secondary"
              autoComplete="teamid"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 border-border focus:border-secondary"
              autoComplete="current-password"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? 'Authenticating...' : 'Login'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
