/*
  Warnings:

  - You are about to drop the column `assetId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_assetId_fkey";

-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "orderId" INTEGER;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "assetId";

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
