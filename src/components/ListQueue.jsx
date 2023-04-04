import { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { BiUser, BiMobile, BiGroup,BiDotsVerticalRounded } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs"
import { HiInformationCircle } from 'react-icons/hi';
import Dropdown from 'react-bootstrap/Dropdown';

const ListQueue = () => {
  const [queueData, setQueueData] = useState([]);
  const [userId, setUserId] = useState('');
  const [getServeData, setGetServeData] = useState([]);
  const [idNumber, setIdNumber] = useState([]);
  


  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/queue/list`, {
        headers: {
          Accept: 'application/json',
        },
      }); 

      const handleClick = async (e, data) => {
        e.preventDefault();



        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/queue/serve/${data._id}`, {
            serve: true,
          })  
          
          setGetServeData(response.data);

          console.log(response);
        } catch(error) {
          console.log(error);
        }
       
      } 




       setQueueData(response.data.map((data, index) => {
          setIdNumber(`A0${index+1}`);
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
                                <span>{data.name}</span>
                            </div> 
                            <div>
                                <BiMobile />
                                <span>+(63) {data.mobileNo}</span>
                            </div> 
                            <div>
                                <BiGroup />
                                <span>{data.personCount}</span>
                            </div> 
                        </div>
                  </MDBCol>
                  <MDBCol className="list-queue-data d-flex justify-content-center align-items-center" md='3'>
                        <span style={{ border: "1px solid #191444", padding: "0.5rem 1rem", fontSize: "0.8rem", borderRadius: "5px" }}>Walk in</span>
                  </MDBCol>
                  <MDBCol className="list-queue-data d-flex justify-content-center align-items-center" md='1'>
                       <Dropdown align="end" drop="up">
                          <Dropdown.Toggle className='' style={{ backgroundColor: "transparent", border: "2px solid #A3A1B5", width: "3.2rem"}} id={idNumber}  disabled={data.serve}>
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
                      <button 
                        className='' style={{ backgroundColor: "transparent", border: "2px solid #A3A1B5", width: "3.2rem", borderRadius: '5px'}} 
                        onClick={ (e) => handleClick(e, data)}
                        disabled={data.serve}
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


  useEffect(() => {
    fetchData();

  }, []);
  console.log(getServeData + " name ");
 console.log(idNumber);


  return (
    <div className="mt-4">
      <MDBRow className="">
        <MDBCol className="list-queue" md='7'>
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
        <MDBCol className="current-serving" size='6'  md='5'>
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

                  {console.log(getServeData)}           

                </div>
            </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default ListQueue