"use client";

import React from "react";

const course = {
  id: 1,
  slug: "french-1",
  name: "French 1",
  author: "Memrise",
  coursePic: "",
  description: "Learn the basics of French.",
  numLessons: 11,
  wordsLearned: 49,
  wordsTotal: 1256,
  wordsIgnored: 0,
  wordsToReview: 49,
  learnLanguage: "French",
  languageSlug: "french",
  knownLanguage: "English (US)",
  status: 'Public'
};

const learnLanguages = [
  { id: 1, name: "Spanish (Mexico)" },
  { id: 2, name: "French" },
  { id: 3, name: "English (US)" },
];

const knownLanguages = [
  { id: 1, name: "Spanish (Mexico)" },
  { id: 2, name: "French" },
  { id: 3, name: "English (US)" },
];

const CourseEditDetails = () => {
  const [name, setName] = React.useState(course.name);
  //   const [tags, setTags] = React.useState();
  const [description, setDescription] = React.useState(course.description);
  //   const [shortDescription, setShortDescription] = React.useState();
  const [learnLang, setLearnLang] = React.useState(course.learnLanguage);
  const [knownLang, setKnownLang] = React.useState(course.knownLanguage);
  const [status, setStatus] = React.useState(course.status)

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }
  
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
    setLearnLang(e.target.value);
  };

  const handleKnownLang = (e) => {
    setKnownLang(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="flex gap-[1rem] px-[5rem] py-[2rem] justify-between text-sm">
        <form
          onSubmit={handleSave}
          className="flex flex-col flex-grow gap-4 bg-white rounded p-[1rem] [&_label]:font-bold [&_label]:text-sm [&_select]:text-sm [&_input]:text-sm [&_input]:px-4 [&_input]:border [&_input]:rounded [&_input]:p-2 [&_select]:border [&_select]:p-1 [&_select]:rounded [&_select]:w-[15rem]"
        >
          <div className="self-end flex gap-2">
            <label htmlFor="status">Status</label>
            <select id="status" className="" value={status} onChange={handleStatus}>
              <option>Incomplete</option>
              <option>Unlisted</option>
              <option>Public</option>
            </select>
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
              <select id="learn-language" value={learnLang} onChange={handleLearnLang}>
                <option>Please select one</option>
                {learnLanguages.map((learnLangOption) => (
                  <option key={learnLangOption.id}>
                    {learnLangOption.name}
                  </option>
                ))}
              </select>
              <span>for</span>
              <select value={knownLang} onChange={handleKnownLang}>
                <option>----------</option>
                {knownLanguages.map((knownLangOption) => (
                  <option key={knownLangOption.id}>
                    {knownLangOption.name}
                  </option>
                ))}
              </select>
              <span>speakers</span>
            </div>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors transform duration-300 font-bold py-2 rounded-md">Save</button>
        </form>
        <div className="flex flex-col gap-6">
          <div className="p-3 bg-white rounded w-[13rem] h-[17rem] flex flex-col justify-between">
            <div className="bg-black w-full h-[12rem]">{course.coursePic}</div>
            <button className="hover:bg-neutral-100 transition-colors transform duration-300 py-2 rounded-md font-bold">
              Upload New Picture
            </button>
          </div>
          <div className="w-full p-4 rounded bg-white">
            <button className="bg-red-400 hover:bg-red-500 transition-colors transform duration-300 rounded-md py-2 w-full text-white text-sm font-bold">
              Delete Course
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CourseEditDetails;
