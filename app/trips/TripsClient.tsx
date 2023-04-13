"use client";
import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../api/components/Container';
import Heading from '../api/components/Heading';
import tw from "tailwind-styled-components"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../api/components/listings/ListingCard';

interface ITripsClient{
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

export const GridWrapper = tw.div`mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8`;

const TripsClient: React.FC<ITripsClient> = ({ reservations, currentUser }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback((id:string) => {
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation canceled")
        router.refresh();
        
      })
      .catch((error) => {
        console.error(error)
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
      setDeletingId("")
    })
  }, [])
  return (
    <Container>
      <Heading title='Trips' subtitle="Where have you'we been and where you're going" />
      <GridWrapper>
        {reservations.map(reservation => (
          <ListingCard key={reservation.id} data={reservation.listing} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} acctionLabel='Cancel Reservation' currentUser={currentUser} reservation={reservation} />
        ))}
      </GridWrapper>
    </Container>
  )
}

export default TripsClient