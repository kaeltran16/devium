import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';

import palette from './styles/palette';

const theme = createMuiTheme(palette);

const withCustomTheme = Component => props =>
    <MuiThemeProvider theme={theme}>
        <Component {...props}/>
    </MuiThemeProvider>;

export default withCustomTheme;