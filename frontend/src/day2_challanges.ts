import { Code } from "lucide-react";
type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ElementType;
};
export const day2_challanges: Challenge[] = [
  {
    id: "1",
    title: "CipherLock",
    description: "Crack the key, Expose the Hidden.",
    points: 100,
    icon: Code,
  },
  {
    id: "2",
    title: "Echoes of the Forgotten",
    description: "Extract data which is inside the waveforms",
    points: 100,
    icon: Code,
  },
  {
    id: "3",
    title: "Operation Blackout",
    description: "Infiltrate, Exploit, Expose: Can you uncover the secrets before they vanish Forever?",
    points: 100,
    icon: Code,
  }
];
