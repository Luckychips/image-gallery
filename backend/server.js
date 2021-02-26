const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const app = express();
const PORT = 5000;

const doParse = async () => {
  try {
    return await axios.get("https://www.flickr.com/explore");
  } catch (error) {
    console.error(error);
  }
};

app.use(cors());

app.get("/", (req, res, next) => {
  res.json({ greet: "hello heuron!" });
});

app.get("/images", async (req, res) => {
  const images = [];
  const html = await doParse();
  const $ = cheerio.load(html.data);
  const $imageList = $(".photo-list-photo-view");

  $imageList.each((index, elem) => {
    let imageInfo = $(elem).css("background-image");
    imageInfo = imageInfo.replace("url(//", "");
    imageInfo = imageInfo.replace(")", "");
    images.push(imageInfo);
  });

  await res.json(images);
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
