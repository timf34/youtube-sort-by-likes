import { getChannelId, getVideos, getVideoStats } from './api.js';
import { decodeHtml } from './utils.js';
import { mockVideosData} from "./mockData";
import { USE_MOCK_DATA} from "./constants";

function updateCard(video, cardElement) {
  const titleElement = cardElement.querySelector('.p');
  const likesElement = cardElement.querySelector('.likes-text');
  const ratioElement = cardElement.querySelector('.ratio-text');
  const viewsElement = cardElement.querySelector('.views-text');

  titleElement.textContent = video.title;
  likesElement.textContent = `Likes: ${video.likes}`;
  ratioElement.textContent = `Ratio: ${(video.likes / video.views * 100).toFixed(1)}%`;
  viewsElement.textContent = `Views: ${video.views}`;
}


async function fetchVideoStats(videoId) {
  let stats = await getVideoStats(videoId);
  return {
    views: parseInt(stats.viewCount),
    likes: parseInt(stats.likeCount),
    id: videoId,
    ratio: parseInt(stats.likeCount) / parseInt(stats.viewCount)
  };
}

/**
 * Updates the top videos array based on the given metric.
 * @param {Array} topVideos - The array to update with top videos.
 * @param {number} metricValue - The metric value to compare (likes or ratio).
 * @param {Object} video - The video object to potentially add to the top videos.
 * @param {string} metricKey - The key of the metric ('likes' or 'ratio').
 */
function updateTopVideos(topVideos, metricValue, video, metricKey) {
  for (let i = 0; i < topVideos.length; i++) {
    if (metricValue > topVideos[i][metricKey]) {
      topVideos.splice(i, 0, {[metricKey]: metricValue, title: video.snippet.title, id: video.id.videoId});
      topVideos.pop();
      break;
    }
  }
}

/**
 * Updates the specified DOM list with video information.
 * @param {string} listId - The ID of the DOM element to update.
 * @param {Array} videos - The array of video objects to display in the list.
 */
async function updateDOMList(listId, videos) {
  let listElement = document.getElementById(listId);
  listElement.innerHTML = '';  // Clear existing list content

  await new Promise(resolve => setTimeout(resolve, 200)); // Temp pause to ensure its working

  // Create list items for each video and append them to the list
  videos.forEach(video => {
    let listItem = document.createElement('li');
    let videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
    listItem.innerHTML = `<a href="${videoUrl}" target="_blank">${decodeHtml(video.title)}</a>`;
    listElement.appendChild(listItem);
  });
}

/**
 * Updates the popup with the most liked videos and videos with the highest like/view ratio.
 * @param {Array} videos - An array of video objects to be processed.
 */
async function updatePopup(videos) {
  console.log("Updating popup");

  // Initialize arrays to store top videos based on likes and like/view ratio
  let mostLikedVideos = Array(3).fill({ likes: 0, title: "", id: "" });
  let highestRatioVideos = Array(3).fill({ ratio: 0, title: "", id: "" });

  for (let video of videos) {
    let { views, likes, id, ratio } = await fetchVideoStats(video.id.videoId);

    // Maintains the top 3 most liked videos
    updateTopVideos(mostLikedVideos, likes, video, 'likes');

    // Maintains the top 3 videos with the highest like/view ratio
    updateTopVideos(highestRatioVideos, ratio, video, 'ratio');
  }

  // Update the DOM with the top videos
  await updateDOMList("mostLikedList", mostLikedVideos);
  await updateDOMList("highestRatioList", highestRatioVideos);
}

async function refreshData() {

  if (USE_MOCK_DATA) {
    console.log("using mock data in refreshData()");
    updatePopup(mockVideosData);
    return;
  }

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

if (USE_MOCK_DATA) {
  console.log("using mock data)")
  updatePopup(mockVideosData);
}
else {
  refreshData();
}