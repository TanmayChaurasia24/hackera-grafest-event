import { Code } from "lucide-react";

type Challenge = {
  id: string;
  title: string;
  description: string;
  problem_statement: string; // Added to match day1_challanges type
  points: number;
  icon: React.ElementType;
  difficulty: string;
};

export const day2_challanges: Challenge[] = [
  {
    id: "1", // Changed from "1" to "4" to avoid ID conflicts with day1_challanges
    title: "CipherLock",
    description: "Crack the key, Expose the Hidden.",
    problem_statement: `You've been hired by a small indie game studio, BitForge Studios, to audit their new DRM (Digital Rights Management) system before they release their next big title: "CyberKnights: Uprising".

    The lead developer, an eccentric coder named Mr. Obfuskat0r, claims to have written an "uncrackable" license key validator binary. Your mission is to test that claim.



    Your task? Reverse engineer the fsociety binary and figure out how it verifies a valid license key.

    \n
    Download the file.
    `,
    points: 400,
    icon: Code,
    difficulty: "Medium",
  },
  {
    id: "2", // Changed from "2" to "5"
    title: "Echoes of the Forgotten",
    description: "Extract data which is inside the waveforms",
    problem_statement: `Late one night, the Cybersecurity Division of Secured Syntax intercepted a mysterious audio broadcast on an abandoned radio frequency.

The transmission loops a distorted audio clip that sounds like a piece of music, but analysts suspect something is embedded within the sound itself. A strange visualization showed unusual patterns in the spectrogram, like unnatural lines and curves....definitely not part of a regular song.


Your Mission: Analyze this sound and extract the flag \n Download the file.
    
    `,
    points: 100,
    icon: Code,
    difficulty: "Medium",
  },
  {
    id: "3", // Changed from "3" to "6"
    title: "Operation Blackout",
    description:
      "Infiltrate, Exploit, Expose: Can you uncover the secrets before they vanish Forever?",
    problem_statement: `Spender’s internal finance team uses a barebones web utility called Spender...a minimalistic calculator that tracks and totals expenses. According to a leaked config file, this instance is running in a sandboxed dev environment.

    You’ve been granted external access to the portal for auditing purposes.

    At first glance, it seems harmless....just a few input fields and a "Total Expenses" button. But a seasoned analyst like you knows better: simple doesn’t always mean safe.

    Your Mission: Find a way to get the flags
`,
    points: 400,
    icon: Code,
    difficulty: "Hard",
  },
];
