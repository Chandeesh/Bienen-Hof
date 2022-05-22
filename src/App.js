import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import { Navbar, Nav, Container, NavDropdown, FormControl, Button } from 'react-bootstrap';
import Form from "react-validation/build/form";
import { MDBFooter } from 'mdb-react-ui-kit';
import { default as Logo } from './logo.svg';

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Router history={history}>
      <div className="main-wrapper">
        <Navbar className="color-nav py-3 border" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">
              <img src="https://dib-imker-app.de/portal/img/logo.8227a872.svg" alt="" height="70" width="120" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.details.email}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={logOut}>
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
                )}
                <NavDropdown title="Language" id="navbarScrollingDropdown" style={{ paddingRight: '25px' }}>

                  <NavDropdown.Item href="#action4">English</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Deutsch
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button class="btn success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
      <MDBFooter background='yellow' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='container text-center text-md-start mt-5'>
            <div className='row mt-3'>
              <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <i className='fas fa-gem me-3'></i>Bienen Hof University
                </h6>
                <p>
                  Re Engineering of Deutscher ImkerBund App to a Web App using React JS and Fastify for the fulfillment of Master Thesis by Hof University Student - Chandeesh
                </p>
              </div>


              <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Pricing
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Settings
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Orders
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Help
                  </a>
                </p>
              </div>

              <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  Alfons-Goppel-Platz 1, 95028 Hof
                </p>
                <p>
                  <a href='mailto:ckuduvarajendraselva@hof-university.de' class="hyperlinks">Email Us</a>
                </p>
                <p>
                  Contact No: +49 157 7849 0376
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: '#ffcc00' }}>
          {'© 2022 Copyright: '}                                    
          <a href='mailto:ckuduvarajendraselva@hof-university.de' class="hyperlinks">
          Chandeesh Babu
          </a>
        </div>
      </MDBFooter>
    </Router>
  );
};
export default App;