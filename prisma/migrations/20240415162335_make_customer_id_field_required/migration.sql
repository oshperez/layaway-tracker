/*
  Warnings:

  - Made the column `customerId` on table `layaway` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `layaway` DROP FOREIGN KEY `Layaway_customerId_fkey`;

-- AlterTable
ALTER TABLE `layaway` MODIFY `customerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Layaway` ADD CONSTRAINT `Layaway_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
