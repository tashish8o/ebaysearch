import React from 'react'
import { useState } from 'react'


const Photos = ({ID,googleJSON}) => {

  console.log("Hi photos");

try{


    const item=googleJSON.items;
    var img1;
    var img2;
    var img3;
    var img4;
    var img5;
    var img6;
    var img7;
    var img8;

    

    const imglinks=[];

    for(var i=0;i<item.size;i++){
        console.log(item[i].link);
    }

    try{
      img1=item[0].link;
    }
    catch(e){

      img1="";

    }
    try{
      img2=item[1].link;
    }
    catch(e){
      
      img2="";

    }    
    try{
      img3=item[2].link;
    }
    catch(e){
      
      img3="";

    }
    try{
      img4=item[3].link;
    }
    catch(e){
      
      img4="";

    }
    try{
      img5=item[4].link;
    }
    catch(e){
      
      img5="";

    }    
    try{
      img6=item[5].link;
    }
    catch(e){
      
      img6="";

    }
    try{
      img7=item[6].link;
    }
    catch(e){
      
      img7="";

    }
    try{
      img8=item[7].link;
    }
    catch(e){
      
      img8="";

    }







  return (
    <div className='PhotosTab'>



<div className="container">
      <div className="row mb-2">
         <div className="col-sm-4 px-1">
          <div className="row mb-2" >
          <a href={img1} target="_blank" rel="noopener noreferrer"><img src={img1} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto" }} /></a>
          </div>
          <div className="row mb-2" >
          <a href={img2} target="_blank" rel="noopener noreferrer"><img src={img2} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto"}}/></a>
          </div>

        </div>

        <div className="col-sm-4 px-1 ">
          <div className="row mb-2" >
          <a href={img3} target="_blank" rel="noopener noreferrer"><img src={img3} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto"}}/></a>
          </div>
          <div className="row mb-2" >
          <a href={img4} target="_blank" rel="noopener noreferrer"><img src={img4} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto"}}/></a>
          </div>
          <div className="row mb-2" >
          <a href={img5} target="_blank" rel="noopener noreferrer"><img src={img5} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto"}}/></a>
          </div>
        </div>
        
        
        <div className="col-sm-4 px-1">
          <div className="row mb-2" >
          <a href={img6} target="_blank" rel="noopener noreferrer"><img src={img6} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto"}}/></a>
          </div>
          <div className="row mb-2" >
          <a href={img7} target="_blank" rel="noopener noreferrer"><img src={img7} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto"}}/></a>
          </div>
          <div className="row mb-2" >
          <a href={img8} target="_blank" rel="noopener noreferrer"><img src={img8} alt="product image" style={{border: "10px solid black", maxWidth:"100%",height:"auto"}}/></a>
          </div>
        </div>
      </div>
    </div>






    
    
    </div>
      


  )
}
catch (e) {

  return (
    <div className='container'>
    <div className="alert alert-warning" role="alert" style={{ textAlign:'left' }}> 
    No Photos Found. 
    </div>
    </div>
    )


}
}


export default Photos