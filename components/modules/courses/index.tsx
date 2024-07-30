import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/utils/graphqQlClient";
import ReusableModal from "@/components/common/modal/modal";
import {
  CourseRowType,
  AddCourseFormInput,
  courseOptions,
} from './interface';
import { generateRandomPassword } from "@/utils/helper";
import useGlobalStore from "@/store/global";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FaTrash, FaEdit, FaShieldAlt } from "react-icons/fa";
import useAuthStore from "@/store/auth";
import { extractErrorMessage } from "@/utils/helper";

const Instructor: React.FC = () => {
  const [members, setMembers] = useState<CourseRowType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [randomPassword, setRandomPassword] = useState(
    generateRandomPassword()
  );
  const { userId } = useAuthStore();
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
  const { setToastData } = useGlobalStore();
  const [counter, setCounter] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AddCourseFormInput>();

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${padTwoDigits(date.getMonth() + 1)}/${padTwoDigits(
      date.getDate()
    )}/${date.getFullYear()} ${padTwoDigits(date.getHours())}:${padTwoDigits(
      date.getMinutes()
    )}`;
    return formattedDate;
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllCourses();
        if (response && response.getAllCourses) {
          const formattedCourses = response.getAllCourses.map((course) => ({
            ...course,
            createdAt: formatDate(course?.createdAt),
            updatedAt: formatDate(course?.updatedAt),
          }));

          setMembers(
            formattedCourses.map((el) => ({
              id: el?._id,
              name: el.name,
              desc: el?.desc,
              image: el?.image,
              createdAt: el?.createdAt,
              updatedAt: el?.updatedAt,
              level: el?.level,
              duration:el?.duration,
                price: el?.price,
            }))
          );
        }
      } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        setToastData({
          type: "error",
          message: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [formatDate, counter]);

  const padTwoDigits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const handleAddAdmin: SubmitHandler<AddCourseFormInput> = async (data) => {
    try {
      const input: AddCourseFormInput = {
        name: data.name,
        desc: data.desc,
        duration: data.duration,
        image: data.image,
          level: data.level,
          price: data?.price,
        };
        if (!input?.level?.value) {
            return
        }

      const response = await sdk.AddCourse({
        input: {
          name: input.name,
          desc: input.desc,
          duration: input.duration,
          image: input.image,
          level: input.level.value,
          price: Number(input?.price),
        },
      });
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({ message: "Admin added successfully", type: "success" });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    }
  };
  const [btnLoading, setBtnLoading] = useState(false);

  const handleDeleteCourse = async () => {
    if (!adminToDelete) return;

    try {
      setBtnLoading(true);
      await sdk.deleteCourse({ id: adminToDelete.toString() });
      setIsDeleteModalOpen(false);
      setAdminToDelete(null);
      setCounter((prev) => prev + 1);
      setToastData({ message: "Course deleted successfully", type: "success" });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const openDeleteModal = (id: any) => {
    // console.log(id);
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const openChangePassModal = (adminId: string) => {
    setSelectedAdminId(adminId);
    setRandomPassword(generateRandomPassword());
    setIsChangePassModalOpen(true);
  };

  const renderActions = (rowData: { id: string }) => (
    <div className="flex space-x-3 justify-center items-center">
      {userId !== rowData.id && (
        <>
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => openDeleteModal(rowData.id)}
          />
        </>
      )}
      <FaEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          setSelectedAdminId(rowData.id);
          setIsChangeRoleModalOpen(true);
        }}
      />
      <FaShieldAlt
        className="text-green-500 cursor-pointer"
        onClick={() => openChangePassModal(rowData.id)}
      />
    </div>
  );

  const mainActions = [
    {
      label: "Add Course",
      onClick: () => setIsAddModalOpen(true),
    },
  ];

  const headings = [
    // { title: "Toggle Status", dataKey: "status", render: renderSwitch },
    { title: "Name", dataKey: "name" },
    { title: "Description", dataKey: "desc" },
    // { title: "Status", dataKey: "status" },
    { title: "Price", dataKey: "price" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Actions", dataKey: "id", render: renderActions },
  ];

  return (
    <div className="w-full mx-auto px-2">
      <RoopTable
        loading={loading}
        data={members}
        itemsPerPage={10}
        csvExport
        fullCsv
        csvFileName="admins_data.csv"
        headings={headings}
        hovered
        filterable
        mainActions={mainActions}
      />

      <ReusableModal
        title="Add New Admin"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddAdmin)}>
          <div className="mb-4">
            <label className="block text-black">Name</label>
            <input
              type="text"
              placeholder="Enter Name..."
              {...register("name", { required: "Name is required" })}
              className="input input-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Description</label>
            <input
              placeholder="Enter Description..."
              {...register("desc", {
                required: "Description is required",
              })}
              className="input input-primary"
            />
            {errors.desc && (
              <p className="text-red-500 text-sm">{errors.desc.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Price</label>
                      <input
                          type="number"
              placeholder="Enter Price..."
              {...register("price", {
                required: "Price is required",
              })}
              className="input input-primary"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Image</label>
            <input
              type="string"
              placeholder="Enter Image..."
              {...register("image", {
                required: "Image is required",
              })}
              className="input input-primary"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Duration</label>
            <input
              type="string"
              placeholder="Enter Duration..."
              {...register("duration", {
                required: "Duration is required",
              })}
              className="input input-primary"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Level</label>
            <Controller
              name="level"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={courseOptions}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Role"
                />
              )}
            />
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <CButton variant={ButtonType.Primary}>Add Course</CButton>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        title="Confirm Deletion"
        comments="Are you sure you want to delete this course?"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        width="md"
      >
        <div className="flex justify-end mt-4">
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            onClick={handleDeleteCourse}
          >
            Yes
          </CButton>
        </div>
      </ReusableModal>
    </div>
  );
};

export default Instructor;
