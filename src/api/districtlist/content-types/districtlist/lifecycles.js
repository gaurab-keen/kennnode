const { ForbiddenError,ValidationError,ApplicationError} = require("@strapi/utils").errors;
const validText =require('../../../commonfiles/htmlvalidator')
let isPublished=false;
module.exports = {
    beforeCreate: async ({ params }) => {
        const adminUserId = params.data.createdBy;
        // if(validText(params.data.htmltext))
        // {
        //   strapi.log.debug("Text is valid :- "+params.data.htmltext)
        //  // throw new ValidationError(`HTML is Valid `);
        // }else{
        //   strapi.log.debug("Text is Invalid :- "+params.data.htmltext)
        //  // throw new ForbiddenError("state id is not correct");
        // }
          // if(params.data.is_reviewed){
          //   throw new ApplicationError('Something went wrong', { foo: 'bar' });
          //  // throw new ValidationError("state id is not correct");
          // }
          
     },
     beforeUpdate: async ({params})=>{
      
      
          if (params.data.hasOwnProperty("publishedAt")) {
           
              isPublished=true
              strapi.log.debug("Published data ")
            return
          }
         
          //strapi.log.debug("Data status  Status "+JSON.stringify(params))
          if(params.data.hasOwnProperty("isVisibleInListView")){
            const entries = await strapi.db.query('api::districtlist.districtlist').findOne({ 
              where: { id: params.where.id }});
              
            if(isPublished){
                 if(entries.review_status!='done'){
                  isPublished=false
                  throw new ValidationError("state id is not correct");
                 } 
                 strapi.log.debug("Data is Published  Status "+JSON.stringify(entries.review_status))
            }  
            else{
              isPublished=false
              strapi.log.debug("Data is Svaed Status "+JSON.stringify(entries.review_status))
            }
               
            
          }
         
          isPublished=false
 
     },
     beforeDelete: async ({params})=>{
     
      strapi.log.debug("before Deleted  "+JSON.stringify(params));
     },
     afterCreate:async ({result})=>{
    //  strapi.log.debug("after Create 11111 "+JSON.stringify(result));
      const entries = await strapi.db.query('api::districtlist.districtlist').update({
        
        where: { id: result.id },
                    data: {
                      auther_email:result.updatedBy.email,
                      auther_name:`${result.updatedBy.firstname} ${result.updatedBy.lastname}`
                    }, 
        
      });
      

      ///await strapi.query('user', 'users-permissions').update({id: user_id}, {role: role_id});}
      
     },
     afterUpdate: async ({result})=>{
      //strapi.log.debug("after updated data and  "+JSON.stringify(result));
      // if (!params.data.hasOwnProperty("publishedAt")) {
      //  const entries = await strapi.db.query('api::districtlist.districtlist').update({ 
      //            where: { id: result.id },
      //                data: {
      //                  review_status:"sent",
 
      //                },  
      //               });
     
      // } 
        
      },
     afterDelete: async({result})=>{
      strapi.log.debug("after Deleted data and  "+JSON.stringify(result));
     }
     
     
     
     
  };