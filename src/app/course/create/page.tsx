"use client";

import { Language } from "@/types/models";
import { createCourse, getLanguages } from "@/util/api";
import { useRouter } from "next/navigation";
import React from "react";

// Create course
// Immediately takes the user to /course/[courseId]/[course]/edit
// TODO: separate knownLanguages and learnLanguages
// TODO: update authorId in POST call once users are created
// TODO: error handling

const CourseCreate = () => {
  const [name, setName] = React.useState("");
  const [learnLang, setLearnLang] = React.useState<Language>();
  const [knownLang, setKnownLang] = React.useState<Language>();
  const [learnLanguages, setLearnLanguages] = React.useState<Language[]>([]);
  const [knownLanguages, setKnownLanguages] = React.useState<Language[]>([]);
  const [tags, setTags] = React.useState();
  const [description, setDescription] = React.useState();
  const [shortDescription, setShortDescription] = React.useState();

  const router = useRouter();

  // Fetch all possible languages to learn and all possible native languages
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const langData = await getLanguages();
        setLearnLanguages(langData);
        setKnownLanguages(langData);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch the user's native language
  React.useEffect(() => {
    if (knownLanguages.length > 0) {
      const foundLang = knownLanguages.find((lang) => lang.id === 3);
      setKnownLang(foundLang);
    }
  }, [knownLanguages]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLearnLang = (e) => {
    setLearnLang(learnLanguages.find((lang) => lang.name === e.target.value));
  };

  const handleKnownLang = (e) => {
    setKnownLang(knownLanguages.find((lang) => lang.name === e.target.value));
  };

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleShortDescription = (e) => {
    setShortDescription(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slug = name?.toLowerCase().split(" ").join("-");
      const course = await createCourse({
        name: name,
        slug: slug,
        description: description,
        authorId: 1,
        knownLanguageId: knownLang?.id,
        learnLanguageId: learnLang?.id,
      });
      router.push(`/course/${String(course.id)}/${slug}/edit`);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <>
      <section className="px-[4rem] py-[1.5rem] text-2xl font-bold bg-white border-b">
        <h1>Create a Course</h1>
      </section>
      <main className="py-[2rem] px-[4rem] text-sm flex gap-[2rem]">
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
          <div className="flex flex-col bg-white">
            <div className="px-[1rem] py-[2rem] border-b flex flex-col gap-4 [&_select]:w-[15rem] [&_div]:flex [&_div]:items-center [&_input]:w-full [&_label]:mr-4 [&_select]:border [&_select]:py-1 [&_select]:rounded [&_label]:font-bold [&_input]:border [&_input]:rounded [&_input]:px-4 [&_input]:py-1 flex-grow">
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" value={name} onChange={handleName} />
              </div>
              <p>Naming your course well will help other learners find it.</p>
              <div>
                <label htmlFor="learn-lang">Teaching</label>
                <select
                  id="learn-lang"
                  value={learnLang?.name}
                  onChange={handleLearnLang}
                >
                  <option>Please select one...</option>
                  {learnLanguages.map((learnLangOption) => (
                    <option key={learnLangOption.id}>
                      {learnLangOption.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label htmlFor="known-lang">For</label>
                <div className="flex gap-2 items-center">
                  <select
                    id="known-lang"
                    value={knownLang?.name}
                    onChange={handleKnownLang}
                  >
                    {knownLanguages.map((knownLangOption) => (
                      <option key={knownLangOption.id}>
                        {knownLangOption.name}
                      </option>
                    ))}
                  </select>
                  <p className="font-bold">speakers</p>
                </div>
              </div>
              <div className="flex">
                <label htmlFor="tags">Tags</label>
                <input id="tags" value={tags} onChange={handleTags} />
              </div>
              <p>
                E.g. Spanish vocabulary, learn spanish online, spanish grammar
              </p>
              <div className="">
                <label htmlFor="description" className="self-start">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescription}
                  className="border pl-4 py-1 w-full rounded"
                  rows={5}
                />
              </div>
              <p>
                Keep the description of the course in the language of what the
                learners speak
              </p>
              <div className="">
                <label htmlFor="short-description" className="text-nowrap">
                  Short description
                </label>
                <input
                  id="short-description"
                  value={shortDescription}
                  onChange={handleShortDescription}
                />
              </div>
              <p>A short description for our apps.</p>
            </div>
            {/* Captcha */}
            <button className="py-2 px-5 my-[1rem] bg-sky-300 text-white font-bold rounded-md w-max self-center">
              Create Course
            </button>
          </div>
        </form>
        <div className="bg-white flex flex-col gap-[1rem] px-[1rem] py-[3rem] w-[20rem] h-max">
          <h2 className="font-bold text-base">Why create a course?</h2>
          <ul className="list-disc pl-6 w-full text-wrap">
            <li>A quick list of personal facts to remember</li>
            <li>Share common content with your classmates/colleagues</li>
            <li>Share awesome teaching materials with the community!</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default CourseCreate;
