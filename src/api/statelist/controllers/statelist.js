'use strict';

/**
 * statelist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::statelist.statelist',({strapi})=>({
    async checkMessage(ctx){
        console.log("abcdefgh");
        
    }
    
}));
