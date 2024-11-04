"use client";

import Link from "next/link";
// /learn?course_id={courseId}&level_index=1

import React from "react";

const course = {
  language: "French",
  languageSlug: "french",
  lessons: [{ id: 1, index: 1, name: "Launchpad" }],
};

const knownlanguage = "English (US)";

type Word = {
  id: number;
  name: string;
  translation: string;
};

type RoundType = "intro" | "match" | "fill-blank";

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
    generateInitialRounds();
  }, []);

  const generateInitialRounds = () => {
    const introAndFirstRounds: GameRound[] = [];
    const additionalRounds: GameRound[] = [];

    // Step 1: Add intro and first match round for each word
    words.forEach((word) => {
      // Fixed "intro" and "match" rounds for each word
      introAndFirstRounds.push({ word, roundType: "intro" });
      introAndFirstRounds.push({ word, roundType: "match" });

      // Add random rounds (match or fill-blank) to additionalRounds
      for (let i = 0; i < 4; i++) {
        const roundType: RoundType =
          Math.random() > 0.5 ? "match" : "fill-blank";
        additionalRounds.push({ word, roundType });
      }
    });

    // Step 2: Shuffle the additional rounds
    const shuffledAdditionalRounds = shuffleArray(additionalRounds);

    // Step 3: Combine introAndFirstRounds with shuffled additionalRounds
    const finalRounds: GameRound[] = [...introAndFirstRounds];

    // Interleave shuffled additional rounds after all intro and first rounds
    while (shuffledAdditionalRounds.length > 0) {
      finalRounds.push(shuffledAdditionalRounds.shift()!);
    }

    setGameRounds(finalRounds);
    console.log(finalRounds);
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
    <div className="w-full flex flex-col items-center pb-[2rem]">
      <section className="flex justify-between w-full px-[2rem] py-[1rem] bg-emerald-500 font-black text-2xl">
        <div>
          <div></div>
          <h1 className="flex gap-5">
            <span className="text-white">Learn new words:</span>
            {course.language} - {course.lessons[0].name}
          </h1>
        </div>
        <div>
          <Link href="">X</Link>
        </div>
      </section>
      <div className="w-3/4">
        <section className="w-full px-[2rem] py-[2rem]">
          <div className="w-full h-5 rounded-md bg-neutral-200">
            <div
              className={`h-full w-[${
                (currentRound / gameRounds.length) * 100
              }%] bg-yellow-400 rounded-md`}
            ></div>
          </div>
        </section>
        <section className="px-[2rem] flex flex-col gap-[1rem]">
          {roundType === "intro" ? (
            <IntroRound
              word={word}
              onContinue={() => setCurrentRound((prev) => prev + 1)}
            />
          ) : roundType === "match" ? (
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
          <p className="font-bold">Score: {score}</p>
        </section>
      </div>
    </div>
  );
};

// Introductory round component
const IntroRound: React.FC<{ word: Word; onContinue: () => void }> = ({
  word,
  onContinue,
}) => {
  return (
    <div className="flex w-full justify-between">
      <div className="w-full flex flex-col gap-[2rem]">
        <div className="flex flex-col">
          <label className="text-xs uppercase">{course.language}</label>
          <p className="text-4xl font-bold">{word.name}</p>
        </div>
        <div className="flex flex-col pb-[1rem] border-b-2">
          <label className="text-xs uppercase">{knownlanguage}</label>
          <p className="text-2xl font-bold">{word.translation}</p>
        </div>
      </div>
      <div className="px-[1rem]">
        <button
          onClick={onContinue}
          className="px-[1.5rem] py-[1rem] text-sm bg-yellow-400 font-bold rounded-md border-b-4 border-b-yellow-500 hover:bg-yellow-500"
        >
          Next
        </button>
        <div></div>
        {/* Mark difficult word and mark ignore */}
        <div>
          <button></button>
          <button></button>
        </div>
      </div>
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
    <>
      <div className="flex w-full justify-between pb-[1rem]">
        <div className="w-full flex flex-col">
          <h2 className="text-neutral-500 font-bold text-xl">
            Pick the correct answer
          </h2>
          <p className="text-center font-bold py-[3rem] text-2xl">
            {word.name}
          </p>
          <div className="grid grid-cols-2 w-full gap-x-4 gap-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="relative border-2 border-neutral-400 border-b-8 w-full p-5 rounded-xl font-bold text-xl"
              >
                <div className="absolute top-1/2 -translate-y-1/2 bg-black text-white rounded-md text-base size-[1.5rem] flex items-center justify-center">
                  {index + 1}
                </div>
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="px-[1rem]">
          <button className="bg-neutral-300 font-bold py-2 rounded border-b-4 border-b-neutral-400 hover:bg-neutral-400">
            I don't know
          </button>
          <div></div>
          {/* Mark difficult word and mark ignore */}
          <div>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
    </>
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
    if (input.toLowerCase() === word.name.toLowerCase()) {
      onCorrect();
    } else {
      onIncorrect();
    }
    setInput("");
  };

  return (
    <div className="flex w-full justify-between">
      <div className="w-full flex flex-col">
        <h2 className="text-neutral-500 font-bold text-xl">
          Type the correct translation
        </h2>
        <p className="text-center font-bold py-[2rem] text-2xl">
          {word.translation}
        </p>
        <div className="flex flex-col">
          <label className="text-xs uppercase font-black pb-2">
            {course.language}
          </label>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="border border-slate-300 rounded-md bg-slate-200 h-[2.5rem] px-4"
          />
        </div>
        <div className="self-center">
          <button
            className="bg-green-300 hover:bg-green-400 px-3 py-2 rounded font-bold my-[1rem]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="px-[1rem]">
        <button className="bg-neutral-300 font-bold py-2 rounded border-b-4 border-b-neutral-400 hover:bg-neutral-400">
          I don't know
        </button>
        <div></div>
        {/* Mark difficult word and mark ignore */}
        <div>
          <button></button>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
