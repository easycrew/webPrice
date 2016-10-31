var st = {
    file: {
        css:'www/app/templates_origin_v2/style/',
        img: ['www/app/templates_origin_v2/image/*.{png,jpg,png,ico}'],
        icon:'www/app/templates_origin_v2/image/',
        sitescss: 'www/app/templates_origin_v2/style/site/',
        mix: 'www/app/templates_origin_v2/style/mixins/',
    },
    dist: {
        dir: {
            root: 'www/www/assets_v2/',
            css: 'www/www/assets_v2/css/',
            img: 'www/www/assets_v2/img/',
        },
        rev: 'rev/',
    },
    autoprefixerBrowsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 18',
        'Firefox >= 20',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 10',
        'Safari >= 6'
    ]
};

module.exports = st;