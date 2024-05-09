import axios from 'axios'
import React , { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Category = () => {

    const[category, setCategory] = useState();
    console.log(category);

    useEffect(()=> {
      axios.get('http://localhost:3000/smdashboard/category')
      .then(result => {
        if(result.data.Status){
          setCategory(result.data.Result);
        }else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
    },[])
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to="/smdashboard/addcategory" className='btn btn-success'>Add Category</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              category.map(c => (
                <tr>
                  <td>{c.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category;
