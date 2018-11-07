import React from 'react';
import {Button, Grid, Toolbar, Typography, IconButton} from '@material-ui/core';

class NavBar extends React.Component {
    render() {
        return (
            <Toolbar>
                <Grid lg={'12'} container>
                    <Button color='primary' variant='text'>Write an article</Button>
                    <Typography variant='h3'>Devium</Typography>
                    <Grid container>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
}


export default NavBar;
