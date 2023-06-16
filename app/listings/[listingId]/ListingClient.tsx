"use client"
import Container from '@/app/api/components/Container'
import ListingHead from '@/app/api/components/listings/ListingHead'
import ListingInfo from '@/app/api/components/listings/ListingInfo'
import { categories } from '@/app/api/components/navbar/Categories'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import tw from "tailwind-styled-components";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingReservation from '@/app/api/components/listings/ListingReservation'
import { Range } from 'react-date-range'


interface IListingClient {
  listing: SafeListing & {
    user: SafeUser
  }
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null;
}
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection"
}

const ListingBody = tw.div`grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6`

const ReservationBox = tw.div`order-first mb-10 md:order-first md:col-span-3`
const ListingClient: React.FC<IListingClient> = ({
  listing, currentUser, reservations = []
}) => {


  const loginModal = useLoginModal();
  const router = useRouter()
  const desabledDates = useMemo(() => {
    let dates: Date[] = []
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
      dates = [...dates, ...range];
    })

    return dates;
  }, [reservations])

  console.log({reservations})

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);
    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId:listing?.id
    })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initialDateRange)
        router.push("/trips")
      }).catch((err) => {
      toast.error("domething went wrong")
      })
    .finally(() => setIsLoading(false))


  }, [currentUser, totalPrice, router, dateRange, loginModal, listing.id])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])


  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            locationValue={listing.locationValue}
            imageSrc={listing.imageSrc}
            id={listing.id}
            currentUser={currentUser}
          />
          <ListingBody>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <ReservationBox>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={desabledDates}
              />
            </ReservationBox>
          </ListingBody>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient