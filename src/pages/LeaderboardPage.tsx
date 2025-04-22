
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Trophy, Medal, Award, Clock } from 'lucide-react';
import MatrixBackground from '@/components/MatrixBackground';

// Types for leaderboard
type LeaderboardUser = {
  id: string;
  rank: number;
  username: string;
  points: number;
  challengesCompleted: number;
  lastActive: string;
  isCurrentUser?: boolean;
};

// Mock leaderboard data
const mockLeaderboardData: LeaderboardUser[] = [
  { id: '1', rank: 1, username: 'hackerman', points: 1500, challengesCompleted: 12, lastActive: '2 hours ago' },
  { id: '2', rank: 2, username: 'neo', points: 1200, challengesCompleted: 10, lastActive: '1 hour ago' },
  { id: '3', rank: 3, username: 'cyberNinja', points: 1100, challengesCompleted: 9, lastActive: '30 minutes ago' },
  { id: '4', rank: 4, username: 'matrix_master', points: 950, challengesCompleted: 8, lastActive: '3 hours ago' },
  { id: '5', rank: 5, username: 'admin', points: 850, challengesCompleted: 7, lastActive: '1 day ago' },
  { id: '6', rank: 6, username: 'test', points: 800, challengesCompleted: 6, lastActive: '4 hours ago' },
  { id: '7', rank: 7, username: 'securityExpert', points: 750, challengesCompleted: 6, lastActive: '2 days ago' },
  { id: '8', rank: 8, username: 'h4ck3r', points: 700, challengesCompleted: 5, lastActive: '1 day ago' },
  { id: '9', rank: 9, username: 'codeBreaker', points: 650, challengesCompleted: 5, lastActive: '5 hours ago' },
  { id: '10', rank: 10, username: 'anonymous', points: 600, challengesCompleted: 4, lastActive: '12 hours ago' },
  { id: '11', rank: 11, username: 'secureMe', points: 550, challengesCompleted: 4, lastActive: '1 day ago' },
  { id: '12', rank: 12, username: 'rootUser', points: 500, challengesCompleted: 3, lastActive: '2 days ago' },
  { id: '13', rank: 13, username: 'ethical_hacker', points: 450, challengesCompleted: 3, lastActive: '3 days ago' },
  { id: '14', rank: 14, username: 'pythonDev', points: 400, challengesCompleted: 2, lastActive: '1 week ago' },
  { id: '15', rank: 15, username: 'bugHunter', points: 350, challengesCompleted: 2, lastActive: '3 days ago' },
];

const LeaderboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);
  const [timeframe, setTimeframe] = useState('all-time');

  useEffect(() => {
    // Get current user from localStorage
    const currentUserJson = localStorage.getItem('hackeraUser');
    let currentUsername = '';
    
    if (currentUserJson) {
      try {
        const currentUser = JSON.parse(currentUserJson);
        currentUsername = currentUser.username;
      } catch (error) {
        console.error('Failed to parse user data', error);
      }
    }

    // Apply the current user flag to the leaderboard data
    const processedData = mockLeaderboardData.map(user => ({
      ...user,
      isCurrentUser: user.username === currentUsername
    }));

    setFilteredUsers(processedData);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(mockLeaderboardData);
      return;
    }

    const filtered = mockLeaderboardData.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm]);

  // Function to render rank badges with different styles for top 3
  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/50">
          <Trophy className="h-4 w-4" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400/20 text-gray-400 border border-gray-400/50">
          <Medal className="h-4 w-4" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/20 text-amber-700 border border-amber-700/50">
          <Award className="h-4 w-4" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground border border-border">
          {rank}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen">
      <MatrixBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2 text-white">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank against other participants in the HACK=ERA CTF Challenge.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-72 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-10 bg-background/50 border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs 
            defaultValue="all-time" 
            value={timeframe} 
            onValueChange={setTimeframe}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="all-time">All Time</TabsTrigger>
              <TabsTrigger value="this-week">This Week</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="border border-border bg-card/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Top Hackers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">Rank</th>
                    <th className="pb-3 px-4 font-medium text-muted-foreground">User</th>
                    <th className="pb-3 px-4 font-medium text-muted-foreground text-right">Points</th>
                    <th className="pb-3 px-4 font-medium text-muted-foreground text-right hidden sm:table-cell">Challenges</th>
                    <th className="pb-3 pl-4 font-medium text-muted-foreground text-right hidden md:table-cell">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className={`border-b border-border hover:bg-muted/30 transition-colors ${
                        user.isCurrentUser ? 'bg-primary/10' : ''
                      }`}
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center">
                          {renderRankBadge(user.rank)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>
                            {user.username}
                          </span>
                          {user.isCurrentUser && (
                            <Badge variant="outline" className="bg-primary/20 text-primary text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-secondary font-medium">
                        {user.points} pts
                      </td>
                      <td className="py-4 px-4 text-right hidden sm:table-cell text-muted-foreground">
                        {user.challengesCompleted}
                      </td>
                      <td className="py-4 pl-4 text-right hidden md:table-cell">
                        <div className="flex items-center justify-end gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{user.lastActive}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-muted-foreground">
                        No users found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
