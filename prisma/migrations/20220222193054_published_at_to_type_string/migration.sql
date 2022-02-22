-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "published_at" DROP DEFAULT,
ALTER COLUMN "published_at" SET DATA TYPE TEXT;
