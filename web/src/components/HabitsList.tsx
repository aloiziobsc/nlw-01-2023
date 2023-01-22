import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>
  completedHabits: string[]
}

export const HabitsList = ({ date, onCompletedChanged }:HabitsListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  const isChecked = (id:string) => {
    return habitsInfo?.completedHabits?.includes(id)
  }

  useEffect(() => {
    const response = api.get('day', {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
  }, [])

  const isDateInPass = dayjs(date).endOf('day').isBefore(new Date)

  const handleToggleHabit = async (habitId:string) => {
    await api.patch(`/habits/${habitId}/toggle`)
    const isHabbitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabbitAlreadyCompleted) { 
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })
    onCompletedChanged(completedHabits.length)
  }

  return (
    <div className='flex flex-col gap-3 mt-6'>
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo?.completedHabits?.includes(habit.id)}
          disabled={isDateInPass}
          className='flex items-center gap-3 group disabled:cursor-not-allowed'
        >
          <div 
            className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-600 transition-colors'
            style={{ border: 'solid 2px', borderColor: '#27272A'}}
          >
            <Checkbox.Indicator>
              <Check size={20} className="text-white"/>
            </Checkbox.Indicator>
          </div>
  
          <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
            {habit.title}
          </span>
        </Checkbox.Root>
        )
      })}

    </div>
  )
}