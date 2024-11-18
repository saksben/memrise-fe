"use client";

// TODO: confirm delete
// TODO: duplicate button

import { Course, Language, Lesson } from "@/types/models";
import {
  createLesson,
  createWord,
  deleteLesson,
  deleteWord,
  getCourse,
  getLanguages,
  updateLesson,
  updateWord,
} from "@/util/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const EditCoursePage = () => {
  const [course, setCourse] = React.useState<Course>();
  const [learnLang, setLearnLang] = React.useState<Language>();
  const [knownLang, setKnownLang] = React.useState<Language>();
  const [lessons, setLessons] = React.useState<Lesson[]>([]);

  const params = useParams();

  React.useEffect(() => {
    const getCourseData = async () => {
      try {
        // Fetch Course
        const courseData = await getCourse(params.courseId);
        setCourse(courseData);

        // Add Lessons, sorted by their index
        const sortedLessons = courseData.lessons.sort(
          (a, b) => a.lessonIndex - b.lessonIndex
        );
        setLessons(sortedLessons);

        // Fetch learning Language
        const langData = await getLanguages();
        const fetchedLearnLang = langData.find(
          (lang) => lang.id === courseData.learnLanguageId
        );
        const fetchedKnownLang = langData.find(
          (lang) => lang.id === courseData.knownLanguageId
        );

        setLearnLang(fetchedLearnLang);
        setKnownLang(fetchedKnownLang);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCourseData();
  }, [params.courseId]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      await createLesson({
        name: "New Level",
        lessonIndex: lessons.length + 1,
        courseId: +params.courseId,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const LessonHeader = ({ id, index, name, words }) => {
    const [wordName, setWordName] = React.useState<string>("");
    const [wordTranslation, setWordTranslation] = React.useState<string>("");
    const [hidden, setHidden] = React.useState<boolean>(true);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [lessonName, setLessonName] = React.useState<string>(name);
    const [editableWords, setEditableWords] = React.useState(() =>
      words.map((word) => ({
        ...word,
        isEditingName: false,
        isEditingTranslation: false,
      }))
    );

    const handleHidden = (e) => {
      e.preventDefault();
      setHidden(!hidden);
    };

    const handleWordName = (e) => {
      setWordName(e.target.value);
    };

    const handleWordTranslation = (e) => {
      setWordTranslation(e.target.value);
    };

    const handleLessonNameChange = (e) => {
      setLessonName(e.target.value);
    };

    // Turn into an editable input when clicked
    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleNameSubmit = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsEditing(false);
        try {
          await updateLesson(id, { name: lessonName });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    const handleLessonDelete = async (e) => {
      e.preventDefault();
      try {
        // Update lessons in state
        const updatedLessons = lessons
          .filter((lesson) => lesson.id !== id)
          .sort((a, b) => a.lessonIndex - b.lessonIndex);

        // Reindexed lessons
        const reindexedLessons = updatedLessons.map((lesson, newIndex) => ({
          ...lesson,
          lessonIndex: newIndex + 1, // Assign new indices starting from 1
        }));

        // Save reindexed lessons to the backend
        await Promise.all(
          reindexedLessons.map((lesson) =>
            updateLesson(String(lesson.id), { lessonIndex: lesson.lessonIndex })
          )
        );

        // Update state with reindexed lessons
        setLessons(reindexedLessons);

        // Delete the selected lesson
        await deleteLesson(String(id));

        console.log("deleted");
      } catch (error) {
        console.error("Error:", error);
      }
      window.location.reload();
    };

    const handleAddWord = async (e) => {
      e.preventDefault();
      try {
        await createWord({
          name: wordName,
          translation: wordTranslation,
          lessonId: id,
        });
        window.location.reload();
        console.log("Word created!");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const toggleWordEdit = (wordId, field) => {
      setEditableWords((prevWords) =>
        prevWords.map((word) =>
          word.id === wordId ? { ...word, [field]: !word[field] } : word
        )
      );
    };

    const handleWordUpdate = async (wordId, field, value) => {
      try {
        // Update the backend
        await updateWord(wordId, { [field]: value });
        setEditableWords((prevWords) =>
          prevWords.map((word) =>
            word.id === wordId
              ? {
                  ...word,
                  [field]: false,
                  [field === "name" ? "name" : "translation"]: value,
                }
              : word
          )
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleWordDelete = async (wordId) => {
      try {
        await deleteWord(String(wordId));
        setEditableWords((prevWords) =>
          prevWords.filter((word) => word.id !== wordId)
        );
        console.log("Word deleted!");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <>
        <div>
          <div
            key={id}
            className="flex justify-between p-4 bg-sky-300 text-white rounded items-center"
          >
            <div className="flex items-center gap-6">
              <span className="font-bold text-xl">{index}</span>
              <h3 className="flex gap-3 items-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={lessonName}
                    onChange={handleLessonNameChange}
                    onKeyDown={handleNameSubmit}
                    className="text-sm font-bold border rounded py-1 px-2 text-black"
                    autoFocus
                  />
                ) : (
                  <span
                    className="text-xl font-bold hover:underline"
                    onClick={handleEditClick}
                  >
                    {lessonName}
                  </span>
                )}
                <span className="text-xl">{learnLang?.name}</span>
              </h3>
            </div>
            <div className="text-black font-bold text-xs bg-neutral-100 flex rounded">
              <button
                onClick={handleHidden}
                className="hover:bg-neutral-200 w-full py-1 px-2 rounded-l"
              >
                Show/Hide
              </button>
              <Link
                href={`/course/${course?.id}/${course?.slug}/${index}`}
                className="hover:bg-neutral-200 py-1 px-3"
              >
                Preview
              </Link>
              <button className="hover:bg-neutral-200 py-1 px-3">
                Duplicate
              </button>
              <button
                onClick={handleLessonDelete}
                className="hover:bg-neutral-200 py-1 px-2 rounded-r"
              >
                Delete
              </button>
            </div>
          </div>
          {!hidden && (
            <div className="flex flex-col bg-white">
              <p className="text-sm font-bold py-4 px-2">
                Test on {learnLang?.name}, prompt with {knownLang?.name}
              </p>
              <table className="w-full border-b">
                <thead>
                  <tr className="text-left">
                    <th className="w-1/2 pl-[6rem]">{learnLang?.name}</th>
                    <th className="w-1/2 pl-[6rem]">{knownLang?.name}</th>
                  </tr>
                </thead>
                <tbody className="">
                  {editableWords.map((word) => (
                    <tr key={word.id}>
                      <td className="py-2 border-t w-1/2 pl-[6rem] relative group">
                        <div className="absolute group-hover:visible invisible left-10 top-1/2 -translate-y-1/2">
                          <button
                            onClick={() => handleWordDelete(word.id)}
                            className="font-bold text-xl"
                          >
                            x
                          </button>
                        </div>
                        {word.isEditingName ? (
                          <input
                            type="text"
                            value={word.name}
                            onChange={(e) =>
                              setEditableWords((prevWords) =>
                                prevWords.map((w) =>
                                  w.id === word.id
                                    ? { ...w, name: e.target.value }
                                    : w
                                )
                              )
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                toggleWordEdit(word.id, "isEditingName");
                                handleWordUpdate(word.id, "name", word.name);
                              }
                            }}
                            autoFocus
                            className="border rounded p-2"
                          />
                        ) : (
                          <span
                            onClick={() =>
                              toggleWordEdit(word.id, "isEditingName")
                            }
                          >
                            {word.name}
                          </span>
                        )}
                      </td>
                      <td className="py-2 border-t w-1/2 pl-[6rem]">
                        {word.isEditingTranslation ? (
                          <input
                            type="text"
                            value={word.translation}
                            onChange={(e) =>
                              setEditableWords((prevWords) =>
                                prevWords.map((w) =>
                                  w.id === word.id
                                    ? { ...w, translation: e.target.value }
                                    : w
                                )
                              )
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                toggleWordEdit(word.id, "isEditingTranslation");
                                handleWordUpdate(
                                  word.id,
                                  "translation",
                                  word.translation
                                );
                              }
                            }}
                            autoFocus
                            className="border rounded p-2"
                          />
                        ) : (
                          <span
                            onClick={() =>
                              toggleWordEdit(word.id, "isEditingTranslation")
                            }
                          >
                            {word.translation}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col items-center w-full self-center">
                <div className="w-full flex justify-center border-b">
                  <p className="text-sm font-bold py-1 w-3/4">Add words:</p>
                </div>
                <div className="w-full flex justify-center hover:bg-sky-200 relative group">
                  <button
                    onClick={handleAddWord}
                    className="group-hover:visible invisible cursor-pointer absolute text-3xl left-2 top-1/2 -translate-y-1/2 font-bold"
                  >
                    +
                  </button>
                  <div className="flex justify-between hover:bg-sky-200 w-3/4 py-3">
                    <input
                      className="border rounded p-1 w-1/3 text-sm"
                      id={wordName}
                      value={wordName}
                      name={wordTranslation}
                      onChange={handleWordName}
                    />
                    <input
                      className="border rounded p-1 w-1/3 text-sm"
                      id={wordTranslation}
                      value={wordTranslation}
                      name={wordTranslation}
                      onChange={handleWordTranslation}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <main className="px-1 pb-[2rem]">
        <section>
          <select
            onChange={(e) => {
              if (e.target.value === "addLanguage") {
                handleAddLesson(e);
              }
            }}
            className="p-2 rounded my-5 text-sm font-bold hover:bg-neutral-200 cursor-pointer"
          >
            <option hidden>+ Add level</option>
            <option value="addLanguage">{learnLang?.name}</option>
            <option value="multimedia">Multimedia</option>
          </select>
        </section>
        <section>
          <form className="flex flex-col gap-6">
            {lessons.map((lesson) => (
              <LessonHeader
                key={lesson.id}
                id={lesson.id}
                index={lesson.lessonIndex}
                name={lesson.name}
                words={lesson.words}
              />
            ))}
            <button className="bg-green-500 w-max py-2 px-3 text-sm font-bold text-white self-end rounded-md">
              Save and Continue
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default EditCoursePage;
