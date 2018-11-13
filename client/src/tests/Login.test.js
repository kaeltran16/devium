import React from 'react';
import { mount } from 'enzyme';
import Login from '../components/Auth/Login';
import { BrowserRouter } from 'react-router-dom';

describe('<Login /> ', () => {
   it('render a login form', () => {
      const wrapper = mount(
          <BrowserRouter>
             <Login/>
          </BrowserRouter>
      );
      expect(wrapper).toMatchSnapshot();
   });
});
