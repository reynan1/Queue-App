import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { HiInformationCircle } from 'react-icons/hi';
import SearchForm from "./searchForm";
import ListData from './ListData';
import ServeData from './ServeData';

const ListQueue = () => {
  const [queueData, setQueueData] = useState([]);
  const [getServeNow, setGetServeNow] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDisabled, setDisabled] = useState(false);

  
  // search the form ID, mobile number, name
  const handleSearchForm = () => {
    setQueueData(queueData.filter((item) => item.name === searchValue ||  item.mobileNo === searchValue || item.queueID === searchValue ))
  }


  // update the serve to false and serveDone to true
  const serveDone = async (e,userID) => {
    e.preventDefault();
    try {
     const response = await axios.put(`${process.env.REACT_APP_API_URL}/queue/serveDone/${userID}`, {
        serve: false,
        serveDone: true,
      })

      if(response.data.result === false) {
        Swal.fire({
           title: 'Server Error',
           icon: 'error',
           text: `server error`,
        })
      }

      if(response.status === 200 && response.data.result === true) {
        Swal.fire({
          title: 'Serve queue number is done',
          icon: 'success',
          text: `serve is done`
        })

        window.location.reload();
      }

    } catch(error) {
      console.log(`data result: ${error}`);
    }
 }
  
  useEffect(() => {

    // if serve value is equal to true show serve queue id number
    async function  checkServeTrue () {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/queue/serveNow`, {
          headers: {
            Accept: 'application/json',
          },
        }); 

        if(response.data) {
          setDisabled(response.data.serve);
        } else {
          setDisabled(false);
        }
          
         const serveNowArray = [response.data];

         setGetServeNow(serveNowArray);
      } catch (error) {
        console.log(error)
      }
  }

  checkServeTrue();
  }, [])

     // update servefield to false to true and display to current serving container 
     const handleClick = async (e, data) => {
      e.preventDefault();

      try {

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/queue/serve/${data._id}`, {
          serve: true,
        })  
        
        if(response.data.result === false) {
          Swal.fire({
             title: 'Server Error',
             icon: 'error',
             text: `server error`,
          })
      }

      if(response.status === 200 && response.data.result === true) {
         Swal.fire({
           title: 'Queue id number is now serve',
           icon: 'success',
           text: `serve is now ongoing`
         })

         window.location.reload();
        }
      } catch(error) {
        console.log(error);
      }
     
    } 
    console.log(queueData); 


  // fetch the queue data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/queue/list`, {
        headers: {
          Accept: 'application/json',
        },
      }); 
      
       setQueueData(response.data);
    } catch(error) {
      console.log(`Fetch Data Error: ${error}`);
    }

  }

  useEffect(() => {
    fetchData();
  }, [isDisabled, searchValue ]);
  

  return (
    <div >
      <SearchForm handleSearchForm={handleSearchForm} handleData={setSearchValue}/>
      <MDBRow className="mt-4">
        <MDBCol className="list-queue" md='8'>
            <div className=" p-3  list-queue-header">
              <h3>on-going queue</h3>
              <p>List of all on-going customer queues</p>
            </div>
            <div className='list-queue-tableHeader'>
               <MDBRow className="p-1">
                   <MDBCol className="list-queue-data" md='3'>
                      <p>Queue Number</p>
                   </MDBCol>
                   <MDBCol className="list-queue-data" md='3'>
                      <p>Customer Info</p>
                   </MDBCol>
                   <MDBCol className="list-queue-data" md='3'>
                      <p>Type/Time Queued</p>
                   </MDBCol>
                   <MDBCol className="list-queue-data" md='1'>
                      <p>Options</p>
                   </MDBCol>
                   <MDBCol className="list-queue-data" md='1'>
                      <p>Serve</p>
                   </MDBCol>
               </MDBRow>
            </div>

            <div className='list-queue-tableBody mt-0'>
               <ListData queueData={queueData} handleClick={handleClick} isDisabled={isDisabled}/>
            </div>
            <div className='list-queue-tableFooter p-3 mt-3 d-flex justify-content-between'>
                <span style={{fontWeight: "400", fontSize: "1rem", color: "#191444",}}>Total on-going queues</span>
                <span style={{fontWeight: "700", fontSize: "1rem", color: "#191444",}}>{queueData ? queueData.length : 0} Queues</span>
            </div>
        </MDBCol>
        <MDBCol className="current-serving" size='6'  md='4'>
            <div className="current-serving-header p-3 ">
              <h3>current serving</h3>
              <p>Customer queues that are called and served</p>
            </div>

            <div className='current-serving-tableHeader'>
                <HiInformationCircle /><span style={{  color: "#74728F", fontWeight: "400", fontSize: "0.8rem", lineHeight: "1.8rem"   }}>Finish serving a queue before you can serve another one</span> 
            </div>
            <div className='mt-3 p-3 current-serving-body'>
                <div className='current-serving-body-user'>
                     {/*  props Serve data */} 
                    <ServeData getServeNow={getServeNow}  serveDone={serveDone}/>     
                </div>
            </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default ListQueue