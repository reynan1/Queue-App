import { BiSearch } from 'react-icons/bi';

const searchForm = ({ handleSearchForm, handleData }) => {
  return (
       <div className='mt-4'>
          <div className='search-form d-flex '>
             <input type='text' className='' placeholder='Search Queue Number, Mobile Number or Name' onChange={(e) => handleData(e.target.value)}/>
            <BiSearch className='search-icon' onClick={handleSearchForm}/>
          </div>
       </div>
  )
}


export default searchForm