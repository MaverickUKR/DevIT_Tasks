BEGIN;

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reactions" (
    "id" SERIAL NOT NULL,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Reactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reactions_postId_key" ON "Reactions"("postId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "reactions";

-- DropColumns
ALTER TABLE "User" DROP COLUMN "address", DROP COLUMN "name";

-- AddColumns with default values for existing rows
ALTER TABLE "User" 
    ADD COLUMN "firstName" TEXT NOT NULL DEFAULT '',
    ADD COLUMN "lastName" TEXT NOT NULL DEFAULT '',
    ALTER COLUMN "age" SET NOT NULL,
    ALTER COLUMN "image" SET NOT NULL;

-- Remove default values after migration
ALTER TABLE "User" 
    ALTER COLUMN "firstName" DROP DEFAULT,
    ALTER COLUMN "lastName" DROP DEFAULT;

COMMIT;
