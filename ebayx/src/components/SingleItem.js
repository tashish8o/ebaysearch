import React from 'react'
import { useState,useEffect } from 'react'
import Product from './Product';
import Photos from './Photos';
import Shipping from './Shipping';
import Seller from './Seller';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './fora.css'
import './../buttons.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import Button from '@mui/material/Button';

const SingleItem = ({ID,x,xxx,yy,yyy,z,zzz,jsonxx,setres,res,setwish,wish,setwishlistIDsx,wishlistIDsx,highlight,sethighlight,prog,setprog}) => {

    



    //console.log("Hisingle");


    const [prod,setprod]=useState(true);
    const [phot,setphot]=useState(false);
    const [ship,setship]=useState(false);
    const [sell,setsell]=useState(false);
    const [simi,setsimi]=useState(false);
    const [emptysimi,setemptysimi]=useState(false);
    // const [wish,setwish]=useState(false);
    const [jsongoogle,setjsongoogle]=useState(null);
    const [jsonsimilar,setjsonsimilar]=useState(null);

    const [showMore,setshowMore]=useState(false);
    const [showLess,setshowLess]=useState(false);
    const [XX,setXX]=useState([]);
    const [defX,setdefX]=useState([]);
    const [slicedX, setSlicedX] = useState([]);
    const [slicedXX, setSlicedXX] = useState([]);


    const [firstSelectValue, setFirstSelectValue] = useState('Default'); // State for the first select
    const [secondSelectValue, setSecondSelectValue] = useState('Ascending');
    const [WID,setWID]=useState(wishlistIDsx);


    const handleFirstSelectChange = (event) => {
        const selectedValue = event.target.value;
        setFirstSelectValue(selectedValue);
        
        // Check the selected value and disable the second select if needed
        if (selectedValue === 'Default') {
          setSecondSelectValue('Ascending');
        }

        // setSlicedX(sortByKey(slicedX,firstSelectValue,secondSelectValue));
        // setSlicedXX(sortByKey(slicedXX,firstSelectValue,secondSelectValue));


      }

    const handleSecondSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSecondSelectValue(selectedValue);
        // setSlicedX(sortByKey(slicedX,firstSelectValue,secondSelectValue));
        // setSlicedXX(sortByKey(slicedXX,firstSelectValue,secondSelectValue));

      } 
      
      

      function sortByKey(array, key, order) {


        if(key==="Default") {return defX;}




        return array.slice().sort((a, b) => {
          if (order === 'Ascending') {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
          } else if (order === 'Descending') {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
          }
        });
      }  

    // const setSlicedXXX=(value)=>{
    //     setSlicedXX(value);
    // }



    





    ////console.log(ID.itemId[0]);
    ////console.log(jsonxx);


    const productButton = ()=> {
        
        
        setprod(true);
        setphot(false);
        setship(false);
        setsell(false);
        setsimi(false);
        // setwish(false);
        // setshowLess(false);
        // setshowMore(false);  



    }

    const photosButton = async ()=> {


        await handlegoogle(ID.title);

        setprod(false);
        setphot(true);
        setship(false);
        setsell(false);
        setsimi(false);
        // setwish(false);
        // setshowLess(false);
        // setshowMore(false);

       

        
    }
    const shippingButton = ()=> {
        
        setprod(false);
        setphot(false);
        setship(true);
        setsell(false);
        setsimi(false);
        // setwish(false);
        // setshowLess(false);
        // setshowMore(false);


        
    }
    const sellerButton = ()=> {

        setprod(false);
        setphot(false);
        setship(false);
        setsell(true);
        setsimi(false);
        // setwish(false);
        // setshowLess(false);
        // setshowMore(false);


        
    }
    const simButton = async ()=> {

        await handlesimilar(ID.itemId[0]);

        setprod(false);
        setphot(false);
        setship(false);
        setsell(false);
        setsimi(true);
        // setwish(false);
        // setshowLess(false);
        // setshowMore(false);
        ////console.log(JSON.stringify(ID));


        
    }
    // const wishButton = ()=> {

    //     setprod(false);
    //     setphot(false);
    //     setship(false);
    //     setsell(false);
    //     setsimi(false);
    //     setwish(true);


        
    // }


const listButton=()=>{

    z(false);
    setprog(true);

    setTimeout(() => {
        
        sethighlight(ID.itemId[0]);
        yy(false);
        x(true);
        setprog(false);
        z(true);

      }, 1500);



}

