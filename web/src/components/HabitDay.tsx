import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface IHabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export const HabitDay = ({ defaultCompleted=0, amount=0, date }:IHabitDayProps) => {
  const [completed, setCompleted] = useState(defaultCompleted)
  
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
  const dayAndMath = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  const handleCompletedChanged = (completed:number) => {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors', {
          'bg-zinc-900 border-zinc-800' : completedPercentage === 0,
          'bg-violet-900' : completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800' : completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700' : completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600' : completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500' : completedPercentage >= 80,
        })}
      />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold loading-tight text-3xl'>{dayAndMath}</span>

          
          <ProgressBar progress={completedPercentage}/>

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged}/>

          <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}