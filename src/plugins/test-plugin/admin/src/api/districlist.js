import { request }  from '@strapi/helper-plugin';



const DistrictApiHandler= {
 
    // getAllReminders: async () => {
    //   return await request("/reminderapp/getall", {
    //     method: "GET",
    //   });
    // },
    // addReminder: async (data) => {
    //   return await request(`/reminderapp/create`, {
    //     method: "POST",
    //     body: { data: data },
    //   });
    // },
    getAdminUser: async (id) => {
      try{
        console.log("test check000000 ");
       // const client = useFetchClient();
        const data= await request(`/test-plugin/getadmin/${id}`, {
          method: "PUT",
        });
        console.log("test check11111 "+JSON.stringify(data));
        return data;
      }catch(err){
        console.log("test check22222 "+err);
      }
     
    },
    // deleteReminder: async (id) => {
    //   return await request(`/reminderapp/delete/${id}`, {
    //     method: "DELETE",
    //   });
    // },
  };
  export default DistrictApiHandler;