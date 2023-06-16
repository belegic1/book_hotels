"use client";
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation';
import { DateRange, Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import qs from "query-string";
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import tw from 'tailwind-styled-components';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
  LOCATION = 0,
  DATE =  1,
  INFO = 2
}

const BodyWrapper = tw.div`flex flex-col gap-8`;

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()
  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  })
    const Map = useMemo(
      () =>
        dynamic(() => import('../Map'), {
          ssr: false,
        }),
      [location]
    );
  const onBack = useCallback(() => {
    setStep(val => val -1)
  }, [])
  const onNext = useCallback(() => {
    setStep(val => val  + 1)
  }, [])
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
      
    }

    const updatedQuery: any = {
      ...currentQuery,
      guestCount,
      roomCount,
      bathroomCount,
      location: location ? location[0].value : undefined,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url)
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params
  ]);
  const actionlabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search"
    return "Next"
  }, [step])
  const secondaryActionlabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return "Back"
  }, [step])


  let bodyContent = (
    <BodyWrapper>
      <Heading title="Where you wanna go" subtitle="" />
      <CountrySelect
        value={location}
        onChange={(value) => {
          setLocation(value as CountrySelectValue);
        }}
      />
      <hr />
      <Map center={location?.[0]?.latlg} />
    </BodyWrapper>
  );
  if (step === STEPS.DATE) {
    bodyContent = (
      <BodyWrapper>
        <Heading title="When do plan to go" subtitle="Make sure everyone is free" />
        <Calendar value={dateRange} onChange = {val => setDateRange(val.selection)} />
      </BodyWrapper>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <BodyWrapper>
        <Heading title="More information" subtitle="Find perfect place for you" />
        <Counter title="Guests" subtitle="How many guests are coming" value={guestCount} onChange={val => setGuestCount(val)}  />
        <Counter title="Rooms" subtitle="How many rooms you need" value={roomCount} onChange={val => setRoomCount(val)}  />
        <Counter title="Bathrooms" subtitle="How many bathrooms" value={bathroomCount} onChange={val => setBathroomCount(val)}  />
      </BodyWrapper>
    )
  }
  return (
    <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit}
      title="Filtres"
      actionLabel={actionlabel}
      body={bodyContent}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionlabel}
    />
  )
}

export default SearchModal