import { API_KEY, MAX_RESULTS, USE_MOCK_DATA } from './constants.js';

function getVideos(channelId, use_mock_data = USE_MOCK_DATA) {
  if (use_mock_data) {
    console.log("Using mock data");
    // Got this data just by looking in the console of popup.js
    return Promise.resolve(
      [
        {
          "kind": "youtube#searchResult",
          "etag": "ukxqMOjfiRpRN-zOW-wQTH1OH2c",
          "id": {
            "kind": "youtube#video",
            "videoId": "tw7XBKhZJh4"
          },
          "snippet": {
            "publishedAt": "2015-08-12T03:45:21Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "Waking Up with Sam Harris - Mindfulness Meditation (9 minutes)",
            "description": "This is a 9-minute mindfulness meditation, led by Sam Harris. In 2018, Sam created the Waking Up app to be the resource he ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/tw7XBKhZJh4/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/tw7XBKhZJh4/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/tw7XBKhZJh4/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2015-08-12T03:45:21Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "DZdFBkoLDGuCv4-DoX8l-2omxeY",
          "id": {
            "kind": "youtube#video",
            "videoId": "vmgxtcbc4iU"
          },
          "snippet": {
            "publishedAt": "2020-06-13T07:43:39Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "Can We Pull Back From The Brink? (Episode #207)",
            "description": "In this episode of the podcast, Sam Harris speaks about the recent social protests and civil unrest, in light of what we know about ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/vmgxtcbc4iU/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/vmgxtcbc4iU/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/vmgxtcbc4iU/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2020-06-13T07:43:39Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "U9dn0ynt3Yuxxv46KMZCRFanoH0",
          "id": {
            "kind": "youtube#video",
            "videoId": "CN-_zzHpcdM"
          },
          "snippet": {
            "publishedAt": "2015-08-12T03:44:45Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "Waking Up with Sam Harris - Looking for the Self (26 Minute Meditation)",
            "description": "This is a 26-minute mindfulness meditation, led by Sam Harris. To learn more, visit https://wakingup.com/ Connect with us: ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/CN-_zzHpcdM/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/CN-_zzHpcdM/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/CN-_zzHpcdM/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2015-08-12T03:44:45Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "dH6rWK-Gt2pQHzG7jSbgcIxGQP4",
          "id": {
            "kind": "youtube#video",
            "videoId": "yKGddvmU0fA"
          },
          "snippet": {
            "publishedAt": "2020-03-22T19:26:40Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "Sam&#39;s Mushroom Trip",
            "description": "In this video Sam describes his most recent mushroom trip. (Hopefully this gives you a little break from all the Covid-19 news and ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/yKGddvmU0fA/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/yKGddvmU0fA/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/yKGddvmU0fA/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2020-03-22T19:26:40Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "v_2uUvcqiTz-_8XvSxRsFus1wtM",
          "id": {
            "kind": "youtube#video",
            "videoId": "m0-oC_49fq4"
          },
          "snippet": {
            "publishedAt": "2018-09-01T17:51:24Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "Sam Harris &amp; Jordan Peterson in Vancouver 2018 (with Bret Weinstein moderating) — Second Night",
            "description": "Sam Harris & Jordan Peterson - Vancouver - Second Night Moderated by Bret Weinstein 06/24/2018 This is the second time Sam ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/m0-oC_49fq4/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/m0-oC_49fq4/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/m0-oC_49fq4/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2018-09-01T17:51:24Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "u-63QilRzk7EFSWDbT2ilaOGNJU",
          "id": {
            "kind": "youtube#video",
            "videoId": "VBVg5l1Cn6U"
          },
          "snippet": {
            "publishedAt": "2021-06-10T22:18:54Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "Are We Alone in the Universe?: A Conversation with Neil deGrasse Tyson (Episode #252)",
            "description": "In this episode of the podcast, Sam Harris speaks with Neil deGrasse Tyson about our place in the universe. They discuss our ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/VBVg5l1Cn6U/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/VBVg5l1Cn6U/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/VBVg5l1Cn6U/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2021-06-10T22:18:54Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "6zoorZ6cqDfYWarNr1cAx_p-i0I",
          "id": {
            "kind": "youtube#video",
            "videoId": "vod4aOOucaY"
          },
          "snippet": {
            "publishedAt": "2021-12-14T21:11:19Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "What Have We Learned from the Pandemic?: A Conversation with Nicholas Christakis",
            "description": "In this episode, Sam Harris speaks with Nicholas Christakis about the lessons of the COVID pandemic. They discuss our failures ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/vod4aOOucaY/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/vod4aOOucaY/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/vod4aOOucaY/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2021-12-14T21:11:19Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "mHj-1yy6sjbF26E1dzpDFEYZNfU",
          "id": {
            "kind": "youtube#video",
            "videoId": "c-pTYLhitds"
          },
          "snippet": {
            "publishedAt": "2021-01-11T21:26:58Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "An Insurrection of Lies (Episode #230)",
            "description": "In this episode of the podcast, Sam Harris discusses two dangerous misconceptions about the siege of the Capitol. Released: ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/c-pTYLhitds/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/c-pTYLhitds/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/c-pTYLhitds/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2021-01-11T21:26:58Z"
          }
        },
        {
          "kind": "youtube#searchResult",
          "etag": "NrvrMCKaFc3dr-oYW_rP0V9sONE",
          "id": {
            "kind": "youtube#video",
            "videoId": "MPHUu9sAGKo"
          },
          "snippet": {
            "publishedAt": "2020-09-18T02:13:11Z",
            "channelId": "UCNAxrHudMfdzNi6NxruKPLw",
            "title": "The New Religion Of Anti-Racism: A Conversation with John McWhorter (Episode #217)",
            "description": "In this episode of the podcast, Sam Harris speaks with John McWhorter about race, racism, and “anti-racism” in America.",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/MPHUu9sAGKo/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/MPHUu9sAGKo/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/MPHUu9sAGKo/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "Sam Harris",
            "liveBroadcastContent": "none",
            "publishTime": "2020-09-18T02:13:11Z"
          }
        }
      ]
    );
  }

  return fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=${MAX_RESULTS}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Request successful");
      return data.items.filter((item) => item.id.kind === "youtube#video")
    });
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
