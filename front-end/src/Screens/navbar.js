import { diffStringsUnified } from 'jest-diff';
import {Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'
import logo from './DSU.png'
function Navbars(){
    return(<div><Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>
      <img
        src={logo}
        width="150"
        height="50"
        left="5"
        className="d-inline-block align-top"
        
      />
      </Navbar.Brand>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Navbar.Brand href="http://localhost:4000">Dispense</Navbar.Brand>
    <Nav className="me-auto">
    <NavDropdown title="Medication Record" id="basic-nav-dropdown">
          <NavDropdown.Item href="/logA">Medicine A</NavDropdown.Item>
          <NavDropdown.Item href="/logB">Medicine B</NavDropdown.Item>
          <NavDropdown.Item href="/logC">Medicine C</NavDropdown.Item>
          <NavDropdown.Item href="/logD">Medicine D</NavDropdown.Item>
          </NavDropdown>
      <NavDropdown title="Login" id="basic-nav-dropdown">
          <NavDropdown.Item href="/Doctor">Doctor</NavDropdown.Item>
          <NavDropdown.Item href="/Nurse">Nurse</NavDropdown.Item>
          </NavDropdown>
          </Nav>
    </Container>
  </Navbar>
  </div>
    );
}
export default Navbars;