/*
  Warnings:

  - The primary key for the `PersonalDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SectionOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[resumeId]` on the table `PersonalDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resumeResumeId]` on the table `SectionOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resumeResumeId]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `PersonalDetails` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `SectionOrder` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Skills` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "PersonalDetails" DROP CONSTRAINT "PersonalDetails_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SectionOrder" DROP CONSTRAINT "SectionOrder_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SectionOrder_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Skills_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_resumeId_key" ON "PersonalDetails"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionOrder_resumeResumeId_key" ON "SectionOrder"("resumeResumeId");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_resumeResumeId_key" ON "Skills"("resumeResumeId");
