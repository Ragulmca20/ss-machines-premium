import { CircularProgress } from '@mui/material';

const CircularProgressCentered = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85vh', // Set height to full viewport height
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default CircularProgressCentered;
