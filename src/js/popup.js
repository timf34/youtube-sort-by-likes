import { getVideos, getVideoStats } from './api.js';
import { getChannelId } from './utils.js';
import { decodeHtml } from './utils.js';

// Updates the popup with the most liked video and video with the highest like/view ratio
async function updatePopup(videos) {
  let mostLikedVideos = Array(3).fill({ likes: 0, title: "", id: "" });
  let highestRatioVideos = Array(3).fill({ ratio: 0, title: "", id: "" });

  for (let video of videos) {
    let stats = await getVideoStats(video.id.videoId);
    let views = parseInt(stats.viewCount);
    let likes = parseInt(stats.likeCount);
    let id = video.id.videoId;
    let ratio = likes / views;

    for (let i = 0; i < 3; i++) {
      if (likes > mostLikedVideos[i].likes) {
        mostLikedVideos.splice(i, 0, { likes, title: video.snippet.title });
        mostLikedVideos.pop();
        break;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (ratio > highestRatioVideos[i].ratio) {
        highestRatioVideos.splice(i, 0, { ratio, title: video.snippet.title });
        highestRatioVideos.pop();
        break;
      }
    }
  }

  let baseVideoURL = "https://www.youtube.com/watch?v=";
  document.getElementById("mostLikedVideo1").innerHTML = `<a href="${baseVideoURL}${mostLikedVideos[0].id}" target="_blank">${decodeHtml(mostLikedVideos[0].title)}</a>`;
  document.getElementById("mostLikedVideo2").innerHTML = `<a href="${baseVideoURL}${mostLikedVideos[1].id}" target="_blank">${decodeHtml(mostLikedVideos[1].title)}</a>`;
  document.getElementById("mostLikedVideo3").innerHTML = `<a href="${baseVideoURL}${mostLikedVideos[2].id}" target="_blank">${decodeHtml(mostLikedVideos[2].title)}</a>`;

  document.getElementById("highestRatioVideo1").innerHTML = `<a href="${baseVideoURL}${highestRatioVideos[0].id}" target="_blank">${decodeHtml(highestRatioVideos[0].title)}</a>`;
  document.getElementById("highestRatioVideo2").innerHTML = `<a href="${baseVideoURL}${highestRatioVideos[1].id}" target="_blank">${decodeHtml(highestRatioVideos[1].title)}</a>`;
  document.getElementById("highestRatioVideo3").innerHTML = `<a href="${baseVideoURL}${highestRatioVideos[2].id}" target="_blank">${decodeHtml(highestRatioVideos[2].title)}</a>`;

}

console.log("yolo dawg");

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = new URL(tabs[0].url);
  getChannelId(url)
    .then(channelId => getVideos(channelId))
    .then(updatePopup)
    .catch(console.error);
});
