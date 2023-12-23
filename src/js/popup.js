import { getChannelId, getVideos, getVideoStats } from './api.js';
import { decodeHtml } from './utils.js';
import { mockVideosData} from "./mockData";
import { USE_MOCK_DATA} from "./constants";

// TODO: use this function
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
 * Updates the specified DOM list with video information.
 * @param {string} listId - The ID of the DOM element to update.
 * @param {Array} videos - The array of video objects to display in the list.
 */
async function updateDOMList(listId, videos) {
  // let listElement = document.getElementById(listId);
  // listElement.innerHTML = '';  // Clear existing list content
  //
  // await new Promise(resolve => setTimeout(resolve, 200)); // Temp pause to ensure its working
  //
  // // Create list items for each video and append them to the list
  // videos.forEach(video => {
  //   let listItem = document.createElement('li');
  //   let videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
  //   listItem.innerHTML = `<a href="${videoUrl}" target="_blank">${decodeHtml(video.title)}</a>`;
  //   listElement.appendChild(listItem);
  // });
  let frameElement = document.querySelector('.frame');

  // Create cards for each video and append them to the frame
  videos.forEach(video => {
    let card = document.createElement('div');
    card.className = 'card';

    console.log("video", video);

    let infoCard = document.createElement('div');
    infoCard.className = 'info-card';

    let titlePara = document.createElement('p');
    titlePara.className = 'video-title';
    titlePara.textContent = decodeHtml(video.title); // Assuming title is already HTML-encoded

    let likesDiv = document.createElement('div');
    likesDiv.className = 'likes-text';
    likesDiv.textContent = `Likes: ${video.likes.toLocaleString()}`;

    let ratioDiv = document.createElement('div');
    ratioDiv.className = 'ratio-text';
    ratioDiv.textContent = `Ratio: ${video.ratio}`; // Assuming ratio is a percentage

    let viewsDiv = document.createElement('div');
    viewsDiv.className = 'views-text';
    viewsDiv.textContent = `Views: ${video.views.toLocaleString()}`;

    // Append the video details to the info card
    infoCard.appendChild(titlePara);
    infoCard.appendChild(likesDiv);
    infoCard.appendChild(ratioDiv);
    infoCard.appendChild(viewsDiv);

    // Append the info card to the main card
    card.appendChild(infoCard);

    // Append the main card to the frame
    frameElement.appendChild(card);
  });
}

/**
 * Updates the popup with the most liked videos and videos with the highest like/view ratio.
 * @param {Array} videos - An array of video objects to be processed.
 */
async function updatePopup(videos) {
  console.log("Updating popup");

  // Initialize arrays to store top videos based on likes and like/view ratio
  let highestRatioVideos = Array(3).fill({ ratio: 0, title: "", likes: "", views: "", id: "" });

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