import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Types for leaderboard
type LeaderboardUser = {
  _id: string;
  teamId: string;
  points: number;
};

const LeaderboardPage: React.FC = () => {
  const fetch_leaderboard = async () => {
    const leaderboard_backend_response = await axios.get(
      "https://hackera-backend.onrender.com/api/questions/points/"
    );
    // console.log("current leader borad is: ", leaderboard_backend_response);

    return leaderboard_backend_response.data;
  };

  const {
    data: leaderboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetch_leaderboard,
    refetchInterval: 5000,
  });

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
            See how you rank against other participants in the HACK=ERA CTF
            Challenge.
          </p>
        </header>

        <Card className="border border-border bg-card/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Top Hackers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">
                      Rank
                    </th>
                    <th className="pb-3 px-4 font-medium text-muted-foreground">
                      User
                    </th>
                    <th className="pb-3 px-4 font-medium text-muted-foreground text-right">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : isError ? (
                    <p>Error Loading LeaderBoard...</p>
                  ) : leaderboard.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-6 text-center text-muted-foreground"
                      >
                        No users found matching your search.
                      </td>
                    </tr>
                  ) : (
                    leaderboard?.slice(0, 10).map((user, index) => (
                      <tr key={user._id}>
                        <td className="py-4 pr-4">
                          <div className="flex items-center">
                            {renderRankBadge(index + 1)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium text-primary`}>
                              {user.teamId}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-secondary font-medium">
                          {user.points} pts
                        </td>
                      </tr>
                    ))
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
