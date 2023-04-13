import { Reservation } from '@prisma/client';
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from '@/app/actions/getCurrentUser';
import next from 'next/types';

interface IParams{
  reservationId?: string;
}

export async function DELETE(request: Request,{params}: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const {reservationId} = params;
    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid id")
    }
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          {listing: {userId: currentUser.id}}
        ]
      }
    })

    return NextResponse.json(reservation);
  } catch (error: any) {

  }
}