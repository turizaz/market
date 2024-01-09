/*
  Warnings:

  - You are about to drop the column `orderId` on the `assets` table. All the data in the column will be lost.
  - Added the required column `assetId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_orderId_fkey";

-- AlterTable
ALTER TABLE "assets" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "assetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
