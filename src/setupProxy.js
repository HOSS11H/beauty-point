const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/v1',
        createProxyMiddleware({
            target: 'https://beautypoint.sa/api/v1',
            changeOrigin: true,
        })
    );
};
