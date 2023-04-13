"use client";
import React from 'react'
import { Range } from "react-date-range";
import tw from "tailwind-styled-components"
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface IListingReservation{
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}


const Wrapper = tw.div`bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden`
const Container = tw.div`flex flex-row items-center gap-1 p-4`
const Price = tw.div`text-2xl font-semibold`
const ListingReservation:React.FC<IListingReservation> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  return (
    <Wrapper>
      <Container>
        <Price>$ {price}</Price>
        <div className="font-light text-neutral">per night</div>
      </Container>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button
          disabled={disabled}
          label="Reserve"
          onClick={onSubmit}
        /></div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total Price </div>
        <div>${totalPrice}</div>
      </div>
    </Wrapper>
  );
}

export default ListingReservation