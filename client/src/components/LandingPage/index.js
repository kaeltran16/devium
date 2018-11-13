import React from 'react';
import NavBar from '../NavBar';
import styled from 'styled-components';
import PopularPosts from '../PopularPosts';
import NewsFeed from '../NewsFeed';
import PostTags from '../PostTags';
import KeyLinks from '../KeyLinks';

const GridContainer = styled.div`
  display: grid;
  width: 98vw;
  height: 98vh;
  grid-template-columns: [popular-start] 1fr 
  [popular-end] 2fr [feed-end] 1fr [tag-end];
  grid-template-rows: [nav-start] 1.25fr 
  [nav-end] 4fr [link-start] 1fr [link-end];
`;


const LandingPage = () => (
    <GridContainer>
       <NavBar/>
       <PopularPosts/>
       <NewsFeed/>
       <PostTags/>
       <KeyLinks/>
    </GridContainer>
);

export default LandingPage;
