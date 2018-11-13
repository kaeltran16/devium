import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: popular-start/popular-end;
  grid-row: nav-end / link-end;
`;
const PopularPosts = () => (
    <Container>
       <Grid container>
          <Typography variant='h4'>
             Popular posts
          </Typography>
          <Grid container item>
             Items
          </Grid>
       </Grid>
    </Container>
);

export default PopularPosts;
