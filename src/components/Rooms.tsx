import React, { useEffect, useRef, useState } from 'react';
import { getAllRooms } from '../services/rooms';
import RoomCard from './RoomCard';

// Room type එක නිවැරදිව නිර්වචනය කිරීම
type Room = {
  _id: string;
  type: string;
  price: string;
  status: string;
  pax: number;
  bedType: string;
  amenities: string[]; // amenities සාමාන්‍gයෙන් string array එකකි
  image: string;
  count: number;
};

const Rooms = () => {
  // 1. scrollRef සඳහා HTMLDivElement type එක ලබා දීම
  const scrollRef = useRef<HTMLDivElement>(null);
  const [roomsData, setRoomsData] = useState<Room[]>([]);

  // 2. scroll function එක සක්‍රිය කිරීම
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = async () => {
    try {
      const res = await getAllRooms();
      setRoomsData(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-16 px-6">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Our Luxurious Rooms</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Experience ultimate comfort and elegance in our handpicked rooms, designed to provide you with a peaceful stay.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-[60%] -translate-y-1/2 w-full flex justify-between z-10 pointer-events-none px-2">
          <button 
            onClick={() => scroll(-350)}
            className="p-4 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-sm transition-all pointer-events-auto border border-white/10"
          >
            ❮
          </button>
          <button 
            onClick={() => scroll(350)}
            className="p-4 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-sm transition-all pointer-events-auto border border-white/10"
          >
            ❯
          </button>
        </div>

        {/* Rooms Card Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 scroll-smooth py-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {roomsData.map((r) => (
            <div key={r._id} className="flex-shrink-0 w-[350px]">
              <RoomCard 
                room={{
                  id: r._id,
                  status: r.status,
                  image: r.image,
                  type: r.type,
                  price: r.price,
                  pax: r.pax,
                  bedType: r.bedType,
                  amenities: r.amenities,
                  count: r.count
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind මගින් scrollbar එක සැඟවීමට අවශ්‍ය CSS */}
      <style>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`}</style>
    </div>
  );
};

export default Rooms;