// Lesson page showing all words

import Link from "next/link";

// TODO: ignore button => form

const course = {
  id: 1,
  slug: "french-1",
  name: "French 1",
  author: "Memrise",
  pic: "",
  language: "French",
  numLevels: 100,
  user: {
    profilePic: "",
  },
};

const lesson = {
  id: 3,
  index: 3,
  name: "Launchpad",
  progress: 2,
  wordsTotal: 12,
  wordsLearned: 12,
  wordsIgnored: 0,
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
    { id: 7, name: "s'il vous plaît", translation: "please", timeTilReview: 4 },
    { id: 8, name: "merci", translation: "thank you", timeTilReview: 4 },
    {
      id: 9,
      name: "bonjour",
      translation: "good morning; good day",
      timeTilReview: 4,
    },
    { id: 10, name: "bonne nuit", translation: "good night", timeTilReview: 4 },
    {
      id: 11,
      name: "à bientôt",
      translation: "see you later",
      timeTilReview: 4,
    },
    { id: 12, name: "au revoir", translation: "goodbye", timeTilReview: 4 },
  ],
};

const LessonPage = () => {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-800 text-white pb-3 px-[3rem] flex justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/course/${course.id}/${course.name}`}
            className="size-8 bg-white rounded-md p-[1px]"
          >
            <div className="size-full bg-black rounded-md">{course.pic}</div>
          </Link>
          <Link href={`/course/${course.id}/${course.name}`}>
            <h1 className="text-2xl font-bold">{course.name}</h1>
          </Link>
        </div>
        <div className="flex gap-4 justify-center max-w-[12rem] w-full">
          {/* Profile picture */}
          <div className="size-[2.5rem] bg-white rounded-sm"></div>
          <p className="flex flex-col items-center text-xs text-neutral-400">
            Created by{" "}
            <span className="text-white text-base font-bold">
              {course.author}
            </span>
          </p>
        </div>
      </section>
      {/* Levels link */}
      <section className="w-full bg-white border-b border-b-neutral-300 p-3">
        <Link
          href={`/course/${course.id}/${course.name}`}
          className="py-2 px-4 hover:bg-slate-300 transition-colors transform duration-300 rounded-full flex w-max"
        >
          <div></div>
          <span className="text-sm">{`Levels (${course.numLevels})`}</span>
        </Link>
      </section>
      {/* Lesson */}
      <main className="py-[1.5rem] px-[5rem]">
        <section className="flex gap-4 items-center">
          {/* Previous lesson */}
          {lesson.index > 1 && (
            <Link href={`/course/${course.id}/${course.slug}/${lesson.index - 1}`} className="font-bold py-6 px-6 w-max h-max bg-white">
              {"< "} Level {lesson.index - 1}
            </Link>
          )}
          {/* Current lesson */}
          <div className="bg-white rounded py-4 px-5 flex gap-4 flex-grow">
            <div className="w-[5rem] flex flex-col items-center">
              <p className="font-bold">{`Level ${lesson.index}`}</p>
              <div className="bg-black size-full"></div>
            </div>
            <div className=" w-full">
              <h1 className="text-2xl">{lesson.name}</h1>
              {/* Progress bar */}
              <div className="pt-3 pb-5 border-b border-b-neutral-300">
                <div className="w-full bg-neutral-100 h-2 rounded z-1 border-t border-t-neutral-300">
                  <div
                    className={`w-[${
                      lesson.wordsLearned / lesson.wordsTotal
                    }%] bg-yellow-400 h-full rounded z-100`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between pt-6 pb-1 h-[4.5rem]">
                <select className="border shadow-md rounded-md text-xs px-3 py-2 h-max">
                  <option hidden>Options</option>
                  <option>Review</option>
                  <option>Restart</option>
                </select>
                {lesson.wordsLearned / lesson.wordsTotal === 0 ? (
                  <Link
                    href=""
                    className="py-2 px-3 h-max bg-emerald-600 font-bold text-sm rounded-md hover:px-4 hover:py-3 transition-all transform duration-300"
                  >
                    Learn these words
                  </Link>
                ) : lesson.wordsLearned / lesson.wordsTotal === 1 ? (
                  <Link
                    href=""
                    className="py-2 px-3 h-max bg-emerald-600 font-bold text-sm rounded-md hover:px-4 hover:py-3 transition-all transform duration-300"
                  >{`Review ${lesson.wordsTotal} words`}</Link>
                ) : (
                  <Link
                    href=""
                    className="py-2 px-3 h-max bg-emerald-600 font-bold text-sm rounded-md hover:px-4 hover:py-3 transition-all transform duration-300"
                  >
                    Continue learning
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* Next Lesson */}
          {lesson.index < course.numLevels && (
            <Link href={`/course/${course.id}/${course.slug}/${lesson.index + 1}`} className="font-bold py-6 px-6 w-max h-max bg-white">
              Level {lesson.index + 1} {">"}
            </Link>
          )}
        </section>
        {/* Words */}
        <section>
          {/* Overview */}
          <div className="w-full flex justify-between px-3 pt-5 pb-3">
            <p>{`${lesson.wordsTotal} words`}</p>
            <p>{`${lesson.wordsIgnored} ignored`}</p>
          </div>
          {/* Word bank */}
          <div className="bg-white max-w-[50rem]">
            <div className="flex px-5 py-2 text-xs border-b items-center">
              <div className="flex flex-grow gap-8 justify-center">
                <div>Ready to learn</div>
                <div>Ready to review</div>
              </div>
              <button className="py-1 px-5 shadow-md rounded-md border">
                Ignore
              </button>
            </div>
            <table className="w-full">
              <tbody>
                {lesson.words.map((word) => (
                  <tr key={word.id} className="border-b">
                    <td className="py-2 pl-4 font-bold text-wrap">{word.name}</td>
                    <td className="py-2 text-wrap ">{word.translation}</td>
                    <td className="py-2 pr-4 text-sm text-end">
                      in {word.timeTilReview} hours
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default LessonPage;
