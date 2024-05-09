/*
  Warnings:

  - You are about to alter the column `downPayment` on the `layaway` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Double`.
  - You are about to alter the column `value` on the `layaway` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Double`.
  - You are about to alter the column `amount` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `layaway` MODIFY `downPayment` DOUBLE NOT NULL,
    MODIFY `value` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `amount` DOUBLE NOT NULL;
