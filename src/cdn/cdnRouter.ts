// Import modules.
import express from "express";
const router = express.Router();
import path from "path";
import { readdirSync } from "fs";
const cdnDirectory = readdirSync("./src/cdn/items");

cdnDirectory.forEach((directory) => {
  const dir = readdirSync(`./src/cdn/items`);
  const itemCDNs = readdirSync(`./src/cdn/items/${directory}`);
  itemCDNs.forEach((item) => {
    console.log(
      `Loaded CDN item /${directory}/${item.toLowerCase()} successfully!`
    ); // If you don't want your terminal to be spammed with these for each item directory and item, then comment this line or delete it.
  });
});

router.get(`/:directory/:itemname`, (req, res) => {
  const dir = `./src/cdn/items/${req.params.directory}`;
  try {
    const files = readdirSync(dir);
    let file;
    if (req.params.itemname.includes(".")) {
      file = files.find(
        (element) => element.toLowerCase() === req.params.itemname.toLowerCase()
      );
    } else {
      file = files.find(
        (element) =>
          path.parse(element).name.toLowerCase() ===
          req.params.itemname.toLowerCase()
      );
    }
    if (file === undefined || !file) return res.status(404).send();
    res
      .status(200)
      .sendFile(
        path.resolve(`./src/cdn/items/${req.params.directory}/${file}`)
      );
  } catch {
    return res.status(404).send();
  }
});

module.exports = router; // Never do export default router, that won't work, just keep doing the safe module.exports = router method.
