/*
  Warnings:

  - You are about to drop the column `creator` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `codecreators` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "creator",
ADD COLUMN     "codecreators" VARCHAR(255) NOT NULL;
