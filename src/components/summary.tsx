import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary';
import dayjs from "dayjs";
import { PendingGoals } from "./pending-goals";


export function Summary() {

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round(data.completed * 100 / data.total)



  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <InOrbitIcon/>
          <span className="text-lg font-semibold">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button className="sm">
            <Plus className='size-4'/>
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={15} value={8}>
          <ProgressIndicator style={{width: `${completedPercentage}` }}/>
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> 
            {' '}metas nessa semana.
          </span>
          <span> {completedPercentage}% </span>
        </div>

        <Separator/>

        <PendingGoals />

      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>
        
        {completedPercentage > 0 && Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formattedData = dayjs(date).format('D MMMM')

          return (
            <div key={date} className="flex flex-col gap-4">
              <span className="capitalize">{weekDay}{' '}</span>
            <h3 className="font-medium">{date}{' '}
              <span className="text-zinc-400 text-xs">
              {formattedData}
              </span>
            </h3>

            <ul className="flex flex-col gap-3">
             {goals.map(goal => {
              const time = dayjs(goal.completedAt).format('HH:mm')

              return (
                <li key={goal.id} className="flex items-center gap-2">
                  <span>✔️ Você completou{' '}
                    <span className="text-zinc-100">{goal.title}</span>
                    {' '}as <span className="text-zinc-100">{time}h</span>
                  </span>
                </li>
              )
             })}

            </ul>
          </div>
          )
        })}

      </div>

    </div>
  )
}