import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UrlLink = styled(Link)`
  &&:link {
    text-decoration: none;
  }
`;

const ButtonLink = ({ text, url, ...prop }) => (
    <UrlLink to={url}>
        <Button {...prop}>
            {text}
        </Button>
    </UrlLink>
);

export default ButtonLink;
