// replace with your own YouTube API key
var apiKey = "AIzaSyCH3y1_3XlxueC-ecNYfTcHOlTxtOiwL1o";
var channelId = ""; // Channel ID will be obtained from the YouTube URL

// Fetches the videos of a channel sorted by view count
function getVideos(channelId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=100`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.items.filter((item) => item.id.kind === "youtube#video")
  });
}

// Fetches the statistics of a video
function getVideoStats(videoId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=statistics`
  )
    .then((response) => response.json())
    .then((data) => data.items[0].statistics);
}

// Updates the popup with the most liked video and video with the highest like/view ratio
async function updatePopup(videos) {
  let mostLikes = 0;
  let highestRatio = 0;
  let mostLikedVideo = "";
  let highestRatioVideo = "";

  for (let video of videos) {
    let stats = await getVideoStats(video.id.videoId);
    let views = parseInt(stats.viewCount);
    let likes = parseInt(stats.likeCount);

    if (likes > mostLikes) {
      mostLikes = likes;
      mostLikedVideo = video.snippet.title;
    }

    let ratio = likes / views;
    if (ratio > highestRatio) {
      highestRatio = ratio;
      highestRatioVideo = video.snippet.title;
    }
  }

  document.getElementById("mostLikedVideo").textContent = mostLikedVideo;
  document.getElementById("highestRatioVideo").textContent = highestRatioVideo;
}

// Fetches the channel ID of a channel by username
function getChannelIdByUsername(username) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&forUsername=${username}&part=id`
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

// Extracts the channelId or username from the YouTube URL
function getChannelId(url) {
  // Checks if URL is a YouTube channel URL
  if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/channel/')) {
    // Returns the part after '/channel/' as the channel ID
    return Promise.resolve(url.pathname.split('/channel/')[1]);
  } else if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/@')) {
    // Returns the part after '/@' as the username
    let username = url.pathname.split('/@')[1].split('/videos')[0];
    return getChannelIdByUsername(username);
  } else {
    throw new Error('URL is not a YouTube channel URL');
  }
}


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = new URL(tabs[0].url);
  getChannelId(url)
    .then(channelId => getVideos(channelId))
    .then(updatePopup)
    .catch(console.error);
});
