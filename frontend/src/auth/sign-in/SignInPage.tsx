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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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

      <div className="min-h-screen bg-backgroundColor flex flex-col justify-center items-center animate-fade-in ">

        <div className="h-full bg-backgroundColor flex flex-col items-center justify-center animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4 animate-fade-in-up">

            <a
              href="/"
              className="hover:cursor-pointer flex gap-x-3 items-center"
            >
              {/* <img src="/tufLogo.png" width={55} height={45} alt="logo" /> */}
              <p className="text-white text-5xl font-dmSans font-semibold animate-fade-in">
                <span className='text-blue-600'>100x Resume Buddy</span>
              </p>
            </a>
          </div>
          {/* <p className="text-white font-semibold text-xl text-center font-dmSans animate-fade-in-up">
            Get Hired Faster with AI-Enhanced Resumes Built to Impress!
          </p> */}
        </div>


        <div className="h-full lg:flex flex-col items-center justify-center px-4 ">

          <p className="text-xl font-dmSans text-white ">
            Login to get back to your dashboard
          </p>

          <div className="border-2 p-12  mt-8  border-zinc-300  rounded-xl  shadow-xl      bg-customDarkBlue ">
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
                      <FormLabel className="text-blue-600 font-dmSans font-semibold text-md">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="off"
                          className="w-72 font-dmSans border-zinc-100 bg-backgroundColor text-white text-lg  focus-visible:ring-transparent"
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
                      <FormLabel className="text-blue-600 font-dmSans font-semibold text-md">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={showPassword ? "text" : "password"}
                            autoComplete="off"
                            className="w-72 border-zinc-100 bg-backgroundColor text-white text-lg  focus-visible:ring-transparent"
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
                              <EyeOff size={20} className="text-gray-100" />
                            ) : (
                              <Eye size={20} className="text-gray-100" />
                            )}
                          </Button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-blue-600  hover:bg-blue-700 font-dmSans w-28"
                  type="submit"
                >
                  Sign In
                </Button>
                <p className="text-white font-dmSans text-sm">
                  New Here?{" "}
                  <span>
                    <Link
                      to={"/auth/sign-up"}
                      className="hover:text-blue-600 hover:font-semibold"
                    >
                      Sign up
                    </Link>
                  </span>
                </p>
              </form>
            </Form>
          </div>
        </div>



      </div>

    </>
  );
};

export default SignInPage;
