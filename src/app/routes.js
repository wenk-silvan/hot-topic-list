/**
 * Base routine that includes all other partial routing paths.
 * @param app The application middleware
 */
module.exports = function (app) {
  // Include API. URI: "/api/1.0"
  app.use("/api/1.0", require("./api-1.0.0"));

  // render all partial views as partial (layout:false)
  app.get("/views/partial/:view", function (req, res) {
    res.render("partial/" + req.params.view, {layout: false, req: req});
  });

  // There is only page
  app.get("/", function (req, res) {
    res.render("plain", {title: "Hot Topics List"});
  });
};

