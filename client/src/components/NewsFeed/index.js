import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: popular-end/feed-end;
  grid-row: nav-end / link-end;
`;
const NewsFeed = () => (
    <Container>
       <Grid container>
          <Typography variant='h4'>
             Feed
          </Typography>
       </Grid>
    </Container>
);

export default NewsFeed;
