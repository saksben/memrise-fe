"use client";

import { Course, Language } from "@/types/models";
import {
  deleteCourse,
  getCourse,
  getLanguages,
  updateCourse,
} from "@/util/api";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// TODO: course status
// TODO: separate knownLanguages and learnLanguages
// TODO: error handling

const CourseEditDetails = () => {
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = React.useState<Course>();
  const [name, setName] = React.useState<string>("");
  //   const [tags, setTags] = React.useState();
  const [description, setDescription] = React.useState<string>("");
  //   const [shortDescription, setShortDescription] = React.useState();
  const [learnLang, setLearnLang] = React.useState<Language>();
  const [knownLang, setKnownLang] = React.useState<Language>();
  const [learnLanguages, setLearnLanguages] = React.useState<Language[]>([]);
  const [knownLanguages, setKnownLanguages] = React.useState<Language[]>([]);
  // const [status, setStatus] = React.useState(course.status)
  const [isUpdated, setIsUpdated] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch languages
        const langData = await getLanguages();
        setLearnLanguages(langData);
        setKnownLanguages(langData);

        // Fetch course
        const courseData = await getCourse(params.courseId);
        setCourse(courseData);
        setName(courseData.name);
        setDescription(courseData.description || "");

        // Map languages after they are populated
        const fetchedLearnLang = langData.find(
          (lang) => lang.id === courseData.learnLanguageId
        );
        const fetchedKnownLang = langData.find(
          (lang) => lang.id === courseData.knownLanguageId
        );

        setLearnLang(fetchedLearnLang);
        setKnownLang(fetchedKnownLang);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchData();
  }, []);

  // const handleStatus = (e) => {
  //   setStatus(e.target.value)
  // }

  const handleName = (e) => {
    setName(e.target.value);
  };

  //   const handleTags = (e) => {
  //     setTags(e.target.value);
  //   };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  //   const handleShortDescription = (e) => {
  //     setShortDescription(e.target.value);
  //   };

  const handleLearnLang = (e) => {
    setLearnLang(learnLanguages.find((lang) => lang.id === +e.target.value));
  };

  const handleKnownLang = (e) => {
    setKnownLang(knownLanguages.find((lang) => lang.id === +e.target.value));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const slug = name?.toLowerCase().split(" ").join("-");
      await updateCourse(params.courseId, {
        name: name,
        slug: slug,
        description: description,
        knownLanguageId: knownLang?.id,
        learnLanguageId: learnLang?.id,
      });
      setIsUpdated(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteCourse(params.courseId);
      console.log('Deleted course!')
    } catch (error) {
      console.error("Error:", error);
    } finally {
      router.push(`/courses/${knownLang?.slug}`);
    }
  };

  return (
    <>
      <main className="flex flex-col gap-[0.5rem] text-sm px-[5rem] py-[1.5rem]">
        {isUpdated && (
          <div className="w-full rounded bg-white p-2 flex shadow-md">
            <div className="w-full p-[1rem] bg-sky-400 rounded text-white font-bold text-sm border border-sky-500">
              Changes saved.
            </div>
          </div>
        )}
        <div className="flex gap-[1rem]  justify-between">
          <form
            onSubmit={handleSave}
            className="flex flex-col flex-grow gap-4 bg-white rounded p-[1rem] [&_label]:font-bold [&_label]:text-sm [&_select]:text-sm [&_input]:text-sm [&_input]:px-4 [&_input]:border [&_input]:rounded [&_input]:p-2 [&_select]:border [&_select]:p-1 [&_select]:rounded [&_select]:w-[15rem]"
          >
            <div className="self-end flex gap-2">
              {/* <label htmlFor="status">Status</label>
              <select id="status" className="" value={status} onChange={handleStatus}>
                <option>Incomplete</option>
                <option>Unlisted</option>
                <option>Public</option>
              </select> */}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input id="name" value={name} onChange={handleName} />
              {/* <label htmlFor="tags">Tags</label>
              <input id="tags" value={tags} onChange={handleTags} /> */}
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescription}
                className="border text-sm p-2 rounded"
                rows={5}
              />
              {/* <label htmlFor="short-description">Short description</label>
              <input
                id="short-description"
                value={shortDescription}
                onChange={handleShortDescription}
              /> */}
              <label htmlFor="learn-language">Category</label>
              <div className="flex gap-1 items-center">
                <select
                  id="learn-language"
                  value={learnLang?.id}
                  onChange={handleLearnLang}
                >
                  <option>Please select one</option>
                  {learnLanguages.map((learnLangOption) => (
                    <option key={learnLangOption.id} value={learnLangOption.id}>
                      {learnLangOption.name}
                    </option>
                  ))}
                </select>
                <span>for</span>
                <select value={knownLang?.id} onChange={handleKnownLang}>
                  <option>----------</option>
                  {knownLanguages.map((knownLangOption) => (
                    <option key={knownLangOption.id} value={knownLangOption.id}>
                      {knownLangOption.name}
                    </option>
                  ))}
                </select>
                <span>speakers</span>
              </div>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors transform duration-300 font-bold py-2 rounded-md">
              Save
            </button>
          </form>
          <div className="flex flex-col gap-6">
            <div className="p-3 bg-white rounded w-[13rem] h-[17rem] flex flex-col justify-between">
              <div className="bg-black w-full h-[12rem]">
                {/* {course?.coursePic} */}
              </div>
              <button className="hover:bg-neutral-100 transition-colors transform duration-300 py-2 rounded-md font-bold">
                Upload New Picture
              </button>
            </div>
            <div className="w-full p-4 rounded bg-white">
              <button
                onClick={handleDelete}
                className="bg-red-400 hover:bg-red-500 transition-colors transform duration-300 rounded-md py-2 w-full text-white text-sm font-bold"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CourseEditDetails;
