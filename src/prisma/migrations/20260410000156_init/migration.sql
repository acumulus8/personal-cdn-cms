/*
  Warnings:

  - Added the required column `pageId` to the `MobileApp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MobileApp` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Section` ADD COLUMN `name` VARCHAR(191) NULL,
    MODIFY `type` ENUM('HERO', 'BACKGROUND_IMAGE', 'BACKGROUND_VIDEO', 'IMG_1_3_TXT_2_3', 'TXT_2_3_IMG_1_3', 'LIST', 'LIST_ITEM', 'GRID', 'GRID_ITEM', 'GALLERY', 'GALLERY_ITEM', 'BANNER', 'CONTACT', 'CTA', 'TESTIMONIAL', 'OTHER') NOT NULL;

-- AddForeignKey
ALTER TABLE `MobileApp` ADD CONSTRAINT `MobileApp_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
