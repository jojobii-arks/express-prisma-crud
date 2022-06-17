/*
  Warnings:

  - You are about to drop the column `createdat` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `todos` table. All the data in the column will be lost.
  - Added the required column `todo` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "createdat",
DROP COLUMN "email",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "todo" TEXT NOT NULL;
