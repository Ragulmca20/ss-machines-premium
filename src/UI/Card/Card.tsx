import React from 'react';
import './Card.css'; // Import your CSS file
import { Typography } from '@mui/material';

interface CardProps {
  title: string;
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="custom-card">
      <div className="card-content">
      <Typography variant="h4">{title}</Typography>
        {children}
      </div>
    </div>
  );
};

export default Card;
