import {API_KEY, MAX_RESULTS, USE_MOCK_DATA} from './constants.js';
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

async function getChannelIdFromPageSource(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Regex pattern to find the channel ID
    const pattern = /"channelId":"(UC[^"]+)"/;
    const match = pattern.exec(html);

    if (match && match[1]) {
      return match[1];  // Channel ID
    } else {
      throw new Error('Channel ID not found in page source');
    }
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
}

// Updated function to extract channel ID from URL
async function getChannelId(url) {
  try {
    if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/channel/')) {
      return url.pathname.split('/channel/')[1];
    } else if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/@')) {
      const username = url.pathname.split('/@')[1].split('/')[0];
      try {
        return await getChannelIdByUsername(username);
      } catch {
        // If getting channel ID by username fails (due to custom URL), try extracting from page source
        return await getChannelIdFromPageSource(url.href);
      }
    } else {
      throw new Error('URL is not a valid YouTube channel URL');
    }
  } catch (error) {
    console.error('Error in getChannelId:', error.message);
    throw error;
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
async function getVideoStats(videoId, use_mock_data = USE_MOCK_DATA) {

  if (USE_MOCK_DATA){
    return Promise.resolve(generateMockStats(videoId));
  }

  const data = await fetchYouTubeAPI(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics`);
  return data.items[0].statistics;
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

export { getChannelId, getVideos, getVideoStats };
