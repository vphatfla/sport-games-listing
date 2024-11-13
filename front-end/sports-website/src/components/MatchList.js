// src/components/MatchList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const matches = [
  { teams: 'Team A vs Team B', time: '2:00 PM', isFavorite: true },
  { teams: 'Team C vs Team D', time: '4:00 PM', isFavorite: false }
];

function MatchList() {
  return (
    <List>
      {matches.map((match, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={match.teams}
            secondary={match.time}
          />
          {match.isFavorite && (
            <IconButton>
              <StarIcon />
            </IconButton>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default MatchList;
