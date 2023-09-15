const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;
const {validText} =require('../../../commonfiles/htmlvalidator')

// import {statusText} from '../../../../plugins/test-plugin/admin/src/components/CommonFile/index'
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
     
      
      strapi.log.debug("Data status  Status "+JSON.stringify(params))
      const entries = await strapi.db.query('api::districtlist.districtlist').findOne({ 
        where: { id: params.where.id }});   
        if(entries==null)
          return;

        if (params.data.hasOwnProperty("publishedAt")) {
           if(params.data.publishedAt!=null || params.data.publishedAt!=undefined){
                 if(entries.review_status!='Approved'){
                 // isPublished=false
                 throw new ApplicationError('Collection data is not approved', { foo: 'bar' });
                 // throw strapi.errors.ApplicationError("My Data is not approved");
                  
                 } 
                 strapi.log.debug("Data is Published  Status  "+JSON.stringify(entries.review_status))
            }  else{
              strapi.log.debug("Data is unpublished  Status We will send Email to Reviewer")
            }   
        }
        else{
          // isPublished=false
          // if(entries.review_status=="Draft"){
          //   strapi.log.debug("No any step needed for this status"+JSON.stringify(entries.review_status))
          // }
          //  if(entries.review_status=="Rejected"){
            
          //   strapi.log.debug("Data is Svaed Status  and change status to reject to Under Review, We will send Email to Reviewer to check and approved"+JSON.stringify(entries.review_status))
          // }
        
       if(entries.review_status=="Under Review"){
      //   try{
      //     await strapi.plugins['email'].services.email.send({
      //       to: 'nitu.gupta@fosteringlinux.com',
      //       from: 'gaurab.kumar@fosteringlinux.com' ,
      //       cc: 'varad.gupta@fosteringlinux.com' ,
      //       // bcc: 'valid email address',
      //       // replyTo: 'valid email address',
      //       subject: 'The Strapi Email plugin worked successfully',
      //       text: `Data is send for review ${result.name} data is saved by user ${result.auther_email}` , // Replace with a valid field ID
      //       // html: 'Hello world!', 
              
      //     })
      // } catch(err) {
      //     console.log(err);
      // }
          strapi.log.debug("Data is Svaed Status , We will send Email to Reviewer to check and approved"+JSON.stringify(entries.review_status))
        }
           


         }
      
    //   if (params.data.hasOwnProperty("publishedAt")) {
    
           
    //     isPublished=true
    //     strapi.log.debug("Published data ")
    //   return
    // }
         
    //       //strapi.log.debug("Data status  Status "+JSON.stringify(params))
    //       if(params.data.hasOwnProperty("isVisibleInListView")){
            // const entries = await strapi.db.query('api::districtlist.districtlist').findOne({ 
            //   where: { id: params.where.id }});
              
            // if(isPublished){
            //      if(entries.review_status!='Approved'){
            //       isPublished=false
            //       throw strapi.errors.ApplicationError("My mesData is not approved");
            //      } 
            //      strapi.log.debug("Data is Published  Status "+JSON.stringify(entries.review_status))
            // }  
            // else{
            //   isPublished=false
            //   strapi.log.debug("Data is Svaed Status "+JSON.stringify(entries.review_status))
            // }
               
            
    //       }
         
    //       isPublished=false
 
    //  },
    //  beforeDelete: async ({params})=>{
     
    //   strapi.log.debug("before Deleted  "+JSON.stringify(params));
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
      if(result.review_status="Under Review")
      {
      //   try{
      //     await strapi.plugins['email'].services.email.send({
      //       to: 'nitu.gupta@fosteringlinux.com ',
      //       from: 'gaurab.kumar@fosteringlinux.com ', // e.g. single sender verification in SendGrid
      //       cc: 'varad.gupta@fosteringlinux.com' ,
      //       // bcc: 'valid email address',
      //       // replyTo: 'valid email address',
      //       subject: 'The Strapi Email plugin worked successfully',
      //       text: `Data is send for review ${result.name} data is saved by user ${result.auther_email}` , // Replace with a valid field ID
      //       // html: 'Hello world!', 
              
      //     })
      // } catch(err) {
      //     console.log(err);
      // }
      }
      

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