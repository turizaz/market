/*
  Warnings:

  - You are about to drop the column `images` on the `assets` table. All the data in the column will be lost.
  - Added the required column `description` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" DROP COLUMN "images",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT[];
