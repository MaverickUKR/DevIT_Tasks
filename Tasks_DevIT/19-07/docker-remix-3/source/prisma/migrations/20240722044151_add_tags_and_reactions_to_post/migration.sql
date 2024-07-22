/*
  Warnings:

  - Added the required column `reactions` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- Added the column reactions to the Post table
ALTER TABLE "Post" ADD COLUMN "reactions" JSON NOT NULL DEFAULT '{"likes": 0, "dislikes": 0}';

-- Added the column tags to the Post table
ALTER TABLE "Post" ADD COLUMN "tags" TEXT[] NOT NULL DEFAULT '{}';
