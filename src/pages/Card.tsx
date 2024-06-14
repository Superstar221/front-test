import React, { useState } from 'react';
import styled from 'styled-components';

interface Player {
  firstname: string;
  lastname: string;
  birthday: string;
  image: string;
}

interface CardProps {
  player: Player;
  id: number;
}

// Styled components
const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 24px;
  max-width: 320px;
  margin: 40px auto;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const CardHeader = styled.div`
  font-size: 1.8em;
  margin-bottom: 16px;
  font-weight: bold;
  color: #333;
`;

const CardBody = styled.div`
  font-size: 1em;
  color: #666;
`;

const LoadingIndicator = styled.div`
  font-size: 1em;
  color: #888;
`;

const PlayerImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: auto;
`;

const DobLabel = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: #555;
  margin-top: 16px;
`;

const Dob = styled.p`
  font-size: 1.2em;
  color: #333;
`;

export const Card: React.FC<CardProps> = ({ player, id }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPlayerImageUrl = (id: number): string => {
    return `https://images.fotmob.com/image_resources/playerimages/${id}.png`;
  };

  return (
    <CardContainer>
      <CardHeader>
        {player.firstname} {player.lastname}
      </CardHeader>
      <CardBody>
        {!imageLoaded && <LoadingIndicator>Loading...</LoadingIndicator>}
        <PlayerImage
          src={getPlayerImageUrl(id)}
          alt={`${player.firstname} ${player.lastname}`}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <DobLabel>Date of Birth</DobLabel>
        <Dob>{formatDate(player.birthday)}</Dob>
      </CardBody>
    </CardContainer>
  );
};
