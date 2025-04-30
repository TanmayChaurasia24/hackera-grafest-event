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
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-yellow-500 border border-yellow-500/50">
          <Trophy className="h-4 w-4" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-gray-400 border border-gray-400/50">
          <Medal className="h-4 w-4" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-amber-700 border border-amber-700/50">
          <Award className="h-4 w-4" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-white border border-border">
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
            See how you rank against other participants in the HACK-ERA CTF
            Challenge.
          </p>
        </header>

        <Card className="border border-border bg-card/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-4xl">Top Hackers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto flex justify-center">
              <table className="w-[70%]">
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
                <tbody className="">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center">
                        <p>Loading...</p>
                      </td>
                    </tr>
                  ) : isError ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center">
                        <p>Error Loading LeaderBoard...</p>
                      </td>
                    </tr>
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
                    leaderboard.slice(0, 10).map((user, index) => {
                      let bgClass = "";
                      let textColor = "text-white";
                      let teamColor = "text-white";

                      if (index === 0) {
                        bgClass = "bg-gradient-to-r from-[#FFD700] to-black";
                        textColor = "text-white";
                        teamColor = "text-black";
                      } else if (index === 1) {
                        bgClass = "bg-gradient-to-r from-[#C0C0C0] to-black";
                        textColor = "text-white";
                        teamColor = "text-black";
                      } else if (index === 2) {
                        bgClass =
                          "bg-gradient-to-r from-[#CD7F32] via-[#CD7F32] to-black";
                        textColor = "text-white";
                        teamColor = "text-black";
                      } else if (index % 2 === 0) {
                        bgClass = "bg-gray-700";
                      }

                      return (
                        <tr key={user._id}>
                          <td colSpan={5} className="pb-4">
                            <div
                              className={`rounded-xl overflow-hidden shadow-md ${bgClass}`}
                            >
                              <div className="flex items-center justify-between px-4 py-4">
                                <div className="flex items-center gap-4">
                                  {renderRankBadge(index + 1)}
                                  <span className={`font-medium ${teamColor }`}>
                                    {user.teamId}
                                  </span>
                                </div>
                                <div
                                  className={`font-mono font-medium ${textColor}`}
                                >
                                  {user.points} pts
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
