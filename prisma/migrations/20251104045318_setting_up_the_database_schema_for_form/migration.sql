/*
  Warnings:

  - You are about to drop the `FieldResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FormFeildType" AS ENUM ('INPUT', 'TEXTAREA', 'BUTTON', 'RADIO', 'CHECKBOX', 'SELECT');

-- CreateEnum
CREATE TYPE "FormActionType" AS ENUM ('EMAIL', 'WEBHOOK', 'SAVE_TO_DB', 'CUSTOM_CODE');

-- DropForeignKey
ALTER TABLE "public"."FieldResponse" DROP CONSTRAINT "FieldResponse_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FieldResponse" DROP CONSTRAINT "FieldResponse_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Form" DROP CONSTRAINT "Form_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FormField" DROP CONSTRAINT "FormField_formId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FormSubmission" DROP CONSTRAINT "FormSubmission_formId_fkey";

-- DropTable
DROP TABLE "public"."FieldResponse";

-- DropTable
DROP TABLE "public"."Form";

-- DropTable
DROP TABLE "public"."FormField";

-- DropTable
DROP TABLE "public"."FormSubmission";

-- DropEnum
DROP TYPE "public"."FieldType";

-- CreateTable
CREATE TABLE "form" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_feild" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "feildType" "FormFeildType" NOT NULL,
    "formId" TEXT NOT NULL,
    "placeholder" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,

    CONSTRAINT "form_feild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormAction" (
    "id" TEXT NOT NULL,
    "type" "FormActionType" NOT NULL,
    "config" JSONB,
    "formId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "FormAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "form" ADD CONSTRAINT "form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_feild" ADD CONSTRAINT "form_feild_formId_fkey" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAction" ADD CONSTRAINT "FormAction_formId_fkey" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
