import { Row, Col, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'

const Banner = ({ bannerProp }) => {

  const { title, content, label } = bannerProp;

  return (
    <Row>
        <Col className='p-5 mt-5 text-center'>
            <h1 className='mt-5'>{title}</h1>
            <p className='mt-4'>{content}</p>
            <Button as={NavLink} to="/" className='mt-4' style={{ backgroundColor:'#FE8F02', border: 'none', }}>{label}</Button>
        </Col>
    </Row>
  )
}

Banner.propTypes = {
    bannerProp: PropTypes.object.isRequired
}

export default Banner
