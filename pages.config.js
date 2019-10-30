const HtmlWebpackPlugin = require('html-webpack-plugin');

const page = (name, chunks=[]) => {
    return {
        entry: `${name}`,
        js: `./src/${name}/${name}.js`,
        template: `./src/${name}/${name}.html`,
        filename: `${name}.html`,
        chunks: [
            `${name}`,
            ...chunks
        ]
    }
}

(function(pages = []){
    const entry = [];
    const plugins = [];

    pages.forEach(item => {
        entry[item.entry] = item.js,
        plugins.push(new HtmlWebpackPlugin({
            template: item.template,
            filename: item.filename,
            chunks: item.chunks
        }))
    })

    module.exports = {
        entry,
        plugins
    }
})([
    page('home'),
])
