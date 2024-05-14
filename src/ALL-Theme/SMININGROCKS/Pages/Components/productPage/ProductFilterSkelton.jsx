import React from 'react'
import { Grid, Card, CardMedia, CardContent, Skeleton } from '@mui/material';

const ProductFilterSkelton = () => {
    const cardsArray = Array.from({ length: 6 }, (_, index) => index + 1);

    return (
        <div>
            <Grid item xs={12} container spacing={2}>
                {cardsArray.map((item) => (
                    <Grid item xs={4} key={item}>
                        <Card className='skeltoncards'>
                            <CardMedia style={{ width: '100%', height: '40vh' }}>
                                <Skeleton variant="rect" width={'100%'} height='40vh' />
                            </CardMedia>
                            <CardContent>
                                <Skeleton variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                <Skeleton variant="text" width={'60%'} height={20} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default ProductFilterSkelton