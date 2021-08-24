//npm i gulp --save-dev устанавливаем галп
//require подключает пакеты из node_modules
//npm i browser-sync --save-dev  пакет для лайв обновления
//npm i --save-dev gulp-concat пакет для конкатенации файлов в один итоговый
//npm i --save-dev gulp-uglify-es модуль для оптимизации скриптов
//npm i --save-dev gulp-sass пакет для работы с sass
//npm i --save-dev sass
//npm i --save-dev gulp-autoprefixer
//npm i --save-dev gulp-clean-css делает итоговый сборный css покрасивей
//!! для демонстрции npm i --save-dev gulp-less
//npm -i save-dev gulp-imagemin  модуль для работы с изображениями
//npm install compress-images --save-dev другой вариант модуля для работы с изображениями
//npm i --save-dev compress-images gifsicle pngquant-bin del третий вариант модуля для работы с img
let preprocessor = "sass";

const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create(); //создаем новое подключение
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass")(require("sass"));
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
//const imagemin = require('gulp-imagemin'); не работает
const imagecomp = require("compress-images");
const del = require("del");

function browsersync() {
  browserSync.init({
    server: { baseDir: "app/" },
    notify: false,
    online: false,
  });
}

function scripts() {
  return src(["app/js/app2.js", "app/js/app.js"])
    .pipe(concat("app.min.js")) //собрали в один
    .pipe(uglify())
    .pipe(dest("app/js/")) //выгрузили в dist
    .pipe(browserSync.stream()); //перезагрузка страницы
}

function styles() {
  return (
    src("app/" + preprocessor + "/main." + preprocessor + "")
      //.pipe(sass())//когда у нас один sass
      .pipe(eval(preprocessor)())
      .pipe(concat("app.min.css"))
      .pipe(
        autoprefixer({ overrideBrowserslist: ["last 5 versions"], grid: true })
      )
      .pipe(
        cleancss({
          level: { 1: { specialComments: 0 } } /*, format: 'beautify'*/,
        })
      )
      .pipe(dest("app/css/"))
      .pipe(browserSync.stream())
  );
}

async function images() {
  imagecomp(
    "app/images/src/**/*", // Берём все изображения из папки источника
    "app/images/dest/", // Выгружаем оптимизированные изображения в папку назначения
    { compress_force: false, statistic: true, autoupdate: true },
    false, // Настраиваем основные параметры
    { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
    { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (err, completed) {
      // Обновляем страницу по завершению
      if (completed === true) {
        browserSync.reload();
      }
    }
  );
}

function buildcopy() {
  return src(
    [
      // Выбираем нужные файлы
      "app/css/**/*.min.css",
      "app/js/**/*.min.js",
      "app/images/dest/**/*",
      "app/**/*.html",
    ],
    { base: "app" }
  ) // Параметр "base" сохраняет структуру проекта при копировании
    .pipe(dest("dist")); // Выгружаем в папку с финальной сборкой
}

function cleanimg() {
  return del("app/images/dest/**/*", { force: true }); // Удаляем все содержимое папки "app/images/dest/"
}

function cleandist() {
  return del("dist/**/*", { force: true }); // Удаляем все содержимое папки "dist/"
}

function startwatch() {
  watch("app/**/" + preprocessor + "/**/*", styles);
  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch("app/**/*.html").on("chnge", browserSync.reload);
  watch("app/images/src/**/*", images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, images, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);
