import React, { useState } from 'react';

const Gallery = () => {
  const [filter, setFilter] = useState('All Photos');

  const images = [
    { id: 1, category: 'Rooms Area', src: 'room1.jpg', alt: 'Room 1' },
    { id: 2, category: 'Banquet Area', src: 'banquet1.jpg', alt: 'Banquet 1' },
    { id: 3, category: 'Resturant & Bar Area', src: 'food1.jpg', alt: 'Food 1' },
    // තවත් පින්තූර මෙලෙස එක් කරන්න...
  ];

  const categories = ['All Photos', 'Rooms Area', 'Banquet Area', 'Resturant & Bar Area', 'Photo Location', 'Functions'];

  const filteredImages = filter === 'All Photos' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors
              ${filter === cat 
                ? 'bg-yellow-500 text-black' 
                : 'bg-yellow-400 hover:bg-yellow-500 text-black'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;