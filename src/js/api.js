import { API_KEY, MAX_RESULTS } from './constants.js';
import { getCachedData, cacheData } from './utils.js';

// Function to handle fetching data from the YouTube API
async function fetchYouTubeAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`YouTube API responded with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("YouTube API request failed:", error);
    throw error;
  }
}

// Function to get channel ID by username
async function getChannelIdByUsername(username) {
  const data = await fetchYouTubeAPI(`https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${username}&part=id`);
  if (data.items && data.items.length > 0) {
    return data.items[0].id;
  } else {
    throw new Error('No channel found with this username');
  }
}

// Function to extract channel ID from URL
function getChannelId(url) {
  if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/channel/')) {
    return Promise.resolve(url.pathname.split('/channel/')[1]);
  } else if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/@')) {
    const username = url.pathname.split('/@')[1].split('/videos')[0];
    return getChannelIdByUsername(username);
  } else {
    throw new Error('URL is not a valid YouTube channel URL');
  }
}

// Function to get videos of a channel
async function getVideos(channelId) {
  const cachedVideos = await getCachedData(channelId);
  if (cachedVideos) {
    return cachedVideos;
  }

  const data = await fetchYouTubeAPI(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=${MAX_RESULTS}`);
  const videos = data.items.filter(item => item.id.kind === "youtube#video");

  await cacheData(channelId, videos);
  return videos;
}

// Function to get video statistics
async function getVideoStats(videoId) {
  const data = await fetchYouTubeAPI(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics`);
  return data.items[0].statistics;
}

export { getChannelId, getVideos, getVideoStats };
