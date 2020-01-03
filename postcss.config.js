const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

module.exports = {
    plugins: [
        autoprefixer({
            overrideBrowserslist: [
                '> 1%',
                'last 3 version',
                'android 4.2',
                'ie 8'
            ]
        }),
        stylelint({
            config: {
                rules: {
                }
            }
        })
    ]
}
