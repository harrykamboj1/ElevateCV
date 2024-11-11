-- CreateTable
CREATE TABLE "Resume" (
    "resumeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("resumeId")
);

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
