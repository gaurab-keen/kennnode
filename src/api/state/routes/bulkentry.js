module.exports = {
    routes: [
        {
          method: "POST",
          path: "/state/bulkentry",
          handler: "bulkentry.createMany",
        },
      ],
    };