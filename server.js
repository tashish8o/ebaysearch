const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const axios = require('axios');
const btoa = require('btoa');


const mongoose = require('mongoose');


const username = 'tashish8o';
const password = 'f6kdiMDbskVckU17';
const clusterAddress = 'wishlist.8wbfrjo.mongodb.net'; 
const databaseName = 'wishlist';


const mongoURI = `mongodb+srv://${username}:${password}@${clusterAddress}/${databaseName}?retryWrites=true&w=majority`;


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(express.json());  




const wishlistItemSchema = new mongoose.Schema({
    ID: String,
    Image: String,
    Title: String,
    Price: String,
    Shipping: String,
    itemarr: Object,
  });
  
  const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);
  
  // Middleware to parse JSON request bodies
  app.use(express.json());
  
  // Route for adding a wishlist item
  app.post('/add', async (req, res) => {
    try {

      data=req.query;

      const { ID, Imagex, Title, Price, Shipping, itemarr } = req.body;

  
      const newItem = new WishlistItem({
        ID,
        Imagex,
        Title,
        Price,
        Shipping,
        itemarr,
      });
  
      const savedItem = await newItem.save();
  
      res.json(savedItem);
    } catch (error) {
      console.error('Error adding wishlist item:', error);
      res.status(500).json({ error: 'Failed to add wishlist item' });
    }
  });
  
  // Route for deleting a wishlist item by ID
  app.delete('/delete', async (req, res) => {

    const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema)

    data=req.query;
  
    try {
        //console.log("Mongo del call");
        const deletedItem = await WishlistItem.findOneAndDelete({ ID: data.ID });
      if (!deletedItem) {
        return res.json(null);
      }
      res.json(deletedItem);
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      res.status(500).json({ error: 'Failed to delete wishlist item' });
    }
  });
  
  // Route for retrieving a wishlist item by ID
  app.get('/retrieve', async (req, res) => {

    const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

    data=req.query;
  
    try {
        const wishlistItem = await WishlistItem.findOne({ ID: data.ID });

      ////console.log("Retirve result:", wishlistItem);
  
      if (!wishlistItem) {
        return res.json(null);
      }
  
      res.json(wishlistItem);
    } catch (error) {
      console.error('Error retrieving wishlist item:', error);
      res.status(500).json({ error: 'Failed to retrieve wishlist item' });
    }
  });



app.get('/retrieveIDs', async (req, res) => {

    const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

    try {
      const wishlistItemIDs = await WishlistItem.find({}, 'ID'); // Project only the 'ID' field
  
      const IDs = wishlistItemIDs.map(item => item.ID); // Extract the 'ID' values into an array
  
      res.json(IDs);

    } catch (error) {
      console.error('Error retrieving IDs:', error);
      res.status(500).json({ error: 'Failed to retrieve IDs' });
    }
  });


app.get('/retrieveAll', async (req, res) => {

    const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

    try {
      const wishlistItems = await WishlistItem.find({}); // Project only the 'ID' field
      //console.log("Mongo ret call");
      res.json(wishlistItems); 
      
    } catch (error) {
      console.error('Error retrieving IDs:', error);
      res.status(500).json({ error: 'Failed to retrieve IDs' });
    }
  });  






