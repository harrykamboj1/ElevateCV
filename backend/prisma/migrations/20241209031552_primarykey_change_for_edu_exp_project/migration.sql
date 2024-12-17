/*
  Warnings:

  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Projects` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
ALTER COLUMN "isPresent" SET DATA TYPE TEXT,
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_pkey",
ADD CONSTRAINT "Projects_pkey" PRIMARY KEY ("id");
