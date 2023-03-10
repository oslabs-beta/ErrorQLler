// const queryRespController = {};
// const queryResModel = require('../models/queryResModel')

// queryRespController.getLatestQueryResp = async (req,res,next) => {
//     // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
//     const latestQuery = await queryResModel.find({ });
//     // const latestQuery = await queryResModel.find({ }).sort({_id:-1}).limit(1);
//     // const latestQuery = await queryResModel.findOne().sort({ createdAt: -1 });;

//     // const parsed_data = latestQuery.map((item) => {
//     //     if(item.response?.queryResp){
//     //         return item.response.queryResp
//     //     };
//     // });
      
//     // const result = parsed_data.filter((element)=>{
//     //     return element !== undefined
//     // });

//     // console.log('latest: ', latestQuery)
//     res.locals.latestQuery = latestQuery;
//     return next();
// }

// module.exports = queryRespController;
const queryRespController = {};
const queryResModel = require("../models/queryResModel");

queryRespController.getLatestQueryResp = async (req, res, next) => {
  // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
  const latestQuery = await queryResModel.find({}).sort({ _id: -1 }).limit(1);

  // const latestQuery = await queryResModel.findOne().sort({ createdAt: -1 });;
  console.log("latest: ", latestQuery);
  const dataObj = latestQuery[0].response.queryResp.data;
  console.log('dataObj: ', dataObj)

  const transformData = (input) => {
    const output = { name: "data", children: [] };
    for (const [movieKey, movieValue] of Object.entries(input)) {
      const movieObject = { name: movieKey, children: [] };
      for (const [fieldKey, fieldValue] of Object.entries(movieValue)) {
        const fieldObject = {
          name: fieldKey,
          children: [{ name: fieldValue }],
        };
        movieObject.children.push(fieldObject);
      }
      output.children.push(movieObject);
    }
    return output;
  }

  const output = transformData(dataObj);
  console.log('output: ', output);

  res.locals.latestQuery = output;
  return next();
};

module.exports = queryRespController;