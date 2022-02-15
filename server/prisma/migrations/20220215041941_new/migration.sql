/*
  Warnings:

  - The primary key for the `ChatUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `emailId` on the `ChatUser` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_emailId_fkey";

-- AlterTable
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_pkey",
ALTER COLUMN "emailId" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("emailId", "chatId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
