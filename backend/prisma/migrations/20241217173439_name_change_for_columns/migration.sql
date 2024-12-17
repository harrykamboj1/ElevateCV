/*
  Warnings:

  - You are about to drop the column `Degree` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `GraduationYear` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `institutionName` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `positionTitle` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `linkedIn` on the `PersonalDetails` table. All the data in the column will be lost.
  - You are about to drop the column `projectTitle` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "Degree",
DROP COLUMN "GraduationYear",
DROP COLUMN "Location",
DROP COLUMN "institutionName",
ADD COLUMN     "degree" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "graduationYear" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "institution" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "companyName",
DROP COLUMN "positionTitle",
ADD COLUMN     "company" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "position" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "location" SET DEFAULT '',
ALTER COLUMN "startDate" SET DEFAULT '',
ALTER COLUMN "endDate" SET DEFAULT '',
ALTER COLUMN "isPresent" SET DEFAULT '',
ALTER COLUMN "responsibilities" SET DEFAULT '';

-- AlterTable
ALTER TABLE "PersonalDetails" DROP COLUMN "linkedIn",
ADD COLUMN     "linkedin" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "projectTitle",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "techStack" SET DEFAULT '',
ALTER COLUMN "startDate" SET DEFAULT '',
ALTER COLUMN "endDate" SET DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '';
