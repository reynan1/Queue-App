import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import BreadCrumps from './components/BreadCrumps';
import DisplayPayment from './components/DisplayPayment';
import ListQueue from "./components/ListQueue";
import Error from './components/Error';

function App() {
  return (
    <>
      <Router>
          <Header />
          <Container className='container-fluid p-2'>
             <Routes>
                <Route exact path='/' element={
                  <>  
                    <BreadCrumps />
                    <DisplayPayment />
                    <ListQueue />
                  </>
                }>
                </Route>
                <Route exact path='*' element={<Error />} /> 
             </Routes>
          </Container>
      </Router>
    </>
  );
}

export default App;
