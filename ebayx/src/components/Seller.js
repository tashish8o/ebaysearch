import React from 'react'
import "./MyResponsiveTable.css";
import CircularProgressBar from "./index.tsx";
import { ReactComponent as Stars } from './stars1.svg';
import { ReactComponent as Star_Border } from './star_border1.svg';
import "./fora.css";



/*
"Used CircularProgressBar to create a ring around the number from https://github.com/amit08255/circular-dashed-progress-react" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  





const Seller = ({item}) => {

    //console.log("Hi seller");



    try{

        var score=item.sellerInfo[0].feedbackScore[0];		

    }
    catch(e){

        var score="";

    }
    try{

        var pop=item.sellerInfo[0].positiveFeedbackPercent[0];
        var popx=pop;
        pop=
        <CircularProgressBar
        selectedValue={popx}
        maxValue={100}
        radius={25}
        valueFontSize="16"
        activeStrokeColor='#008000'
        backgroundColor='#2C3034'
        textColor="#FFFFFF"
        />		

    }
    catch(e){

        var pop="";

    }
    try{

        var star=item.sellerInfo[0].feedbackRatingStar[0];
        var starx=star
        if (star=="None")
        star="N/A";
        else
        {

            if(score>=10000){
            starx=starx.replace("Shooting","")    
            star=<Stars fill={starx}  color={starx} style={{width:"30px",height:"30px"}} width="30px" height="30px" />
            }
            else
            star=<Star_Border fill={starx}  color={starx} width="30px" height="30px" style={{width:"30px",height:"30px"}} />

        }


    }
    catch(e){

        var star="";

    }
    try{

        var top=item.sellerInfo[0].topRatedSeller[0];
        if(top=="true")
        top=<img src={require('./tick.png')}  style={{height:"24px", width:"24px"}} alt='tick' />;
        else
        top=<img src={require('./close.png')} style={{height:"24px", width:"24px"}} alt='cross' />;        		

    }
    catch(e){

        var top="";

    }
    try{

        var store=item.storeInfo[0].storeName[0];		

    }
    catch(e){

        var store="";

    }
    try{

        var storex=item.storeInfo[0].storeURL[0];
        //console.log("storeurl",storex);
        var storexx=storex;
        storex=<a href={storexx} target='_blank'><div className='linktextx'>Store</div></a>;	
        //console.log(storex);	

    }
    catch(e){

        var storex="";

    }

    var data=[

        {Name:"Feedback Score", Value:score},
        {Name:"Popularity", Value:pop},
        {Name:"Feedback Rating Star", Value:star},
        {Name:"Top Rated", Value:top},
        {Name:"Store Name", Value:store},
        {Name:"Buy Product At", Value:storex},

    ];
    //console.log("data seller",data);
    var filterData=data.filter((item) => item.Name && (item.Value !== null) && (item.Value !== "") && (item.Value !== undefined));


    






  return (



    <div className="container sellerTable">

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>


    <table className="table table-striped table-dark">
    <tbody> 
    
     {store!="" && store!=null && store!=undefined && <tr className="row">
        <td style={{ fontWeight:"bold" }} className="col-sm-12">{store}</td>
      </tr>}

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

export default Seller