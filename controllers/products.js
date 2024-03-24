const Product = require("../models/product") // models require

const getAllProducts = async (req, res) => {
    // Add Company Filter in API & Make API Work Better
    const { company, name, featured, sort, select} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company; 
    }

    if(featured){
        queryObject.featured = featured;
    }
 //  Add Advance Search Functionality in our Rest API
    if(name){
        queryObject.name = { $regex : name, $options: "i"};
    }

    let apiData = Product.find(queryObject);

    //  Add SORT functionality in Rest API (ASC TO DESC, LOW TO HIGH)
    if(sort){
        let sortFix = sort.split(",").join( " ");;
        apiData = apiData.sort(sortFix)
    }

        //  Return Specific Document Fields using SELECT in Mongoose
    if(select){
        let selectFix = select.split(",").join( " ");
        apiData = apiData.select(selectFix)
    }

     // Add Pagination in Rest API using Node & Mongoose
     let page = Number(req.query.page) || 1; // limit for page default 1
     let limit = Number(req.query.limit) || 3; // limit for page 3
     let skip = (page - 1) * limit;

    //  apiData = apiData.skip(3).limit(3);
    apiData = apiData.skip(skip).limit(limit);
 

    console.log(queryObject.company)

    const myData = await apiData;
    res.status(200).json({ myData, nbHits: myData.length })
};

const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find(req.query)
    console.log("file: Products.js ~ line 10 ~ getAllProductTesting ~ req.query", req.query)
    res.status(200).json(myData)
}

module.exports = {getAllProducts, getAllProductsTesting}