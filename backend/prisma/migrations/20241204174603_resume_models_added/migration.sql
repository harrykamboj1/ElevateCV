-- CreateTable
CREATE TABLE "PersonalDetails" (
    "resumeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "portfolio" TEXT NOT NULL,
    "linkedIn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY ("resumeId")
);

-- CreateTable
CREATE TABLE "Experience" (
    "resumeResumeId" TEXT NOT NULL,
    "positionTitle" TEXT NOT NULL,
    "seqNum" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "isPresent" BOOLEAN NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("resumeResumeId")
);

-- CreateTable
CREATE TABLE "Education" (
    "resumeResumeId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "seqNum" TEXT NOT NULL,
    "Degree" TEXT NOT NULL,
    "GraduationYear" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("resumeResumeId")
);

-- CreateTable
CREATE TABLE "Skills" (
    "resumeResumeId" TEXT NOT NULL,
    "languages" TEXT[],
    "frameworks" TEXT[],
    "developerTools" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("resumeResumeId")
);

-- CreateTable
CREATE TABLE "Projects" (
    "resumeResumeId" TEXT NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("resumeResumeId")
);

-- CreateTable
CREATE TABLE "SectionOrder" (
    "resumeResumeId" TEXT NOT NULL,
    "order" TEXT[],

    CONSTRAINT "SectionOrder_pkey" PRIMARY KEY ("resumeResumeId")
);

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("resumeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionOrder" ADD CONSTRAINT "SectionOrder_resumeResumeId_fkey" FOREIGN KEY ("resumeResumeId") REFERENCES "Resume"("resumeId") ON DELETE RESTRICT ON UPDATE CASCADE;
