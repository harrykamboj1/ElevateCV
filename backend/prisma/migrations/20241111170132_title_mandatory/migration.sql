/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resume_title_key" ON "Resume"("title");
