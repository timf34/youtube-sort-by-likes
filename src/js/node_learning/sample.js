const fetch = require('node-fetch');

var apiKey = "AIzaSyCH3y1_3XlxueC-ecNYfTcHOlTxtOiwL1o";
var channelId = "UCNAxrHudMfdzNi6NxruKPLw";

function getVideos(channelId) {
    return fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=20`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("data:", data);
            return data.items.filter((item) => item.id.kind === "youtube#video")
        });
}

function getVideoStats(videoId) {
    console.log(videoId);
    return fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=statistics`
    )
        .then((response) => response.json())
        .then((data) => data.items[0].statistics);
}

async function analyzeVideos() {
    let videos = await getVideos(channelId);

    let mostLikes = 0;
    let highestRatio = 0;
    let mostLikedVideo = "";
    let highestRatioVideo = "";

    console.log("videos: ", videos);

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

    console.log("Most liked video: ", mostLikedVideo);
    console.log("Video with highest like/view ratio: ", highestRatioVideo);
}

analyzeVideos().catch(console.error);

