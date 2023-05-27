import { getVideos, getVideoStats } from './api.js';
import { getChannelId } from './utils.js';

// Updates the popup with the most liked video and video with the highest like/view ratio
async function updatePopup(videos) {
  let mostLikedVideos = Array(3).fill({likes: 0, title: ""});
  let highestRatioVideos = Array(3).fill({ratio: 0, title: ""});

  console.log(videos);

  for (let video of videos) {
    let stats = await getVideoStats(video.id.videoId);
    let views = parseInt(stats.viewCount);
    let likes = parseInt(stats.likeCount);

    let ratio = likes / views;

    for (let i = 0; i < 3; i++) {
      if (likes > mostLikedVideos[i].likes) {
        mostLikedVideos.splice(i, 0, {likes, title: video.snippet.title});
        mostLikedVideos.pop();
        break;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (ratio > highestRatioVideos[i].ratio) {
        highestRatioVideos.splice(i, 0, {ratio, title: video.snippet.title});
        highestRatioVideos.pop();
        break;
      }
    }
  }

  document.getElementById("mostLikedVideo1").textContent = mostLikedVideos[0].title;
  document.getElementById("mostLikedVideo2").textContent = mostLikedVideos[1].title;
  document.getElementById("mostLikedVideo3").textContent = mostLikedVideos[2].title;

  document.getElementById("highestRatioVideo1").textContent = highestRatioVideos[0].title;
  document.getElementById("highestRatioVideo2").textContent = highestRatioVideos[1].title;
  document.getElementById("highestRatioVideo3").textContent = highestRatioVideos[2].title;
}

console.log("yolo dawg");

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = new URL(tabs[0].url);
  getChannelId(url)
    .then(channelId => getVideos(channelId))
    .then(updatePopup)
    .catch(console.error);
});
