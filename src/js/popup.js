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

  // Clear the lists 
  mostLikedList.innerHTML = '';
  highestRatioList.innerHTML = '';

  await new Promise(resolve => setTimeout(resolve, 500));  // Temp pause to ensure its working 

  let baseVideoURL = "https://www.youtube.com/watch?v=";
  for (let i = 0; i < 3; i++) {
    let mostLikedItem = document.createElement('li');
    mostLikedItem.innerHTML = `<a href="${baseVideoURL}${mostLikedVideos[i].id}" target="_blank">${decodeHtml(mostLikedVideos[i].title)}</a>`;
    mostLikedList.appendChild(mostLikedItem);

    let highestRatioItem = document.createElement('li');
    highestRatioItem.innerHTML = `<a href="${baseVideoURL}${highestRatioVideos[i].id}" target="_blank">${decodeHtml(highestRatioVideos[i].title)}</a>`;
    highestRatioList.appendChild(highestRatioItem);
  }
}

async function refreshData() {

  // Get the current tab's URL
  const tabs = await new Promise(resolve =>
    chrome.tabs.query({ active: true, currentWindow: true }, resolve)
  );
  const url = new URL(tabs[0].url);

  // Get the channelId
  const channelId = await getChannelId(url);

  // Clear the cache for this channel
  await new Promise((resolve, reject) => {
    chrome.storage.local.remove(channelId, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });

  // Fetch new data and update the popup
  const videos = await getVideos(channelId);
  updatePopup(videos);
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = new URL(tabs[0].url);
  getChannelId(url)
    .then(channelId => getVideos(channelId))
    .then(updatePopup)
    .catch(console.error);
});

document.getElementById('refreshButton').addEventListener('click', refreshData);
