
import Dashboard from "@/components/modules/dashboard";
import React from "react";
import {
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { CiUser, CiShop, CiDatabase } from "react-icons/ci";
import { AdminRole } from "@/generated/graphql";
import Instructor from "@/components/modules/iam"
import Courses from "@/components/modules/courses"


export const modules = [
  {
    name: "Dashboard",
    roles: [AdminRole.Admin, AdminRole.Instructor],
    icon: MdOutlineSpaceDashboard,
    component: Dashboard,
  },
  {
    name: "IAM",
    roles: [AdminRole.Admin],
    icon: MdOutlineSpaceDashboard,
    component: Instructor,
  },
  {
    name: "Courses",
    roles: [AdminRole.Admin, AdminRole.Instructor],
    icon: MdOutlineSpaceDashboard,
    component: Courses,
  },
  {
    name: "Lectures",
    roles: [AdminRole.Admin, AdminRole.Instructor],
    icon: MdOutlineSpaceDashboard,
    component: Dashboard,
  },
  //   {
  //     name: "Campaigns",
  //     roles: ["admin", "master", "normal"],
  //     icon: MdOutlineAnalytics,
  //     subModules: [
  //       {
  //         name: "Emails",
  //         roles: ["admin", "master", "normal"],
  //         component: Emails,
  //         icon: MdOutlineMail,
  //       },
  //     ],
  //   },
];
