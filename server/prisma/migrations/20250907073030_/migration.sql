/*
  Warnings:

  - Added the required column `inputImageId` to the `GeneratedImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."GeneratedImage" ADD COLUMN     "followUpRequirement" TEXT,
ADD COLUMN     "inputImageId" TEXT NOT NULL,
ADD COLUMN     "isChildImage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentImageId" TEXT;

-- CreateTable
CREATE TABLE "public"."InputImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "instructions" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InputImage_id_key" ON "public"."InputImage"("id");

-- AddForeignKey
ALTER TABLE "public"."InputImage" ADD CONSTRAINT "InputImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GeneratedImage" ADD CONSTRAINT "GeneratedImage_inputImageId_fkey" FOREIGN KEY ("inputImageId") REFERENCES "public"."InputImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GeneratedImage" ADD CONSTRAINT "GeneratedImage_parentImageId_fkey" FOREIGN KEY ("parentImageId") REFERENCES "public"."GeneratedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
