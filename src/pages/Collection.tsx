import React, { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/collection';
import { Card } from './Card';
import styled from 'styled-components';
import { CardData } from '../types';

// Styled components
const Container = styled.div`
  padding: 40px;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
 
const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SortLabel = styled.label`
  margin-right: 15px;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SortInput = styled.input`
  margin-right: 8px;
`;

export const Collection: React.FC = () => {
  const [collection, setCollection] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>('firstname');

  useEffect(() => {
    const getCollection = async () => {
      try {
        const data:CardData[] = await fetchCollection();
        setCollection(data);
      } catch (error) {
        setError('Failed to fetch collection');
      } finally {
        setLoading(false);
      }
    };

    getCollection();
  }, []);

  const sortCollection = (collection: CardData[]) => {
    return [...collection].sort((a, b) => {
      if (sortCriteria === 'firstname') {
        return a.player.firstname.localeCompare(b.player.firstname);
      } else if (sortCriteria === 'lastname') {
        return a.player.lastname.localeCompare(b.player.lastname);
      } else if (sortCriteria === 'birthday') {
        return new Date(a.player.birthday).getTime() - new Date(b.player.birthday).getTime();
      }
      return 0;
    });
  };

  if (loading) {
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const sortedCollection = sortCollection(collection);

  return (
    <Container>
      <SortContainer>
        <SortLabel>
          <SortInput
            type="radio"
            name="sort"
            value="firstname"
            checked={sortCriteria === 'firstname'}
            onChange={(e) => setSortCriteria(e.target.value)}
          />
          First Name
        </SortLabel>
        <SortLabel>
          <SortInput
            type="radio"
            name="sort"
            value="lastname"
            checked={sortCriteria === 'lastname'}
            onChange={(e) => setSortCriteria(e.target.value)}
          />
          Last Name
        </SortLabel>
        <SortLabel>
          <SortInput
            type="radio"
            name="sort"
            value="birthday"
            checked={sortCriteria === 'birthday'}
            onChange={(e) => setSortCriteria(e.target.value)}
          />
          Date of Birth
        </SortLabel>
      </SortContainer>
      {sortedCollection.length > 0 ? (
        <Grid>
          {sortedCollection.map((card) => (
            <Card key={card.id} id={card.id} player={card.player} />
          ))}
        </Grid>
      ) : (
        <ErrorMessage>No cards available</ErrorMessage>
      )}
    </Container>
  );
};
