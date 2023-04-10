"use client";
import { useRouter } from 'next/navigation';
import tw from "tailwind-styled-components";
import Heading from './Heading';
import Button from './Button';


const Container = tw.div`h-[60vh] flex flex-col gap-2 justify-center items-center`


interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({ title = "No exact matching",
  subtitle = 'Try changing or removingsome of your filters', showReset }) => {
  const router = useRouter( )
  return (
    <Container>
      <Heading title={title} subtitle={subtitle} center />
      <div className='w-48 mt-4'>
       {showReset && <Button onClick={()=>router.push("/")} outline label='Remove all filters' />}
      </div>
    </Container>
  )
}

export default EmptyState