import { useEffect } from 'react'
import { useState } from 'react'

import './App.css'

function App() {
  const [product, setProducts] = useState([])
  const [page,setpage]=useState(1)
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => setProducts(data.products
      ))

  }, [])
  const selectedPage=(select)=>{
    if(select>=1 && select<=product.length/10 && select!==page){
      setpage(select)
    }
  }
  return (
    <div>
      <div className='card'>
        {product.length > 0 && <div className='single-card'>
          {product.slice(page*10 -10, page*10).map((ele, id) => <div key={id} className='single'>

            <img src={ele.thumbnail} alt="" />
            <h3>{ele.title}</h3>
            <h4>{ele.price}</h4>
          </div>)}
        </div>}
      </div>
      <div className='pagination'>
      <span onClick={()=>selectedPage(page-1)} className={page>1 ? '':'pagination__disable'}>◀</span>

        {product.length > 0 && <div className=''>
          {[...Array(product.length / 10)].map((_, i) => {
            return <span className={`bord ${page===i+1 ? 'pagination__selected' : ' '}`} onClick={()=>selectedPage(i+1)}>{i + 1}</span>
          }

          )}
        </div>}
        <span onClick={()=>selectedPage(page+1)} className={page<product.length/10 ? " ":"pagination__disable"}>◀</span>
      </div>
    </div>
  )
}

export default App
