-- CreateTable
CREATE TABLE "Church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "welcome_message" TEXT,
    "churchAddressId" TEXT NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchAddress" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,

    CONSTRAINT "ChurchAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_churchAddressId_fkey" FOREIGN KEY ("churchAddressId") REFERENCES "ChurchAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
