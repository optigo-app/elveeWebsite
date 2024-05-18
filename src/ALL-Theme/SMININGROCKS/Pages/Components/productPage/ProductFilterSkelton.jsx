import React from 'react'
import { Grid, Card, CardMedia, CardContent, Skeleton, useMediaQuery } from '@mui/material';

const ProductFilterSkelton = () => {
    const cardsArray = Array.from({ length: 6 }, (_, index) => index + 1);
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <div>
            <Grid item xs={12} container spacing={2}>
                {cardsArray.map((item) => (
                    <Grid item xs={isMobile ? 6 : 4} key={item}>
                        <Card className='skeltoncards'>
                            <CardMedia style={{ width: '100%', height: '40vh' }}>
                                <Skeleton animation="wave" variant="rect" width={'100%'} height='40vh' />
                            </CardMedia>
                            <CardContent>
                                <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default ProductFilterSkelton