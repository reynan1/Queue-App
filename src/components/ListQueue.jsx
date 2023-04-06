import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { BiUser, BiMobile, BiGroup, BiDotsVerticalRounded } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs"
import { HiInformationCircle } from 'react-icons/hi';
import { RxSpeakerLoud } from 'react-icons/rx';
import { BsCheck2 } from 'react-icons/bs'
import { CgToggleSquareOff } from 'react-icons/cg';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchForm from "./searchForm";
import ListData from './ListData';

const ListQueue = () => {
  const [queueData, setQueueData] = useState([]);
  const [getServeNow, setGetServeNow] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [userId, setUserId] = useState();
  const [isServe, setIsServe] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [idNumber, setIdNumber] = useState([]);
  
  // search the form ID
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
      }

    } catch(error) {
      console.log(`data result: ${error}`);
    }
 }
  
  useEffect(() => {
    async function  chechServeTrue () {
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

         setGetServeNow(serveNowArray.map( (data, index) => {
            return (
              
              data ? (
                <div key={index}>
                   <div>
                      <p style={{ textTransform: "uppercase", color: "#A3A1B5", fontWeight: "700", textAlign: "center", fontSize: "0.8rem" }}>queue number</p>
                      <p style={{ textTransform: "uppercase", color: "#191444", fontWeight: "700", textAlign: "center", fontSize: "2.2rem" }}>{data.queueID}</p>
                      <div className='d-flex justify-content-center'>
                        <p style={{ 
                                  textTransform: "uppercase", 
                                  color: "#A3A1B5", 
                                  fontWeight: "400", 
                                  textAlign: "center", 
                                  fontSize: "0.7rem", 
                                  border: "1px solid #A3A1B5", 
                                  borderRadius: "5px", 
                                  textAlign: "center",
                                  width: "5rem",
                                }}>Walk-in</p>
                      </div>
                   </div>
                   <div className='mt-5'>
                       <div className='mt-2 d-flex justify-content-between '>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#74728F", letterSpacing: "0.5px" }}>Customer Name</span>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#191444", letterSpacing: "0.5px" }}>{data.name}</span>
                       </div>
                       <div  className='d-flex justify-content-between '>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#74728F", letterSpacing: "0.5px" }}>Mobile Number</span>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#191444", letterSpacing: "0.5px" }}>{data.mobileNo}</span>
                       </div>
                       <div  className='d-flex justify-content-between '>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#74728F", letterSpacing: "0.5px" }}>Number of People</span>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#191444", letterSpacing: "0.5px" }}>{data.personCount}</span>
                       </div>
                   </div>
                   <div className='mt-5  data-footer' style={{ borderTop: "2px solid #F3F6FC", paddingTop: "2rem" }}>
                       <div className='d-flex justify-content-between '>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#74728F", letterSpacing: "0.5px" }}>Time Queued</span>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#191444", letterSpacing: "0.5px" }}>8:00 AM</span>
                       </div>
                       <div className='d-flex justify-content-between '>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#74728F", letterSpacing: "0.5px" }}>Time Served</span>
                           <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#191444", letterSpacing: "0.5px" }}>8:16 AM</span>
                       </div>
                   </div>

                   <div className='mt-5  data-footer' style={{ borderTop: "2px solid #F3F6FC", paddingTop: "2rem" }}>
                       <div className=' d-flex justify-content-around '>
                           <button style={{ width: "3rem", backgroundColor: 'transparent', border: "2px solid #A3A1B5", color: "#A3A1B5", borderRadius: "5px" }}>
                             <BiDotsVerticalRounded />
                           </button> 
                           <button className='data-footer-btn' style={{backgroundColor: 'transparent', border: "2px solid #A3A1B5", color: "#A3A1B5", borderRadius: "5px", fontWeight: 700, }}>
                              <RxSpeakerLoud className='data-footer-icon' style={{ fontSize: "1.2rem" }}/>
                              <span style={{ textTransform: "uppercase" }}>notify</span>
                           </button>

                           <button 
                              className='data-footer-btn'  
                              style={{backgroundColor: 'transparent', border: "2px solid #1E9032", color: "#1E9032", borderRadius: "5px", fontWeight: 700,  }}
                              onClick={(e) => serveDone(e, data._id)}
                              >
                              <BsCheck2 className='data-footer-icon' style={{ fontSize: "1.2rem" }}/>
                              <span style={{ textTransform: "uppercase" }}>done</span>
                           </button>
                       </div>
                   </div>
                   <div className='mt-5 d-flex justify-content-between'>
                       <div className='data-footer-msg'>
                          <p>Auto-serve next queue?</p>
                          <span>Next queue to be serve:{data.queueID}</span>      
                       </div>         
                       <CgToggleSquareOff className='web-icon-large'/> 
                   </div>
               </div>
              ) : (<h1 key={1} style={{ fontSize: "1.5rem", textAlign: "center", color: "#A3A1B5", }}> Nothing Found</h1>)
            ) 
         } ))
      } catch (error) {
        console.log(error)
      }
  }

  chechServeTrue();
  }, [])

     // update servefield to false to true and display to current serving container 
     const handleClick = async (e, data, idNumber) => {
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
               <ListData queueData={queueData} handleClick={handleClick} isDisabled={isDisabled} idNumber={idNumber}/>
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
                     { getServeNow  }       
                </div>
            </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default ListQueue