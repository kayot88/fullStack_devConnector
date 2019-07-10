import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import theme from './theme';
import Navbar from './containers/Navbar/Navbar';
import LandSection from './containers/Landing/Landing';
import PagesSection from './components/PagesSection';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './containers/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateProfile from './components/Forms/CreateProfile';
import UpdateProfile from './components/Forms/UpdateProfile';
import AddExperence from './components/Forms/AddExperence';
import AddEducation from './components/Forms/AddEducation';
import ProfileItem from './containers/Profiles/ProfileItem';
import Profiles from './containers/Profiles/Profiles';
import Alert from './containers/Alert';
import './App.css';
import store from './store';
import { authUser } from './actions/authAction';

const App = () => {
  useEffect(() => {
    store.dispatch(authUser());
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={LandSection} />
            <PagesSection className="container">
              <Alert />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={ProfileItem} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={UpdateProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperence}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </PagesSection>
          </Fragment>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};
;
export default App;
