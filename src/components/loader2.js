import React from 'react'

const Loader2 = () => {
  return (
    <>
    <style jsx>{`
     .loader{
      width: 0%;
      animation: loader 4s;
     }

     @keyframes loader{
      0%{
        width: 0%;
      }

      75%{
        width: 95%;
      }

      99%{
        width: 100%;
      }

      100%{
        width: 0%;
      }
     }
    `}</style>
    <div className='loader relative bg-white h-[1px]'></div>
    </>
  )
}

export default Loader2