-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bankAccount" TEXT,
ADD COLUMN     "isSeller" BOOLEAN NOT NULL DEFAULT false;
