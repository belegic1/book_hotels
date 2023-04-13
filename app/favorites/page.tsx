import React from 'react'
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../api/components/ClientOnly';
import EmptyState from '../api/components/EmptyState';
import getReservations from '../actions/getReservations';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoriteClient from './FavoriteClient';

const FavoritePage = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
     return (
       <ClientOnly>
         <EmptyState title="Unauthorized" subtitle="Please Login" />
       </ClientOnly>
     );
  }
  const listings = await getFavoriteListings()

  return (
    <ClientOnly>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritePage;




// const ReservationsPage = async () => {
 
//   const reservations = await getReservations({
//     authorId: currentUser.id,
//   });
//   if (reservations.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState
//           title="No reservations found"
//           subtitle="Looks like you have no reservations on your propertis"
//         />
//       </ClientOnly>
//     );
//   }
//   return (
//     <ClientOnly>
//       <div>Hello</div>
//     </ClientOnly>
//   );
// };

// export default ReservationsPage;
