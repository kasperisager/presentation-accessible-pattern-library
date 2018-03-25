const g = require("gulp");
const $ = require("gulp-load-plugins")();

g.task("html", () =>
  g
    .src("src/html/*.html")
    .pipe($.plumber())
    .pipe($.nunjucks.compile())
    .pipe(
      $.htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(g.dest("dist"))
    .pipe($.livereload())
);

g.task("img", () => g.src("src/img/**").pipe(g.dest("dist/img")));

g.task("build", ["html", "img"]);

g.task("watch", ["build"], () => {
  $.livereload.listen();
  g.watch("src/html/**/*.html", ["html"]);
  g.watch("src/img/**", ["img"]);
});

g.task("serve", ["watch"], () =>
  g.src("dist").pipe(
    $.webserver({
      livereload: true
    })
  )
);

g.task("deploy", ["build"], () => g.src("dist/**/*").pipe($.ghPages()));
