/*
  Warnings:

  - A unique constraint covering the columns `[file]` on the table `assets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "assets_file_key" ON "assets"("file");
