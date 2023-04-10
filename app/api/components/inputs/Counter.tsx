'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import tw from 'tailwind-styled-components';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export const CounterContainer = tw.div`flex flex-row items-center justify-between`;
export const CounterBox = tw.div`flex flex-col`;
export const CounterTitleContainer = tw.div`font-medium`;
export const CounterSubtitleContainer = tw.div`font-light text-gray-600`;
export const CounterReduceContainer = tw.div`flex flex-row items-center gap-4`;
export const CounterReduceButton = tw.div`w-10 h-10 rounded-full  border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition`;
export const CounterValue = tw.div`font-light text-xl text-neutral-600`

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);
  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [value, onChange]);
  return (
    <CounterContainer>
      <CounterBox>
        <CounterTitleContainer>{title}</CounterTitleContainer>
        <CounterSubtitleContainer>{subtitle}</CounterSubtitleContainer>
      </CounterBox>
      <CounterReduceContainer>
        <CounterReduceButton onClick={onReduce}>
          <AiOutlineMinus />
        </CounterReduceButton>
        <CounterValue>{value}</CounterValue>
        <CounterReduceButton onClick={onAdd}>
          <AiOutlinePlus />
        </CounterReduceButton>
      </CounterReduceContainer>
    </CounterContainer>
  );
};

export default Counter;
