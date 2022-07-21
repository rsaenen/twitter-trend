const { createProxyMiddleware } = require('http-proxy-middleware');

const TARGET = 'http://localhost:3000';

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: TARGET,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        }
    }));
};