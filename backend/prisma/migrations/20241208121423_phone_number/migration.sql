/*
  Warnings:

  - You are about to drop the column `seqNum` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `seqNum` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `PersonalDetails` table. All the data in the column will be lost.
  - Added the required column `id` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "seqNum",
ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "seqNum",
ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalDetails" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "id" TEXT NOT NULL;
