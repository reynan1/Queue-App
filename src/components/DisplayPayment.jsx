import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Modal,Button } from 'react-bootstrap';
import { HiInformationCircle } from 'react-icons/hi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsPlusLg, BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { CgToggleSquareOff } from 'react-icons/cg';

const DisplayPayment = () => {
    const [show, setShow] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [name, setName] = useState('');
    const [count, setCount] = useState(1);
    const [num, setNum] = useState(0);
    const [isDisabled, setDisabled] = useState(true);
    const [isActive, setIsActive] = useState(false);


    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
   
    // add value every click on plus button
    const handleAdd = (prev) => {
         setCount(prev + 1);
    }
    
    // minus value every click on minus button
    const handleMinus = (prev) => {
         if(prev > 1) {
           setCount(prev - 1);
         } 
    }


   
    // submit the data on form to mongodb atlas
    const handleSubmit = async (e, idNumber) => {
       e.preventDefault();
       setNum( num + 1 )
       window.localStorage.setItem("idNum:", num);

       console.log(num + "my num")
       try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/queue/addOrder`, {
              queueID: ``, 
              mobileNo: mobileNo,
              personCount: count,
              name: name,    
         });

         if(response.data.result === false) {
            Swal.fire({
               title: 'Server Error',
               icon: 'error',
               text: `Order is not successfully created`,
            })
        }

        if(response.status === 200 && response.data.result === true) {
           Swal.fire({
             title: 'Successfully Order',
             icon: 'success',
             text: `Order successfully created`
           })

           setMobileNo('');
           setCount(1);
           setName('');

           setShow(false);
   
        }


         console.log(response);

         console.log(response.data)
       } catch(error) {
         console.log(error);
       }
   
    }

    // disbale the button minus if the count value is equal to  1
    useEffect(() => {
         if(count < 1) {
            setDisabled(true);
         } else {
            setDisabled(false);
         }  
    }, [count])

    // disbale the submit button if the mobile number and count person is no value
    useEffect(() => {
         if(mobileNo.length !== 0 && count.length !== 0 && count !== 0) {
            setIsActive(true);
         } else {
            setIsActive(false);
         }
    }, [mobileNo, count])

  return (
        <section className='p-4' style={{backgroundColor: "#FFFFFF"}}>
          <div>
                <Modal
                    className='modal-lg'
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header style={{border: "0",}} closeButton>
     
                    </Modal.Header>
                    <Modal.Body className='p-5'>
                      <div className='model-header d-flex flex-column align-items-center'>
                        <h2>Add Queue</h2>
                        <p className='mt-1'>Fill-up fields with the customer`s data</p>
                      </div>
                     <form className='model-form mt-5' onSubmit={(e) => handleSubmit(e)}>
                         <p> customer details </p>
                        <div className='mt-3 d-flex justify-content-between gap-3'>
                          <div className='inner-form d-flex flex-column'>
                             <label>Mobile Number</label>
                             <div>
                             <span> (+63) </span>
                             <input 
                                type="text" 
                                value={mobileNo}
                                placeholder=' 000-000-000'
                                onChange={(e) => setMobileNo(e.target.value)} 
                                />
                                </div>
                          </div>
                          <div className='inner-form '>
                             <label>How many people?</label>
                             <div className='inner-form-count d-flex justify-content-around'>
                               <button type="button" onClick={() => handleAdd(count)} ><BsPlus  className='web-icon'/></button>
                                 <input 
                                    type="text" 
                                    style={{ textAlign: "center" }} 
                                    value={count} 
                                    onChange={() => setCount(count)} 
                                    disabled
                                    />
                               <button type="button" onClick={() => handleMinus(count)} disabled={isDisabled}><BiMinus className='web-icon'/></button>
                             </div>
                          </div>
                        </div>

                        <div className='outer-form'>
                           <input 
                              type="text" 
                              placeholder='Name (Optional)'
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              />
                        </div>

                        <div className='mt-5 d-flex justify-content-between'>
                           <div className='text-form'>
                              <span><strong>Is this queue a priority? (ex.PWD, Senior Citizen, etc.)</strong></span>
                              <p>If ON,this customer will be at the top of the queue. Will be tagged as "Walk-in Prio"</p>
                           </div>
                           <div>
                              <CgToggleSquareOff className='web-icon-large'/>
                           </div>
                        </div>

                        <div className='mt-5 d-flex justify-content-center'>
                          {
                           isActive ?
                              <Button className='modal-form-btn' type="submit">
                                    Submit 
                              </Button> :
                              <Button className='modal-form-btn' type="submit" disabled>
                                 Submit 
                              </Button>
                          }
                       
                        </div>
                     </form>
                    </Modal.Body>
                    <Modal.Footer style={{border: "0"}}>
                    </Modal.Footer>
                </Modal>
           </div>

          <Container >
            <div className='d-flex justify-content-between align-items-center'>
                <div className='payment-display'>
                    <p className=''>Payment</p>
                    <h2>Cashier 4</h2>
                    <p className=''>Single Serving <HiInformationCircle /> </p> 
                </div>  
                <div className='d-flex gap-5'>
                    <Button 
                       className="payment-display-button"  
                       style={{ width: "11rem", backgroundColor: "transparent", color: "#FE8F02", border: "2px solid #FE8F02", fontSize: "0.9rem" }}>Queue Group Details</Button>
                    <Button  
                       className="payment-display-button" 
                       style={{ width: "11rem", backgroundColor: "transparent", color: "#FE8F02", border: "2px solid #FE8F02", fontSize: "0.9rem"}}> <AiOutlineClockCircle />  Queue History</Button>
                    <Button 
                       className="payment-display-button-active"  
                       style={{width: "11rem", color: "#fff", backgroundColor: "#FE8F02", border: "none", fontSize: "0.9rem"}} 
                       onClick={handleOpen}
                       > <BsPlusLg /> add Queue
                        </Button>
                </div>  
             </div>
          </Container> 
        </section>
  )
}

export default DisplayPayment