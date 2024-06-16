import React, { useState } from 'react';
import styled from 'styled-components';
import { CardData } from '../types';

// Styled components
const FormContainer = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 16px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 16px;
`;

export const CreateCard: React.FC = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!firstname.trim()) {
      setError('First name is required.');
      return false;
    }
    if (!lastname.trim()) {
      setError('Last name is required.');
      return false;
    }
    if (!birthday.trim()) {
      setError('Date of birth is required.');
      return false;
    }
    if (isNaN(Date.parse(birthday))) {
      setError('Invalid date of birth format.');
      return false;
    }
    if (!image.trim()) {
      setError('Image URL is required.');
      return false;
    }
    try {
      new URL(image);
    } catch (_) {
      setError('Invalid image URL.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formattedBirthday = new Date(birthday).toISOString();

    const newCard: Omit<CardData, 'id'> = {
      player: {
        firstname,
        lastname,
        birthday: formattedBirthday,
        image,
      },
    };

    try {
      const response = await fetch('http://localhost:8001/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error('Failed to create card');
      }

      setSuccess('Card created successfully!');
      setError(null);
      setFirstname('');
      setLastname('');
      setBirthday('');
      setImage('');
    } catch (err) {
      setError('Error creating card. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <FormContainer>
      <h2>Create a New Card</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="birthday">Date and Time of Birth</Label>
          <Input
            id="birthday"
            type="datetime-local"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormField>
        <Button type="submit">Create Card</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </form>
    </FormContainer>
  );
};
