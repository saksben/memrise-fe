export type User = {
  id: number;
  firstName: string;
  lastName: string;
  points?: number;
  username: string;
  password: string;
  toLearnPer?: number;
  toReviewPer?: number;
  toSpeedPer?: number;
  toDifficultPer?: number;
};

export type Language = {
  id: number;
  name: string;
  slug: string;
};

export type Course = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  authorId: number;
  knownLanguageId: number;
  learnLanguageId: number;
  lessons: Lesson[];
};

export type Lesson = {
  id: number;
  name: string;
  lessonIndex: number;
  courseId: number;
  words: Word[];
};

export type Word = {
  id: number;
  name: string;
  translation: string;
  literal?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  gender?: string;
  mems?: string; // JSON or stringified object
  progress: number;
  isDifficult: boolean;
  isIgnored: boolean;
  timeTilReview?: string; // ISO date string
  lessonId: number;
};

export type Enrollment = {
  userId: number;
  courseId: number;
};
