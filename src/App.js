import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import BreadCrumps from './components/BreadCrumps';
import DisplayPayment from "./components/DisplayPayment";
import SearchForm from "./components/searchForm";
import ListQueue from "./components/ListQueue";

function App() {
  return (
    <>
      <Router>
          <Header />
          <Container className='container-fluid p-2'>
            <BreadCrumps />
          </Container>
          <DisplayPayment />
          <Container className='container-fluid p-2'>
            <SearchForm />
            <ListQueue />
          </Container>
      </Router>
    </>
  );
}

export default App;
