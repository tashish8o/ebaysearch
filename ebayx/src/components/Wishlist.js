import React from 'react'
import { useState,useEffect } from 'react';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './HighlightTable.css'; 
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
const Wishlist = ({Arr,x,xxx,yy,yyy,z,zzz,jsonsingleprev,propxx,setres,res,setwish,wish,setwishlistIDsx,wishlistIDsx,getWishList,setfinwish,sucker,highlight,sethighlight,prog,setprog,page,setpage}) => {



const [finwishx,setfinwishx]=useState(getWishList);
const [responseJsonx, setResponseJsonx] = useState(null); 
// const [sucker,setsucker]=useState(null);
const [XX,setXX]=useState(null);

const [total,settotal]=useState(null);

const [high,sethigh]=useState(highlight);



const remwishlistbtn = async(ID) => {


    //console.log("Ill remove you in future biss!");
    await deleteitem(ID);
    await getWishListx();
    setTimeout(() => {

        retIDs();

      }, 3000);





}


const deleteitem = async (ID) => {



    try {
        const response = await fetch(`/delete?ID=${ID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          //console.log(`Wishlist item with ID ${ID} deleted successfully.`);
          // You can handle further actions here, such as updating the UI.
        } else {
          console.error('Failed to delete wishlist item.');
        }
      } catch (error) {
        console.error('Error:', error);
      }




}


const getWishListx=async() => {

    try {

        var data=null;
        
           const response = await fetch("/retrieveAll");
              if (response.ok) {
                data = await response.json();
                //console.log("Wishlist data in wishlist:");
                setfinwishx(data);
                setfinwish(data);


                var tot=0;
                for(let i=0;i<data.length;i++) {

                tot+=parseFloat((data[i].Price).replace("$",""));
                    
                }

                settotal("$"+tot);







                
              } else {
                console.error('DB fetch failed');
              }
            } catch (error) {
              console.error('Error:', error);
       
            }



}









const ItemClick=async(Arrxx)=>{


    const jsonstr=JSON.stringify(Arrxx);
    //console.log("wishlist button click");
    handleSingle(Arrxx.itemId[0]);
    Arr(JSON.parse(jsonstr));
    


    setTimeout(() => {

        retIDs();

        yy(true);
        setwish(false);
        setres(true);
        x(false);

      }, 1500);





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
  
    //console.log("inretIDs of Single Item");
  
  
  
  
   }








const handleSingle = async (X) => {
 
    try {

      const response = await fetch("/singleItem?ID="+X);

      if (response.ok) {
        const data = await response.json();
        //console.log("WIshlist title bro",data);
        setResponseJsonx(data);
        propxx(data);
        setResponseJsonx(data);
       //  propxx(responseJsonx);
      } else {
        console.error('Form submission failed');
        setResponseJsonx(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseJsonx(null);
    }
  };







const fetchdata=() => {


    const item=finwishx;



var X = [];
var tot=0;

for (var i = 0; i < item.length && i<50; i++) {
  X[i] = {
    id: undefined,
    Image: "",
    Title: "",
    Price: "",
    Shipping: "",
    WishList: "",
    itemarr:undefined,
    ID: "",
  };

  try {
    X[i].id = i + 1;
  } catch (e) {
    X[i].id="N/A";
  }

  try {
    X[i].Image = item[i].itemarr.galleryURL[0];
  } catch (e) {
    X[i].Image="N/A";
  }

  try {
    X[i].Title = item[i].Title;
  } catch (e) {
    X[i].Title = "N/A";
  }

  try {
    X[i].Price = item[i].Price;
    var cutprice=parseFloat((item[i].Price).replace("$",""));
    tot+=cutprice;
  } catch (e) {
    X[i].Price = "N/A";
  }

  try {

    X[i].Shipping = item[i].Shipping;

  } catch (e) {
    X[i].Shipping = "N/A";
  }
  
  try {
    X[i].WishList = <button onClick={remwishlistbtn}><RemoveShoppingCartIcon sx={{color:"gold"}}/></button>
  } catch (e) {
    console.error('Error assigning WishList:', e);
  }

  try {
    X[i].itemarr = item[i].itemarr;
  } catch (e) {
    console.error('Error assigning ID:', e);
  }  

  try {
    X[i].ID = item[i].ID;
  } catch (e) {
    console.error('Error assigning ID:', e);
  }
  
  
}

return (X);




}





// if(getWishList.length>0 || finwishx.length>=1){

//     sucker=(true);

// }
// else
// sucker=(false);



useEffect(() => {
    getWishListx();
  },[wish]);










const detailButton=()=>{

    z(false);
    setprog(true);
    
    //console.log("in detail wishlist yo");
        setTimeout(() => {
            
            retIDs();

            yy(true);
            setwish(false);
            setres(true);
            x(false);
            setprog(false);
            z(true);
    
          }, 3000);
    
    
    
    
    }

    // useEffect(() => {
    //     const delay = 2000; // 5 seconds in milliseconds
    
    //     const timerId = setTimeout(() => {
    //         sethigh(null);
    //     }, delay);
    
    //     return () => {
    //       // Clean up the timer if the component unmounts
    //       clearTimeout(timerId);
    //     };
    //   }, []);     








//console.log("bitch value",finwishx.length);
//console.log("super bitch value",getWishList.length);


if(finwishx.length>=1){
    



  return (
    <div className="container WishListTable" onLoad={()=>getWishListx()}>


<div className='position-relative'> 
        <div className="position-absolute top-0 end-0">
        <Button style={{textTransform:"none",fontFamily:"",fontSize:"16px",backgroundColor:"#f8f8ff",color:"#212529"}} className="btn btn-light" onClick={()=>detailButton()} disabled={!jsonsingleprev} endIcon={<KeyboardArrowRightIcon />}>Detail</Button>
        </div>
        </div>
        <br/>
        <br/>



      <table className="table table-striped table-dark table-hover">
        <thead>
          <tr style={{textAlign:"left"}}>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col" style={{minWidth:"120px"}}>Shipping</th>
            <th scope="col">Favorite</th>
          </tr>
        </thead>
        
        <tbody>
          {fetchdata().map((item) => (
              <tr key={item.id} className={item.itemarr.itemId[0]===highlight ? "highlight-row":""} style={{textAlign:"left"}}>
                <td scope="row">{item.id}</td>
                <td><a href={item.Image} target="_blank" rel="noopener noreferrer"><img src={item.Image} style={{height:"150px",width:"150px"}} /></a></td>
                <td>
  <OverlayTrigger
  className="tooltipx"
    key="bottom"
    placement="bottom"
    overlay={  
      <div className="tooltipx">
        {item.Title}
      </div>
    }
  >
    <div
      className="linktext d-inline-block text-truncate"
      style={{ width: "430px" }}
      onClick={() => ItemClick(item.itemarr)}
    >
      {item.Title}
    </div>
  </OverlayTrigger>
</td>
                <td>{item.Price}</td>
                <td>{item.Shipping}</td>
                <td><button type="button" className='btn btn-light' onClick={()=>remwishlistbtn(item.ID)}><RemoveShoppingCartIcon sx={{color:"#c18300"}}/></button></td>
              </tr>
            ))}
            <tr style={{textAlign:"left"}}>
                <td scope="row"></td>
                <td></td>
                <td></td>
                <td></td>
                <td><b>Total Shopping</b></td>
                <td><b>{total}</b></td>
            </tr>
        </tbody>
      </table>

    </div>
  )

}
          else{
            
            return (
                <div className='container'>
                <div className="alert alert-warning" role="alert" style={{ textAlign:'left' }}> 
                No Records. 
                </div>
                </div>
                )
           } 
           
    {}       

}

export default Wishlist