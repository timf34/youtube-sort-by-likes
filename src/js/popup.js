import { getChannelId, getVideos, getVideoStats } from './api.js';
import { decodeHtml } from './utils.js';
import { mockVideosData} from "./mockData";
import { USE_MOCK_DATA} from "./constants";

// Helper function to create DOM elements with class and text
function createElementWithClassAndText(tag, className, textContent, videoId) {
  const element = document.createElement(tag);
  element.className = className;
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

/**
 * Updates the specified DOM list with video information.
 * @param {string} listId - The ID of the DOM element to update.
 * @param {Array} videos - The array of video objects to display in the list.
 */
async function updateDOMList(listId, videos) {
  let frameElement = document.querySelector('.frame');

  videos.forEach(video => {
    // Create the card and info card elements
    const card = createElementWithClassAndText('div', 'card');
    const infoCard = createElementWithClassAndText('div', 'info-card');
    const titlePara = createElementWithClassAndText('a', 'video-title', decodeHtml(video.title));
    titlePara.href = "https://www.youtube.com/watch?v=" + decodeHtml(video.id);
    titlePara.target = "_blank";
    const likesDiv = createElementWithClassAndText('div', 'likes-text', `Likes: ${video.likes.toLocaleString()}`);
    const ratioDiv = createElementWithClassAndText('div', 'ratio-text', `Ratio: ${video.ratio.toFixed(3)}`);
    const viewsDiv = createElementWithClassAndText('div', 'views-text', `Views: ${video.views.toLocaleString()}`);

    // Append the video details to the info card
    infoCard.appendChild(titlePara);
    infoCard.appendChild(likesDiv);
    infoCard.appendChild(ratioDiv);
    infoCard.appendChild(viewsDiv);

    card.appendChild(infoCard);  // Append the info card to the main card
    frameElement.appendChild(card);  // Append the main card to the frame
  });
}

async function fetchVideoStats(videoId) {
  let stats = await getVideoStats(videoId);
  let ratio = (parseInt(stats.likeCount, 10) / parseInt(stats.viewCount, 10)).toFixed(3);
  return {
    views: parseInt(stats.viewCount),
    likes: parseInt(stats.likeCount),
    id: videoId,
    ratio: parseFloat(ratio)
  };
}

/**
 * Updates the top videos array based on the given metric.
 * @param {Array} topVideos - The array to update with top videos.
 * @param {number} metricValue - The metric value to compare (likes or ratio).
 * @param {Object} video - The video object to potentially add to the top videos.
 * @param {number} likes - The number of likes for the video.
 * @param {number} views - The number of views for the video.
 * @param {string} metricKey - The key of the metric ('likes' or 'ratio').
 */
function updateTopVideos(topVideos, metricValue, video, likes, views, metricKey) {
  for (let i = 0; i < topVideos.length; i++) {
    if (metricValue > topVideos[i][metricKey]) {
      topVideos.splice(i, 0, {[metricKey]: metricValue, title: video.snippet.title, id: video.id.videoId, likes: likes, views: views});
      topVideos.pop();
      break;
    }
  }
}

/**
 * Updates the popup with the most liked videos and videos with the highest like/view ratio.
 * @param {Array} videos - An array of video objects to be processed.
 */
async function updatePopup(videos) {
  console.log("Updating popup");

  // Loading message
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'block';
  // Timeout to allow the loading message to display for 5 seconds
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 2000);

  // Initialize arrays to store top videos based on likes and like/view ratio
  let highestRatioVideos = Array(10).fill({ ratio: 0, title: "", likes: "", views: "", id: "" });

  for (let video of videos) {
    let { views, likes, id, ratio } = await fetchVideoStats(video.id.videoId);

    // Maintains the top 3 videos with the highest like/view ratio
    updateTopVideos(highestRatioVideos, ratio, video, likes, views, 'ratio');
  }


  // Update the DOM with the top videos
  await updateDOMList("highestRatioVideos", highestRatioVideos);
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

// document.getElementById('refreshButton').addEventListener('click', refreshData);

if (USE_MOCK_DATA) {
  console.log("using mock data)")
  updatePopup(mockVideosData);
}
else {
  refreshData();
}