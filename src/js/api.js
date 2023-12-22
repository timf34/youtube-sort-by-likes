import { API_KEY, MAX_RESULTS, USE_MOCK_DATA } from './constants.js';
import { getCachedData, cacheData } from './utils.js';

async function getVideos(channelId, use_mock_data = USE_MOCK_DATA) {
  // Try to get the videos from the cache
  const cachedVideos = await getCachedData(channelId);
  if (cachedVideos) {
    return cachedVideos;
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=${MAX_RESULTS}`
  );
  const data = await response.json();
  console.log("Request successful");
  const videos = data.items.filter((item) => item.id.kind === "youtube#video");
  
  // Cache the videos for future use
  await cacheData(channelId, videos);

  return videos;
}


function getVideoStats(videoId, use_mock_data = USE_MOCK_DATA) {
  if (use_mock_data) {
    return Promise.resolve(generateMockStats(videoId));
  }
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics`
  )
    .then((response) => response.json())
    .then((data) => data.items[0].statistics);
}

function generateMockStats(videoId) {
  // Here we use videoId length to generate different stats. 
  // This is arbitrary and you can replace this with a logic that suits your needs
  const multiplier = videoId.length;

  return {
    "viewCount": `${10000 * multiplier}`,
    "likeCount": `${5000 * multiplier}`,
    "favoriteCount": "0",
    "commentCount": `${1000 * multiplier}`,
  };
}


function getChannelIdByUsername(username, use_mock_data = USE_MOCK_DATA) {

  if (use_mock_data) {
    return Promise.resolve("samharrisorg");
  }

  console.log("username: ", username);

  return fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${username}&part=id`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data);
      if (data.items.length > 0) {
        return data.items[0].id;
      } else {
        throw new Error('No channel found with this username');
      }
    });
}

export { getVideos, getVideoStats, getChannelIdByUsername };
