import *  as Checkbox from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react"
import { FormEvent, useState } from "react"
import { api } from "../lib/axios"

const avaibleWeekDays = ['Domingo', 'Segunda-feira', 'Terceira-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export const NewHabitForm = () => {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const createNewHabit = async(event:FormEvent) => {
    event.preventDefault()

    if(!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('')
    setWeekDays([])
    
    alert('Hábito criado com sucesso')
  }

  const handleToggleWeekDay = (weekDay:number) => {
    if(weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddedOne)
    }
  }
  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label
        className="font-semibold leading-tight"
        htmlFor="title"
      >
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={event => setTitle(event.target.value)}
        value={title}
      />

      <label
        className="font-semibold leading-tight mt-4"
        htmlFor=""
      >
        Qual a recorrência?
      </label>

      <div className='flex flex-col gap-2 mt-3'>
        {avaibleWeekDays.map((weekDay, index) => {
          return (
          <Checkbox.Root
            key={weekDay}
            className='flex items-center gap-3 group'
            onCheckedChange={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
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
              {weekDay}
            </span>
          </Checkbox.Root>
          )
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center  justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors"
      >
        <Check size={20} weight="bold"/>
        Confirmar
      </button>

    </form>
  )
}