/*
  Warnings:

  - You are about to drop the `_AssetsToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AssetsToCategory" DROP CONSTRAINT "_AssetsToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssetsToCategory" DROP CONSTRAINT "_AssetsToCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_sessionId_fkey";

-- DropTable
DROP TABLE "_AssetsToCategory";

-- CreateTable
CREATE TABLE "_AssetToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssetToCategory_AB_unique" ON "_AssetToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetToCategory_B_index" ON "_AssetToCategory"("B");

-- AddForeignKey
ALTER TABLE "_AssetToCategory" ADD CONSTRAINT "_AssetToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetToCategory" ADD CONSTRAINT "_AssetToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
