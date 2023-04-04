import { BsList, BsFullscreen, BsBell } from 'react-icons/bs';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import webLogo from '../img/burger-king.png';
import userPic from '../img/user.png';

const Header = () => {
  return (
    <header>
        <Navbar collapseOnSelect expand="lg" >
          <Container className='container-fluid'>
            <Nav>
                <BsList className='web-icon'/>
            </Nav>
            <Navbar.Brand href="/"><img src={webLogo} className='img-logo'/></Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto d-xl-flex flex-column">
                <h3 className='logo-title-h'>Burger King</h3>
                <p className='logo-title-p'>Uptown Mall</p>
            </Nav>
            <Nav className='d-flex align-items-center gap-5'>
                <BsFullscreen className='web-icon'/>
                <BsBell className='web-icon'/>
                <img src={userPic} className='user-pic'/>

            </Nav>
            </Navbar.Collapse>
         </Container>
       </Navbar>
     
    </header>
  )
}

export default Header
