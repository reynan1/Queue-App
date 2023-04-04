import { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { BiUser, BiMobile, BiGroup, BiDotsVerticalRounded } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs"
import { HiInformationCircle } from 'react-icons/hi';
import { RxSpeakerLoud } from 'react-icons/rx';
import { BsCheck2 } from 'react-icons/bs'
import Dropdown from 'react-bootstrap/Dropdown';

const ListQueue = () => {
  const [queueData, setQueueData] = useState([]);
  const [getServeNow, setGetServeNow] = useState([]);
  const [userId, setUserId] = useState('');
  const [isServe, setIsServe] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [idNumber, setIdNumber] = useState([]);
  
   // fetch the queue data that serve is equal to true
  const chechServeTrue = async () => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/queue/serveNow`, {
          headers: {
            Accept: 'application/json',
          },
        }); 

        if(response.data) {
          setDisabled(response.data.serve);
          console.log("data server: " + isDisabled);
        } else {
          setDisabled(false);
          console.log("data server: " + isDisabled);
        }
          
        const serveNowArray = [response.data];

         setGetServeNow(serveNowArray.map( data => {
            return (
                data && (
                 <div key={data._id}>
                    <div>
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
                    <div className='data-footer'>
                        <div className='d-flex justify-content-between '>
                            <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#74728F", letterSpacing: "0.5px" }}>Time Queued</span>
                            <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#191444", letterSpacing: "0.5px" }}>8:00 AM</span>
                        </div>
                        <div className='d-flex justify-content-between '>
                            <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#74728F", letterSpacing: "0.5px" }}>Time Served</span>
                            <span style={{ fontWeight: "400", fontSize: "0.9rem", color: "#191444", letterSpacing: "0.5px" }}>8:16 AM</span>
                        </div>
                    </div>
                </div>
              )
            )
         } ))
      } catch (error) {
        console.log(error)
      }
  }


  console.log(isDisabled  + " disable value");
  
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
          console.log("data server: " + isDisabled);
        } else {
          setDisabled(false);
          console.log("data server: " + isDisabled);
        }
          
        const serveNowArray = [response.data];

         setGetServeNow(serveNowArray.map( data => {
            return (
              
              data && (
                <div key={data._id}>
                   <div>
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
                           <button>
                             <BiDotsVerticalRounded />
                           </button> 
                           <button className='data-footer-btn'>
                              <RxSpeakerLoud style={{ fontSize: "1.2rem" }}/>
                              <span style={{ textTransform: "uppercase" }}>notify</span>
                           </button>

                           <button className='data-footer-btn'>
                              <BsCheck2 style={{ fontSize: "1.2rem" }}/>
                              <span style={{ textTransform: "uppercase" }}>done</span>
                           </button>
                       </div>
                   </div>
               </div>
              )
            )
         } ))
      } catch (error) {
        console.log(error)
      }
  }

  chechServeTrue();
  }, [])

  // fetch the queue data
  const fetchData = async (isDisabled) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/queue/list`, {
        headers: {
          Accept: 'application/json',
        },
      }); 


        // click the fetch queue data
      const handleClick = async (e, data) => {
        e.preventDefault();

        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/queue/serve/${data._id}`, {
            serve: true,
          })  
          
           console.log(response.data.user);
        } catch(error) {
          console.log(error);
        }
       
      } 

       setQueueData(response.data.map((data, index) => {
          setIdNumber([`A0${index+1}`]);
          setUserId(data._id) 
         return (

          
              <div key={data._id}>
                <MDBRow className="table-body-data p-3 mt-3"> 
                  <MDBCol className="list-queue-data d-flex justify-content-center align-items-center" md='3'>
                    <div>
                       <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>A0{index+1}</p>
                    </div>
                  </MDBCol>
                  <MDBCol className="list-queue-data" md='3'>
                        <div className=''>
                            <div>
                                <BiUser />
                                <span className='list-queue-data-span'>{data.name}</span>
                            </div> 
                            <div>
                                <BiMobile />
                                <span className='list-queue-data-span'>+(63) {data.mobileNo}</span>
                            </div> 
                            <div>
                                <BiGroup />
                                <span className='list-queue-data-span'>{data.personCount}</span>
                            </div> 
                        </div>
                  </MDBCol>
                  <MDBCol className="list-queue-data d-flex justify-content-center align-items-center" md='3'>
                        <span style={{ border: "1px solid #191444", padding: "0.5rem 1rem", fontSize: "0.8rem", borderRadius: "5px" }}>Walk in</span>
                  </MDBCol>
                  <MDBCol className="list-queue-data d-flex justify-content-center align-items-center" md='1'>
                       <Dropdown align="end" drop="up">
                          <Dropdown.Toggle className='' style={{ backgroundColor: "transparent", border: "2px solid #A3A1B5", width: "3.2rem"}} id={idNumber}  disabled={isDisabled}>
                             <BiDotsVerticalRounded  style={{ color: '#A3A1B5', }}/>
                          </Dropdown.Toggle>

                          <Dropdown.Menu >
                            <Dropdown.Item href="#/action-1">Send SMS Notification</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit Queue</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" style={{ color: "red" }}>Remove Queue</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>    
                  </MDBCol>
                  <MDBCol className="list-queue-data  d-flex justify-content-center align-items-center" md='1'>
                      { console.log(isDisabled + " data1 ") }
                      <button 
                        className='' style={{ backgroundColor: "transparent", border: "2px solid #A3A1B5", width: "3.2rem", borderRadius: '5px'}} 
                        onClick={ (e) => handleClick(e, data)}
                        disabled={isDisabled ? true : false}
                        >
                        <BsArrowRight style={{ color: '#A3A1B5', }}/>
                      </button>
                  </MDBCol>
                </MDBRow>
              </div>
       
         )
       }))
    } catch(error) {
      console.log(`Fetch Data Error: ${error}`);
    }

  }


  console.log(idNumber + " data id :: ");

  useEffect(() => {
    fetchData(isDisabled);
  }, [isDisabled]);

  return (
    <div className="mt-4">
      <MDBRow className="">
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

            <div className='list-queue-tableBody mt-3'>
             {queueData}
            </div>
            <div className='list-queue-tableFooter p-3 mt-3 d-flex justify-content-between'>
                <span style={{fontWeight: "400", fontSize: "1rem", color: "#191444",}}>Total on-going queues</span>
                <span style={{fontWeight: "700", fontSize: "1rem", color: "#191444",}}>{queueData.length} Queues</span>
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
                <p style={{ textTransform: "uppercase", color: "#A3A1B5", fontWeight: "700", textAlign: "center", }}>queue number</p>
                <p style={{ textTransform: "uppercase", color: "#A3A1B5", fontWeight: "700", textAlign: "center", }}>{idNumber}</p>

                <div className='current-serving-body-user'>
                     { getServeNow }       
                      { console.log(getServeNow) }
                </div>
            </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default ListQueue