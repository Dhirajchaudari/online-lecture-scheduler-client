import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type AccessHistory = {
  __typename?: 'AccessHistory';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  device: DeviceInfo;
};

export type AddAdminInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: AdminRole;
};

export type AddCourseInput = {
  desc: Scalars['String']['input'];
  duration: Scalars['String']['input'];
  image: Scalars['String']['input'];
  level: CourseLevel;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type AddLectureInput = {
  desc: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['String']['input']>;
  end: Scalars['String']['input'];
  name: Scalars['String']['input'];
  start: Scalars['String']['input'];
  status: StatusEnum;
  videoLink?: InputMaybe<Scalars['String']['input']>;
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['ID']['output'];
  accessHistory?: Maybe<Array<AccessHistory>>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  lastLoggedIn?: Maybe<Scalars['DateTimeISO']['output']>;
  lastLoggedOut?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  numberOfResetPassword: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  role: AdminRole;
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** Types of Admin Roles */
export enum AdminRole {
  Admin = 'admin',
  Instructor = 'instructor'
}

export type Course = {
  __typename?: 'Course';
  _id: Scalars['ID']['output'];
  admin: Admin;
  createdAt: Scalars['DateTimeISO']['output'];
  desc: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  durationByLecture: Scalars['String']['output'];
  image: Scalars['String']['output'];
  lectures?: Maybe<Array<LectureInfo>>;
  level: CourseLevel;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  status: StatusEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** Different level of courses */
export enum CourseLevel {
  Advanced = 'advanced',
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Professional = 'professional'
}

export type DeviceInfo = {
  __typename?: 'DeviceInfo';
  _id: Scalars['ID']['output'];
  deviceName: Scalars['String']['output'];
  deviceOS: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Instructor = {
  __typename?: 'Instructor';
  _id: Scalars['ID']['output'];
  admin: Admin;
  courses?: Maybe<Array<LectureInfo>>;
  createdAt: Scalars['DateTimeISO']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Lecture = {
  __typename?: 'Lecture';
  _id: Scalars['ID']['output'];
  course?: Maybe<Course>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  desc: Scalars['String']['output'];
  duration?: Maybe<Scalars['DateTimeISO']['output']>;
  end?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  start?: Maybe<Scalars['DateTimeISO']['output']>;
  status: StatusEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  videoLink: Scalars['String']['output'];
};

export type LectureInfo = {
  __typename?: 'LectureInfo';
  _id: Lecture;
  end?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  start?: Maybe<Scalars['DateTimeISO']['output']>;
  status: StatusEnum;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: Scalars['Boolean']['output'];
  addCourse: Scalars['Boolean']['output'];
  addLecture: Scalars['Boolean']['output'];
  addLectureToCourse: Scalars['Boolean']['output'];
  deleteCourse: Scalars['Boolean']['output'];
  deleteInstructor: Scalars['Boolean']['output'];
  deleteLecture: Scalars['Boolean']['output'];
  removeCourseFromInstructor: Scalars['Boolean']['output'];
  updateCourse: Scalars['Boolean']['output'];
  updateLecture: Scalars['Boolean']['output'];
};


export type MutationAddAdminArgs = {
  input: AddAdminInput;
};


export type MutationAddCourseArgs = {
  input: AddCourseInput;
};


export type MutationAddLectureArgs = {
  input: AddLectureInput;
};


export type MutationAddLectureToCourseArgs = {
  courseId: Scalars['String']['input'];
  lectureId: Scalars['String']['input'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteInstructorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteLectureArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCourseFromInstructorArgs = {
  courseId: Scalars['String']['input'];
  instructorId: Scalars['String']['input'];
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateLectureArgs = {
  input: UpdateLectureInput;
};

export type Query = {
  __typename?: 'Query';
  adminLogin: Scalars['String']['output'];
  adminLogout: Scalars['Boolean']['output'];
  getAllCourses: Array<Course>;
  getAllInstructors: Array<Instructor>;
  getAllLectures: Array<Lecture>;
  getLecturesByInstructor?: Maybe<Array<Lecture>>;
  me: Admin;
  resetPasswordAdmin: Scalars['Boolean']['output'];
};


export type QueryAdminLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryResetPasswordAdminArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Status enum type. */
export enum StatusEnum {
  Active = 'active',
  InActive = 'inActive'
}

export type UpdateCourseInput = {
  desc?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<CourseLevel>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateLectureInput = {
  desc?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusEnum>;
  videoLink?: InputMaybe<Scalars['String']['input']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Admin', _id: string, name: string, email: string, role: AdminRole } };

export type AdminLoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminLoginQuery = { __typename?: 'Query', adminLogin: string };

export type AdminLogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminLogoutQuery = { __typename?: 'Query', adminLogout: boolean };

export type AddCourseMutationVariables = Exact<{
  input: AddCourseInput;
}>;


export type AddCourseMutation = { __typename?: 'Mutation', addCourse: boolean };

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse: boolean };

export type GetAllCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCoursesQuery = { __typename?: 'Query', getAllCourses: Array<{ __typename?: 'Course', name: string, _id: string, desc: string, duration: string, price: number, status: StatusEnum, image: string, level: CourseLevel, createdAt: any, updatedAt: any }> };

export type GetAllInstructorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInstructorsQuery = { __typename?: 'Query', getAllInstructors: Array<{ __typename?: 'Instructor', _id: string, admin: { __typename?: 'Admin', _id: string, name: string, email: string, phone: string, role: AdminRole, numberOfResetPassword: number, createdAt: any, updatedAt: any }, courses?: Array<{ __typename?: 'LectureInfo', id: string, name: string, _id: { __typename?: 'Lecture', _id: string } }> | null }> };

export type AddAdminMutationVariables = Exact<{
  input: AddAdminInput;
}>;


export type AddAdminMutation = { __typename?: 'Mutation', addAdmin: boolean };

export type ResetAdminPassowordQueryVariables = Exact<{
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetAdminPassowordQuery = { __typename?: 'Query', resetPasswordAdmin: boolean };

export type DeleteInstructorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteInstructorMutation = { __typename?: 'Mutation', deleteInstructor: boolean };


export const MeDocument = gql`
    query Me {
  me {
    _id
    name
    email
    role
  }
}
    `;
export const AdminLoginDocument = gql`
    query AdminLogin($email: String!, $password: String!) {
  adminLogin(email: $email, password: $password)
}
    `;
export const AdminLogoutDocument = gql`
    query AdminLogout {
  adminLogout
}
    `;
export const AddCourseDocument = gql`
    mutation AddCourse($input: AddCourseInput!) {
  addCourse(input: $input)
}
    `;
export const DeleteCourseDocument = gql`
    mutation deleteCourse($id: String!) {
  deleteCourse(id: $id)
}
    `;
export const GetAllCoursesDocument = gql`
    query GetAllCourses {
  getAllCourses {
    name
    _id
    desc
    duration
    price
    status
    image
    level
    createdAt
    updatedAt
  }
}
    `;
export const GetAllInstructorsDocument = gql`
    query GetAllInstructors {
  getAllInstructors {
    _id
    admin {
      _id
      name
      email
      phone
      role
      numberOfResetPassword
      createdAt
      updatedAt
    }
    courses {
      _id {
        _id
      }
      id
      name
    }
  }
}
    `;
export const AddAdminDocument = gql`
    mutation AddAdmin($input: AddAdminInput!) {
  addAdmin(input: $input)
}
    `;
export const ResetAdminPassowordDocument = gql`
    query ResetAdminPassoword($id: String!, $password: String!) {
  resetPasswordAdmin(id: $id, password: $password)
}
    `;
export const DeleteInstructorDocument = gql`
    mutation DeleteInstructor($id: String!) {
  deleteInstructor(id: $id)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Me(variables?: MeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Me', 'query', variables);
    },
    AdminLogin(variables: AdminLoginQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminLoginQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminLoginQuery>(AdminLoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminLogin', 'query', variables);
    },
    AdminLogout(variables?: AdminLogoutQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdminLogoutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdminLogoutQuery>(AdminLogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdminLogout', 'query', variables);
    },
    AddCourse(variables: AddCourseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddCourseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCourseMutation>(AddCourseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddCourse', 'mutation', variables);
    },
    deleteCourse(variables: DeleteCourseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteCourseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCourseMutation>(DeleteCourseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteCourse', 'mutation', variables);
    },
    GetAllCourses(variables?: GetAllCoursesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllCoursesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllCoursesQuery>(GetAllCoursesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllCourses', 'query', variables);
    },
    GetAllInstructors(variables?: GetAllInstructorsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllInstructorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllInstructorsQuery>(GetAllInstructorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllInstructors', 'query', variables);
    },
    AddAdmin(variables: AddAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddAdminMutation>(AddAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddAdmin', 'mutation', variables);
    },
    ResetAdminPassoword(variables: ResetAdminPassowordQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ResetAdminPassowordQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetAdminPassowordQuery>(ResetAdminPassowordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ResetAdminPassoword', 'query', variables);
    },
    DeleteInstructor(variables: DeleteInstructorMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteInstructorMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteInstructorMutation>(DeleteInstructorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteInstructor', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;