useEffect(() => {
    sethighlight(ID.itemId[0]);
  },[]);



const handlegoogle = async (X) => {
 
     try {

    const response = await fetch("/google?ID="+X);
 
       if (response.ok) {
         const data = await response.json();
         //console.log("GOOGLLE");
        setjsongoogle(data); 
        //  propxx(responseJsonx);
       } else {
         console.error('Form submission failed');
         setjsongoogle(null);
       }
     } catch (error) {
       console.error('Error:', error);
       setjsongoogle(null);
     }
   };

   const handlesimilar = async (X) => {
    // e.preventDefault(); // Prevent the default form submission behavior
 
     try {

        ////console.log(X);
 
      // const queryString = new URLSearchParams(formDatax).toString();
 
 
       const response = await fetch("/similar?ID="+X);
 
       if (response.ok) {
         const data = await response.json();
         ////console.log('Response from the server:', data);
        setjsonsimilar(data); 

  
        const item=data.getSimilarItemsResponse.itemRecommendations.item;

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
        X[i].Image="https://tashish8.github.io/ebay_default.jpg";
      }
    
      try {
        X[i].Title = item[i].title;
      } catch (e) {
        X[i].Title = "N/A";
      }
    
      try {
        X[i].Price = parseFloat(item[i].buyItNowPrice.__value__);
      } catch (e) {
        X[i].Price = "N/A";
      }
    
      try {
        var sh=parseFloat(item[i].shippingCost.__value__);
        X[i].Shipping = +sh;
      } catch (e) {
        X[i].Shipping = "N/A";
      }
    
      try {
        X[i].Days = item[i].timeLeft;
    
        const pattern = new RegExp(`${"P"}(.*?)${"D"}`);
        const match = X[i].Days.match(pattern);
    
        X[i].Days=parseInt(match[1]);
    
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

    setXX(X);
    setdefX(X);


    
    if(item.length>=5)
    {
        setshowMore(true);
        setemptysimi(false);
        setSlicedX(X.slice(0, 5));
        setSlicedXX(X.slice(6, item.length));
    
    }
    else if (item.length>=1){
    
        setshowMore(false);
        setemptysimi(false);
        setSlicedX(X.slice(0, item.length));
        setSlicedXX([]);
    
    }

    else
    {
        setshowMore(false);
        setemptysimi(true);
        setSlicedX([]);
        setSlicedXX([]);
    }



        //  propxx(responseJsonx);
       } 
    else {
         console.error('similar submission failed');
         setjsonsimilar(null);
       }
     } catch (error) {
       console.error('Error:', error);
       setjsonsimilar(null);
     }
   };
   
   

   const showMorex=() =>{

    setshowMore(false);
    setshowLess(true);


   }

   const showLessx=() =>{

    setshowLess(false);
    setshowMore(true);

   
   }



useEffect(() => {

    const currXX=sortByKey(XX, firstSelectValue, secondSelectValue);

    
    // setXX(sortByKey(XX, firstSelectValue, secondSelectValue));


    
    if(currXX.length>=5)
    {
        // setshowMore(true);
        // setemptysimi(false);
        setSlicedX(currXX.slice(0, 5));
        setSlicedXX(currXX.slice(6, currXX.length));
    
    }
    else if (currXX.length>=1){
    
        // setshowMore(false);
        // setemptysimi(false);
        setSlicedX(currXX.slice(0, currXX.length));
        setSlicedXX([]);
    
    }

    else
    {
        // setshowMore(false);
        // setemptysimi(true);
        setSlicedX([]);
        setSlicedXX([]);
    }    

  }, [XX,firstSelectValue, secondSelectValue]);


  const setWIDx=(X) =>{


    setWID(X);




  }




const retIDs=async()=>{


    try {
  
        var data=null;
        
           const response = await fetch("/retrieveIDs");
        
              if (response.ok) {
                data = await response.json();
                setWID(data);
                setwishlistIDsx(WID);
                //console.log("RETID singleitem");
                ////console.log('Response from the server:', data);
              } else {
                console.error('DB fetch failed');
              }
            } catch (error) {
              console.error('Error:', error);
       
    }
  
    //console.log("inretIDs of Single Item");
  
  
  
  
   }


   


