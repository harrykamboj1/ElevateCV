-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalDetails" DROP CONSTRAINT "PersonalDetails_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_userId_fkey";

-- DropForeignKey
ALTER TABLE "SectionOrder" DROP CONSTRAINT "SectionOrder_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_resumeResumeId_fkey";

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("resumeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionOrder" ADD CONSTRAINT "SectionOrder_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE CASCADE ON UPDATE CASCADE;
