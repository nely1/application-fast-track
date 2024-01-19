/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `Posting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "lastPostingUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Posting" DROP COLUMN "lastUpdated";
