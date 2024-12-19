-- AlterTable
ALTER TABLE "PersonalDetails" ALTER COLUMN "firstName" SET DEFAULT '',
ALTER COLUMN "lastName" SET DEFAULT '',
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "github" SET DEFAULT '',
ALTER COLUMN "portfolio" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Skills" ALTER COLUMN "languages" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "frameworks" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "developerTools" SET DEFAULT ARRAY[]::TEXT[];
