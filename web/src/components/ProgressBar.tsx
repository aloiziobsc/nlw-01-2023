interface IProgressBarProps {
  progress: number
}

export const ProgressBar = (props:IProgressBarProps) => {
  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div 
        role="progressbar"
        className='h-3 rounded-xl bg-violet-600 transition-all'
        style={{ width: `${props.progress}%` }}
        aria-label='Progresso de hábitos completados nesse dia'
        aria-valuenow={props.progress}
      />
    </div>
  )
}