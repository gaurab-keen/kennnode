'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::state.state',({strapi})=>({

    async createMany(ctx){//É preciso fazer harcode, fazer db.query.createMany
        let body = ctx.request.body;
    
        const response = await strapi.db.query('api::state.state').createMany({data: body})
        ctx.send("check my data "+JSON.stringify(response));
        
      }

    // async insertData(ctx){
    //     //     const { id } = ctx.request.params;
    //     //     //plugin::users-permissions.user
    //     // const entries = await strapi.db.query('admin::user')
    //     //   .findOne({ where: { id }, populate: ['role'] });
    //     //   if(entries!=null)
    //     //    ctx.body = entries;
    //     //   else
    //        ctx.send("check my data");
    // }
}));