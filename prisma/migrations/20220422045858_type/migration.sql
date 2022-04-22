/*
  Warnings:

  - The values [LEADGUITAR,RYTHMGUITAR,ACOUSTICGUITAR] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('LEAD_GUITAR', 'RYTHM_GUITAR', 'ACOUSTIC_GUITAR', 'DRUMS', 'BASS', 'VOCALS', 'KEYBOARD');
ALTER TABLE "Instrument" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Instrument" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
ALTER TABLE "Instrument" ALTER COLUMN "type" SET DEFAULT 'VOCALS';
COMMIT;
