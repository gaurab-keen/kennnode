
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/getadmin/",
    handler: "myAdmin.getAdminUser",
    config: {
      policies: [],
    },
  },
];
