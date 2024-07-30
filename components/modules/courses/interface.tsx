import { Course, CourseLevel, StatusEnum } from "@/generated/graphql";

type CourseRow = Omit<
  Course,
  | "status"
  | "durationByLecture"
  | "admin"
  | "_id"
  | "__typename"
  | "lectures"
  | "lecturesByDuration"
>;

export type CourseRowType = {
  id: string;
} & CourseRow;

export interface AddCourseFormInput {
  name: string;
  desc: string;
  price: number;
  duration: string;
  image: string;
  level: CourseOption | null;
}

export interface CourseOption {
  value: CourseLevel;
  label: string;
}
export const courseOptions: CourseOption[] = [
  { value: CourseLevel.Advanced, label: "Advanced" },
  { value: CourseLevel.Beginner, label: "Beginner" },
  { value: CourseLevel.Intermediate, label: "Intermediate" },
  { value: CourseLevel.Professional, label: "Professional" },
];
