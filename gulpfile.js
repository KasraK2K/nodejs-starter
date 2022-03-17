const typedoc = require("gulp-typedoc");

gulp.task("typedoc", function () {
  return gulp.src(["src/**/*.ts"]).pipe(
    typedoc({
      out: "docs/",
      name: "Node Starter Kit",
    })
  );
});
