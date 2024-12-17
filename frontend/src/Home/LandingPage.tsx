import React from "react";
import { motion } from "framer-motion";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md p-5 sticky top-0 z-50">
        <motion.div
          className="container mx-auto flex justify-between items-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600">Resume Buddy</h1>
          <nav>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
              Get Started
            </button>
          </nav>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center p-10">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
            Your All-in-One Resume Builder
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Resume Buddy simplifies the resume-building process by offering a
            fully customizable platform. Drag and drop, reorder sections, and
            preview your professional resume in real time!
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Create Resume
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-gray-200 text-blue-600 rounded-lg hover:bg-gray-300 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-10">
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
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Why Choose Resume Buddy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Drag-and-Drop Interface",
              "Real-Time Preview",
              "Save and Edit Anytime",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-blue-50 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  {feature}
                </h3>
                <p className="text-gray-600">
                  {index === 0 &&
                    "Customize the order of sections like experience, skills, and education with ease."}
                  {index === 1 &&
                    "View your resume updates instantly as you make changes."}
                  {index === 2 &&
                    "Save your progress and return to edit or download at your convenience."}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="mb-6 text-gray-200">
            Join thousands of professionals who have created their resumes with
            Resume Buddy.
          </p>
          <motion.button
            className="px-8 py-3 bg-white text-blue-700 rounded-lg hover:bg-gray-200"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-white py-6">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm">
            &copy; 2024 Resume Buddy. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;
