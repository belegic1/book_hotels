import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types'
import React from 'react'
import { IconType } from 'react-icons';
import tw from "tailwind-styled-components"
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
interface IListingInfo{
  user: SafeUser;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const Map = dynamic(() => import("../Map"), {
  ssr:false
})

const Wrapper = tw.div`col-span-4 flex flex-col gap-8`
const Container = tw.div`flex flex-col gap-2`
const Box = tw.div`text-hl font-semibold flex flex-row items-center gap-2`
const ListingInfo: React.FC<IListingInfo> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlg;

  return (
    <Wrapper>
      <Container>
        <Box>
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </Box>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </Container>
      <hr />
      {category && (
        <ListingCategory icon={category.icon} label={category.label} description={category.description} />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
        <Map center={coordinates} />
    </Wrapper>
  );
}

export default ListingInfo