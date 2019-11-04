/*
 vue-cli 项目的核心配置文件
 */
const webpack = require('webpack');
const path = require('path');
function resolve (subPath) {
   return path.join(__dirname, subPath);
}

module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
      config.resolve.alias
        .set('@', resolve('src'))
        .set('_c', resolve('src/components'))
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    }
};
