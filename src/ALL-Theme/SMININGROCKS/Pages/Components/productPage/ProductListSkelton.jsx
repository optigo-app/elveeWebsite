import React from 'react';
import './ProductSkelton.css';
import { Skeleton, Card, CardContent, Grid, CardMedia } from '@mui/material';

const ProductListSkeleton = () => {
    const cardsArray = Array.from({ length: 6 }, (_, index) => index + 1);
    return (
        <div className='skeltonMainDiv'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className='skeltoncards' style={{ width: '100%' }}>
                        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            </div>
                            {/* <Skeleton variant="rect" width={100} height={100} style={{ marginRight: '10px' }} /> */}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card className='skeltoncards'>
                        <CardContent>
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={9} container spacing={2}>
                    {cardsArray.map((item) => (
                        <Grid item xs={4} key={item}>
                            <Card className='skeltoncards'>
                                <CardMedia style={{width:'100%', height:'40vh'}}>
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

            </Grid>
        </div>
    );
};

export default ProductListSkeleton;
