"useClient";
import React from 'react'
import { IconType } from 'react-icons'


interface IListingCategory{
  icon: IconType;
  label: String;
  description: string;
}
const ListingCategory: React.FC<IListingCategory> = ({
  icon:Icon, label, description
}) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className='text-neutral-600' />
        <div className="flex flex-col">
          <div className="text0lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{ description}</div>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory