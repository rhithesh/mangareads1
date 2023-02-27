import React from 'react'
import axios from "axios"
import './Heder.css'
import { useEffect,useState } from 'react'


function Head() {

    useEffect(() => {
      pagecont()
        fetchBooks()
        chapclick()
        
    }, [])
    


    const [Data,setData]=useState([])
    const [chap,setchap]=useState([])
    const [page,setpage]=useState([])
    const[counter,setcounter]=useState(0)

    const fetchBooks = async () => {
        try {
          const response = await axios.get('http://18.177.140.79:8080/books/');
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      const pagecont = async (a=1) => {
        try {
          const response = await axios.get(`http://18.177.140.79:8080/chapters/${a}/`);
          setpage(response.data);
          
        } catch (error) {
          console.error(error);
        }
      };
      const chapclick = async (a=1) => {
        try {
          const response = await axios.get(`http://18.177.140.79:8080/books/${a}/`);
          setchap(response.data.chapter_ids);
        } catch (error) {
          console.error(error);
        }
      };
     
      const logic = (a) => {

       
          if (a < page.pages.length && a >= 0) {
            setcounter(a);
          }  else if (a >= page.pages.length) {
            setcounter(page.pages.length - 1);
          }


        
       
      };
      

      
  return (
    <div className='main'>Manga reader
        <div>
          
        {Data.map((a)=>
        <button type='checkbox' key={a.id} className="hi" onClick={()=>{chapclick(a.id)
          pagecont(a.chapter_ids[0])
        
          setcounter(0)}}> {a.title}</button>
        )}
        
           </div> 

        <div>
        {chap.map((a,index)=>
        <button className="hi1" type='checkbox' onClick={()=>{pagecont(a)
          setcounter(0)}} > {index+1}</button>
        )

        }


        </div>

        {
  page.pages && page.pages.length > 0 && page.pages[0].image && 
  (<div>
    <div className='toabs'>
    <img src={page.pages[counter].image.file} alt="" />
  <h1>{counter+1}/{page.pages.length}</h1>
    </div>
  <div className='clicks'>
  <div onClick={()=>logic(counter-1)}></div> 
    <div onClick={()=> {logic(counter+1)}}></div> 
  


  </div>
  

  </div>)
  
}

        

         
            
       
        
    </div>

  )
}

export default Head