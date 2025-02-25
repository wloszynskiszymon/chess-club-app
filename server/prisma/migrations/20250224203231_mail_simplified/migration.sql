/*
  Warnings:

  - You are about to drop the column `threadId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_threadId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "threadId";
