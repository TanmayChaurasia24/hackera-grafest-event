
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    try {
      await login(username, password);
      // Check if successfully logged in after login attempt
      // This will work because the login function updates the auth context
      setTimeout(() => {
        if (localStorage.getItem('hackeraUser')) {
          navigate('/challenges');
        }
      }, 100);
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md border border-border bg-card/70 backdrop-blur-md">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-xl text-center font-bold">Login to HACK=ERA</CardTitle>
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
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="your-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background/50 border-border focus:border-secondary"
              autoComplete="username"
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
      
      <div className="px-6 pb-4 text-xs text-muted-foreground text-center">
        <p>Demo accounts: admin/admin, test/test</p>
      </div>
    </Card>
  );
};

export default LoginForm;
