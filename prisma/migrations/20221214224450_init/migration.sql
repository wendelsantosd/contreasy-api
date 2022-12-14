-- CreateEnum
CREATE TYPE "enum_access_level" AS ENUM ('normal', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "phone" VARCHAR(20),
    "access_level" "enum_access_level" NOT NULL DEFAULT 'normal',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