class OAuthToken {
    constructor(client_id, client_secret) {
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    getBase64Encoding() {
        const credentials = `${this.client_id}:${this.client_secret}`;
        const base64String = btoa(credentials);
        return base64String;
    }

    async getApplicationToken() {
        const url = 'https://api.ebay.com/identity/v1/oauth2/token';

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${this.getBase64Encoding()}`
        };

        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');
        data.append('scope', 'https://api.ebay.com/oauth/api_scope');

        try {
            const response = await axios.post(url, data, { headers });
            return response.data.access_token;
        } catch (error) {
            console.error('Error obtaining access token:', error);
            throw error;
        }
    }
}

// Usage example
const client_id = 'TagoreAs-myprojec-PRD-97284ce84-f7f9a4c5';
const client_secret = 'PRD-7284ce84fe15-ca66-4a79-88e5-854a';

const oauthToken = new OAuthToken(client_id, client_secret);

oauthToken.getApplicationToken()
    .then((accessToken) => {
        ////console.log('Access Token:', accessToken);
    })
    .catch((error) => {
        console.error('Error:', error);
    });




// Serve the React frontend as static files
app.use(express.static('ebayx/build'));

// Define a route to serve the React form frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ebayx/build/index.html');
});

// Define a route to handle form data via query parameters (GET request)
app.get('/findItemsAdvanced', async (req, res) => {



  const formData = req.query; // Access the form data from query parameters
  //console.log('Received form data:', formData);


    URLx="https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TagoreAs-myprojec-PRD-97284ce84-f7f9a4c5&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&";

    URLx+=("paginationInput.entriesPerPage=50&keywords=");

    URLx+=formData.keyword;

    URLx+=("&buyerPostalCode=")+formData.zip;

    Category="x";


    if(formData.category=="all"){
        Category="x";   
    }
    if(formData.category=="art"){
        Category=550;   
    }    
    if(formData.category=="baby"){
        Category=2984;   
    }
    if(formData.category=="books"){
        Category=267;   
    }
    if(formData.category=="clothes"){
        Category=11450;   
    }
    if(formData.category=="computer"){
      Category=58058;   
  }    
    if(formData.category=="health"){
        Category=26395;   
    }
    if(formData.category=="music"){
        Category=11233;   
    }    
    if(formData.category=="game"){
        Category=1249;   
    }
    
    if(Category!="x")
    URLx+=("&categoryId=")+Category;


    i=0;
    j=0;
    flag=0;

    if(formData.new=='true'){
        if(flag==0){
        URLx+=("&itemFilter(")+(i)+(").name=Condition");
        flag=1;
        }
        URLx+=("&itemFilter(")+(i)+(").value(")+(j)+(")=New");
        j++;
    }
    if(formData.used=='true'){
        if(flag==0){
        URLx+=("&itemFilter(")+(i)+(").name=Condition");
        flag=1;
        }
        URLx+=("&itemFilter(")+(i)+(").value(")+(j)+(")=Used");
        j++;
    }
    if(formData.unspecified=='true'){
        if(flag==0){
        URLx+=("&itemFilter(")+(i)+(").name=Condition");
        flag=1;
        }
        URLx+=("&itemFilter(")+(i)+(").value(")+(j)+(")=Unspecified");
        j++;
    }
    if(flag==1)
    i+=1;



    URLx+=("&itemFilter(")+(i)+(").name=MaxDistance");
    URLx+=("&itemFilter(")+(i)+(").value=")+(formData.distance);
    i+=1;

    flag=0;

    if(formData.local=='true'){
        URLx+=("&itemFilter(")+(i)+(").name=LocalPickupOnly");
        flag=1;
        URLx+=("&itemFilter(")+(i)+(").value=true");
    }
    if(flag==1)
    i+=1;

    flag=0;

    if(formData.free=='true'){
        URLx+=("&itemFilter(")+(i)+(").name=FreeShippingOnly");
        flag=1;
        URLx+=("&itemFilter(")+(i)+(").value=true");
    }
    if(flag==1)
    i+=1;



    URLx+=("&itemFilter(")+(i)+(").name=HideDuplicateItems");
    URLx+=("&itemFilter(")+(i)+(").value=true");

    URLx+=("&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo")    
    //console.log(URLx);

    const oauthToken = new OAuthToken(client_id, client_secret);




    headersx = {
        "X-EBAY-API-IAF-TOKEN": oauthToken.getApplicationToken()
        }

        axios.get(URLx, {
            headers: headersx,
          })
            .then((response) => {
              // Handle the JSON data from the response
              const jsonData = response.data;
              ////console.log('JSON Data:', JSON.stringify(jsonData));
              res.json (jsonData);
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error:', error);
            });

        ////console.log(XXX);    






    
  //res.json(XXX);
});



app.get('/singleItem', async (req, res) => {


    const formDatax = req.query;
    ////console.log(formDatax);


     
     
     URLx=""; 
     URLx+="https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=TagoreAs-myprojec-PRD-97284ce84-f7f9a4c5&siteid=0&version=967&ItemID="+(formDatax.ID)+"&IncludeSelector=Description,Details,ItemSpecifics";
     ////console.log(URLx);

     const oauthTokenx = new OAuthToken(client_id, client_secret);

     headersx = {
        "X-EBAY-API-IAF-TOKEN": await oauthTokenx.getApplicationToken()
        }

        axios.get(URLx, {
            headers: headersx,
          })
            .then((response) => {
              // Handle the JSON data from the response
              const jsonData = response.data;
              ////console.log('JSON Data:', JSON.stringify(jsonData));
              res.json (jsonData);
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error:', error);
            });

});


app.get('/google', async (req, res) => {


           
            const formDataxx = req.query;
            const APIkey="AIzaSyD8Iz__0oxiOeK0FFSOHYuoWF-fOMtC2es";
            const cx="9538daf01130f48c8";
            const searchType="image";
            const imgSize="huge";
            num=8;

            URLx="";
            URLx+="https://www.googleapis.com/customsearch/v1?q="+(formDataxx.ID)+"&cx=9538daf01130f48c8&imgSize=huge&num=8&searchType=image&key=AIzaSyD8Iz__0oxiOeK0FFSOHYuoWF-fOMtC2es";


            axios.get(URLx, {
              })
                .then((response) => {
                  // Handle the JSON data from the response
                  const jsonData = response.data;
                  //console.log("google calss");
                  res.json (jsonData);
                })
                .catch((error) => {
                  // Handle any errors
                  console.error('Error:', error);
                });





});

app.get('/similar', async (req, res) => {


    const formDataxxx = req.query;
    URLx="";
    URLx+="https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=TagoreAs-myprojec-PRD-97284ce84-f7f9a4c5&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId="+(formDataxxx.ID)+"&maxResults=20";

    const oauthToken = new OAuthToken(client_id, client_secret);

    headersx = {
        "X-EBAY-API-IAF-TOKEN": oauthToken.getApplicationToken()
        }

        axios.get(URLx, {
            headers: headersx,
          })
            .then((response) => {
              // Handle the JSON data from the response
              const jsonData = response.data;
              ////console.log('JSON Data:', JSON.stringify(jsonData));
              res.json (jsonData);
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error:', error);
            });



});


app.get('/zips', async (req, res) => {


    const formDataxxx = req.query;
    URLx="";
    URLx+=`http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=${formDataxxx.ID}&maxRows=5&username=tashish8o&country=US`


        axios.get(URLx, {
          })
            .then((response) => {
              // Handle the JSON data from the response
              const jsonData = response.data;
              ////console.log('geonames results', JSON.stringify(jsonData));
              res.json (jsonData);
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error:', error);
            });



});



app.listen(port, () => {
  //console.log(`Server is running on port ${port}`);
});
