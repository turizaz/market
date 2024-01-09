/*
  Warnings:

  - Added the required column `file` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "file" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[];
