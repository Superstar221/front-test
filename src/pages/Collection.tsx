import React, { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/collection';
import { Card } from './Card';
import styled, { keyframes } from 'styled-components';

// TypeScript interfaces
interface Player {
  firstname: string;
  lastname: string;
  birthday: string;
  image: string;
}

interface CardData {
  id: number;
  player: Player;
}

// Spinner keyframes
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled components for spinner and container
const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
  display: block;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Collection: React.FC = () => {
  const [collection, setCollection] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCollection = async () => {
      try {
        const data = await fetchCollection();
        setCollection(data);
      } catch (error) {
        setError('Failed to fetch collection');
      } finally {
        setLoading(false);
      }
    };

    getCollection();
  }, []);

  if (loading) {
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {collection.length > 0 ? (
        collection.map((card) => (
          <Card key={card.id} id={card.id} player={card.player} />
        ))
      ) : (
        <div>No cards available</div>
      )}
    </div>
  );
};
