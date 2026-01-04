import React, { useEffect } from 'react'
import Header from './NavBar'
import BookingBar from './BookingBar'
import { myBooking } from '../services/booking'

type Img ={
    img:string
    pageName: string
}




export default function PageHeroSection({ img, pageName }:Img) {
  return (
    <div className="bg-gray-50 ">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-40 text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageName}</h1>
          <p className="text-lg opacity-90">
            We are a leading organization that has been providing reliable service for many years.
          </p>

          
        </div>
      </section>
    </div>
  )
}
