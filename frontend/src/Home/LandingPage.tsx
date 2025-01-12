import { motion } from 'framer-motion';
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrapper } from "@/components/custom/Wrapper";
import { ArrowRight } from "lucide-react";

export const LandingPage = () => {
  return (
    <>
      <Wrapper>
        <div className="sticky top-2 mt-4 z-50  justify-between flex shadow-md bg-backgroundColor">
          <a href="/" className="flex items-center gap-x-4 hover:cursor-pointer">
            <h1 className="text-2xl font-semibold font-dmSans text-white  leading-none mb-4 mt-3">
              100x Resume Buddy
            </h1>
          </a>

          <Link
            className={buttonVariants({
              size: 'lg',
              className: ' bg-blue-600 text-white text-lg hover:bg-blue-700 rounded-3xl shadow-md font-dmSans',
            })}
            to='/dashboard'
            target='_blank'>

            Go to Dashboard

          </Link>
        </div>
      </Wrapper>
      <Wrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center ">

        <motion.div initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0., ease: 'easeInOut' } }}
          exit={{ opacity: 0, y: -10 }}
          className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-200 hover:bg-white/70 pointer-events-none'>
          <p className='text-sm font-semibold font-dmSans text-black'>
            100x Resume Buddy is now public!
          </p>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.5, ease: 'easeInOut' } }}
          exit={{ opacity: 0, y: -30 }}
          className='max-w-4xl text-white text-5xl font-bold md:text-6xl lg:text-7xl pointer-events-none'>
          Elevate Your Resume with{' '}
          <span className='text-blue-600'>100x Resume Buddy.</span>{' '}

        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.9, ease: 'easeInOut' } }}
          exit={{ opacity: 0, y: -30 }}
          className='mt-5 max-w-prose text-zinc-400 sm:text-lg pointer-events-none'>
          Resume Buddy simplifies the process by offering a fully
          customizable platform. Drag and drop, reorder sections, creating,
          updating, and sharing and chatting with your resume.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 1.2, ease: 'easeInOut' } }}
          exit={{ opacity: 0, y: -30 }}>
          <Link
            className={buttonVariants({
              size: 'lg',
              className: 'mt-10 bg-blue-600 text-white text-lg hover:bg-blue-700 rounded-3xl shadow-md font-dmSans',
            })}
            to='/dashboard'
            target='_blank'>

            Get started
            <ArrowRight className='ml-1 h-5 w-5' />
          </Link>
        </motion.div>
      </Wrapper>

      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none  absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563eb] to-[#2563eb] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>


      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 1.2, ease: 'easeInOut' } }}
        exit={{ opacity: 0, y: -30 }}
        className='mx-auto max-w-6xl px-6 lg:px-8'>
        <div className='mt-16 flow-root sm:mt-24'>
          <div className='-m-2 rounded-xl bg-gray-800 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <img
              src='/front.png'
              alt='product preview'
              width={1364}
              height={866}
              style={{ aspectRatio: '1364/866', borderRadius: '1.2rem' }}
              className='rounded-lg bg-white p-2 sm:p-8 md:p-16 shadow-2xl ring-1 ring-gray-900/10'
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LandingPage;
