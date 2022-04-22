/*
  Warnings:

  - The `type` column on the `Instrument` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Instrument" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT E'Vocals';

-- DropEnum
DROP TYPE "Type";
