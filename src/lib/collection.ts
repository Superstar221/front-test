import { CardData } from '../types';

export const fetchCollection = async (): Promise<CardData[]> => {
  try {
    const response = await fetch('http://localhost:8001/cards');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: CardData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
