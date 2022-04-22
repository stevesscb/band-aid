/*
  Warnings:

  - A unique constraint covering the columns `[type,userId]` on the table `Instrument` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Instrument_type_userId_key" ON "Instrument"("type", "userId");
