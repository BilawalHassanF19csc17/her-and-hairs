import React from 'react'

const Loader = () => {
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
    <div className='loader relative bg-[#000000] h-[1px]'></div>
    </>
  )
}

export default Loader