import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Award,
  Timer,
  Server,
  Key,
  CheckCircle,
} from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
// import { day1_challanges } from "@/day1_challanges";
import { day2_challanges } from "@/day2_challanges";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Define Question type for the backend response
type Question = {
  _id: string;
  questionId: number;
  problem: string;
  placeholder: string;
  roundNumber: number;
  isCorrect?: boolean;
};

type ChallengeDetail = {
  id: string;
  title: string;
  problem_statement: String;
  description: string;
  points: number;
  icon: React.ElementType;
};

const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Decode JWT to get team ID
  const payload: any = jwtDecode(Cookies.get("loggedin"));
  const teamId = payload.teamId;

  // Use React Query to fetch questions from the backend
  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ["questions", id, teamId],
    queryFn: async () => {
      const day = 2;

      try {
        // console.log("things are: ", day,teamId,id);
        console.log(Cookies.get('loggedin'));

        const response: any = await axios.get(
          `https://hackera-backend.onrender.com/api/questions/team/${teamId}/day/${day}/round/${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("loggedin")}`,
            },
          }
        );
        const data = await response.data;
        // console.log(data);

        return data;
      } catch (error) {
        console.error("Error fetching questions:", error);
        throw new Error("Failed to fetch questions");
      }
    },
    enabled: !!id && !!teamId,
  });

  useEffect(() => {
    // // Find the challenge from both day1 and day2 challenges
    // console.log("ans: ", answers);

    setLoading(true);
    setTimeout(() => {
      if (id) {
        // Look for the challenge in both day1 and day2 challenges
        const allChallenges = [...day2_challanges];
        const foundChallenge = allChallenges.find((c) => c.id === id);

        if (foundChallenge) {
          setChallenge(foundChallenge);
          // Initialize answers object
          const initialAnswers: Record<string, string> = {};
          setAnswers(initialAnswers);
        }
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitAnswer = async (question: Question) => {
    const solution = answers[question._id];
    const questionId = question.questionId;

    if (!solution?.trim()) {
      toast({
        title: "Error",
        description: "Please enter an answer before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      
      
      const response = await axios.post(
        "https://hackera-backend.onrender.com/api/questions/submit",
        {
          teamId,
          questionId,
          solution,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("loggedin")}`,
          },
        }
      );

      const data = response.data;
      console.log("data is: ", data);

      const isCorrect = data.isCorrect;
      console.log("data answer is: ", data.solution);

      if (isCorrect) {
        toast({
          title: "Correct!",
          description: `You've earned points for this question!`,
          variant: "default",
        });

        // Update the UI immediately without waiting for refetch
        setAnswers((prev) => ({
          ...prev,
          [question._id]: data.solution,
        }));

        // Update the questions cache to mark this question as correct
        queryClient.setQueryData(["questions", id, teamId], (oldData: any) => {
          if (!oldData) return oldData;
          return oldData.map((q: Question) => {
            if (q._id === question._id) {
              return { ...q, isCorrect: true };
            }
            return q;
          });
        });
      } else {
        toast({
          title: "Incorrect",
          description: "Try again! Check your answer carefully.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading || questionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Challenge Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The challenge you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/challenges">Back to Challenges</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getS3DownloadLink = (title) => {
    switch (title) {
      case "Tapped Conversation":
        return "https://grafest-bucket-neural-nexus-ctf.s3.ap-south-1.amazonaws.com/HACK-ERA-CTF/tapped_conversation.pcapng";
      case "CipherLock":
        return "https://grafest-bucket-neural-nexus-ctf.s3.ap-south-1.amazonaws.com/HACK-ERA-CTF/fsociety";
      case "Echoes of the Forgotten":
        return "https://grafest-bucket-neural-nexus-ctf.s3.ap-south-1.amazonaws.com/HACK-ERA-CTF/out.wav";
      default:
        return undefined;
    }
  };

  const s3Link = getS3DownloadLink(challenge.title);

  return (
    <div className="min-h-screen">
      <MatrixBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/challenges"
            className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                {challenge.title}
              </h1>
            </div>

            <div className="flex flex-col xs:flex-row gap-2 items-start xs:items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-primary" />
                  <span>{challenge.points} pts</span>
                </div>

                <Separator orientation="vertical" className="h-4" />

                <div className="flex items-center">
                  <Timer className="h-4 w-4 mr-1 text-primary" />
                  <span>~60 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview section */}
        <div className="space-y-6 mb-10">
          <h1 className="text-4xl font-semibold leading-none text-secondary tracking-wide">
            OVERVIEW
          </h1>
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border bg-card/70 backdrop-blur">
              <CardContent className="flex items-center mt-4">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <challenge.icon className="h-5 w-5 text-secondary" />
                    <CardTitle className="text-lg">
                      {challenge.description}
                    </CardTitle>
                  </div>
                  {challenge.title === "Tapped Conversation" ||
                  challenge.title === "CipherLock" ||
                  challenge.title === "Echoes of the Forgotten" ? (
                    <a
                      href={s3Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Button className="bg-secondary hover:bg-secondary/90">
                        Download File
                      </Button>
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card/70 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Problem Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {challenge.problem_statement}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Questions section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-none text-secondary tracking-wide">
            QUESTIONS
          </h1>
          {questions &&
            questions.map((question: Question) => (
              <Card
                key={question._id}
                className="border border-border bg-card/70 backdrop-blur overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant="outline"
                      className={`${
                        question.isCorrect
                          ? "bg-green-500/20 text-green-500"
                          : "bg-blue-500/20 text-blue-500"
                      }`}
                    >
                      Question {question.questionId}
                      {question.isCorrect && (
                        <CheckCircle className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                    <Badge variant="secondary">100 pts</Badge>
                  </div>
                  <div className="flex items-start gap-2">
                    <Key className="h-5 w-5 mt-0.5 text-secondary" />
                    <div>
                      <CardTitle className="text-lg">
                        {question.problem}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="border-t border-border pt-4 flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder={question.placeholder}
                    value={answers[question._id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                    className={`font-mono bg-background/80 border-border ${
                      question.isCorrect ? "text-green-500" : ""
                    }`}
                    disabled={question.isCorrect}
                    readOnly={question.isCorrect}
                  />
                  <Button
                    variant={question.isCorrect ? "secondary" : "default"}
                    className={`${
                      question.isCorrect
                        ? "bg-green-500 hover:bg-green-500 text-white cursor-not-allowed opacity-80"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    } whitespace-nowrap`}
                    onClick={() => handleSubmitAnswer(question)}
                    disabled={question.isCorrect}
                  >
                    {question.isCorrect ? "Correct" : "Submit Answer"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
