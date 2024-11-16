"use client";

import { Course, User } from "@/types/models";
import { getCourse, getUser } from "@/util/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

// TODO: course pic, user pic

export default function EditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourse(params.courseId);
        setCourse(courseData);
        if (courseData) {
          const user = await getUser(String(courseData.authorId));
          setAuthor(user);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCourse();
  }, []);

  const [course, setCourse] = React.useState<Course>();
  const [author, setAuthor] = React.useState<User>();

  return (
    <div>
      <div>
        <section className="flex items-center text-white bg-slate-800 justify-between px-[4rem] py-[1rem]">
          <div className="flex gap-4">
            <div className="size-8 rounded-md bg-white p-[1px]">
              <div className="size-full bg-black rounded-md">
                {/* {course.coursePic} */}
              </div>
            </div>
            <h1 className="text-2xl font-bold">{course?.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 bg-white rounded p-0.5">
              <div className="size-full bg-black rounded">
                {/* {course.user.profilePic} */}
              </div>
            </div>
            <div className="text-xs text-neutral-300 flex flex-col text-center">
              Created by{" "}
              <span className="text-sm font-bold text-white">
                {author?.username}
              </span>
            </div>
          </div>
        </section>
        <section className="bg-white flex justify-between itmes-center px-[5rem] py-3 border-b">
          <div className="flex gap-2 text-sm items-center">
            <h2 className="text-xl font-bold">Editing</h2>
            <Link
              href={`/course/${course?.id}/${course?.slug}/edit`}
              className="py-2 px-4 hover:bg-slate-300 transition-colors transform duration-300 rounded-full"
            >
              {`Levels (${course?.lessons.length})`}
            </Link>
            <Link
              href={`/course/${course?.id}/${course?.slug}/edit/details`}
              className="py-2 px-4 hover:bg-slate-300 transition-colors transform duration-300 rounded-full"
            >
              Details
            </Link>
          </div>
          <Link
            href=""
            className="py-2 px-3 hover:bg-neutral-100 rounded-md text-sm font-bold"
          >
            Back to Course
          </Link>
        </section>
      </div>
      {children}
    </div>
  );
}
