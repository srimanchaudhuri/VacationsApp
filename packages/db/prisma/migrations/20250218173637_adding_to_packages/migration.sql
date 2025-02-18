/*
  Warnings:

  - Added the required column `bookedTill` to the `Packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxStrength` to the `Packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Packages" ADD COLUMN     "bookedTill" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "maxStrength" INTEGER NOT NULL;
