'use strict';
module.exports = ({ strapi }) => ({
 async getData(id) {
  try{
    
   
      const entries = await strapi.db.query('admin::user')
      .findOne({where: { id }, populate: ['role'] });
      // console.log("data of user "+JSON.stringify(entries));
      if(entries!=null){
        return entries;
      }
    }catch(err){
      console.log("Something is wrong "+err);
    }
     const data={"errror":"no data found"}
    return "data";
  },
});


