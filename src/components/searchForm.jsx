
import { BiSearch } from 'react-icons/bi';

const searchForm = () => {
  return (
    
       <div className='mt-4'>
          <div className='search-form d-flex '>
             <input type='text' className='' placeholder='Search Queue Number, Mobile Number or Name'/>
            <BiSearch />
          </div>
       </div>
 
  )
}

export default searchForm