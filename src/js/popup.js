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
          mostLikedVideos.splice(i, 0, { likes, title: video.snippet.title, id: id });
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

  let mostLikedList = document.getElementById("mostLikedList");
  let highestRatioList = document.getElementById("highestRatioList");
  
  let baseVideoURL = "https://www.youtube.com/watch?v=";
  for(let i=0; i<3; i++){
    let mostLikedItem = document.createElement('li');
    mostLikedItem.innerHTML = `<a href="${baseVideoURL}${mostLikedVideos[i].id}" target="_blank">${decodeHtml(mostLikedVideos[i].title)}</a>`;
    mostLikedList.appendChild(mostLikedItem);

    let highestRatioItem = document.createElement('li');
    highestRatioItem.innerHTML = `<a href="${baseVideoURL}${highestRatioVideos[i].id}" target="_blank">${decodeHtml(highestRatioVideos[i].title)}</a>`;
    highestRatioList.appendChild(highestRatioItem);
  }
}

  console.log("yolo dawg");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var url = new URL(tabs[0].url);
    getChannelId(url)
      .then(channelId => getVideos(channelId))
      .then(updatePopup)
      .catch(console.error);
  });
