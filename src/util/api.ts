// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

import {
  Course,
  Enrollment,
  Language,
  Lesson,
  User,
  Word,
} from "@/types/models";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

// Helper function to initiate the boilerplate for api calls
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// User methods
export async function getUsers() {
  return await request<User[]>("/users");
}

export async function getUser(id: string | string[]) {
  return await request<User>(`/users/${id}`);
}

export async function createUser(data: Partial<User>) {
  return await request<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(id: string | string[], data: Partial<User>) {
  return await request<User>(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: string | string[]) {
  return await request<void>(`/users/${id}`, {
    method: "DELETE",
  });
}

// Language methods
export async function getLanguages() {
  return await request<Language[]>("/languages");
}

export async function getLanguage(id: string | string[]) {
  return await request<Language>(`/languages/${id}`);
}

export async function createLanguage(data: Partial<Language>) {
  return await request<Language>("/languages", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateLanguage(
  id: string | string[],
  data: Partial<Language>
) {
  return await request<Language>(`/languages/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteLanguage(id: string | string[]) {
  return await request<void>(`/languages/${id}`, {
    method: "DELETE",
  });
}

// Course methods
export async function getCourses() {
  return await request<Course[]>("/courses");
}

export async function getCourse(id: string | string[]) {
  return await request<Course>(`/courses/${id}`);
}

export async function createCourse(data: Partial<Course>) {
  return await request<Course>("/courses", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCourse(
  id: string | string[],
  data: Partial<Course>
) {
  return await request<Course>(`/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteCourse(id: string | string[]) {
  return await request<void>(`/courses/${id}`, {
    method: "DELETE",
  });
}

// Lesson methods
export async function getLessons() {
  return await request<Lesson[]>("/lessons");
}

export async function getLesson(id: string | string[]) {
  return await request<Lesson>(`/lessons/${id}`);
}

export async function createLesson(data: Partial<Lesson>) {
  return await request<Lesson>("/lessons", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateLesson(
  id: string | string[],
  data: Partial<Lesson>
) {
  return await request<Lesson>(`/lessons/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteLesson(id: string | string[]) {
  return await request<void>(`/lessons/${id}`, {
    method: "DELETE",
  });
}

// Word methods
export async function getWords() {
  return await request<Word[]>("/words");
}

export async function getWord(id: string | string[]) {
  return await request<Word>(`/words/${id}`);
}

export async function createWord(data: Partial<Word>) {
  return await request<Word>("/words", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateWord(id: string | string[], data: Partial<Word>) {
  return await request<Word>(`/words/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteWord(id: string | string[]) {
  return await request<void>(`/words/${id}`, {
    method: "DELETE",
  });
}

// Enrollment M2M relationship methods for join table
export async function getEnrollments() {
  return await request<Enrollment[]>("/enrollments");
}

export async function getEnrollment(
  userId: string | string[],
  courseId: string | string[]
) {
  return await request<Enrollment>(`/enrollments/${userId}/${courseId}`);
}

export async function createEnrollment(data: Partial<Enrollment>) {
  return await request<Enrollment>("/enrollments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteEnrollment(
  userId: string | string[],
  courseId: string | string[]
) {
  return await request<void>(`/enrollments/${userId}/${courseId}`, {
    method: "DELETE",
  });
}
