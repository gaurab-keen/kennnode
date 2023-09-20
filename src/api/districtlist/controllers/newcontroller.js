'use strict';

/**
 * districtlist controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::districtlist.districtlist',({strapi})=>({

    async getFilterData(ctx){
            const { id } = ctx.request.params;
            //plugin::users-permissions.user
        const entries = await strapi.db.query('admin::user')
          .findOne({ where: { id }, populate: ['role'] });
          if(entries!=null)
           ctx.body = entries;
          else
          ctx.send("Some thing wrong");
    }
}));
