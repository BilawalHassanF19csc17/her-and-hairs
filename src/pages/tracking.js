import React from 'react';
import QRCode from 'qrcode.react';

const QR = () => {
  const url = 'https://her-and-hairs.vercel.app/reviews';

  return (
    <div className='bg-black flex justify-center items-center h-screen'>
      <div className='border-white border-[3px] inline-block p-[5px]'>
        <QRCode
          value={url}
          size={100}
          level={'H'}
          bgColor='#000000' // Background color of the QR code
          fgColor='#ffffff' // Foreground color of the QR code
        />
      </div>
    </div>
  );
}

export default QR;
