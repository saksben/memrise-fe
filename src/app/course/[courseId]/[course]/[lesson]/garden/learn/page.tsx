"use client";

// Learning page. Everything in here is just rendered components
// /learn?course_id={courseId}&level_index=1

import React from "react";

type Word = {
  id: number;
  name: string;
  translation: string;
};

type RoundType = "match" | "fill-blank";

type GameRound = {
  word: Word;
  roundType: RoundType;
};

//   Shuffle helper function
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const GameContainer: React.FC<{ words: Word[] }> = () => {
    const words: Word[] = [
        {
          id: 0,
          name: "jour",
          translation: "day",
        },
        {
          id: 1,
          name: "nuit",
          translation: "night",
        },
        {
          id: 2,
          name: "salut",
          translation: "hi",
        },
        {
          id: 3,
          name: "non",
          translation: "no",
        },
        {
          id: 4,
          name: "au revoir",
          translation: "goodbye",
        },
      ];

  const [gameRounds, setGameRounds] = React.useState<GameRound[]>([]);
  const [currentRound, setCurrentRound] = React.useState(0);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    initializeGameRounds();
  }, []);

  // Initialize rounds with randomized types for each word
  const initializeGameRounds = () => {
    const rounds: GameRound[] = [];
    words.forEach((word) => {
      for (let i = 0; i < 6; i++) {
        const roundType = Math.random() > 0.5 ? "match" : "fill-blank";
        rounds.push({ word, roundType });
      }
    });
    setGameRounds(shuffleArray(rounds));
  };

  // Handle correct answer and move to next round
  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 1);
    setCurrentRound((prev) => prev + 1);
  };

  // Handle incorrect answer and move to next round
  const handleIncorrectAnswer = () => {
    setCurrentRound((prev) => prev + 1);
  };

  // End of game
  if (currentRound >= gameRounds.length) {
    return <div>Game Over! Your Score: {score}</div>;
  }

  const { word, roundType } = gameRounds[currentRound];

  return (
    <div className="game-container">
      {roundType === "match" ? (
        <MatchRound
          word={word}
          onCorrect={handleCorrectAnswer}
          onIncorrect={handleIncorrectAnswer}
        />
      ) : (
        <FillBlankRound
          word={word}
          onCorrect={handleCorrectAnswer}
          onIncorrect={handleIncorrectAnswer}
        />
      )}
      <p>Score: {score}</p>
    </div>
  );
};

// Match the word round
const MatchRound: React.FC<{
  word: Word;
  onCorrect: () => void;
  onIncorrect: () => void;
}> = ({ word, onCorrect, onIncorrect }) => {
  const [options, setOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Generate options with one correct answer and 3 random translations
    const correctOption = word.translation;
    const incorrectOptions = ["bonjour", "merci", "oui"];
    const allOptions = shuffleArray(
      [correctOption, ...incorrectOptions].slice(0, 4)
    );
    setOptions(allOptions);
  }, [word]);

  const handleOptionClick = (option: string) => {
    if (option === word.translation) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <div className="flex flex-col">
      <h2>Translate: {word.name}</h2>
      <div className="flex flex-col w-max gap-2">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)} className='bg-neutral-300'>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const FillBlankRound: React.FC<{
  word: Word;
  onCorrect: () => void;
  onIncorrect: () => void;
}> = ({ word, onCorrect, onIncorrect }) => {
  const [input, setInput] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.toLowerCase() === word.translation.toLowerCase()) {
      onCorrect();
    } else {
      onIncorrect();
    }
    setInput("");
  };

  return (
    <div className="fill-blank-round">
      <h2>Translate: {word.name}</h2>
      <input type="text" value={input} onChange={handleInputChange} className='border' />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GameContainer;
