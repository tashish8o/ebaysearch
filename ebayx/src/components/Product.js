import React from 'react'
import "./MyResponsiveTable.css";
import ImageModal from './ImageModal';
import { useState } from 'react';
import './fora.css';

const Product = ({item,jsonSingle}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]); 


    //console.log("hi product");
    var itemSpecifics=jsonSingle.Item.ItemSpecifics.NameValueList;
    var filteritemSpecifics=itemSpecifics.filter((item) => (item.Name !== null) && (item.Name !== "") && (item.Name !== undefined) && (item.Value !== null) && (item.Value !== "") && (item.Value !== undefined));
    
    const handleTdClick = (images) => {
        setSelectedImages(images);
        setShowModal(true);
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };
      



    try{
        var imgs=jsonSingle.Item.PictureURL;
    }
    catch(e){

        var imgs="";

    }
    
    try{
        var price="$"+jsonSingle.Item.CurrentPrice.Value;
    }
    catch(e){

        var price="";

    }
    try{
        var loc=jsonSingle.Item.Location;
    }
    catch(e){
        var loc="";

    }
    try{
        var ret1=jsonSingle.Item.ReturnPolicy.ReturnsAccepted;

        if(ret1=="ReturnsNotAccepted")
        var ret=ret1;
        else{
        var ret2=jsonSingle.Item.ReturnPolicy.ReturnsWithin;

        ret2=" Within "+ret2;

        var ret=ret1+ret2;
        }
        
        if(ret=="")
        ret="";



    }
    catch(e){

        if((ret1===null || ret1 === undefined))
        {
        try{    
        var ret2=jsonSingle.Item.ReturnPolicy.ReturnsWithin;  
        ret2=" Within "+ret2;  
        var ret=ret2;
        }
        catch(e){
            var ret="";
        }
        }
        else if((ret2===null || ret2 === undefined) && (ret1!=null || ret1 === undefined))
        {    
        ret=ret1;
        }
        else
        ret="";
      

    }





    var data=[

        {Name:"Price", Value:price},
        {Name:"Location", Value:loc},
        {Name:"Returns Policy", Value:ret},

    ];

    var filterData=data.filter((item) => item.Name && (item.Value !== null) && (item.Value !== "") && (item.Value !== undefined));



  return (
    <div className="container productTable">
    

    <table className="table table-striped table-dark">
        <tbody>


        {
        imgs && imgs!="" && imgs!=null && imgs!=undefined && <tr className="row" style={{textAlign:"left"}}>
            <td style={{ fontWeight:"bold" }} className="col-sm-2">Product Images</td>
            <td className="col-sm-10"><div onClick={() => handleTdClick(imgs)} className='linktextx'>View Product Images Here</div></td>
          </tr>
        }
        




        {filterData.map((item, index) => (

          <tr className="row"  key={index} style={{textAlign:"left"}}>
            <td style={{ fontWeight:"bold" }} className="col-sm-2">{item.Name}</td>
            <td className="col-sm-10">{item.Value}</td>
          </tr>
        ))}
        {filteritemSpecifics.map((item, index) => (

          <tr className="row"  key={index} style={{textAlign:"left"}}>
            <td style={{ fontWeight:"bold" }} className="col-sm-2">{item.Name}</td>
            <td className="col-sm-10">{item.Value}</td>
          </tr>
        ))} 
   </tbody>         
    </table>

    <ImageModal show={showModal} handleClose={handleCloseModal} images={selectedImages} />




    </div>
  )
}

export default Product
