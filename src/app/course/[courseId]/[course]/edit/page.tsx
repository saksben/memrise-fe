"use client";

import Link from "next/link";
import React from "react";

// Edit course
// Has 3 tabs: words (where you first land), contributors, and details (/course/[courseId]/[course]/edit/details)
// Save and continue button

const course = {
  id: 1,
  slug: "french-1",
  learnLanguage: "French",
  languageSlug: "french",
  knownLanguage: "English (US)",
};

const lessons = [
  {
    id: 1,
    index: 1,
    name: "Launchpad",
    words: [
      { id: 1, name: "salut", translation: "hi", timeTilReview: 4 },
      {
        id: 2,
        name: "quoi de neuf?",
        translation: "what's up?",
        timeTilReview: 4,
      },
      { id: 3, name: "allons-y !", translation: "let's go!", timeTilReview: 4 },
      { id: 4, name: "santé", translation: "bottoms up!", timeTilReview: 4 },
      { id: 5, name: "oui", translation: "yes", timeTilReview: 4 },
      { id: 6, name: "non", translation: "no", timeTilReview: 4 },
      {
        id: 7,
        name: "s'il vous plaît",
        translation: "please",
        timeTilReview: 4,
      },
      { id: 8, name: "merci", translation: "thank you", timeTilReview: 4 },
      {
        id: 9,
        name: "bonjour",
        translation: "good morning; good day",
        timeTilReview: 4,
      },
      {
        id: 10,
        name: "bonne nuit",
        translation: "good night",
        timeTilReview: 4,
      },
      {
        id: 11,
        name: "à bientôt",
        translation: "see you later",
        timeTilReview: 4,
      },
      { id: 12, name: "au revoir", translation: "goodbye", timeTilReview: 4 },
    ],
  },
  {
    id: 2,
    index: 2,
    name: "I Come in Peace",
    words: [
      { id: 1, name: "ça", translation: "it; this; that", timeTilReview: 4 },
      {
        id: 2,
        name: "comment",
        translation: "how",
        timeTilReview: 4,
      },
      {
        id: 3,
        name: "comment ça va ?",
        translation: "how are you?",
        timeTilReview: 4,
      },
      { id: 4, name: "très", translation: "very", timeTilReview: 4 },
      { id: 5, name: "je", translation: "I", timeTilReview: 4 },
      { id: 6, name: "bien", translation: "well; good", timeTilReview: 4 },
      {
        id: 7,
        name: "très bien",
        translation: "very good",
        timeTilReview: 4,
      },
      {
        id: 8,
        name: "je vais très bien",
        translation: "I'm very well",
        timeTilReview: 4,
      },
      {
        id: 9,
        name: "tu",
        translation: "you (singular)",
        timeTilReview: 4,
      },
      {
        id: 10,
        name: "te",
        translation: "you; yourself (singular)",
        timeTilReview: 4,
      },
      {
        id: 11,
        name: "tu t'appelles",
        translation: "what's your name?",
        timeTilReview: 4,
      },
      { id: 12, name: "me", translation: "me; myself", timeTilReview: 4 },
      {
        id: 13,
        name: "je m'appelle ...",
        translation: "my name is ...",
        timeTilReview: 4,
      },
      { id: 14, name: "me", translation: "me; myself", timeTilReview: 4 },
      { id: 15, name: "le génie", translation: "the genius", timeTilReview: 4 },
      {
        id: 16,
        name: "tu es un génie !",
        translation: "you're a genius!",
        timeTilReview: 4,
      },
    ],
  },
];

const EditCoursePage = () => {
  const LessonHeader = ({ id, index, name, words }) => {
    const [wordName, setWordName] = React.useState();
    const [wordTranslation, setWordTranslation] = React.useState();
    const [hidden, setHidden] = React.useState<boolean>(true);

    const handleHidden = (e) => {
      e.preventDefault();
      setHidden(!hidden);
    };

    const handleWordName = (e) => {
      setWordName(e.target.value);
    };

    const handleWordTranslation = (e) => {
      setWordTranslation(e.target.value);
    };

    return (
      <>
        <div>
          <div
            key={id}
            className="flex justify-between p-4 bg-sky-300 text-white rounded items-center"
          >
            <div className="flex items-center gap-6">
              <span className="font-bold text-xl">{index + 1}</span>
              <h3 className="flex gap-3 items-center">
                <span className="text-xl font-bold">{name}</span>
                <span className="text-xl">{course.learnLanguage}</span>
              </h3>
            </div>
            <div className="text-black font-bold text-xs bg-neutral-100 flex rounded">
              <button
                onClick={handleHidden}
                className="hover:bg-neutral-200 w-full py-1 px-2 rounded-l"
              >
                Show/Hide
              </button>
              <Link
                href={`/course/${course.id}/${course.slug}/${index}`}
                className="hover:bg-neutral-200 py-1 px-3"
              >
                Preview
              </Link>
              <button className="hover:bg-neutral-200 py-1 px-3">
                Duplicate
              </button>
              <button className="hover:bg-neutral-200 py-1 px-2 rounded-r">
                Delete
              </button>
            </div>
          </div>
          {!hidden && (
            <div className="flex flex-col bg-white">
              <p className="text-sm font-bold py-4 px-2">
                Test on {course.learnLanguage}, prompt with{" "}
                {course.knownLanguage}
              </p>
              <table className="w-full border-b">
                <thead>
                  <tr className="text-left">
                    <th className="w-1/2 pl-[6rem]">{course.learnLanguage}</th>
                    <th className="w-1/2 pl-[6rem]">{course.knownLanguage}</th>
                  </tr>
                </thead>
                <tbody className="">
                  {words.map((word) => (
                    <tr key={word.id}>
                      <td className="py-2 border-t w-1/2 pl-[6rem] relative group">
                        <div className="absolute group-hover:visible invisible left-10 top-1/2 -translate-y-1/2">
                          <button className="font-bold text-xl">x</button>
                        </div>
                        {word.name}
                      </td>
                      <td className="py-2 border-t w-1/2 pl-[6rem]">
                        {word.translation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col items-center w-full self-center">
                <div className="w-full flex justify-center border-b">
                  <p className="text-sm font-bold py-1 w-3/4">Add words:</p>
                </div>
                <div className="w-full flex justify-center hover:bg-sky-200 relative group">
                  <button className="group-hover:visible invisible cursor-pointer absolute text-3xl left-2 top-1/2 -translate-y-1/2 font-bold">
                    +
                  </button>
                  <div className="flex justify-between hover:bg-sky-200 w-3/4 py-3">
                    <input
                      className="border rounded p-1 w-1/3 text-sm"
                      id={wordName}
                      value={wordName}
                      name={wordTranslation}
                      onChange={handleWordName}
                    />
                    <input
                      className="border rounded p-1 w-1/3"
                      id={wordTranslation}
                      value={wordTranslation}
                      name={wordTranslation}
                      onChange={handleWordTranslation}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <main className="px-1 pb-[2rem]">
        <section>
          <select className="p-2 rounded my-5 text-sm font-bold">
            <option hidden>+ Add level</option>
            <option>{course.learnLanguage}</option>
            <option>Multimedia</option>
          </select>
        </section>
        <section>
          <form className="flex flex-col gap-6">
            {lessons.map((lesson, index) => (
              <LessonHeader
                key={lesson.id}
                id={lesson.id}
                index={index}
                name={lesson.name}
                words={lesson.words}
              />
            ))}
            <button className='bg-green-500 w-max py-2 px-3 text-sm font-bold text-white self-end rounded-md'>Save and Continue</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default EditCoursePage;
