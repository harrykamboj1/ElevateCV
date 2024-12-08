/*
  Warnings:

  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalDetails" DROP CONSTRAINT "PersonalDetails_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "SectionOrder" DROP CONSTRAINT "SectionOrder_resumeResumeId_fkey";

-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_resumeResumeId_fkey";

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "education" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "experience" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "personalDetails" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "projects" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "sectionsOrder" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "skills" JSONB NOT NULL DEFAULT '{}';

-- DropTable
DROP TABLE "Education";

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "PersonalDetails";

-- DropTable
DROP TABLE "Projects";

-- DropTable
DROP TABLE "SectionOrder";

-- DropTable
DROP TABLE "Skills";
