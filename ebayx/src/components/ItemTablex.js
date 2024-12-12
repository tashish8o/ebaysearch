import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './HighlightTable.css'; 
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


/*
"create a pagination table with page numbers in ReactJS" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  

/*
"create a Bootstrap Image Modal with an array of images that I have and display it when I click on a text" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  
 








function ItemTablex({jsonx,Arr,x,xxx,yy,yyy,z,zzz,jsonsingleprev,propxx,setres,res,setwish,wish,setwishlistIDsx,wishlistIDsx,highlight,sethighlight,prog,setprog,page,setpage}) {

    //console.log("Hi itemtablex");

    const [currentPage, setCurrentPage] = useState(page);
    const rowsPerPage = 10;
    //const [IDx, setIDx] = useState(null);

    //const [Arrx,SetArrx]=useState(null);
    const [responseJsonx, setResponseJsonx] = useState(null); 
    const [wishListIDs, setWishListIDs] = useState(wishlistIDsx);
    const [high,sethigh]=useState(highlight);


const retIDs=async()=>{


        try {
      
            var data=null;
            
               const response = await fetch("/retrieveIDs");
            
                  if (response.ok) {
                    data = await response.json();
                    setwishlistIDsx(data);
                    setWishListIDs(data);
                    ////console.log('Response from the server:', data);
                  } else {
                    console.error('DB fetch failed');
                  }
                } catch (error) {
                  console.error('Error:', error);
           
        }
      
        //console.log("inretIDs of ItemTable");
      
      
      
      
       }    


    


const ItemClick =async(Arrxx)=>
{


    z(false);
    setprog(true);




    const jsonstr=JSON.stringify(Arrxx);
   

    handleSingle(Arrxx.itemId[0]);
    Arr(JSON.parse(jsonstr));
    //propxx(responseJsonx);

    setTimeout(() => {
      

        yy(true);
        setprog(false);
        z(true);

      }, 1500);
      


     

    





}



const handleSingle = async (X) => {
 
     try {
 
       const response = await fetch("/singleItem?ID="+X);
 
       if (response.ok) {
         const data = await response.json();
         ////console.log('Response from the server:', data);
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



const wishlistbtn=async (ID,Image,Title,Price,Shipping,itemarr)=>{


    try {

 var data=null;
 
    const response = await fetch("/retrieve?ID="+ID);
 
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

        setWishListIDs([...wishListIDs, ID])
        setwishlistIDsx(wishListIDs);


        const dataToSend = {
            ID: ID,
            Image: Image,
            Title: Title,
            Price: Price,
            Shipping: Shipping,
            itemarr: itemarr,
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

        var newx=wishListIDs.filter(item => item !== ID);
        setWishListIDs(newx);
        setwishlistIDsx(wishListIDs);



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





   }




try{


 


const y=jsonx.findItemsAdvancedResponse[0].paginationOutput[0].totalEntries[0];

// retIDs();
setwishlistIDsx(wishListIDs);













if(y!=0 && xxx===true && yyy===false){



    const detailButton=()=>{


        z(false);
        setprog(true);



 
        //console.log("in detail yo");
            setTimeout(() => {
        
                yy(true);
                setprog(false);
                z(true);
        
              }, 1500);
        
        
        
        
        }


  // You should replace this data with your dynamic data source
  const data = generateDynamicData(); // Function to fetch or generate your data

  ////console.log(data);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setpage(newPage);  
      setCurrentPage(newPage);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
    i
    );
  }

  function generateDynamicData() {


    const item=jsonx.findItemsAdvancedResponse[0].searchResult[0].item;



var X = [];

for (var i = 0; i < item.length && i<50; i++) {
  X[i] = {
    id: undefined,
    Image: "",
    Title: "",
    Price: "",
    Shipping: "",
    Zip: "",
    WishList: "",
    ID: "",
    itemarr:undefined
  };

  try {
    X[i].id = i + 1;
  } catch (e) {
    X[i].id="N/A";
  }

  try {
    X[i].Image = item[i].galleryURL[0];
  } catch (e) {
    X[i].Image="https://tashish8.github.io/ebay_default.jpg";
  }

  try {
    X[i].Title = item[i].title[0];
  } catch (e) {
    X[i].Title = "N/A";
  }

  try {
    X[i].Price = "$"+item[i].sellingStatus[0].currentPrice[0].__value__;
  } catch (e) {
    X[i].Price = "N/A";
  }

  try {
    var sh=item[i].shippingInfo[0].shippingServiceCost[0].__value__;
    if(sh==0.0)
    X[i].Shipping = "Free Shipping"
    else
    X[i].Shipping = "$"+sh;


  } catch (e) {
    X[i].Shipping = "N/A";
  }

  try {
    X[i].Zip = item[i].postalCode;
  } catch (e) {
    X[i].Zip = "N/A";
  }

  try {
    X[i].WishList = "<img style={{ height:'10px' }} src=\"ebaysearch/ebayx/cart_plus_icon_135803.png\">";
  } catch (e) {
    console.error('Error assigning WishList:', e);
  }

  try {
    X[i].ID = item[i].itemId[0];
  } catch (e) {
    console.error('Error assigning ID:', e);
  }
  try {
    X[i].itemarr = item[i];
  } catch (e) {
    console.error('Error assigning ID:', e);
  }
  

}

return(X);

/*
"create a pagination table with page numbers in ReactJS" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  



  }

  return (

    <div className='itemTable' onLoad={()=>retIDs()}>

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
            <th scope="col">Zip</th>
            <th scope="col" style={{minWidth:"90px"}}>Wish List</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((item) => (
              <tr key={item.id} className={item.itemarr.itemId[0]===highlight ? "highlight-row":""} style={{textAlign:"left"}}>
                <td scope="row">{item.id}</td>
                <td><a href={item.Image} target="_blank" rel="noopener noreferrer"><img src={item.Image} style={{height:"150px",width:"150px"}}/></a></td>

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
                <td>{item.Zip}</td>
                <td><button type="button" className='btn btn-light' onClick={()=>{wishlistbtn(item.itemarr.itemId[0],item.Image,item.Title,item.Price,item.Shipping,item.itemarr)}}>{wishListIDs.includes(item.itemarr.itemId[0]) ?  <RemoveShoppingCartIcon sx={{color:"#c18300"}}/>:<AddShoppingCartIcon /> }</button></td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="pagicontainer">

      <div className="x">
  <button type='button' className="btn btn-light" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
    «&nbsp;Previous
  </button>
  {pageNumbers.map((pageNumber, index) => (
    <button
      key={index}
      type='button'
      onClick={() => handlePageChange(pageNumber)}
      className={pageNumber===currentPage? "btn btn-primary":"btn btn-light"}
    >
      {pageNumber}
    </button>
  ))}
  <button type='button' className="btn btn-light"
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next&nbsp;»
  </button>
</div>
</div>


    </div>  
  );
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
   
}
catch(e){

  


  return (
    <div className='container'>
    <div className="alert alert-warning" role="alert" style={{ textAlign:'left' }}> 
    No Records. 
    </div>
    </div>
    )




  

    
}      


}

export default ItemTablex;



// highpress.then((result) => {if (result) {x=3} else {x=1}});