import { API_KEY, MAX_RESULTS} from './constants.js';
import { getCachedData, cacheData } from './utils.js';

function getChannelIdByUsername(username) {

  console.log("username: ", username);
  console.log(`https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${username}&part=id`);

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

function getChannelId(url) {
  if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/channel/')) {
    return Promise.resolve(url.pathname.split('/channel/')[1]);
  } else if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/@')) {
    let username = url.pathname.split('/@')[1].split('/videos')[0];
    return getChannelIdByUsername(username);
  } else {
    throw new Error('URL is not a YouTube channel URL');
  }
}

async function getVideos(channelId) {
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


function getVideoStats(videoId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics`
  )
    .then((response) => response.json())
    .then((data) => data.items[0].statistics);
}


export { getChannelId, getVideos, getVideoStats};
