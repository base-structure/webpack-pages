const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = require('./src/pages');

const entry = [];
const plugins = [];

const registerEntry = ({name}) => {
    entry[`${name}`] = `./src/pages/${name}/index.js`;
};

const registerPlugin = ({
    name,
    template,
    filename,
    chunks
}) => {
    plugins.push(new HtmlWebpackPlugin({
        template: template || `./src/pages/${name}/index.html`,
        filename: filename || `${name}.html`,
        chunks: chunks || [`${name}`]
    }));
}

pages.forEach((item) => {
    registerEntry(item);
    registerPlugin(item);
});

module.exports = {
    entry,
    plugins
}
