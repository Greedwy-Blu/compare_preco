-- CreateTable
CREATE TABLE "token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "password" TEXT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "PrecoProdutos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeProduto" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "promocao" TEXT NOT NULL,
    "tipoProduto" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PrecoProdutos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
