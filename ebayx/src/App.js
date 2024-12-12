import React, { useEffect } from 'react';
import Formx from './components/Formx';
import './App.css';
import { useState } from 'react';
import ItemTablex from './components/ItemTablex';
import SingleItem from './components/SingleItem';
import Wishlist from './components/Wishlist';
import "./buttons.css";







function App() {

  const [jsonData,setjsonData]=useState(null);
  const [x,xx]=useState(false);
  const [Arr,SetArr]=useState(null);
  const [y,yy]=useState(false);
  const [jsonSingleData,setjsonSingleData]=useState(null);
  const [z,zz]=useState(true);
  const [res,setres]=useState(true);
  const [wish,setwish]=useState(false);
  const [wishlistIDsx,setwishlistIDsx]=useState([]);
  const [finwish,setfinwish]=useState(null);
  const [sucker,setsucker]=useState(null);
  const [highlight,sethighlight]=useState(null);
  const [prog,setprog]=useState(false);
  const [page,setpage]=useState(1);



const getWishList=async() => {



    try {

        var data=null;
        
           const response = await fetch("/retrieveAll");
              if (response.ok) {
                data = await response.json();
                //console.log("Wishlist data:",data);
                setfinwish(data);
                if(data.length>0)
                setsucker(true);
                else
                setsucker(false);
                
              } else {
                console.error('DB fetch failed');
              }
            } catch (error) {
              console.error('Error:', error);
       
            }



}


const setfinwishx=(X)=>{

  setfinwish(X);


}

const sethighlightx=(X)=>{


  sethighlight(X);


}





const retIDs=async()=>{


  try {

      var data=null;
      
         const response = await fetch("/retrieveIDs");
      
            if (response.ok) {
              data = await response.json();
              setwishlistIDsx(data);
              ////console.log('Response from the server:', data);
            } else {
              console.error('DB fetch failed');
            }
          } catch (error) {
            console.error('Error:', error);
     
  }

  //console.log("inretIDs");




 }





  
  //const [showTable,setshowTable]=useState(true);

  const getdataYo = (data)=>{

    setjsonData(data);
    //retIDs();

    ////console.log(JSON.stringify(jsonData,null,2));


  }
  const getdataYo2 = (data)=>{

    setjsonSingleData(data);
    //retIDs();

    ////console.log(JSON.stringify(jsonData,null,2));


  }

  const setx = (x)=>{

    xx(x);
    //retIDs();

  }
  const sety = (y)=>{

    yy(y);
    //retIDs();

  }  

  const setz = (z)=>{

    zz(z);
    //retIDs();

  }

  const setresx = (res)=>{

    setres(res);
    //retIDs();

  }
  const setwishx = (wish)=>{

    setwish(wish);
    //retIDs();

  }
  const setwishlistIDsxx = (wish)=>{

    setwishlistIDsx(wish);
    //retIDs();

  }

  const setprogx=(X)=>{

    setprog(X);

  }

  const setpagex = (x)=>{
    setpage(x);
  }
  




  const getarrYo = (data)=>{

    SetArr(data);
    //xx(false);


    ////console.log(data);


  } 


  const resultsButton=()=>{



    zz(false);
    setprog(true);


    setTimeout(() => {
      retIDs();
    }, 1000);

    // setTimeout(() => {
    //   getWishList();
    // }, 500);





    setTimeout(() => {
      setwish(false);
      setres(true);
      setprog(false);
      zz(true);
    }, 1500);







  }
  const wishButton=()=>{

    zz(false);
    setprog(true);


    setTimeout(() => {
      retIDs();
    }, 1000);

    setTimeout(() => {
      getWishList();
    }, 1000);

    setTimeout(() => {
      setwish(true);
      setres(false);
      setprog(false);
      zz(true);
    }, 1500);


  } 




  








  return (



<div className="container App" style={{paddingTop:"10px",marginBottom:"100px"}}>


      <Formx propx={getdataYo} x={setx} xxx={x} y={sety} yyy={y} z={setz} zzz={z}  setres={setresx} res={res} setwish={setwishx} wish={wish} setwishlistIDsx={setwishlistIDsxx} wishlistIDsx={wishlistIDsx} finwish={finwish} setfinwish={setfinwishx} highlight={highlight} sethighlight={sethighlightx} jsonsingleprev={jsonSingleData} setjsonsingleprev={getdataYo2} prog={prog} setprog={setprogx} page={page} setpage={setpagex}/>  
      <br/>
            
      <input onClick={resultsButton} type="radio" className="btn-check" name="results" id="results" autocomplete="off" checked={res === true} />
        <label className="btn btn-light" for="results">Results</label>
      <input onClick={wishButton} type="radio" className="btn-check" name="wishlist" id="wishlist" autocomplete="off" checked={wish === true}/>
        <label className="btn btn-light" for="wishlist">Wish List</label>
 
      <br/>
        

<div >
<div >

  <br/>

    {prog &&  <div>  <div className="progress">
  <div
    className="progress-bar progress-bar-striped progress-bar-animated"
    role="progressbar"
    aria-valuenow="50"
    aria-valuemin="0"
    aria-valuemax="100"
    style={{ width: '50%' }} // Use a JavaScript object to define styles
  ></div>
  </div>
</div>}


<div style={{overflowX:"scroll"}}> 


    {
     

     z && res==true && wish==false && x &&(

    <ItemTablex jsonx={jsonData} Arr={getarrYo} x={setx} xxx={x} yy={sety} yyy={y} z={setz} zzz={z} jsonsingleprev={jsonSingleData} propxx={getdataYo2} setres={setresx} res={res} setwish={setwishx} wish={wish} setwishlistIDsx={setwishlistIDsxx} wishlistIDsx={wishlistIDsx} finwish={finwish} setfinwish={setfinwishx} highlight={highlight} sethighlight={sethighlightx} prog={prog} setprog={setprogx} page={page} setpage={setpagex}/>

      )

    }

</div>




<div>
    
    
    {
    z && res==true && wish==false && y && (<SingleItem ID={Arr} x={setx} xxx={x} yy={sety} z={setz} zzz={z} yyy={y} jsonxx={jsonSingleData} setres={setresx} res={res} setwish={setwishx} wish={wish} setwishlistIDsx={setwishlistIDsxx} wishlistIDsx={wishlistIDsx} finwish={finwish} setfinwish={setfinwishx} highlight={highlight} sethighlight={sethighlightx} prog={prog} setprog={setprogx} page={page} setpage={setpagex}/>)
    }
  
</div>
<div style={{overflowX:"scroll"}}>
    {
z && res==false && wish==true && finwish && (<Wishlist Arr={getarrYo} x={setx} xxx={x} yy={sety} yyy={y} z={setz} zzz={z} jsonsingleprev={jsonSingleData} propxx={getdataYo2} setres={setresx} res={res} setwish={setwishx} wish={wish} setwishlistIDsx={setwishlistIDsxx} wishlistIDsx={wishlistIDsx} getWishList={finwish} setfinwish={setfinwishx} sucker={sucker} highlight={highlight} sethighlight={sethighlightx} prog={prog} setprog={setprogx} page={page} setpage={setpagex}/>)
    }
    
</div> 

</div>
</div>
    </div>
  );
}

export default App;
