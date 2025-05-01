import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MatrixBackground from "@/components/MatrixBackground";
import { useToast } from "@/hooks/use-toast";
// import { day1_challanges } from "@/day1_challanges";
import { day2_challanges } from "@/day2_challanges";

const ChallengesPage: React.FC = () => {
  const { toast } = useToast();

  // Show welcome toast on first load
  React.useEffect(() => {
    toast({
      title: "Welcome to Challenges",
      description: "Select a challenge to begin your hacking journey.",
    });
  }, []);

  // Combine both day1 and day2 challenges
  const allChallenges = [...day2_challanges];

  return (
    <div className="min-h-screen">
      <MatrixBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2 text-white">Challenges</h1>
          <p className="text-muted-foreground">
            Select a challenge to test your cybersecurity skills. Each challenge
            contains multiple questions and a dedicated environment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allChallenges.map((challenge) => (
            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
              <Card className="h-full border border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 bg-card/70 backdrop-blur-md overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{challenge.points} pts</Badge>
                    <div
                      className={
                        challenge.difficulty === "Easy"
                          ? "text-green-600 bg-transparent border border-green-600 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          : challenge.difficulty === "Medium"
                          ? "text-yellow-500 border-yellow-500 bg-transparent inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          : "text-red-500 bg-transparent border-red-500 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      }
                    >
                      {challenge.difficulty}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <challenge.icon className="h-5 w-5 text-secondary" />
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {challenge.description}
                  </p>
                </CardContent>

                <CardFooter className="border-t border-border pt-4 text-xs text-muted-foreground">
                  <div className="w-full flex justify-between items-center">
                    <Badge
                      variant="outline"
                      className="text-secondary group-hover:bg-secondary/10 transition-colors"
                    >
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
