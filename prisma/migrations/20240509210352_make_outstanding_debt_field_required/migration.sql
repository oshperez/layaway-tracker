/*
  Warnings:

  - Made the column `outstandingDebt` on table `layaway` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `layaway` MODIFY `outstandingDebt` DOUBLE NOT NULL;
