import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import ClientOnly from './api/components/ClientOnly'
import Container from './api/components/Container'
import tw from 'tailwind-styled-components';
import { FieldNamesMarkedBoolean } from 'react-hook-form'
import EmptyState from './api/components/EmptyState'
import getListings from './actions/getListings'
import ListingCard from './api/components/listings/ListingCard'
import getCurrentUser from './actions/getCurrentUser'

const GridContainer = tw.div`pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8`

export default async function Home() {
  const isEmpty: boolean = true;
  const listings = await getListings();
  const currentUser = await getCurrentUser()
  
  if (listings.length === 0) {
    return <ClientOnly>
      <EmptyState showReset />
    </ClientOnly>
  }
  return (
    <ClientOnly>
      <Container>
        <GridContainer>
         {listings.map((listing: any, idx:number) => {
            return <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
          })}
        </GridContainer>
      </Container>
   </ClientOnly>
  )
}
