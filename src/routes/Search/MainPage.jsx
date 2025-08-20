import React from 'react';
import logo from './logo.png'
import { HomeNav } from './HomeNav';

export const MainPage = () => {
   
  return (
    <>
    <HomeNav />
      <div className="element" style={{
        backgroundImage: `url(${logo})`,
        marginLeft: `630px`,
        marginTop: `250px`,
        alignItems: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: `150px`,
        height: `150px`
      }}>

      </div>
    </>
  )
}