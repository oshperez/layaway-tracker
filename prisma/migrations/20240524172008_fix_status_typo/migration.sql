/*
  Warnings:

  - The values [CLOSE] on the enum `Layaway_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `layaway` MODIFY `status` ENUM('OPEN', 'PAID', 'OVERDUE', 'CLOSED') NOT NULL DEFAULT 'OPEN';
