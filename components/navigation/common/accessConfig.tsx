import Dashboard from "@/components/modules/dashboard";
import {
  MdOutlineSpaceDashboard,
} from "react-icons/md";
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
];
