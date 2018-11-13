import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: feed-end / tag-end;
  grid-row: link-start / link-end;
`;
const KeyLinks = () => (
    <Container>
       <Grid container>
          <Typography variant='h4'>
             Links
          </Typography>
       </Grid>
    </Container>
);

export default KeyLinks;
