"use client";
import { useRouter } from 'next/navigation';
import Container from '../api/components/Container';
import Heading from '../api/components/Heading';
import { SafeReservation, SafeUser } from '../types'
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { GridWrapper } from '../trips/TripsClient';
import ListingCard from '../api/components/listings/ListingCard';

interface IReservationsClient{
  currentUser: SafeUser;
  reservations: SafeReservation[]
}
const ReservationsClient: React.FC<IReservationsClient> = ({
  currentUser,
  reservations
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation canceled");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setDeletingId("");

    })
  }, [router])


  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <GridWrapper>
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            acctionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </GridWrapper>
    </Container>
  )
}

export default ReservationsClient