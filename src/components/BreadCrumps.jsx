import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';


const BreadCrumps = () => {

  return (
    <Container >
        <div className='pt-1 pb-1'>
            <span><Link to="#" className='breadCrumps-link' style={{color: "#FE8F02"}}>Queue Management</Link></span> 
            <span> <BsChevronRight /> </span> 
            <span><Link to="#" className='breadCrumps-link' style={{color: "#A3A1B5"}}>Cashier 3</Link></span> 
        </div>
    </Container>

  )
}

export default BreadCrumps