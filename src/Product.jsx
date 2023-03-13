import React, { useEffect } from 'react'

const Product = () => {
  const callAPI = () =>{
    const url='';
    const config = {
      headers:'',
      params:{query:'인천중식',size:5,page:1}
    }
  }

  useEffect(()=>{
    callAPI();
  },[])
  
  return (
    <div>
        <h1>상품검색</h1>
    </div>
  )
}

export default Product