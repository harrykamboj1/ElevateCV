import { motion } from "framer-motion";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  flex flex-col">
      {/* Header Section */}

      <Header />

      {/* Hero Section */}
      <section className="h-full flex items-center justify-center p-10 bg-[#0f0f0f]">
        <motion.div
          className="text-center  max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold font-dmSans text-red-600 mb-6">
            Elevate Your Resume with TUF+ Resume Builder
          </h1>
          <p className="text-md text-white  mb-6">
            Resume Builder simplifies the process by offering a fully
            customizable platform. Drag and drop, reorder sections, creating,
            updating, and sharing your resume.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              className="flex items-center gap-x-2 font-dmSans  border rounded-lg px-8 py-3 border-red-600 hover:border-2 hover:bg-red-600"
              onClick={() => navigate("/dashboard")}
            >
              Create Resume
            </Button>
            <Button
              className="flex items-center font-dmSans   rounded-lg px-10 py-2.5 border-2 border-red-600 bg-red-600"
              onClick={() => navigate("/")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-[#0f0f0f] py-10">
        <motion.div
          className="container mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className="text-3xl font-dmSans font-semibold text-white mb-6 pt-5">
            Why Choose Resume Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 py-2">
            {[
              "Drag-and-Drop Interface",
              "Real-Time Preview",
              "Save and Edit Anytime",
            ].map((feature, index) => (
              <div
                key={index}
                className=" flex font-dmSans flex-col h-52  p-6 border-2 rounded-md relative  hover:scale-105 shadow-lg  border-red-600  cursor-pointer items-center justify-center bg-customDarkGrey transition-transform  space-y-0"
              >
                <h3 className="text-2xl font-bold text-red-600 mb-3">
                  {feature}
                </h3>
                <p className="text-white">
                  {index === 0 &&
                    "Customize the order of sections like experience, skills, and education with ease."}
                  {index === 1 &&
                    "View your resume updates instantly as you make changes."}
                  {index === 2 &&
                    "Save your progress and return to edit or download at your convenience."}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        className="bg-[#0f0f0f] text-white py-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container flex flex-col items-center justify-center font-dmSans mx-auto text-center">
          <h2 className="text-3xl  font-bold mb-4">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="mb-6 text-gray-200">
            Join thousands of professionals who have created their resumes with
            Resume Builder.
          </p>
          <Button
            className="flex  items-center font-dmSans   rounded-lg px-10 py-3 border-2 border-red-600 bg-red-600"
            onClick={() => navigate("/auth/sign-in")}
          >
            Get Started Now
          </Button>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-[#0f0f0f] text-white py-6">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm">
            &copy; 2024 Resume Builder. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;
