/*
  Warnings:

  - Added the required column `creator` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "creator" VARCHAR(255) NOT NULL;
