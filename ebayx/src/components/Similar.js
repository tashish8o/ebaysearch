import React from 'react'
import { useState,useRef } from 'react';
import similarExcess from './similarExcess';
const Similar = ({similarJSON,setSlicedXXX}) => {



    try{


    console.log("Hi1");    

    const item=similarJSON.getSimilarItemsResponse.itemRecommendations.item;

    var X = [];

for (var i = 0; i < item.length; i++) {
  X[i] = {
    Image: "",
    Title: "",
    Price: "",
    Shipping: "",
    Days: "",
    URLx: ""
  };

  try {
    X[i].Image = item[i].imageURL;
  } catch (e) {
    X[i].Image="NO IMAGE AVAILABLE";
  }

  try {
    X[i].Title = item[i].title;
  } catch (e) {
    X[i].Title = "N/A";
  }

  try {
    X[i].Price = "Price: $" +item[i].buyItNowPrice.__value__;
  } catch (e) {
    X[i].Price = "N/A";
  }

  try {
    var sh=item[i].shippingCost.__value__;
    X[i].Shipping = "Shipping Cost: $"+sh;
  } catch (e) {
    X[i].Shipping = "N/A";
  }

  try {
    X[i].Days = item[i].timeLeft;

    const pattern = new RegExp(`${"P"}(.*?)${"D"}`);
    const match = X[i].Days.match(pattern);

    X[i].Days=match[1];

  } 
  catch (e) {
    X[i].Days = "N/A";
  }

  try {
    X[i].URLx = item[i].viewItemURL;
  } catch (e) {
    X[i].URLx = "NO LINK AVAILABLE";
  }

}

if(item.length>=5)
{
    //setshowMore(!showMore);
    var slicedX=(X.slice(0, 4));
    var slicedXX=(X.slice(5, item.length));

}
else{

    //setshowMore(showMore);
    var slicedX=(X.slice(0, item.length));
    var slicedXX=[];

}


  return (

    <div className="similarTable">

<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" />
<div class="container" >

            {slicedX
            .map((item) => (

                
                <div class="card mb-2" style={{backgroundColor:"black"}}> 
                    <div class="row no-gutters">
                        <div class="col-md-2">
                            <div class="menu-image h-100 d-flex align-items-start my-4 mx-3">
                                <a href={item.Image} target='_blank'><img src={item.Image} class="fixed-image" alt="menu image" style={{height:"100px",width:"100px"}}/></a>
                            </div>
                        </div>
                        <div class="col-md-10 px-1 py-4" style={{textAlign:"left" }}>
                                <a href={item.URLx} target='_blank'>{item.Title}</a><br/>
                                <span style={{color:"green"}}>{item.Price}<br/></span>
                                <span style={{color:"gold"}}>{item.Shipping}<br/></span>
                                <span style={{color:"white"}}>{item.Days}</span>
                        </div>  
                    </div>
                </div>              


            ))}

    {setSlicedXXX(slicedXX)}         




</div>
    </div>
  )

            }
            catch (e) {}

  
}
export default Similar