-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "validatorsId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Validators" (
    "id" TEXT NOT NULL,
    "researchInstitute" TEXT,
    "researchField" TEXT,
    "instituteAddress" TEXT,
    "lastOnline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Validators_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_validatorsId_fkey" FOREIGN KEY ("validatorsId") REFERENCES "Validators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
