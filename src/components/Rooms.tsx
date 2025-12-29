import React, { useRef } from 'react';

const Rooms = () => {
  const scrollRef = useRef(null);

//   const scroll = (scrollOffset) => {
//     scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
//   };

  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      price: "$150",
      features: ["Free WiFi", "AC", "King Bed"],
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 2,
      name: "Luxury Suite",
      price: "$250",
      features: ["Private Pool", "Mini Bar", "Breakfast"],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 3,
      name: "Family Superior",
      price: "$200",
      features: ["2 Queen Beds", "Garden View", "Kitchen"],
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 4,
      name: "Single Standard",
      price: "$80",
      features: ["Single Bed", "Work Desk", "Fast WiFi"],
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=500",
    },
  ];

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
        <div className="absolute top-[60%] -translate-y-1/2 w-full flex justify-between z-10 pointer-events-none">
          <button 
            onClick={() => scroll(-350)}
            className="p-4 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-sm transition-all pointer-events-auto -ml-4 border border-white/10"
          >
            ❮
          </button>
          <button 
            onClick={() => scroll(350)}
            className="p-4 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-sm transition-all pointer-events-auto -mr-4 border border-white/10"
          >
            ❯
          </button>
        </div>

        {/* Rooms Card Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {rooms.map((room) => (
            <div 
              key={room.id}
              className="min-w-[320px] md:min-w-[380px] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5 group hover:border-amber-500/50 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-black font-bold px-3 py-1 rounded-lg">
                  {room.price} <span className="text-xs font-normal">/ Night</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-amber-500 transition-colors">
                  {room.name}
                </h3>
                
                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((feature, index) => (
                    <span key={index} className="text-[10px] uppercase tracking-widest text-neutral-400 bg-white/5 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full py-3 rounded-xl bg-transparent border border-white/20 text-white hover:bg-white hover:text-black transition-all font-medium">
                  Book This Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
    </div>
  );
};

export default Rooms;