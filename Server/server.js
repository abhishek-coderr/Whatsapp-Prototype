const express=require("express")
const client=require("mongodb").MongoClient
const objid=require("mongodb").ObjectId
const app=express()
//const bodyparser=require()
const cors=require("cors");
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")

let dbinstance;
let collectioninstance;
client.connect("mongodb+srv://abhishek1029sain:abhishek10@cluster0.lawks9g.mongodb.net/").then((database)=>{ 
    dbinstance=database.db("Whatsapp_prototype")
    collectioninstance= dbinstance.collection("marketplace_items")
    console.log("db connected");
})
app.use(cors({
    origin: ['http://localhost:3000', 'https://www.google.com/']
}));

app.get('/getallitems',(req,res)=>{

    //checking 7 days condition
    collectioninstance.find({"isSold":"false"}).toArray().then((data)=>{
        data.forEach((item)=>{
            let id=item._id+""
            let firstDate = new Date(item.pubilshedDate),
            secondDate = new Date(),
            timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
            let differentDays = Math.ceil(timeDifference/(1000*3600*24));
            if(differentDays>7){
                console.log("Deleted ",id);
                collectioninstance.deleteOne(({"_id":  new objid(id)}))
            }
        });
    })
    
    // getting all unsold items from DB
    collectioninstance.find({"isSold":"false"}).toArray().then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
    })
})

app.post('/storeItem',(req,res)=>{
    //adding new product/item 
    console.log(req.body);
    let obj={
        "name":req.body.name,
        "description":req.body.description,
        "salePrice":parseInt(req.body.salePrice),
        "regularPrice":parseInt(req.body.regularPrice),
        "imageUrl":req.body.imageUrl,
        "pubilshedDate":new Date(),
        "isSold":"false"
    }
    collectioninstance.insertOne(obj).then((result)=>{
        console.log(result);  
    })
})

app.get('/update/:id',(req,res)=>{
    //updating DB if anyone buy's any product/item
    collectioninstance.updateOne({"_id":new objid(req.params.id)},{$set:{"isSold":"true"}}).then(()=>{
        collectioninstance.find({"isSold":"false"}).toArray().then((result)=>{
            res.json(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
})



app.get('/delete/:id', (req,res)=>{
    //deleting product/item if admin wants to delete
    const idToDelete = req.params.id
    console.log(idToDelete);
    collectioninstance.deleteOne({'_id': new objid(idToDelete)}).then((result)=>{
        console.log(result);
    })

    // getting all unsold items from DB
    collectioninstance.find({"isSold":"false"}).toArray().then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(3001,()=>{
    console.log("server connected");
})