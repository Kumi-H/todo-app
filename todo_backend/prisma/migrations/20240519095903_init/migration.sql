-- CreateTable
CREATE TABLE "todolists" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "date" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todolists_pkey" PRIMARY KEY ("id")
);
