import { CgToggleSquareOff } from 'react-icons/cg';
import {  BiDotsVerticalRounded } from "react-icons/bi";
import { RxSpeakerLoud } from 'react-icons/rx';
import { BsCheck2 } from 'react-icons/bs'

// return getServeNow data if true else nothing found
const ServeData = ({getServeNow, serveDone }) => {
  return (
    <>
    {
    getServeNow ?   

    getServeNow.map( (data, index) => {
          return (

            data.serve ? (
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
           </div> ) : (<h1 key={1} style={{ fontSize: "1.5rem", textAlign: "center", color: "#A3A1B5", }}> Nothing Found</h1>)
          ) 
      }) : (<h1 key={1} style={{ fontSize: "1.5rem", textAlign: "center", color: "#A3A1B5", }}> Nothing Found</h1>)
    }
      </> 
  )
 
}

export default ServeData