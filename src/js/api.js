import { API_KEY } from './constants.js';

function getVideos(channelId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=10`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.items.filter((item) => item.id.kind === "youtube#video")
  });
}

function getVideoStats(videoId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics`
  )
    .then((response) => response.json())
    .then((data) => data.items[0].statistics);
}

function getChannelIdByUsername(username) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${username}&part=id`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        return data.items[0].id;
      } else {
        throw new Error('No channel found with this username');
      }
    });
}

export { getVideos, getVideoStats, getChannelIdByUsername };
