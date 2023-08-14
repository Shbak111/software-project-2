const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/period", {
      target: "http://www.culture.go.kr/openapi/rest/publicperformancedisplays",
      changeOrigin: true,
    })
  );
};
