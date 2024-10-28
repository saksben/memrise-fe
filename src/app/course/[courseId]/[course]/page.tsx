// Course page showing all lessons, or if only 1 lesson just shows the first lesson's list of words under the course overview

import Link from "next/link";

const course = {
  id: 1,
  slug: "french-1",
  name: "French 1",
  author: "Memrise",
  description: "Learn the basics of French.",
  numLessons: 11,
  wordsLearned: 49,
  wordsTotal: 1256,
  wordsIgnored: 0,
  wordsToReview: 49,
  language: "French",
  languageSlug: "french",
  lessons: [
    { id: 1, index: 1, name: "Launchpad", progress: 2 },
    { id: 2, index: 2, name: "I Come in Peace", progress: 2 },
    { id: 3, index: 3, name: "Being Human", progress: 2 },
    { id: 4, index: 4, name: "Fuel Your Vocab: Food", progress: 1 },
    { id: 5, index: 5, name: "What Do You Like?", progress: 0 },
    { id: 6, index: 6, name: "Where in the Universe?", progress: 0 },
  ],
  user: {
    profilePic: "",
  },
};

const CoursePage = () => {
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
            <Link href={`/courses/${course.languageSlug}`}>
              {course.language}
            </Link>
          </div>
          {/* Description */}
          <h1 className="text-2xl font-bold pt-2">{course.name}</h1>
          <p className="text-wrap">{course.description}</p>
        </div>
        {/* Profile section */}
        <div className="flex gap-4 justify-center max-w-[12rem] w-full">
          {/* Profile picture */}
          <div className="size-[2.5rem] bg-white rounded-sm">
            {course.user.profilePic}
          </div>
          <p className="flex flex-col items-center text-xs text-neutral-400">
            Created by{" "}
            <span className="text-white text-base font-bold">
              {course.author}
            </span>
          </p>
        </div>
      </section>
      {/* Levels tab */}
      <section className="bg-white px-[3rem] p-3 border-b border-b-neutral-200 flex justify-between">
        <div className="rounded-full py-2 px-4 bg-slate-300 w-max text-sm font-bold">
          <div></div>
          <span>{`Levels (${course.numLessons})`}</span>
        </div>
        <Link href={`/course/${course.id}/${course.slug}/edit`} className='font-bold text-sm hover:bg-neutral-200 flex items-center justify-center rounded-md py-2 px-3'>
          <div></div>
          <span>Edit Course</span>
        </Link>
      </section>
      <main className="py-[1.5rem] px-[2.5rem] flex flex-col gap-6 max-w-[50rem]">
        {/* Progress */}
        <section className="bg-white py-3 px-4 rounded">
          <div className="flex justify-between font-bold">
            <p>{`${course.wordsLearned} / ${course.wordsTotal} (${
              course.wordsLearned - course.wordsToReview
            } in long term memory)`}</p>
            <p>{`${course.wordsIgnored} ignored`}</p>
          </div>
          {/* Progress bar */}
          <div className="pt-3 pb-4">
            <div className="w-full bg-neutral-100 h-2 rounded z-1 border-t border-t-neutral-300">
              <div
                className={`w-[${
                  course.wordsLearned / course.wordsTotal
                }%] bg-yellow-500 h-full rounded z-100`}
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
              <Link
                href=""
                className="py-[0.35rem] px-3 rounded-md font-bold text-sm bg-slate-300"
              >{`Review (${course.wordsToReview})`}</Link>
            </div>
          </div>
        </section>
        {/* Lessons */}
        <section className="flex gap-4 flex-wrap max-w-[50rem]">
          {course.lessons.map((lesson, index) => (
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
