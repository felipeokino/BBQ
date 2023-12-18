const Loading = () => (
  <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center gap-3 [&>div]:w-8 [&>div]:h-8 [&>div]:rounded-full'>
    <div className='animate-[bounce_1s_infinite_50ms] bg-yellow-400'/>
    <div className='animate-[bounce_1s_infinite_150ms] bg-yellow-500'/>
    <div className='animate-[bounce_1s_infinite_250ms] bg-yellow-600'/>
  </div>
)

export default Loading