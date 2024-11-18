"use client";

// Course page showing all lessons, or if only 1 lesson just shows the first lesson's list of words under the course overview

import { Course, User } from "@/types/models";
import { getCourse, getUser } from "@/util/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

// TODO: user.profilePic
// TODO: course pic
// TODO: breadcrumbs
// TODO: fix progress bar
// TODO: the Review button will need its own game mode where it adds all course review words instead of just one lesson

const CoursePage = () => {
  const [course, setCourse] = React.useState<Course | null>(null);
  const [author, setAuthor] = React.useState<User>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const params = useParams();
  const courseId = params.courseId;

  // Get Course data
  React.useEffect(() => {
    const getCourseData = async () => {
      try {
        const data = await getCourse(courseId);
        setCourse({ ...data, lessons: data.lessons });
        if (data.authorId) {
          const authorData = await getUser(String(data.authorId));
          setAuthor(authorData);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    getCourseData();
  }, [courseId]);

  if (!courseId) {
    return <div>Loading...</div>;
  }

  let wordsLearned = 0;
  let wordsTotal = 0;
  let wordsToReview = 0;
  let wordsIgnored = 0;

  if (course) {
    const now = new Date();
    for (const lesson of course.lessons) {
      for (const word of lesson.words) {
        wordsTotal++;
        if (word.progress === 5) {
          wordsLearned++;
        }
        if (word.timeTilReview < now) {
          wordsToReview++;
        }
        if (word.isIgnored) {
          wordsIgnored++;
        }
      }
    }
  }

  const wordsLearnedPercent = wordsLearned / wordsTotal;

  return (
    <>
      {/* Course Overview */}
      <section className="min-h-[14rem] bg-slate-800 text-white pb-2 px-[3rem] flex justify-between">
        {/* Course picture */}
        <div className="size-[12rem] bg-white rounded-md p-[1px]">
          <div className="size-full bg-black rounded-md"></div>
        </div>
        <div className="flex-grow pl-2">
          {/* Breadcrumbs */}
          <div className="font-bold text-sm flex gap-1 items-center [&_span]:text-neutral-500 pb-2 border-b-2 border-b-slate-600">
            <Link href="/courses">Courses</Link>
            <span>{`>`}</span>
            {/* <Link href=''>{category}</Link><span>{`>`}</span> */}
            {/* <Link href=''>{subCategory}</Link><span>{`>`}</span> */}
            {/* <Link href={`/courses/${course?.slug}`}>{course.language}</Link> */}
          </div>
          {/* Description */}
          <h1 className="text-2xl font-bold pt-2">{course?.name}</h1>
          <p className="text-wrap">{course?.description}</p>
        </div>
        {/* Profile section */}
        <div className="flex gap-4 justify-center max-w-[12rem] w-full">
          {/* Profile picture */}
          <div className="size-[2.5rem] bg-white rounded-sm">
            {/* {course.user.profilePic} */}
          </div>
          <p className="flex flex-col items-center text-xs text-neutral-400">
            Created by{" "}
            <span className="text-white text-base font-bold">
              {author?.username}
            </span>
          </p>
        </div>
      </section>
      {/* Levels tab */}
      <section className="bg-white px-[3rem] p-3 border-b border-b-neutral-200 flex justify-between">
        <div className="rounded-full py-2 px-4 bg-slate-300 w-max text-sm font-bold">
          <div></div>
          <span>{`Levels (${course?.lessons?.length ?? 0})`}</span>
        </div>
        <Link
          href={`/course/${course?.id}/${course?.slug}/edit`}
          className="font-bold text-sm hover:bg-neutral-200 flex items-center justify-center rounded-md py-2 px-3"
        >
          <div></div>
          <span>Edit Course</span>
        </Link>
      </section>
      <main className="py-[1.5rem] px-[2.5rem] flex flex-col gap-6 max-w-[50rem]">
        {/* Progress */}
        <section className="bg-white py-3 px-4 rounded">
          <div className="flex justify-between font-bold">
            <p>{`${wordsLearned} / ${wordsTotal} (${
              wordsTotal - wordsToReview
            } in long term memory)`}</p>
            <p>{`${wordsIgnored} ignored`}</p>
          </div>
          {/* Progress bar */}
          <div className="pt-3 pb-4">
            <div className="w-full bg-neutral-100 h-2 rounded z-1 border-t border-t-neutral-300">
              <div
                className={`w-[${wordsLearnedPercent}%] bg-yellow-500 h-full rounded z-100`}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <select className="text-sm font-bold">
              <option hidden>Options</option>
              <option>Restart</option>
              <option>Quit</option>
            </select>
            <div className="flex gap-1 items-center py-2">
              {/* Speed review */}
              <Link href="" className="p-4 rounded-md bg-slate-300"></Link>
              {/* Classic Review */}
              {/* <Link
                href={`/course/${params.courseId}/${params.course}/${params.lesson}/garden/classic_review`}
                className="py-[0.35rem] px-3 rounded-md font-bold text-sm bg-slate-300"
              >{`Review (${wordsToReview})`}</Link> */}
            </div>
          </div>
        </section>
        {/* Lessons */}
        <section className="flex gap-4 flex-wrap max-w-[50rem]">
          {course?.lessons.map((lesson, index) => (
            <Link
              href={`/course/${course.id}/${course.slug}/${lesson.id}`}
              key={lesson.id}
              className="flex flex-col items-center justify-between bg-white w-full max-w-[8rem] h-[11.5rem] p-3 pb-0"
            >
              <div className="w-full h-[70%] bg-neutral-100 flex flex-col items-center">
                <div className="rounded-b-full bg-white text-neutral-300 text-sm font-bold size-7 p-1 flex items-center justify-center">
                  {index + 1}
                </div>
                {/* Progress pic */}
                <div></div>
                {/* Progress bar or checkmark */}
                <div></div>
              </div>
              <p className="text-xs font-bold text-center flex flex-grow items-center">
                {lesson.name}
              </p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default CoursePage;
