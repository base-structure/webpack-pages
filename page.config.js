const HtmlWebpackPlugin = require('html-webpack-plugin');

const page = (name) => {
    return {
        name: name,
        entry: `${name}`,
        template: `./src/${name}/${name}.html`,
        filename: `${name}.html`,
        js: `./src/${name}/${name}.js`
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
            chunks: [item.entry]
        }))
    })

    module.exports = {
        entry,
        plugins
    }
})([
    page('home'),
])
