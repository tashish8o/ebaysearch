import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./MyResponsiveTable.css";


const Shipping = ({item}) => {

    //console.log("Hi ship");


    try{

        var shipcost=item.shippingInfo[0].shippingServiceCost[0].__value__;
        if(shipcost==0.0)
        shipcost="Free Shipping";
        else
        shipcost="$"+shipcost;

    }
    catch(e){

        var shipcost="";

    }
    try{

        var shiploc=item.shippingInfo[0].shipToLocations[0];

    }
    catch(e){

        var shiploc="";

    }
    try{

        var hand=item.shippingInfo[0].handlingTime[0];

        if(hand==0 || hand==1)
        hand=hand+" Day";
        else
        hand=hand+" Days";


    }
    catch(e){

        var hand="";

    }
    try{

        var exp=item.shippingInfo[0].expeditedShipping[0];
        if(exp==="true")
        exp=<img src={require('./tick.png')} style={{height:"24px", width:"24px"}} alt='tick'  />;
        else
        exp=<img src={require('./close.png')} style={{height:"24px", width:"24px"}} alt='cross' />;

    }
    catch(e){

        var exp="";

    }
    try{

        var oneday=item.shippingInfo[0].oneDayShippingAvailable[0];
        if(oneday==="true")
        oneday=<img src={require('./tick.png')} style={{height:"24px", width:"24px"}} alt='tick'  />;
        else
        oneday=<img src={require('./close.png')} style={{height:"24px", width:"24px"}} alt='cross' />;

    }
    catch(e){

        var oneday="";

    }
    try{

        var reta=item.returnsAccepted[0];
        if(reta==="true")
        reta=<img src={require('./tick.png')}  style={{height:"24px", width:"24px"}} alt='tick' />;
        else
        reta=<img src={require('./close.png')} style={{height:"24px", width:"24px"}} alt='cross' />;

    }
    catch(e){

        var reta="";

    }

    var data=[

        {Name:"Shipping Cost", Value:shipcost},
        {Name:"Shipping Locations", Value:shiploc},
        {Name:"Handling Time", Value:hand},
        {Name:"Expedited Shipping", Value:exp},
        {Name:"One Day Shipping", Value:oneday},
        {Name:"Return Accepted", Value:reta},

    ];

    var filterData=data.filter((item) => item.Name && (item.Value !== null) && (item.Value !== "") && (item.Value !== undefined));


  return (

<div className="container shippingTable">

<table className="table table-dark">
    <tbody>
    {filterData.map((item, index) => (

      <tr className="row" style={{textAlign:"left"}} key={index}>
        <td style={{ fontWeight:"bold" }} className="col-sm-6">{item.Name}</td>
        <td className="col-sm-6" >{item.Value}</td>
      </tr>
    ))} 
    </tbody>    
</table>




</div>

  )
}

export default Shipping