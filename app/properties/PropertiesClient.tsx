'use client';
import React, { useCallback, useState } from 'react';
import { SafeListing, SafeReservation, SafeUser } from '../types';
import Container from '../api/components/Container';
import Heading from '../api/components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../api/components/listings/ListingCard';
import { GridWrapper } from '../trips/TripsClient';

interface ITripsClient {
  listings: SafeListing[];
  currentUser: SafeUser;
}


const PropertiesClient: React.FC<ITripsClient> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted');
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId('');
      });
  }, []);
  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <GridWrapper>
        {listings.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            acctionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </GridWrapper>
    </Container>
  );
};

export default PropertiesClient;
