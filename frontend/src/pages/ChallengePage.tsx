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
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Award,
  Timer,
  Server,
  Key,
} from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
import { day1_challanges } from "@/day1_challanges";

// Challenge types and data
type Question = {
  id: string;
  title: string;
  description: string;
  hints: string[];
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  completed: boolean;
  points: number;
};

type ChallengeDetail = {
  id: string;
  title: string;
  problem_statement: String;
  description: string;
  points: number;
  icon: React.ElementType;
};

// // Mock challenge data
// const challengesData: Record<string, ChallengeDetail> = {
//   "1": {
//     id: "1",
//     title: "Web Exploitation Basics",
//     description:
//       "This challenge focuses on common web vulnerabilities. You'll practice identifying and exploiting cross-site scripting (XSS), SQL injection, and CSRF vulnerabilities. Connect to the provided VM and find the flags!",
//     category: "Web Security",
//     difficulty: "Easy",
//     ipAddress: "192.168.1.10",
//     port: 80,
//     questions: [
//       {
//         id: "1-1",
//         title: "Find the XSS vulnerability",
//         description:
//           "There is a reflected XSS vulnerability in the search function of the application. Craft a payload that will execute JavaScript and retrieve the hidden flag.",
//         hints: [
//           "Check input fields that might not be properly sanitized",
//           "The search function doesn't escape special characters",
//         ],
//         difficulty: "Easy",
//         completed: false,
//         points: 20,
//       },
//       {
//         id: "1-2",
//         title: "SQL Injection Challenge",
//         description:
//           "The login form is vulnerable to SQL injection. Find a way to bypass authentication and access the admin panel without knowing the password.",
//         hints: [
//           "Try classic SQL injection patterns",
//           "The query might be something like: SELECT * FROM users WHERE username='[input]' AND password='[input]'",
//         ],
//         difficulty: "Medium",
//         completed: false,
//         points: 30,
//       },
//       {
//         id: "1-3",
//         title: "CSRF Token Bypass",
//         description:
//           "The application has CSRF protection, but it's implemented incorrectly. Create a proof of concept that can change a user's email address without their knowledge.",
//         hints: [
//           "The CSRF token validation has a flaw",
//           "Check how tokens are generated and validated",
//         ],
//         difficulty: "Medium",
//         completed: false,
//         points: 30,
//       },
//       {
//         id: "1-4",
//         title: "Hidden Directory Discovery",
//         description:
//           "There's a hidden administration directory that contains sensitive files. Use directory brute forcing to find it and retrieve the flag file.",
//         hints: [
//           "Common admin directory names might be used",
//           "Try tools like dirb or gobuster, or create your own wordlist",
//         ],
//         difficulty: "Easy",
//         completed: false,
//         points: 20,
//       },
//       {
//         id: "1-5",
//         title: "Local File Inclusion",
//         description:
//           "The website has a local file inclusion vulnerability. Find a way to read the /etc/passwd file from the server.",
//         hints: [
//           "Look for parameters that might include files",
//           "Try path traversal techniques with ../",
//         ],
//         difficulty: "Hard",
//         completed: false,
//         points: 40,
//       },
//     ],
//     resources: [
//       {
//         title: "OWASP XSS Prevention Cheat Sheet",
//         url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
//       },
//       {
//         title: "SQL Injection Cheat Sheet",
//         url: "https://portswigger.net/web-security/sql-injection/cheat-sheet",
//       },
//     ],
//   },
//   // More challenges would be defined here
// };

const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch challenge details
    setLoading(true);
    setTimeout(() => {
      if (id && day1_challanges[id]) {
        setChallenge(day1_challanges[id]);
        // Initialize answers object
        // const initialAnswers: Record<string, string> = {};
        // day1_challanges[id].questions.forEach((q) => {
        //   initialAnswers[q.id] = "";
        // });
        // setAnswers(initialAnswers);
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

  const handleSubmitAnswer = (question: Question) => {
    const answer = answers[question.id];
    if (!answer.trim()) {
      toast({
        title: "Error",
        description: "Please enter an answer before submitting",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would validate the answer against the correct one
    // For this demo, let's simulate a 30% chance of correct answer
    const isCorrect = Math.random() > 0.7;

    if (isCorrect) {
      toast({
        title: "Correct!",
        description: `You've earned ${question.points} points!`,
        variant: "default",
      });

      // Update the completed status of the question
      // if (challenge) {
      //   const updatedQuestions = challenge.questions.map((q) =>
      //     q.id === question.id ? { ...q, completed: true } : q
      //   );
      //   setChallenge({ ...challenge, questions: updatedQuestions });
      // }
    } else {
      toast({
        title: "Incorrect",
        description: "Try again! Check your answer carefully.",
        variant: "destructive",
      });
    }

    // Clear the answer field
    setAnswers((prev) => ({
      ...prev,
      [question.id]: "",
    }));
  };

  if (loading) {
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
                {/* <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-primary" />
                  <span>
                    {challenge.questions.reduce((sum, q) => sum + q.points, 0)}{" "}
                    pts
                  </span>
                </div> */}

                <Separator orientation="vertical" className="h-4" />

                <div className="flex items-center">
                  <Timer className="h-4 w-4 mr-1 text-primary" />
                  <span>~60 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* overview */}
        <div className="space-y-6 mb-10">
          <h1 className="text-4xl font-semibold leading-none text-secondary tracking-wide">OVERVIEW</h1>
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border bg-card/70 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{challenge.problem_statement}</p>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card/70 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">


                <div className="space-y-2">
                  <h3 className="font-medium text-secondary">How to Submit</h3>
                  <p className="text-muted-foreground text-sm">
                    For each question, find the flag in the format{" "}
                    <span className="font-mono bg-muted px-1 rounded">
                      HACKERA{"{flag_value}"}
                    </span>
                    . Submit your answer in the corresponding question field in
                    the Questions tab.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-secondary">Points</h3>
                  <p className="text-muted-foreground text-sm">
                    Each question is worth different points based on difficulty.
                    Successfully solving a question adds points to your score on
                    the leaderboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* questions */}
        {/* <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-none text-secondary tracking-wide">QUESTIONS</h1>
          {challenge.questions.map((question) => (
            <Card
              key={question.id}
              className="border border-border bg-card/70 backdrop-blur overflow-hidden"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant="outline"
                    className={
                      question.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-500"
                        : question.difficulty === "Medium"
                        ? "bg-blue-500/20 text-blue-500"
                        : question.difficulty === "Hard"
                        ? "bg-orange-500/20 text-orange-500"
                        : "bg-red-500/20 text-red-500"
                    }
                  >
                    {question.difficulty}
                  </Badge>
                  <Badge variant="secondary">{question.points} pts</Badge>
                </div>
                <div className="flex items-start gap-2">
                  <Key className="h-5 w-5 mt-0.5 text-secondary" />
                  <div>
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">
                      {question.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="bg-muted/50 rounded-md p-3 my-2">
                  <h4 className="text-sm font-medium text-secondary mb-2">
                    Hints:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    {question.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="border-t border-border pt-4 flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your answer (e.g., HACKERA{flag})"
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="font-mono bg-background/80 border-border"
                  disabled={question.completed}
                />
                <Button
                  variant={question.completed ? "outline" : "default"}
                  className={
                    question.completed
                      ? "border-primary text-primary hover:bg-primary/20 whitespace-nowrap"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
                  }
                  onClick={() => handleSubmitAnswer(question)}
                  disabled={question.completed}
                >
                  {question.completed ? "Completed" : "Submit Answer"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ChallengePage;
