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
/* harmony export */   getVideoStats: () => (/* binding */ getVideoStats),
/* harmony export */   getVideos: () => (/* binding */ getVideos)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/js/constants.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");



async function getVideos(channelId) {
  // Try to get the videos from the cache
  const cachedVideos = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getCachedData)(channelId);
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


function getVideoStats(videoId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&id=${videoId}&part=statistics`
  )
    .then((response) => response.json())
    .then((data) => data.items[0].statistics);
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");


function getChannelIdByUsername(username) {

  console.log("username: ", username);
  console.log(`https://www.googleapis.com/youtube/v3/channels?key=${_constants__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&forUsername=${username}&part=id`);

  return fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${_constants__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&forUsername=${username}&part=id`
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