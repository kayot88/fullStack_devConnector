import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Navbar from './containers/Navbar/Navbar';
import LandSection from './containers/Landing/Landing';
import PagesSection from './components/PagesSection';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={LandSection} />
        <PagesSection className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </PagesSection>
      </Fragment>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
