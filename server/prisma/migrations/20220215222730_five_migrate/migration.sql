/*
  Warnings:

  - You are about to drop the column `codecreators` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `ChatUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_emailId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_creatorId_fkey";

-- DropIndex
DROP INDEX "Chat_codecreators_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "codecreators",
ADD COLUMN     "members" TEXT[];

-- DropTable
DROP TABLE "ChatUser";
