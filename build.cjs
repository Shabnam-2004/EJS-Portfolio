const ejs = require("ejs");
const fs = require("fs-extra");
const path = require("path");

const viewsDir = path.join(__dirname, "views");
const partialsDir = path.join(viewsDir, "partials");
const outputDir = path.join(__dirname, "docs");
const publicDir = path.join(__dirname, "public");

(async () => {
  await fs.ensureDir(outputDir);
  const files = await fs.readdir(viewsDir);

  for (const file of files) {
    const filePath = path.join(viewsDir, file);
    if (file.endsWith(".ejs") && file !== "partials") {
      const html = await ejs.renderFile(filePath, {}, {
        views: [partialsDir]
      });

      const outPath = path.join(outputDir, file.replace(".ejs", ".html"));
      await fs.outputFile(outPath, html);
    }
  }

  await fs.copy(publicDir, outputDir);
})();
