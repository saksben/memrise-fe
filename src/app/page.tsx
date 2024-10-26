// Home page, displays user's profile and a list of their selected languages

import Link from "next/link";
import React from "react";

// TODO: Add dropdown select at top left. Title is 'All Courses'. Top section is Filter Results: [All Courses, With Goal Set, and Teaching]. Bottom section is By Category: [All language categories to choose from]. Home page starts with all their languages and courses, then user can select language/category and view all their courses from that language/category.
// TODO: 3 dots settings. Quit course.
// TODO: grid dots settings => modal. Options to learn new words, classic review, and speed review.
// TODO: button at top right of courses to review all items from all courses in the language/category

interface CourseTypes {
  courseId: number;
  slug: string;
  name: string;
  progress: number;
  itemsLearned: number;
  itemsTotal: number;
  difficultWords: number;
}

const courses: CourseTypes[] = [
  {
    courseId: 1,
    slug: 'french-1',
    name: "French 1",
    progress: 100,
    itemsLearned: 222,
    itemsTotal: 222,
    difficultWords: 0,
  },
  {
    courseId: 2,
    slug: 'learn-basic-french',
    name: "Learn Basic French",
    progress: 100,
    itemsLearned: 328,
    itemsTotal: 328,
    difficultWords: 0,
  },
  {
    courseId: 3,
    slug: 'advanced-french',
    name: "Advanced French",
    progress: 3,
    itemsLearned: 49,
    itemsTotal: 1256,
    difficultWords: 3,
  },
];

const Home = () => {
  return (
    <main>
      <div className="p-[4rem] flex flex-col gap-4">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="flex gap-6 font-bold border-2 border-neutral-300 rounded-xl p-[1rem]"
          >
            <div>
              <div className="size-[4rem] rounded-full bg-black"></div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <Link href={`/course/${course.courseId}/${course.slug}`} className="text-3xl">{course.name}</Link>
              <div className="flex gap-8">
                <span>{course.progress}%</span>
                <div className="">
                  <span>{`${course.itemsLearned} / ${course.itemsTotal}`}</span>
                  <span className="font-normal"> items learned</span>
                </div>
              </div>
              <div>
                <div className="w-full bg-neutral-300 h-5 rounded z-1">
                  <div
                    className={`w-[${course.progress}%] bg-yellow-500 h-full rounded z-100`}
                  ></div>
                </div>
              </div>
              <div className="py-2 flex justify-between w-full items-center">
                <div className="flex gap-8 text-sky-900">
                  <div className="flex gap-3 items-center">
                    <div className="border border-black size-5"></div>
                    <div>{course.itemsLearned}</div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="border border-black size-5"></div>
                    <div>{course.difficultWords}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href=""
                    className="bg-yellow-500 py-3 px-4 rounded-xl text-xl border-b-4 border-b-yellow-600 hover:bg-yellow-400 hover:border-b-yellow-500"
                  >
                    Learn new words
                  </Link>
                  <button className="bg-sky-900 hover:bg-sky-800 size-14 rounded-xl"></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
