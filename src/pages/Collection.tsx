import React, { useState } from 'react';
import { fetchCollection } from '../lib/collection';
import './Collection.css';

// Define TypeScript interfaces for the card data
interface Player {
  firstname: string;
  lastname: string;
  birthday: string;
  image: string;
}

interface Card {
  id: number;
  player: Player;
}

export const Collection = () => {
  const collection: Card[] = fetchCollection();
  const card: Card = collection[0];
  const [imageLoaded, setImageLoaded] = useState(false);

  // Function to format the date of birth
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Generate the player image URL dynamically
  const getPlayerImageUrl = (id: number): string => {
    return `https://images.fotmob.com/image_resources/playerimages/${id}.png`;
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>{card.player.firstname} {card.player.lastname}</h2>
      </div>
      <div className="card-body">
        {!imageLoaded && <div className="loading-indicator">Loading...</div>}
        <img
          className="player-image"
          src={getPlayerImageUrl(card.id)}
          alt={`${card.player.firstname} ${card.player.lastname}`}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <p className="dob-label">Date of Birth</p>
        <p className="dob">{formatDate(card.player.birthday)}</p>
      </div>
    </div>
  );
};
