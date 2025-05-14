
import React from 'react';

const attractions = [
  {
    id: 1,
    name: "Mysore Palace",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Jog Falls",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Hampi",
    image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Coorg",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Gokarna Beach",
    image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=1600&auto=format&fit=crop",
  }
];

const ImageCarousel: React.FC = () => {
  return (
    <div className="carousel-container h-screen">
      <div className="carousel-wrapper">
        {attractions.map((attraction) => (
          <div key={attraction.id} className="carousel-item">
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-full object-cover"
            />
            <div className="overlay"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
