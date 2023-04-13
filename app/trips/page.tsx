import React from 'react'
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../api/components/ClientOnly';
import EmptyState from '../api/components/EmptyState';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='unauthorized' subtitle='Please login' />

      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  })
  if (reservations.length === 0) {
    return <ClientOnly>
      <EmptyState title="No trips found" subtitle='Looks you havernt reserved any trips' />
    </ClientOnly>
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
  return (
    <div></div>
  )
}

export default TripsPage;