const wishlistbtn=async (ID)=>{


    try {

 var data=null;
 
    const response = await fetch("/retrieve?ID="+ID.itemId[0]);
 
       if (response.ok) {
         data = await response.json();
         ////console.log('Response from the server:', data);
       } else {
         console.error('DB fetch failed');
       }
     } catch (error) {
       console.error('Error:', error);

     }

     if (data==null)
     {

        setWID([...WID, ID.itemId[0]])
        setwishlistIDsx(WID);

        var jio=ID.shippingInfo[0].shippingServiceCost[0].__value__;
        if(jio==0.0)
        jio = "Free Shipping"
        else
        jio= "$"+jio;        


        const dataToSend = {
            ID: ID.itemId[0],
            Image: ID.galleryURL[0],
            Title: ID.title[0],
            Price: "$"+ID.sellingStatus[0].currentPrice[0].__value__,
            Shipping: jio,
            itemarr: ID,
          };
         
          fetch('/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the server
              ////console.log(data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });  

     }
     else
     {

        var newx=WID.filter(item => item !== ID.itemId[0]);
        setWID(newx);
        setwishlistIDsx(newx);



        try {
            const response = await fetch(`/delete?ID=${ID.itemId[0]}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (response.ok) {
              //console.log(`Wishlist item with ID ${ID.itemId[0]} deleted successfully.`);
              // You can handle further actions here, such as updating the UI.
            } else {
              console.error('Failed to delete wishlist item.');
            }
          } catch (error) {
            console.error('Error:', error);
          }


     }





   }   







try{

const finURL=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ID.viewItemURL[0])}&quote=${encodeURIComponent("Buy"+ID.title[0]+"at $"+ID.sellingStatus[0].currentPrice[0].__value__+"link below")}`;






if(yyy===true && jsonxx!=null) {










  return (
    <div className='SingleItem' onLoad={()=>retIDs()}>


    
        <h5>{ID.title}</h5>
        <br/>
        
        <div> 
        <div className="position-relative">
    
        <div className='position-absolute top-0 end-0'>
        <a href={finURL} target="_blank"> <img src={require("./facebook.png")} style={{height:"40px",width:"50px" }} alt="Facebook" /></a>
        

        <button type="button" className="btn btn-light" onClick={()=>{wishlistbtn(ID)}}>{WID.includes(ID.itemId[0]) ?  <RemoveShoppingCartIcon sx={{color:"#c18300"}}/>:<AddShoppingCartIcon /> }</button>
        
        </div>
        

        <div className='position-absolute top-0 start-0' style={{alignItems:"end"}}>  


        <Button style={{textTransform:"none",fontFamily:"",fontSize:"16px",backgroundColor:"#f8f8ff",color:"#212529"}} className="btn btn-light" onClick={()=>listButton()} startIcon={<KeyboardArrowLeftIcon />}>List</Button>

        </div>

        </div>

        <br/>
        <br/>


        <div className="position-relative">

        <div className='position-absolute top-0 end-0'>    

        <input onClick={productButton} type="radio" className="btn-check" name="options1" id="product" autocomplete="off" checked={prod === true} />
        <label className="smolbtn btn btn-light" for="product">Product</label>
        <input onClick={photosButton} type="radio" className="btn-check" name="options2" id="photos" autocomplete="off" checked={phot === true}/>
        <label className="smolbtn btn btn-light" for="photos">Photos</label>
        <input onClick={shippingButton} type="radio" className="btn-check" name="options3" id="shipping" autocomplete="off" checked={ship === true}/>
        <label className="smolbtn btn btn-light" for="shipping">Shipping</label>
        <input onClick={sellerButton} type="radio" className="btn-check" name="options4" id="seller" autocomplete="off" checked={sell === true}/>
        <label className="smolbtn btn btn-light" for="seller">Seller</label>                
        <input onClick={simButton} type="radio" className="btn-check" name="options5" id="similar" autocomplete="off" checked={simi === true}/>
        <label className="smolbtn btn btn-light" for="similar">Similar Products</label>            

        </div>
        </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>




        


        {prod && <Product item={ID} jsonSingle={jsonxx}/>}
        {phot && jsongoogle && <Photos item={ID} googleJSON={jsongoogle}/>}
        {ship && <Shipping item={ID} />}
        {sell && <Seller item={ID}/>}



        {emptysimi && (  <div className='container'>
        <div className="alert alert-warning" role="alert" style={{ textAlign:'left' }}> 
        No Records. 
        </div>
        </div>)}






        {
            //SELECT THINGS


            !emptysimi && simi && 
<div className='position-relative container'>             
<table className="table" >
    <tr className="row">
        <td className="col-sm-2">
        <select
                      className="form-select h-100 w-100"
                      id="firstSelect"
                      value={firstSelectValue}
                      onChange={handleFirstSelectChange}
                  >
                      <option value="Default">Default</option>
                      <option value="Title">Product Name</option>
                      <option value="Days">Days Left</option>
                      <option value="Price">Price</option>
                      <option value="Shipping">Shipping Cost</option>
                  </select>
        </td>
        <td className="col-sm-2">
        <select 
                          className='form-select h-100 w-100'
                          id="secondSelect"
                          value={secondSelectValue}
                          onChange={handleSecondSelectChange}
                          disabled={firstSelectValue === 'Default'}
                      >
                          <option value="Ascending">Ascending</option>
                          <option value="Descending">Descending</option>
                      </select>
        </td>
    </tr>
</table>
</div>


        
        
        

    // </div></div>
    }
















        

        { 
        //SLICED X
        
        !emptysimi && slicedX && simi && 

<div className="similarTable">

<div className="container" >

            {slicedX
            .map((item) => (

                
                <div className="card mb-2" style={{backgroundColor:"#212529"}}> 
                    <div className="row no-gutters">
                        <div className="col-md-2" style={{maxWidth:"200px"}}>
                            <div className="menu-image h-100 d-flex align-items-start my-4 mx-4">
                                <a href={item.Image} target='_blank'><img src={item.Image} className="fixed-image" alt="menu image" style={{height:"150px",width:"150px"}}/></a>
                            </div>
                        </div>
                        <div className="col-md-10 px-10 py-4" style={{textAlign:"left",paddingLeft:"30px",paddingRight:"30px" }}>
                                <a href={item.URLx} target='_blank'><span style={{textAlign:"left" }} className='linktextx'>{item.Title}</span></a><br/>
                                <span style={{color:"#96c991",textAlign:"left"}}>{"Price: $"+item.Price}<br/></span>
                                <span style={{color:"#847535",textAlign:"left"}}>{"Shipping Cost: $"+item.Shipping}<br/></span>
                                <span style={{color:"white",textAlign:"left"}}>{"Days Left: "+item.Days}</span>
                        </div>  
                    </div>
                </div>              


            ))}        

</div>
    </div>
        
        
        
        }


        {!emptysimi &&simi && showMore && <button type='button' className='btn btn-dark' onClick={showMorex}>Show More</button>}


        {
        
        //SLICEDXX
        
        !emptysimi && showLess&&slicedXX && simi && 


<div className="similarTable">


<div className="container" >

            {slicedXX
            .map((item) => (

                
                <div className="card mb-2" style={{backgroundColor:"#212529"}}> 
                    <div className="row no-gutters">
                        <div className="col-md-2" style={{maxWidth:"200px"}}>
                            <div className="menu-image h-100 d-flex my-4 mx-4">
                                <a href={item.Image} target='_blank'><img src={item.Image} className="fixed-image" alt="menu image" style={{height:"150px",width:"150px"}}/></a>
                            </div>
                        </div>
                        <div className="col-md-10 px-10 py-4" style={{textAlign:"left",paddingLeft:"30px",paddingRight:"30px" }}>
                        <a href={item.URLx} target='_blank'><span style={{textAlign:"left" }} className='linktextx'>{item.Title}</span></a><br/>
                                <span style={{color:"#96c991",textAlign:"left"}}>{"Price: $"+item.Price}<br/></span>
                                <span style={{color:"#847535",textAlign:"left"}}>{"Shipping Cost: $"+item.Shipping}<br/></span>
                                <span style={{color:"white",textAlign:"left"}}>{"Days Left: "+item.Days}</span>
                        </div>  
                    </div>
                </div>              


            ))}        

</div>
    </div>
        
        
        
        
        }

        {!emptysimi && simi && showLess && <button type='button' className='btn btn-dark' onClick={showLessx}>Show Less</button>}


         


    </div>





  )
}

}
catch (e) {
  return (
    <div className='container'>
    <div className="alert alert-warning" role="alert" style={{ textAlign:'left' }}> 
    No Records. 
    </div>
    </div>
    )
}

}

export default SingleItem