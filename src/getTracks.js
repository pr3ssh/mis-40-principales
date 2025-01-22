var fs = require("fs");
const path = require("path");
const fetch = require("isomorphic-unfetch");
const { getData, getPreview, getTracks, getDetails } =
  require("spotify-url-info")(fetch);

let tracks = [];

getDetails(
  "https://open.spotify.com/playlist/5fVeETc29lXJOcYNuPlxAd?si=6c54f84ee5c7483c"
).then((data) => {
  tracks = data["tracks"];

  const previewPromises = tracks.map((t) => {
    const uri = t["uri"].replace("spotify:track:", "");
    const getPreviewUrl = "https://open.spotify.com/track/" + uri;

    return getPreview(getPreviewUrl, {
      headers: {
        "user-agent": "googlebot",
      },
    })
      .then((d) => {
        t["image"] = d["image"];
      })
      .catch((err) => {
        console.log(err);
      });
  });

  Promise.all(previewPromises)
    .then(() => {
      tracks.forEach((t) => {
        t["recommendedBy"] = "";
        t["reason"] = "";
      });

      const filePath = path.join(__dirname, "tracks.json");
      fs.writeFileSync(filePath, JSON.stringify(tracks, null, 2), "utf-8");
      console.log(`Tracks data written to ${filePath}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
