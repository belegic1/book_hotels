import React from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../api/components/Container'
import Heading from '../api/components/Heading'
import { GridWrapper } from '../trips/TripsClient'
import ListingCard from '../api/components/listings/ListingCard'

interface IFavoriteClient {
  listings: SafeListing[]
  currentUser: SafeUser
}
const FavoriteClient: React.FC<IFavoriteClient> = ({
  listings, currentUser
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited" />
      <GridWrapper>
        {listings.map(listing => (
          <ListingCard key={listing.id} currentUser={currentUser} data={listing} />
        ))}
      </GridWrapper>
    </Container>
  )
}

export default FavoriteClient