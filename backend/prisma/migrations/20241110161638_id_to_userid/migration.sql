/*
  Warnings:

  - You are about to drop the column `id` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_id_fkey";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
