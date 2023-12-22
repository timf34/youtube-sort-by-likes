/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getChannelIdByUsername: () => (/* binding */ getChannelIdByUsername),
/* harmony export */   getVideoStats: () => (/* binding */ getVideoStats),
/* harmony export */   getVideos: () => (/* binding */ getVideos)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/js/constants.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");



async function getVideos(channelId, use_mock_data = _constants_js__WEBPACK_IMPORTED_MODULE_0__.USE_MOCK_DATA) {
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

  // Try to get the videos from the cache
  const cachedVideos = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getCachedData)(channelId);
  console.log("Cached videos: ", cachedVideos); // Add this line
  if (cachedVideos) {
    return cachedVideos;
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.MAX_RESULTS}`
  );
  const data = await response.json();
  console.log("Request successful");
  const videos = data.items.filter((item) => item.id.kind === "youtube#video");
  
  // Cache the videos for future use
  await (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.cacheData)(channelId, videos);

  return videos;
}


function getVideoStats(videoId, use_mock_data = _constants_js__WEBPACK_IMPORTED_MODULE_0__.USE_MOCK_DATA) {
  if (use_mock_data) {
    return Promise.resolve(generateMockStats(videoId));
  }
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&id=${videoId}&part=statistics`
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


function getChannelIdByUsername(username, use_mock_data = _constants_js__WEBPACK_IMPORTED_MODULE_0__.USE_MOCK_DATA) {

  if (use_mock_data) {
    return Promise.resolve("samharrisorg");
  }

  console.log("username: ", username);

  return fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&forUsername=${username}&part=id`
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




/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_KEY: () => (/* binding */ API_KEY),
/* harmony export */   MAX_RESULTS: () => (/* binding */ MAX_RESULTS),
/* harmony export */   USE_MOCK_DATA: () => (/* binding */ USE_MOCK_DATA)
/* harmony export */ });
// replace with your own YouTube API key
const API_KEY = "AIzaSyCH3y1_3XlxueC-ecNYfTcHOlTxtOiwL1o"; 
const MAX_RESULTS = 25;
const USE_MOCK_DATA = false;



/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheData: () => (/* binding */ cacheData),
/* harmony export */   decodeHtml: () => (/* binding */ decodeHtml),
/* harmony export */   getCachedData: () => (/* binding */ getCachedData),
/* harmony export */   getChannelId: () => (/* binding */ getChannelId)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/js/api.js");


function getChannelId(url) {
  if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/channel/')) {
    return Promise.resolve(url.pathname.split('/channel/')[1]);
  } else if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/@')) {
    let username = url.pathname.split('/@')[1].split('/videos')[0];
    return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getChannelIdByUsername)(username);
  } else {
    throw new Error('URL is not a YouTube channel URL');
  }
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function cacheData(key, data) {
  console.log("Caching data for key: ", key);
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: data }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("Data cached for key: ", key);
        resolve();
      }
    });
  });
}

function getCachedData(key) {
  console.log("Getting cached data for key: ", key);
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("Cached data for key: ", key, result);
        resolve(result[key]);
      }
    });
  });
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/js/api.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");




// Updates the popup with the most liked video and video with the highest like/view ratio
async function updatePopup(videos) {
  console.log("Updating popup");
  let mostLikedVideos = Array(3).fill({ likes: 0, title: "", id: "" });
  let highestRatioVideos = Array(3).fill({ ratio: 0, title: "", id: "" });

  for (let video of videos) {
    let stats = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getVideoStats)(video.id.videoId);
    let views = parseInt(stats.viewCount);
    let likes = parseInt(stats.likeCount);
    let id = video.id.videoId;
    let ratio = likes / views;

    for (let i = 0; i < 3; i++) {
      if (likes > mostLikedVideos[i].likes) {
        mostLikedVideos.splice(i, 0, { likes, title: video.snippet.title, id: id });
        mostLikedVideos.pop();
        break;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (ratio > highestRatioVideos[i].ratio) {
        highestRatioVideos.splice(i, 0, { ratio, title: video.snippet.title, id: id });
        highestRatioVideos.pop();
        break;
      }
    }
  }

  let mostLikedList = document.getElementById("mostLikedList");
  let highestRatioList = document.getElementById("highestRatioList");

  // Clear the lists 
  mostLikedList.innerHTML = '';
  highestRatioList.innerHTML = '';

  await new Promise(resolve => setTimeout(resolve, 200));  // Temp pause to ensure its working 

  let baseVideoURL = "https://www.youtube.com/watch?v=";
  for (let i = 0; i < 3; i++) {
    let mostLikedItem = document.createElement('li');
    mostLikedItem.innerHTML = `<a href="${baseVideoURL}${mostLikedVideos[i].id}" target="_blank">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.decodeHtml)(mostLikedVideos[i].title)}</a>`;
    mostLikedList.appendChild(mostLikedItem);

    let highestRatioItem = document.createElement('li');
    highestRatioItem.innerHTML = `<a href="${baseVideoURL}${highestRatioVideos[i].id}" target="_blank">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.decodeHtml)(highestRatioVideos[i].title)}</a>`;
    highestRatioList.appendChild(highestRatioItem);
  }
}

async function refreshData() {

  // Get the current tab's URL
  const tabs = await new Promise(resolve =>
    chrome.tabs.query({ active: true, currentWindow: true }, resolve)
  );
  const url = new URL(tabs[0].url);

  // Get the channelId
  const channelId = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getChannelId)(url);

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
  const videos = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getVideos)(channelId);
  updatePopup(videos);
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = new URL(tabs[0].url);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getChannelId)(url)
    .then(channelId => (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getVideos)(channelId))
    .then(updatePopup)
    .catch(console.error);
});

document.getElementById('refreshButton').addEventListener('click', refreshData);

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map