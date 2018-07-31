let mix = require('laravel-mix');
let build = require('./tasks/build.js');
let tailwind = require('tailwindcss');
require('laravel-mix-purgecss');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');
mix.webpackConfig({
    plugins: [
        build.jigsaw,
        build.browserSync(),
        build.watch(['source/**/*.md', 'source/**/*.php', 'source/**/*.less', '!source/**/_tmp/*']),
    ]
});

mix.js('source/_assets/js/main.js', 'js')
    .less('source/_assets/less/main.less', 'css')
    .options({
        processCssUrls: false,
        postCss: [
            tailwind('tailwind.js'),
        ]
    })
    .purgeCss({
        folders: ['source'],
    })
    .version();