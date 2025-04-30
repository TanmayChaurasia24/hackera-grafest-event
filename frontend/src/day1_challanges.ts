import { Code } from "lucide-react";
type Challenge = {
  id: string;
  title: string;
  problem_statement: String;
  description: string;
  points: number;
  icon: React.ElementType;
  difficulty: string;
};
export const day1_challanges: Challenge[] = [
  {
    id: "1",
    title: "The Ghost Protocol",
    description: "Elliot’s mission was never meant to fade",
    problem_statement: `E Corp is back stronger, smarter, more dangerous. But so are we. @revenantRoot, once a ghost in the system, now leads a new digital resistance. As the head of this reborn crew, they’ve launched RabbitCatCTF, a covert campaign to finish what Elliot started.

    With Elliot back in the network, the fight reignites. Each flag you uncover exposes cracks in E Corp’s armor.

    "We don’t forget. We don’t forgive. Elliot’s mission lives on through us.”

    Join revenantRoot. Dig deep. Break their system.
    This is RabbitCatCTF. This is the new fsociety.

    Try OSINT to reveal the answers.
    `,
    points: 200,
    icon: Code,
    difficulty: "Easy"
  },
  {
    id: "2",
    title: "Tapped Conversation",
    description: "Reveal the information by tapped conversations of two insider employees.",
    problem_statement: `An internal breach has shaken Secured Syntax. Two employees are suspected of leaking sensitive information using a custom-built chat tool. Luckily, the security team managed to tap the network traffic just in time and captured a .pcap file...but couldn’t make sense of it.

    Now, they need your expertise.

    You’ve been handed the raw capture. Somewhere within the TCP streams lies the unencrypted chat. It’s noisy… but the right filters might help reveal what’s hidden in plain sight.

    Your mission:
    Analyze the .pcap, locate the tapped TCP conversation, and extract the flag mentioned in their secret exchange.

    Also Download the file
    `,
    points: 400,
    icon: Code,
    difficulty: "Medium"
  },
  {
    id: "3",
    title: "Breaking Bad Code: The Final Clue",
    description: "He wasn't caught by the formula... he was caught by the code. -Hank Schrader",
    problem_statement: `Years after the fall of Heisenberg, the DEA finally uncovered something unusual...not in a lab, but in code.

    Hank Schrader, relentless even after death, had left behind traces of an ongoing investigation. It wasn't chemistry that led him to the truth...it was a digital anomaly buried deep in Walter White's network.

    A mysterious portal was found, running silently on a remote server. It had one thing:
    a username prompt.

    Out of instinct, Hank typed the name of the one person closest to Heisenberg — pinkman.

    The system responded… but instead of clarity, it spit out encrypted fragments — nonsense to most, but maybe not to you.

    This wasn’t just a login. This was Walter’s final test.

    Heisenberg hide something — a message, a secret — and it's still in there.
    But it's protected, deeply. Only someone who truly thinks like Walter can uncover it.
     
    `,
    points: 200,
    icon: Code,
    difficulty: "Hard"
  }
];
