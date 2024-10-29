"use client";

import Link from "next/link";

// TODO: add language slug to top categories languages when clicked

import React from "react";

const LanguageBox = ({ flag, name, knownLang, slug }) => {
  return (
    <Link
      href={`/courses/${knownLang}/${slug}`}
      className="flex items-center gap-2 py-3 px-2 border bg-white"
    >
      <div className="rounded-full bg-black size-4">{flag}</div>
      <div className="text-sm font-bold">{name}</div>
    </Link>
  );
};

const languages = [
  {
    languageId: 1,
    flag: "",
    name: "Spanish (Mexico)",
    slug: "spanish-mexico",
  },
  {
    languageId: 2,
    flag: "",
    name: "French",
    slug: "french",
  },
  {
    languageId: 3,
    flag: "",
    name: "English (US)",
    slug: "english-us",
  },
  {
    languageId: 4,
    flag: "",
    name: "Chinese (Simplified)",
    slug: "chinese-simplified",
  },
];

const CourseBox = ({
  courseId,
  slug,
  learnLanguage,
  author,
  name,
  enrollments,
  avgTime,
}) => {
  return (
    <>
      <div className="border h-[21rem] w-[14rem] p-3 rounded-md bg-white">
        <div className="rounded-md flex flex-col justify-between h-full w-full border">
          <Link
            href={`/course/${courseId}/${slug}`}
            className="rounded-md w-full h-2/3 border bg-black relative"
          >
            <div className="absolute h-9 w-9 z-100 bg-white -bottom-1 rounded-tr-md flex items-center justify-center">
              <div className="rounded-full size-5 bg-black"></div>
            </div>
          </Link>

          <div className="text-xs flex justify-between px-2">
            <span>{learnLanguage}</span>
            <span>by {author}</span>
          </div>
          <Link
            href={`/course/${courseId}/${slug}`}
            className="font-bold text-lg px-2"
          >
            {name}
          </Link>
          <div className="flex text-sm border-t">
            <div className="py-2 px-4">
              <span>{enrollments}</span>
            </div>
            <div className="p-2 pl-6 border-l">
              <span>{avgTime}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const courses = [
  {
    courseId: 1,
    slug: "french-1",
    learnLanguage: "French",
    author: "Memrise",
    name: "French 1",
    enrollments: "2.1m",
    avgTime: "7h",
  },
  {
    courseId: 2,
    slug: "french-2",
    learnLanguage: "French",
    author: "Memrise",
    name: "French 2",
    enrollments: "2.1m",
    avgTime: "7h",
  },
  {
    courseId: 3,
    slug: "french-3",
    learnLanguage: "French",
    author: "Memrise",
    name: "French 3",
    enrollments: "2.1m",
    avgTime: "7h",
  },
  {
    courseId: 4,
    slug: "french-4",
    learnLanguage: "French",
    author: "Memrise",
    name: "French 4",
    enrollments: "2.1m",
    avgTime: "7h",
  },
];

const CoursesPage = () => {
  const [selected, setSelected] = React.useState(languages[2].languageId);

  const LanguageSelect = ({ children }) => {
    return (
      <>
        <select
          value={selected}
          onChange={(e) => {
            setSelected(+e.target.value);
          }}
          className="flex items-center gap-2 p-2 border"
        >
          {children}
        </select>
      </>
    );
  };

  return (
    <>
      <section className="flex justify-between items-center py-5 px-[4rem] border-b bg-white">
        <h1 className="text-2xl font-bold">Courses</h1>
        <div>
          <Link
            href="/course/create"
            className="py-2 px-4 border border-gray-400 bg-green-500 rounded-md shadow-md text-white text-sm"
          >
            Create a course
          </Link>
          {/* Search */}
          {/* <div></div> */}
        </div>
      </section>
      <main className="flex p-6 gap-4">
        <div className="flex flex-col px-4 gap-8">
          {/* findAll Languages */}
          <div>
            <p className="font-bold mb-2 text-sm">I speak:</p>
            <LanguageSelect>
              {languages.map((language) => (
                <option value={language.languageId}>{language.name}</option>
              ))}
            </LanguageSelect>
          </div>
          {/* findAll Languages */}
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-lg">Top Categories</h2>
            <ul className="group">
              {languages.map((language) => (
                <LanguageBox
                  key={language.languageId}
                  flag={language.flag}
                  name={language.name}
                  knownLang={
                    languages.find((lang) => lang.languageId === selected)?.slug
                  }
                  slug={language.slug}
                />
              ))}
            </ul>
          </div>
        </div>
        {/* Course list */}
        <div className="flex gap-x-3 gap-y-5 flex-wrap max-w-[50rem]">
          {courses.map((course) => (
            <CourseBox
              key={course.courseId}
              slug={course.slug}
              courseId={course.courseId}
              learnLanguage={course.learnLanguage}
              author={course.author}
              name={course.name}
              enrollments={course.enrollments}
              avgTime={course.avgTime}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default CoursesPage;
