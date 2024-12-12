import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Button from '@mui/material/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import "./formprime.css";


/*
"create a reactJS form and send that data to nodeJS backend" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  





const Formx = ({propx,x,xxx,y,yyy,z,zzz,setres,res,setwish,wish,setwishlistIDsx,wishlistIDsx,finwish,setfinwish,highlight,sethighlight,jsonsingleprev,setjsonsingleprev,prog,setprog,page,setpage}) => {



  const [zipCode, setZipCode] = useState(null);
  const apiKey = 'aef12df7722b51'; 
  const [zipCodeSuggestions, setZipCodeSuggestions] = useState([]);
  const [debouncedZipSuggestions, setDebouncedZipSuggestions] = useState([]);
  const [isValidationEnabled, setIsValidationEnabled] = useState(false);
  const [showSugg,setshowSugg]=useState(false);

  const inputRef = useRef(null);
  const [listGroupWidth, setListGroupWidth] = useState(0);


/*
"use ipinfo to get ip address in reactJS" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  





  

  useEffect(() => {
    const fetchZipCode = async () => {
      try {
        const response = await axios.get(`https://ipinfo.io?token=${apiKey}`);
        const data = response.data;
        const postal = data.postal || data.zip; // Use postal or zip code
        setFormData({
          ...formData,
          zip: postal,
        });
        setZipCode(postal);
      } catch (error) {
        console.error('Error fetching zip code:', error);
      }
    };

    fetchZipCode();
  }, [apiKey]);




  

  useEffect(() => {
    setZipCodeSuggestions(debouncedZipSuggestions); // Update the suggestions when the debounced suggestions change
  }, [debouncedZipSuggestions]);



  const handlezipsDebounced = debounce(async (X) => {


    if(X!=""){




    try {
      const response = await fetch("/zips?ID="+X);
  
      if (response.ok) {
        const data = await response.json();
        const fire = data.postalCodes.map((item) => item.postalCode);
        setDebouncedZipSuggestions(fire);
        //console.log("zipsugg",fire);
        //console.log("zipsugg1",formData.zip);
      } else {
        console.error('Form submission failed');
        setDebouncedZipSuggestions([]); // Clear suggestions on error
      }
    } catch (error) {
      console.error('Error:', error);
      setDebouncedZipSuggestions([]); // Clear suggestions on error
    }

    }
    else{
      setDebouncedZipSuggestions([]);

    }  
  }, 300);



  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, zip: suggestion });
    setshowSugg(false);
  }; 
  
  



/*
"create a reactJS form and send that data to nodeJS backend" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  


//console.log("Hi formx");

  const [formData, setFormData] = useState({
    keyword: '',
    category: 'all', // Default category
    new: false, // Default to unchecked
    used: false, // Default to unchecked
    unspecified: false, // Default to unchecked
    local: false, // Default to unchecked
    free: false, // Default to unchecked
    distance: '10',
    loc:'curr', // Default to unchecked
    zip: ' ',
  });
  const [responseJson, setResponseJson] = useState(null);
  const [max,setmax]=useState(null);
  const [wishmax,setwishmax]=useState(null);


  useEffect(() => {
    if (inputRef.current) {
      const inputWidth = inputRef.current.offsetWidth;
      setListGroupWidth(inputWidth);
    }
  }, [inputRef,formData.zip]);





  const handleChange = async (e) => {

    
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    //console.log("X:",newValue);


    if(name==="keyword")
    setIsValidationEnabled(true);

  



    if (name === 'loc' && value === 'curr') {
      setDebouncedZipSuggestions([]);
      setFormData({ ...formData, zip: zipCode,[name]: newValue });
      setDebouncedZipSuggestions([]);
      
    } else {
      if (name === 'loc' && value === 'other') {
        // Clear the zip code when switching to 'Other'
        setDebouncedZipSuggestions([]);
        setFormData({
          ...formData,
          [name]: newValue,
          zip: '',
        });
        setDebouncedZipSuggestions([]);

      } else {
        setFormData({
          ...formData,
          [name]: newValue,
        });
      }
    }

    if(name=="zip"){

      try{

        setTimeout(() => {


          handlezipsDebounced(newValue);

          setshowSugg(true);
          
        }, 0);




      }
      catch(err){



      }

      


    }


    retIDs();
    getWishList();


  };

  const handleSubmit = async (e) => {

    setjsonsingleprev(null);

    sethighlight(null);
    e.preventDefault();

    sethighlight(null);
    
    // Prevent the default form submission behavior

    setshowSugg(false);

    setpage(1);

    z(false);
    setprog(true);
    try {

      const queryString = new URLSearchParams(formData).toString();


      const response = await fetch(`/findItemsAdvanced?${queryString}`);

      if (response.ok) {

        
        const data = await response.json();
        ////console.log('Response from the server:', data);
        setResponseJson(data);
      } else {
        console.error('Form submission failed');
        setResponseJson(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseJson(null);
    }

    
    setprog(false);
    y(false);
    z(true);
    setres(true);
    setwish(false);
    sethighlight(null);
    setjsonsingleprev(null);
    retIDs();
    getWishList();
    
   
    






  };

  const retIDs=async()=>{

    


    try {
  
        var data=null;
        
           const response = await fetch("/retrieveIDs");
        
              if (response.ok) {
                data = await response.json(); 
                setmax(data);
                setwishlistIDsx(max);
                ////console.log('Response from the server:', data);
              } else {
                console.error('DB fetch failed');
              }
            } catch (error) {
              console.error('Error:', error);
       
    }
  
    //console.log("inretIDs",max);
  
  
  
  
   }



const getWishList=async() => {



    try {

        var data=null;
        
           const response = await fetch("/retrieveAll");
              if (response.ok) {
                data = await response.json();
                //console.log("Wishlist data:",data);
                setwishmax(data);
                setfinwish(data);
                
              } else {
                console.error('DB fetch failed');
              }
            } catch (error) {
              console.error('Error:', error);
       
            }



}




const clearButton = ()=>{

  //console.log("Clear btn shit");
  sethighlight(null);


setFormData({
    keyword: '',
    category: 'all', // Default category
    new: false, // Default to unchecked
    used: false, // Default to unchecked
    unspecified: false, // Default to unchecked
    local: false, // Default to unchecked
    free: false, // Default to unchecked
    distance: '10',
    loc:'curr', // Default to unchecked
    zip: zipCode,    
      
  });

setpage(1);  
setIsValidationEnabled(false);
setjsonsingleprev(null);
sethighlight(null);
setwish(false);
setres(true);
z(false);



}
  

  return (





      <form onSubmit={handleSubmit} className='container needs-validation' noValidate style={{backgroundColor:"#212529",color:"white"}} >
        <div className='XXX container'>

        <div className="form-group row input-group">
    <div className="col-form-label" style={{textAlign:"left"}}>
    <h2 style={{color:"white",paddingTop:"15px"}}>Product Search</h2>
</div>
</div>





  <div className="form-group row input-group has-validation">
    <label for="Keyword" className="col-sm-4 col-form-label" style={{textAlign:"left"}}>Keyword<starx style={{color:"red"}}>*</starx></label>
    <div className="col-sm-7">
      <input type="text" name="keyword" style={{backgroundImage:"none"}} className={`form-control ${isValidationEnabled && !formData.keyword.trim() && 'is-invalid'}`} id="Keyword" placeholder="Enter Product Name(eg.iPhone 8)" value={formData.keyword} onChange={handleChange} required={isValidationEnabled} />
      <div className="invalid-feedback" style={{textAlign:"left"}}>
      Please enter a keyword.
      </div>
    </div>
  </div>
  <br />
  <div className="form-group row input-group">
    <label for="Category" className="col-sm-4 col-form-label" style={{textAlign:"left"}}>Category</label>
    <div className="col-sm-3">
    <select className="form-select" name="category" id="Category" value={formData.category} onChange={handleChange}>
        <option value="all">All Categories</option>
        <option value="art">Art</option>
        <option value="baby">Baby</option>
        <option value="books">Books</option>
        <option value="clothes">Clothing,Shoes & Accessories</option>
        <option value="computer">Computers/Tablets & Networking</option>
        <option value="health">Health & Beauty</option>
        <option value="music">Music</option>
        <option value="game">Video Games & Consoles</option>
      </select>
    </div>
  </div>
  <br />

  <div className="form-group row input-group">
    <label for="Condition" className="col-sm-4" style={{textAlign:"left"}}>Condition</label>
    <div className="col-sm-6" style={{ textAlign:'left'}}>
    <div className="form-check form-check-inline">
    <input className="form-check-input" name="new" type="checkbox" id="new" value="true"  checked={formData.new === true} onChange={handleChange}/>
  <label className="form-check-label" for="new">New</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" name="used" type="checkbox" value="true"  checked={formData.used === true} onChange={handleChange}/>
  <label className="form-check-label" for="used">Used</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" name="unspecified" type="checkbox" id="unspecified" value="true"  checked={formData.unspecified === true} onChange={handleChange} />
  <label className="form-check-label" for="unspecified">Unspecified</label>
</div>
    </div>
  </div>
  <br />

  <div className="form-group row input-group">
    <label for="Shipping Options" className="col-sm-4" style={{textAlign:"left"}}>Shipping Options</label>
    <div className="col-sm-7" style={{ textAlign:'left'}}>
    <div className="form-check form-check-inline">
    <input className="form-check-input" name="local" type="checkbox" id="local" value="true"  checked={formData.local === true} onChange={handleChange}/>
  <label className="form-check-label" for="local">Local Pickup</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" name="free" type="checkbox" id="free" value="true"  checked={formData.free === true} onChange={handleChange}/>
  <label className="form-check-label" for="free">Free Shipping</label>
</div>
    </div>
  </div>  
  <br />


  <div className="form-group row input-group">
    <label for="Distance" className="col-sm-4 col-form-label" style={{textAlign:"left"}}>Distance(Miles)</label>
    <div className="col-sm-3">
      <input type="number" className="form-control" name="distance" id="Distance" value={formData.distance} onChange={handleChange} min="1"/>
    </div>
  </div>
 
  <br />





  <div className="form-group row input-group">
            <label className="col-sm-4 col-form-label" style={{textAlign:"left"}}>From<starx style={{color:"red"}}>*</starx></label>
            <div className="col-sm-7">
            <div className="form-check" style={{ textAlign: 'left' }}>
                <input
                  className="form-check-input"
                  name="loc"
                  type="radio"
                  id="curr"
                  value="curr"
                  checked={formData.loc === 'curr'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="curr" >
                  'Current Location'
                </label>
              </div>
              <div className="form-check" style={{textAlign: 'left'}}>
                <input
                  className="form-check-input"
                  name="loc"
                  type="radio"
                  id="other"
                  value="other"
                  checked={formData.loc === 'other'}
                  onChange={handleChange}
                />
                <label   className="form-check-label" htmlFor="other">
                  'Other. Please specify zip code:'
                </label>
              </div>


 
              

  <input
  type="text"
  className={`form-control ${!formData.zip && 'is-invalid'}`}
  name="zip"
  id="zip"
  value={formData.loc === 'curr' ? "" : formData.zip}
  onChange={handleChange}
  disabled={formData.loc === 'curr'}
  required={formData.loc === 'other'}
  maxLength={5}
  style={{backgroundImage:"none"}}
  pattern="[0-9]*"
  ref={inputRef}
/>
<div className="invalid-feedback" style={{textAlign:"left"}}>
        Please enter a zip code.
      </div> 

      




{showSugg && formData.loc=="other" && formData.zip.length!=0 && debouncedZipSuggestions.length > 0 && (

    
<ListGroup style={{position:'absolute',zIndex:'3',width:listGroupWidth + 'px',cursor:'pointer',border:"1px solid black",borderRadius:"0px"}}>
          {debouncedZipSuggestions.map((suggestion, index) => (
            <ListGroup.Item style={{border:"none",cursor:"pointer"}}
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </ListGroup.Item>
          ))}
        </ListGroup>
            )}





            </div>
          </div>


<br/>

<div className="form-group row input-group">
    <div className="col-form-label" style={{textAlign:"left"}}>
    <Button startIcon={<SearchIcon />} className="btn btn-light" style={{textTransform:"none",fontFamily:"",fontSize:"16px",backgroundColor:"#f8f8ff",color:"#212529"}} type="submit" disabled={!formData.keyword.trim() || (formData.zip.length!=5 && formData.loc==="other")}>Search</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Button style={{textTransform:"none",fontFamily:"",fontSize:"16px",backgroundColor:"#f8f8ff",color:"#212529"}} startIcon={<ClearAllIcon />} className="btn btn-light"  onClick={()=>{clearButton()}}>Clear</Button>
</div>

</div>
{responseJson && (
        <div>
          {propx(responseJson)}
          {          
          yyy ? x(false) : x(true)
          }
          {setwishlistIDsx(max)}
          {setfinwish(wishmax)}
        </div>

        
      )}

</div>
</form>

/*
"create a input suggestions in ReactJS using ListGroup" prompt (1 line). ChatGPT, 17 Oct. version, OpenAI, 20 Oct. 2023, chat.openai.com/chat.
*/  



  )
}

export default Formx