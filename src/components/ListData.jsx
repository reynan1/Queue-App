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

const ListData = ({ queueData, handleClick, isDisabled, idNumber }) => {

    return (
        <>      

        {
        queueData ?   
        queueData.map((data, index) => {   

            return (  
             <div key={data._id}>
               <MDBRow className="table-body-data p-3 mt-3"> 
                 <MDBCol className="list-queue-data d-flex justify-content-center align-items-center" md='3'>
                   <div>
                      <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{  `A0${index+1}`}</p>
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

                   
                     <button 
                       className='' style={{ backgroundColor: "transparent", border: "2px solid #A3A1B5", width: "3.2rem", borderRadius: '5px'}} 
                       onClick={ (e) => handleClick(e, data, `A0${index+1}`)}
                       disabled={isDisabled ? true : false}
                       >
                       <BsArrowRight style={{ color: '#A3A1B5', }}/>
                     </button>
                 </MDBCol>
               </MDBRow>
             </div>
  
             )
      }) :
      <div style={{ width: "100%", height: "100%",}} className='d-flex justify-content-center align-items-center'>
       <h1 style={{ color: '#A3A1B5', }}>  Nothing Found </h1>
      </div>
    }
      </>

      )
}

export default ListData