/*
  Warnings:

  - A unique constraint covering the columns `[codecreators]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_codecreators_key" ON "Chat"("codecreators");
