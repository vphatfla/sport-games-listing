// src/components/SportsList.js
import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

const sports = ['Football', 'Basketball', 'Baseball'];

function SportsList() {
  return (
    <ButtonGroup variant="text" color="primary">
      {sports.map(sport => (
        <Button key={sport}>{sport}</Button>
      ))}
    </ButtonGroup>
  );
}

export default SportsList;
