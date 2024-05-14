import React from 'react';
import { Skeleton, Typography, Box } from '@mui/material';

const CartPageSkelton = () => {
  return (
    <Box display="flex" alignItems="center">
      <Skeleton variant="rectangular" width={300} height={300} sx={{marginRight:'10px'}} />
      <Box>
        <Typography variant="h6">
          <Skeleton width={350} />
        </Typography>
        <Typography variant="body1">
          <Skeleton width={200} />
        </Typography>
        <Typography variant="body2">
          <Skeleton width={100} />
        </Typography>
      </Box>
    </Box>
  );
};

export default CartPageSkelton;
