"use client";

// Lesson page showing all words

import { Course, Lesson, User } from "@/types/models";
import { getCourse, getLesson, getUser } from "@/util/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// TODO: ignore button => form
// TODO: course pic
// TODO: fix progress bar
// TODO: ignore button

const LessonPage = () => {
  const [lesson, setLesson] = React.useState<Lesson>();
  const [course, setCourse] = React.useState<Course | null>(null);
  const [author, setAuthor] = React.useState<User>();
  const params = useParams();
  const lessonId = params.lesson;
  const courseId = params.courseId;

  React.useEffect(() => {
    const getData = async () => {
      try {
        // Fetch Course
        const courseData = await getCourse(courseId);
        setCourse(courseData);
        // Fetch Lesson
        const lessonData = await getLesson(lessonId);
        if (lessonData) {
          setLesson(lessonData);
        }
        // Fetch Course author
        if (courseData.authorId) {
          const authorData = await getUser(String(courseData.authorId));
          setAuthor(authorData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [courseId, lessonId]);

  let wordsLearned = 0;
  let wordsTotal = 0;
  // let wordsToReview = 0;
  let wordsIgnored = 0;

  if (lesson) {
    // const now = new Date();
    for (const word of lesson.words) {
      wordsTotal++;
      if (word.progress === 5) {
        wordsLearned++;
      }
      // if (word.timeTilReview < now) {
      //   wordsToReview++;
      // }
      if (word.isIgnored) {
        wordsIgnored++;
      }
    }
  }

  const wordsLearnedPercent = wordsLearned / wordsTotal;

  const router = useRouter();

  const handleReviewOption = (e) => {
    e.preventDefault()
    router.push(
      `/course/${params.courseId}/${params.course}/${params.lesson}/garden/classic_review`
    );
  };

  return (
    <>
      {/* Header */}
      <section className="bg-slate-800 text-white pb-3 px-[3rem] flex justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/course/${course?.id}/${course?.name}`}
            className="size-8 bg-white rounded-md p-[1px]"
          >
            {/* <div className="size-full bg-black rounded-md">{course.pic}</div> */}
          </Link>
          <Link href={`/course/${course?.id}/${course?.name}`}>
            <h1 className="text-2xl font-bold">{course?.name}</h1>
          </Link>
        </div>
        <div className="flex gap-4 justify-center max-w-[12rem] w-full">
          {/* Profile picture */}
          <div className="size-[2.5rem] bg-white rounded-sm"></div>
          <p className="flex flex-col items-center text-xs text-neutral-400">
            Created by{" "}
            <span className="text-white text-base font-bold">
              {author?.username}
            </span>
          </p>
        </div>
      </section>
      {/* Levels link */}
      <section className="w-full bg-white border-b border-b-neutral-300 p-3">
        <Link
          href={`/course/${course?.id}/${course?.name}`}
          className="py-2 px-4 hover:bg-slate-300 transition-colors transform duration-300 rounded-full flex w-max"
        >
          <div></div>
          <span className="text-sm">{`Levels (${course?.lessons.length})`}</span>
        </Link>
      </section>
      {/* Lesson */}
      <main className="py-[1.5rem] px-[5rem]">
        <section className="flex gap-4 items-center">
          {/* Previous lesson */}
          {lesson?.lessonIndex > 1 && (
            <Link
              href={`/course/${course?.id}/${course?.slug}/${
                lesson?.lessonIndex - 1
              }`}
              className="font-bold py-6 px-6 w-max h-max bg-white"
            >
              {"< "} Level {lesson?.lessonIndex - 1}
            </Link>
          )}
          {/* Current lesson */}
          <div className="bg-white rounded py-4 px-5 flex gap-4 flex-grow">
            <div className="w-[5rem] flex flex-col items-center">
              <p className="font-bold">{`Level ${lesson?.lessonIndex}`}</p>
              <div className="bg-black size-full"></div>
            </div>
            <div className=" w-full">
              <h1 className="text-2xl">{lesson?.name}</h1>
              {/* Progress bar */}
              <div className="pt-3 pb-5 border-b border-b-neutral-300">
                <div className="w-full bg-neutral-100 h-2 rounded z-1 border-t border-t-neutral-300">
                  <div
                    className={`w-[${wordsLearnedPercent}%] bg-yellow-400 h-full rounded z-100`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between pt-6 pb-1 h-[4.5rem]">
                <select
                  onChange={(e) => {
                    if (e.target.value === "review") {
                      handleReviewOption(e);
                    }
                  }}
                  className="border shadow-md rounded-md text-xs px-3 py-2 h-max cursor-pointer"
                >
                  <option hidden>Options</option>
                  <option value="review">Review</option>
                  <option value="restart">Restart</option>
                </select>
                {wordsLearned / wordsTotal === 0 ? (
                  <Link
                    href={`/course/${params.courseId}/${params.course}/${params.lesson}/garden/learn`}
                    className="py-2 px-3 h-max bg-emerald-600 font-bold text-sm rounded-md hover:px-4 hover:py-3 transition-all transform duration-300"
                  >
                    Learn these words
                  </Link>
                ) : wordsLearned / wordsTotal === 1 ? (
                  <Link
                    href={`/course/${params.courseId}/${params.course}/${params.lesson}/garden/classic_review`}
                    className="py-2 px-3 h-max bg-emerald-600 font-bold text-sm rounded-md hover:px-4 hover:py-3 transition-all transform duration-300"
                  >{`Review ${wordsTotal} words`}</Link>
                ) : (
                  <Link
                    href={`/course/${params.courseId}/${params.course}/${params.lesson}/garden/learn`}
                    className="py-2 px-3 h-max bg-emerald-600 font-bold text-sm rounded-md hover:px-4 hover:py-3 transition-all transform duration-300"
                  >
                    Continue learning
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* Next Lesson */}
          {lesson?.lessonIndex < course?.lessons.length && (
            <Link
              href={`/course/${course?.id}/${course?.slug}/${
                lesson?.lessonIndex + 1
              }`}
              className="font-bold py-6 px-6 w-max h-max bg-white"
            >
              Level {lesson?.lessonIndex + 1} {">"}
            </Link>
          )}
        </section>
        {/* Words */}
        <section>
          {/* Overview */}
          <div className="w-full flex justify-between px-3 pt-5 pb-3">
            <p>{`${wordsTotal} words`}</p>
            <p>{`${wordsIgnored} ignored`}</p>
          </div>
          {/* Word bank */}
          <div className="bg-white max-w-[50rem]">
            <div className="flex px-5 py-2 text-xs border-b items-center">
              <div className="flex flex-grow gap-8 justify-center">
                <div>Ready to learn</div>
                <div>Ready to review</div>
              </div>
              {/* <button className="py-1 px-5 shadow-md rounded-md border">
                Ignore
              </button> */}
            </div>
            <table className="w-full">
              <tbody>
                {lesson?.words.map((word) => (
                  <tr key={word.id} className="border-b">
                    <td className="py-2 pl-4 font-bold text-wrap">
                      {word.name}
                    </td>
                    <td className="py-2 text-wrap ">{word.translation}</td>
                    {word.timeTilReview && (
                      <td className="py-2 pr-4 text-sm text-end">
                        in {word.timeTilReview} hours
                      </td>
                    )}
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
