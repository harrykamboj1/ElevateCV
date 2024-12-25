import { apiUrl, FailFlag } from "@/lib/constants";
import { SignInSchema, signInSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, data);
      console.log(response.data.errorCode);
      if (response.data.errorCode == FailFlag) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Toaster />

      <div className="min-h-screen bg-[#000000e8] grid grid-cols-1 lg:grid-cols-2 animate-fade-in ">
        <div className="h-full lg:flex flex-col items-center justify-center px-4 ">
          {/* <div className="text-center space-y-4 pt-16">
            <h1 className="font-openSans text-3xl text-[#2E2A47]">
              Welcome to <span className="font-semibold">Resume Buddy</span>
            </h1>
          </div> */}
          <p className="text-lg font-dmSans text-white ">
            Login to get back to your dashboard
          </p>

          <div className="border-2 p-8 mt-8  border-zinc-500  rounded-xl  shadow-xl      bg-customDarkGrey ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-600 font-dmSans font-semibold text-md">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="off"
                          className="w-72 font-dmSans border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                          placeholder="Enter your Email Address"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-600 font-dmSans font-semibold text-md">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="off"
                          className="w-72 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                          placeholder="Enter your Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-red-600  hover:bg-red-700 font-dmSans w-28"
                  type="submit"
                >
                  Sign In
                </Button>
                <p className="text-white font-dmSans text-sm">
                  New Here?{" "}
                  <span>
                    <Link
                      to={"/auth/sign-up"}
                      className="hover:text-red-600 hover:font-semibold"
                    >
                      Sign up
                    </Link>
                  </span>
                </p>
              </form>
            </Form>
          </div>
        </div>

        {/* Hero Section */}
        <div className="h-full bg-black flex flex-col items-center justify-center animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4 animate-fade-in-up">
            {/* <svg
              id="logo-86"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="ccustom"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.69181 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z"
                fill="#007DFC"
              ></path>
              <path
                className="ccustom"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5.16562e-07C10 1.31322 9.74135 2.61358 9.2388 3.82683C8.73625 5.04009 7.99966 6.14248 7.07107 7.07107C6.14249 7.99966 5.0401 8.73625 3.82684 9.2388C2.61358 9.74134 1.31322 10 5.4439e-06 10L5.00679e-06 20C2.62644 20 5.22716 19.4827 7.65368 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 -3.81469e-06L10 5.16562e-07Z"
                fill="#007DFC"
              ></path>
            </svg> */}
            <img src="/tufLogo.png" width={55} height={45} alt="logo" />
            <p className="text-white text-4xl font-dmSans font-semibold animate-fade-in">
              Resume Builder
            </p>
          </div>
          <p className="text-[#dee0e2] font-semibold text-xl text-center font-dmSans animate-fade-in-up">
            Get Hired Faster with AI-Enhanced Resumes Built to Impress!
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
