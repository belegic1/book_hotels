"use client";
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '../htmlcomponents/ModalContainer';
import CountrySelect from '../inputs/CountrySelect';
import { BodyStepsBox, BodyStepsContainer } from './Modal.style';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}
const RentModal = () => {
  const rentModal = useRentModal()
  const router = useRouter()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset

  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: '',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: ""
    }
  })
  const category = watch("category")
  const location = watch("location")
  let guestCount = watch("guestCount")
  let roomCount = watch("roomCount")
  let bathroomCount = watch("bathroomCount")
  let imageSrc = watch("imageSrc")

  const Map = useMemo(() => dynamic(() => import("../Map"), {
    ssr: false
  } ),[location])
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }
  const onBack = () => {
    setStep(value => value - 1);
  }
  const onNext = () => {
    setStep(value => value + 1);
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();
    setIsLoading(true);

    axios.post("/api/listings", data)
      .then(() => {
        toast.success("Listing Creater!")
        router.push("/");
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose();
      })
      .catch((err) => {
        toast.error('Something went wrong');
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create"
    }
    return "Next"
  }, [step])
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step])
  let bodyContent = (
    <BodyStepsContainer>
      <Heading title='which of these best describes your place?' subtitle='Pick a category' />
      <BodyStepsBox>
        {categories.map(item => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              label={item.label}
              onClick={(category) => {setCustomValue("category" ,category) }}
              icon={item.icon}
              selected={category === item.label}
            />
          </div>
        ))}
      </BodyStepsBox>
     
    </BodyStepsContainer>
  )
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <BodyStepsContainer>
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.[0]?.latlg} />
      </BodyStepsContainer>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <BodyStepsContainer>
        <Heading title='Share some basics about your place.' subtitle='What amenities do you have?' />
        <Counter onChange={(value) => setCustomValue("guestCount", value)} value={guestCount} title="Guests" subtitle='How many guests do you allow?' />
        <hr />
        <Counter onChange={(value) => setCustomValue("roomCount", value)} value={roomCount} title="Rooms" subtitle='How many rooms do you have' />
        <hr />
        <Counter onChange={(value) => setCustomValue("bathroomCount", value)} value={bathroomCount} title="Bathrooms" subtitle='How many bathrooms do you have?' />
        <hr />
      </BodyStepsContainer>
    )
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <BodyStepsContainer>
        <Heading title='Add a photo of your place' subtitle='Show guests what your place looks like!' />
        <ImageUpload value={imageSrc}  onChange={(value) => setCustomValue("imageSrc",value)}/>
      </BodyStepsContainer>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <BodyStepsContainer>
        <Heading title='How would you describe your place?' subtitle='Short and sweet works best!' />
        <Input id='title' label="Title" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id='description' label="Description" disabled={isLoading} register={register} errors={errors} required />
      </BodyStepsContainer>
    )
    
  }

  if(step === STEPS.PRICE){
    bodyContent = (
      <BodyStepsContainer>
        <Heading title='Now, set your price' subtitle='How much do you charge per night?' />
        <Input id='price' label='price' formatPrice={true} type='number' disabled={isLoading} register={register} errors={errors} required />
      </BodyStepsContainer>
    )
  }


  return (
    <Modal
      title="Rent your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />

  )
}

export default RentModal