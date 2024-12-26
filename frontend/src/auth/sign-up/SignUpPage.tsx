import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SignUpSchema, signUpSchema } from "@/schema/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { apiUrl, FailFlag } from "@/lib/constants";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, data);
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
      <div>
        <Toaster />
      </div>
      <div className="min-h-screen bg-[#000000e8] grid grid-cols-1 lg:grid-cols-2 animate-fade-in">
        <div className="h-full lg:flex flex-col items-center justify-center px-4 ">
          {/* <div className="text-center space-y-4 pt-16">
            <h1 className="font-openSans text-3xl text-[#2E2A47]">
              Welcome to <span className="font-semibold">Resume Buddy</span>
            </h1>
          </div> */}
          <p className="text-lg font-dmSans text-white ">
            Create an account to get back to your dashboard
          </p>

          <div className="border-2 p-8 mt-8  border-zinc-500  rounded-xl  shadow-xl      bg-customDarkGrey ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-600 font-dmSans font-semibold text-md">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-72 font-dmSans border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                          autoComplete="off"
                          placeholder="Enter your Name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <div className="relative w-full">
                          <Input
                            type={showPassword ? "text" : "password"}
                            autoComplete="off"
                            className="w-72 border-zinc-500 bg-neutral-950 text-white text-lg  focus-visible:ring-transparent"
                            placeholder="Enter your Password"
                            {...field}
                          />

                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute inset-y-0 right-0 flex items-center px-3 bg-neutral-90 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff size={20} className="text-gray-500" />
                            ) : (
                              <Eye size={20} className="text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-red-600  hover:bg-red-700 font-dmSans w-28"
                  type="submit"
                >
                  Sign Up
                </Button>
                <p className="text-white font-dmSans text-sm">
                  Already Registered?{" "}
                  <span>
                    <Link
                      to={"/auth/sign-in"}
                      className="hover:text-red-600 hover:font-semibold"
                    >
                      Sign In
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
            <img src="/tufLogo.png" width={55} height={45} alt="logo" />
            <p className="text-white text-4xl font-dmSans font-semibold animate-fade-in">
              Resume Builder
            </p>
          </div>
          <p className="text-[#dee0e2] font-semibold text-xl text-center animate-fade-in-up">
            Get Hired Faster with AI-Enhanced Resumes Built to Impress!
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
