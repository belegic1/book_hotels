import getCurrentUser from '@/app/actions/getCurrentUser';
import gertListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/api/components/ClientOnly';
import EmptyState from '@/app/api/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams{
  listingId: string;
}
const Listingpage = async ({params}: {params: IParams}) => {
  const listing = await gertListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params);
  if (!listing) {
    return <ClientOnly>
      <EmptyState />
    </ClientOnly>
  }
  return (
    <ClientOnly>
      <ListingClient reservations={reservations} listing={listing} currentUser={currentUser }/>
    </ClientOnly>
  )
}

export default Listingpage