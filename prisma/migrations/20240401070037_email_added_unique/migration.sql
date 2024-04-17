/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Secret` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Secret_email_key` ON `Secret`(`email`);
