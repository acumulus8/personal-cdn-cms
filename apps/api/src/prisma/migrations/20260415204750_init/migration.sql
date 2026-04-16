/*
  Warnings:

  - You are about to drop the column `pageId` on the `MobileApp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `MobileApp` DROP FOREIGN KEY `MobileApp_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `Page` DROP FOREIGN KEY `Page_siteId_fkey`;

-- DropIndex
DROP INDEX `MobileApp_pageId_fkey` ON `MobileApp`;

-- DropIndex
DROP INDEX `Page_siteId_fkey` ON `Page`;

-- AlterTable
ALTER TABLE `MobileApp` DROP COLUMN `pageId`;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `mobileAppId` INTEGER NULL,
    MODIFY `siteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_mobileAppId_fkey` FOREIGN KEY (`mobileAppId`) REFERENCES `MobileApp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
