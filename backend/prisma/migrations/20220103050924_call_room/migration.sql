-- CreateTable
CREATE TABLE "CallRoom" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "offer" TEXT,
    "hostIceCandidates" TEXT[],
    "guestId" TEXT,
    "answer" TEXT,
    "guestIceCandidates" TEXT[],

    CONSTRAINT "CallRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CallRoom" ADD CONSTRAINT "CallRoom_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallRoom" ADD CONSTRAINT "CallRoom_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
