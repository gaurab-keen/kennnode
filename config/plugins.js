module.exports = ({env}) => ({
    // chartbrew: true,
    'test-plugin': {
        enabled: true,
        resolve: './src/plugins/test-plugin'
      },
      // 'nested-field': {
      //   enabled: true,
      //   resolve: './src/plugins/nested-field'
      // },
      
    
      
      // 'test-plugin1': {
      //   enabled: true,
      //   resolve: './src/plugins/test-plugin'
      // } 
    //    email: {
       
    //     config: {
    //     // provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
    //     providerOptions: {
    //         // apiKey: env('SENDGRID_API_KEY'),
    //     },
    //   settings: {
    //     defaultFrom: 'gaurab.kumar@fosteringlinux.com',
    //     defaultReplyTo: 'gaurab.kumar@fosteringlinux.com',
    //     testAddress: 'gaurab.kumar@fosteringlinux.com ',
    //   },
    // },
//   },
  });