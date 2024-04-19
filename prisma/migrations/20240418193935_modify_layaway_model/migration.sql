/*
  Warnings:

  - You are about to drop the column `customerName` on the `layaway` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `layaway` table. All the data in the column will be lost.
  - Added the required column `downPayment` to the `Layaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item` to the `Layaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageCode` to the `Layaway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Layaway` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `layaway` DROP COLUMN `customerName`,
    DROP COLUMN `customerPhone`,
    ADD COLUMN `downPayment` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `item` VARCHAR(255) NOT NULL,
    ADD COLUMN `packageCode` VARCHAR(255) NOT NULL,
    ADD COLUMN `setReminder` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `value` DECIMAL(15, 2) NOT NULL,
    MODIFY `status` ENUM('OPEN', 'PAID', 'OVERDUE', 'CLOSE') NOT NULL DEFAULT 'OPEN';
