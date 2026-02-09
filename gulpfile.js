//Gulp plugins
let gulp = require('gulp');
$ = require('gulp-load-plugins')({ lazy: true });
let del = require('del');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
let GulpSSH = require('gulp-ssh');
const argv = require('yargs').argv;
const minify = require("gulp-minify");
const replace = require('gulp-replace');
const fs = require('fs');

let gulpConfig;
try {
    gulpConfig = require('./gulp-config/data.js');
}
catch (e) {
    console.log( "\x1b[31m",'Necesitas el archivo data.js con las credenciales SSH de desarrollo y authoring para poder trabajar.')
    return;
}
//Variables & Constants
const tarFileName = "archive.tar.gz";
const localPortalRecargasPath = 'webapp-portalrecargas-angular8';
//dev variables
const remotePublishingPath = '/home/usrmiclaro/wps/script_portlet/nuqa8';
const publishCommandDev = './push_all.sh && cat /home/usrmiclaro/wps/script_portlet/nuqa8/webapp-portalrecargas-angular8/sp-cmdln.log';
//auth variables
const publishTempDirTunnel = '/home/usrpcompras/InstalacionPortalCompras/nuqa8';
const publishCommandAuthoring="export PATH=$PATH:/opt/IBM/WebSphere/AppServer/java/bin/;cd /home/usrpcompras/InstalacionPortalCompras/sp_cmdln;./sp.sh push -contentRoot /home/usrpcompras/InstalacionPortalCompras/nuqa8/webapp-portalrecargas-angular8 -socketTimeout 1200000;cat /home/usrpcompras/InstalacionPortalCompras/nuqa8/webapp-portalrecargas-angular8/sp-cmdln.log"
//ONE variables
const publishOneTempDirTunnel = '/home/usrpcompras/wps/script_portlet/nuqa8';
const publishOneCommandAuthoring = `cd webapp-portalrecargas-angular8;sudo /home/usrpcompras/wps/sp_cmdln2/sp.sh push -wcmContentName "PortalRecargas8" -wcmSiteArea "Portal Compras Script Application Library/Portal Compras Script Portlet Applications/" -socketTimeout 1200000;cat sp-cmdln.log`;

const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: gulpConfig.serverData.configDev
});

const gulpSSHAuthTunnel = new GulpSSH({
    ignoreErrors: false,
    sshConfig: gulpConfig.serverData.configAuthTunnel
});


//const enableTCBypass = argv.bypass;
const enableTCBypass = false;

//GUlp tasks
gulp.task('clean', function () {
    return del('./dist/**', {force:true});
});
gulp.task('cleanWCM', function () {
    return del('./dist/webapp-portalrecargas-angular8/assets/wcm/**', {force:true});
});



//unified gulp
let sshConnection = null;
let pub = {};
const environment = argv.env;
console.log(`Publishing to environment ${environment}`)
if (environment == 'dev') {
    sshConnection = gulpSSH;
    pub.remotePublishingPath = remotePublishingPath;
    pub.command = publishCommandDev;
}
if (environment == 'auth') {
    sshConnection = gulpSSHAuthTunnel;
    pub.remotePublishingPath = publishTempDirTunnel;
    pub.command = publishCommandAuthoring;
}

gulp.task('repTagsEnd', function () {
    return gulp.src('dist/webapp-portalrecargas-angular8/index.html')
  .pipe(replace(/<script src="assets\/wcm\/wcmTagsEnd.js"[^>]*>/, function(s) {
      var content = fs.readFileSync('dist/webapp-portalrecargas-angular8/assets/wcm/wcmTagsEnd.js', 'utf8');
      return '<script>\n' + content + '\n</script>';
  }))
  .pipe(gulp.dest('dist/webapp-portalrecargas-angular8'));
});
gulp.task('repTags', function () {
    return gulp.src('dist/webapp-portalrecargas-angular8/index.html')
  .pipe(replace(/<script src="assets\/wcm\/wcmTags.js"[^>]*>/, function(s) {
      var content = fs.readFileSync('dist/webapp-portalrecargas-angular8/assets/wcm/wcmTags-min.js', 'utf8');
      return '<script>\n' + content + '\n</script>';
  }))
  .pipe(gulp.dest('dist/webapp-portalrecargas-angular8'));
});



gulp.task('minifyjs', function () {
    return gulp.src('dist/webapp-portalrecargas-angular8/assets/wcm/wcmTags.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true, preserveComments: 'some', mangle:false}))
        .pipe(gulp.dest('dist/webapp-portalrecargas-angular8/assets/wcm'))
});
gulp.task('injectWCMTags',   gulp.series('minifyjs',function () {
    return gulp.src('dist/webapp-portalrecargas-angular8/index.html')
    .pipe(replace(/<script src="assets\/wcm\/wcmTags.js"[^>]*>/, function(s) {
        var content = fs.readFileSync('dist/webapp-portalrecargas-angular8/assets/wcm/wcmTags-min.js', 'utf8');
        return '<script>\n' + content + '\n</script>';
    }))
    .pipe(gulp.dest('dist/webapp-portalrecargas-angular8'));
}));
gulp.task('injectWCMTagsEnd',   gulp.series('injectWCMTags',function () {
    return gulp.src('dist/webapp-portalrecargas-angular8/index.html')
  .pipe(replace(/<script src="assets\/wcm\/wcmTagsEnd.js"[^>]*>/, function(s) {
      var content = fs.readFileSync('dist/webapp-portalrecargas-angular8/assets/wcm/wcmTagsEnd.js', 'utf8');
      return '<script>\n' + content + '\n</script>';
  }))
  .pipe(gulp.dest('dist/webapp-portalrecargas-angular8'));
}));

gulp.task('maketarUnique',   gulp.series('injectWCMTagsEnd',function () {
    return gulp.src(['dist/**/*',
        '!dist/webapp-portalrecargas-angular8/assets/{mocks,mocks/**/*}',
        '!dist/webapp-portalrecargas-angular8/assets/wcm/{mocks,mocks/**/*}',
        '!dist/webapp-portalrecargas-angular8/assets/img/*.svg',
        '!dist/webapp-portalrecargas-angular8/assets/img/{mocks,mocks/**}',
        '!dist/webapp-portalrecargas-angular8/assets/{fonts,fonts/**}'
    ])
         .pipe(tar('archive.tar',{mode: null}))
         .pipe(gzip())
         .pipe(gulp.dest('dist'));
 }));
gulp.task('cleanRemoteUnique', gulp.series('maketarUnique',function () {
    return sshConnection
        .exec([`cd ${pub.remotePublishingPath};[ -d ${localPortalRecargasPath} ] && rm -r ${localPortalRecargasPath};pwd`],
                { filePath: 'commands.log' })
        .pipe(gulp.dest('logs'))
}));
gulp.task('movespUnique', gulp.series('cleanRemoteUnique', function () {
    return gulp
        .src([`./dist/${tarFileName}`])
        .pipe(sshConnection.dest(`${pub.remotePublishingPath}`))
}));
gulp.task('publishUnique', gulp.series('movespUnique', function () {
    return sshConnection
        .exec([`cd ${pub.remotePublishingPath};tar xvzf ${tarFileName} -m; rm -f ${tarFileName}; ${pub.command}`],
            { filePath: 'commands.log' })
        .pipe(gulp.dest('logs'));
}));