"use client";

// TODO: set up a new timeTilReview date that is 2x current

import { Course, Language, Lesson, Word } from "@/types/models";
import { getCourse, getLanguage, getLanguages, getLesson } from "@/util/api";
import Link from "next/link";
import { useParams } from "next/navigation";
// Learning page. Everything in here is just rendered components
// /learn?course_id={courseId}&level_index=1

import React from "react";

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
  const params = useParams();

  const [languages, setLanguages] = React.useState<Language[]>([]);
  const [language, setLanguage] = React.useState<Language>();
  const [course, setCourse] = React.useState<Course>();
  const [lesson, setLesson] = React.useState<Lesson>();
  const [words, setWords] = React.useState<Word[]>();

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const languagesData = await getLanguages();
        setLanguages(languagesData);
        const courseData = await getCourse(params.courseId);
        setCourse(courseData);
        const languageData = await getLanguage(
          String(courseData.learnLanguageId)
        );
        setLanguage(languageData);
        const lessonData = await getLesson(params.lesson);
        setLesson(lessonData);
        if (lessonData) {
          let gameWords = [];
          const date = new Date();
          for (let i = 0; i < 25; i++) {
            // if (lessonData?.words[i].timeTilReview < date) {
            if (lessonData.words[i]) gameWords.push(lessonData.words[i]);
            // }
          }
          setWords(gameWords);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCourses();
  }, []);

  const [gameRounds, setGameRounds] = React.useState<GameRound[]>([]);
  const [currentRound, setCurrentRound] = React.useState(0);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (words) initializeGameRounds();
  }, [words]);
  console.log(words);
  // Initialize rounds with randomized types for each word
  const initializeGameRounds = () => {
    const rounds: GameRound[] = [];
    words?.forEach((word) => {
      const roundType = Math.random() > 0.5 ? "match" : "fill-blank";
      rounds.push({ word, roundType });
    });
    setGameRounds(shuffleArray(rounds));
  };

  // Handle correct answer and move to next round
  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 1);
    setCurrentRound((prev) => prev + 1);
    // TODO: set up a new timeTilReview date that is 2x current
  };

  // Handle incorrect answer and move to next round
  const handleIncorrectAnswer = () => {
    setCurrentRound((prev) => prev + 1);
  };

  // End of game
  if (currentRound >= gameRounds.length) {
    return (
      <div className="font-bold text-center py-[10rem]">
        Game Over! Your Score: {score}
      </div>
    );
  }

  const { word, roundType } = gameRounds[currentRound];

  const languageName = language?.name;

  const knownLanguage = languages.find(
    (lang) => lang.id === course?.knownLanguageId
  )?.name;

  return (
    <div className="w-full flex flex-col items-center pb-[2rem]">
      <section className="flex justify-between w-full px-[2rem] py-[1rem] bg-sky-300 font-black text-2xl">
        <div>
          <div></div>
          <h1 className="flex gap-5">
            <span className="text-white">Classic Review:</span>
            {languageName} - {lesson?.name}
          </h1>
        </div>
        <div>
          <Link
            href={`/course/${params.courseId}/${params.course}/${params.lesson}`}
          >
            X
          </Link>
        </div>
      </section>
      <div className="w-3/4">
        <section className="w-full px-[2rem] py-[2rem]">
          <div className="w-full h-5 rounded-md bg-neutral-200">
            <div
              className={`h-full w-${
                currentRound / gameRounds.length
              } bg-yellow-400 rounded-md`}
            ></div>
          </div>
        </section>
        <section className="px-[2rem]">
          {roundType === "match" ? (
            <MatchRound
              word={word}
              onCorrect={handleCorrectAnswer}
              onIncorrect={handleIncorrectAnswer}
            />
          ) : (
            <FillBlankRound
              language={languageName}
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
  language: string | undefined;
  word: Word;
  onCorrect: () => void;
  onIncorrect: () => void;
}> = ({ language, word, onCorrect, onIncorrect }) => {
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
            {language}
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
