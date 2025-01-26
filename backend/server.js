const port = 4000;
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const mongoURI = "mongodb+srv://ayeshasaeed2002:eodWLlFORWq6370C@cluster0.owx78.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoURI).
  then(() => { console.log('MongoDB connected') }).
  catch((err) => console.log(err));

//API creation
app.get("/", (req, res) => {
  res.send("Express Server is Running");
});

//Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    console.log(file);
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`
  })
})
app.use('/images', express.static('upload/images'));



app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});



// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  success = true;
  res.json({ success, token })
})




//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      console.log(user.id);
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success, token });
    }
    else {
      return res.status(400).json({ success: success, errors: "Incorrect Email or Password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "Incorrect Email or Password" })
  }
})

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
  qty: {
    type: Number
  },
  highlights: {
    type: [String]
  },
  details: {
    type: String
  },
  destination: {
    type: String
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    qty: req.body.qty,
    highlights: req.body.highlights,
    details: req.body.details,
    description: req.body.description,

  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name })
});

app.get("/getproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);

});


app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name })
});



const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added")
})

//Create an endpoint for saving the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
})
//Create an endpoint for saving the product in cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);

})


const Orders = mongoose.model("Orders", {
  
  user: {
    type: String,
    required: true,
  },
  products: {
    type: Object,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  payment_method: {
    type: String
  }

});

app.post('/confirm', fetchuser, async (req, res) => {
  // app.post('/confirm', async (req, res) => {
  console.log("Confirming Order");

  try {
    // Retrieve user data from the database
    let userData = await Users.findOne({ _id: req.user.id });

    // let userData = await Users.findOne({email:"ayeshasaeed2002@gmail.com"});

    // Create an array to store the ordered products
    let orderedProducts = [];

    // Iterate over the cartData to create an array of ordered products
    for (let itemId in userData.cartData) {
      let quantity = userData.cartData[itemId];

      // If quantity is greater than 0, meaning the product is in the cart
      if (quantity > 0) {
        // Find the product by its ID
        let product = await Product.findOne({ id: parseInt(itemId) });
        userData.cartData[itemId] = 0;


        // If product is found, add it to the ordered products array
        if (product) {
          orderedProducts.push({
            product: product._id, // Assuming you have a reference to the Product model
            quantity: quantity
          });
        }

      }
    }

    // Calculate the total price of the order
    let totalPrice = 0;
    for (let orderedProduct of orderedProducts) {
      let product = await Product.findById(orderedProduct.product);
      totalPrice += product.new_price * orderedProduct.quantity;
    }
    
    // Create a new order document
    const order = new Orders({
      user: userData.email, // Assuming req.user.id contains the ID of the authenticated user
      products: orderedProducts,
      total: totalPrice,
      address: req.body.address,
      city: req.body.city,
      payment_method: req.body.paymentType,

    });

    // Save the order to the database
    await order.save();

    // // Clear the cartData in user document
    await Users.findOneAndUpdate({ _id: userData._id }, { cartData: userData.cartData });

    res.send("Order confirmed successfully");
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).send("An error occurred while confirming the order");
  }
});
app.get("/getorders", async (req, res) => {
  let orders = await Orders.find({});
  console.log("All Orders Fetched");
  res.send(orders);

});

app.post("/removeorder", async (req, res) => {
  const order = await Orders.findOneAndDelete({ _id: req.body._id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name })
});

app.post("/updateproduct", async (req, res) => {
  const { id, name, image, category, new_price, old_price, qty, highlights, details } = req.body;
  
  try {
    const product = await Product.findOneAndUpdate(
      { id: id }, // Find the product by ID
      {
        name,
        image,
        category,
        new_price,
        old_price,
        qty,
        highlights,
        details,
      },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("An error occurred while updating the product");
  }
});

