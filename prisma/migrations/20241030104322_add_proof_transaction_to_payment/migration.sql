/*
  Warnings:

  - Added the required column `bank` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_proof` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "bank" TEXT NOT NULL,
ADD COLUMN     "transaction_proof" TEXT NOT NULL;
