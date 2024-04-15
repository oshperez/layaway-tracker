-- AlterTable
ALTER TABLE `layaway` ADD COLUMN `customerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Layaway` ADD CONSTRAINT `Layaway_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
