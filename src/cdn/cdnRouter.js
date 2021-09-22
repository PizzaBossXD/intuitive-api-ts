// Import modules.
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const cdnDirectory = fs.readdirSync("./src/cdn/items");

cdnDirectory.forEach((directory) => {
    const dir = fs.readdirSync(`./src/cdn/items`);
    const itemCDNs = fs.readdirSync(`./src/cdn/items/${directory}`);
    itemCDNs.forEach((item) => {
        console.log(`Loaded CDN item /${directory}/${item.toLowerCase()} successfully!`); // If you don't want your terminal to be spammed with these for each item directory and item, then comment this line or delete it.
    });
});

router.get(`/:directory/:itemname`, (req, res) => {
    const dir = `./src/cdn/items/${req.params.directory}`;
    try {
        const files = fs.readdirSync(dir);
        let file;
        if (req.params.itemname.includes(".")) {
            file = files.find(element => element.toLowerCase() === (req.params.itemname.toLowerCase()));
        } else {
            file = files.find(element => path.parse(element).name.toLowerCase() === (req.params.itemname.toLowerCase()));
        }
        if (file === undefined || !file) return res.status(404).send();
        res.status(200).sendFile(path.resolve(`./src/cdn/items/${req.params.directory}/${file}`));
    } catch {
        return res.status(404).send();
    }
});

module.exports = router;
