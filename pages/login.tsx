import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo1 from "../assets/logo/logoDark.jpg";
import { sdk } from "@/utils/graphqQlClient";
import useGlobalStore from "@/store/global";
import { GetServerSideProps } from "next";
import { parseCookies,setCookie } from "nookies";
import { extractErrorMessage } from "@/utils/helper";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IFormInput {
  email: string;
  password: string;
  persistent: boolean;
}

export default function Login() {
  const router = useRouter();
  const { setToastData } = useGlobalStore();
  const [showPass, setShowPass] = React.useState<boolean>(false);

  const [login, setLogin] = React.useState<IFormInput>({
    email: "",
    password: "",
    persistent: false,
  });

  const [btnLoading, setBtnLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      if (!login.email || !login.password) {
        setToastData({
          type: "error",
          message: "Please fill all fields",
        });
        return;
      }

      const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };

      if (!validateEmail(login.email)) {
        setToastData({
          type: "error",
          message: "Please enter a valid email address",
        });
        return;
      }

      setBtnLoading(true);
      const response = await sdk.AdminLogin({
        email: login?.email,
        password: login?.password,
      });

      if (response) {
        setToastData({ message: "Login Successful", type: "success" });

        // Check production environment and endpoint URL
        const isProduction = process.env.NEXT_PUBLIC_SERVER_IS_PROD === "true";
        const prodEndpoint = process.env.NEXT_PUBLIC_SERVER_PROD_URL;
        const devEndpoint = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
        console.log(response)
          // create cookie
      if (isProduction) {
        setCookie(null,"accessToken", response.adminLogin.toString(), {
          maxAge: 3.154e10,
          httpOnly: false,
          sameSite: "none",
          secure: true,
          domain: `.vercel.app`,
          path: "/",
        });
      } else {
        setCookie(null,"accessToken", response.adminLogin.toString(), {
          maxAge: 3.154e10,
          httpOnly: false,
        });
        }
        router.replace("/");
      }

      setBtnLoading(false);
      return;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <section className=" bg-neutral-100 text-black min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="relative z-10 flex items-center gap-16 justify-center">
              <Image className="mb-4" src={logo1} alt="Logo" width={200} />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-black">
              Sign in to your account
            </h1>
            <div
              className="space-y-4 md:space-y-6">
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => {
                    setLogin((el) => ({
                      ...el,
                      email: e.target.value,
                    }));
                  }}
                  id="email"
                  className="input input-primary"
                  placeholder="Enter your Email Address"
                />
                {/* {toastd.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )} */}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    onChange={(e) => {
                      setLogin((el) => ({
                        ...el,
                        password: e.target.value,
                      }));
                    }}
                    className="input input-primary relative pr-8"
                    placeholder="Enter your Password"
                  />
                  {showPass ? (
                    <button
                      className="absolute top-0 right-3 bottom-0 h-full flex justify-center items-center"
                      onClick={() => {
                        setShowPass((prev) => !prev);
                      }}
                    >
                      <FaEye className="fill-neutral-400 z-50" />
                    </button>
                  ) : (
                    <button
                      className="absolute top-0 right-3 bottom-0 h-full flex justify-center items-center"
                      onClick={() => {
                        setShowPass((prev) => !prev);
                      }}
                    >
                      <FaEyeSlash className="fill-neutral-400 z-50" />
                    </button>
                  )}
                </div>
                {/* {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )} */}
              </div>

              <div className="flex justify-end mt-6">
                  <CButton
                    loading={btnLoading}
                    variant={ButtonType.Primary}
                    className="w-full"
                    onClick={handleLogin}
                  >
                    Sign In
                  </CButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.accessToken;

  if (!token) {
    return {
      props: {},
    };
  }

  try {
    const response = await sdk.Me(
      {},
      {
        cookie: context.req.headers.cookie?.toString() ?? "",
      }
    );

    if (response && response.me) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return {
      props: {},
    };
  }
};
