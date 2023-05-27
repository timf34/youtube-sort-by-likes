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


function getVideos(channelId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=10`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.items.filter((item) => item.id.kind === "youtube#video")
  });
}

function getVideoStats(videoId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&id=${videoId}&part=statistics`
  )
    .then((response) => response.json())
    .then((data) => data.items[0].statistics);
}

function getChannelIdByUsername(username) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${_constants_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&forUsername=${username}&part=id`
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




/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_KEY: () => (/* binding */ API_KEY)
/* harmony export */ });
// replace with your own YouTube API key
const API_KEY = "AIzaSyCH3y1_3XlxueC-ecNYfTcHOlTxtOiwL1o";



/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
  let mostLikedVideos = Array(3).fill({likes: 0, title: ""});
  let highestRatioVideos = Array(3).fill({ratio: 0, title: ""});

  console.log(videos);

  for (let video of videos) {
    let stats = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getVideoStats)(video.id.videoId);
    let views = parseInt(stats.viewCount);
    let likes = parseInt(stats.likeCount);

    let ratio = likes / views;

    for (let i = 0; i < 3; i++) {
      if (likes > mostLikedVideos[i].likes) {
        mostLikedVideos.splice(i, 0, {likes, title: video.snippet.title});
        mostLikedVideos.pop();
        break;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (ratio > highestRatioVideos[i].ratio) {
        highestRatioVideos.splice(i, 0, {ratio, title: video.snippet.title});
        highestRatioVideos.pop();
        break;
      }
    }
  }

  document.getElementById("mostLikedVideo1").textContent = mostLikedVideos[0].title;
  document.getElementById("mostLikedVideo2").textContent = mostLikedVideos[1].title;
  document.getElementById("mostLikedVideo3").textContent = mostLikedVideos[2].title;

  document.getElementById("highestRatioVideo1").textContent = highestRatioVideos[0].title;
  document.getElementById("highestRatioVideo2").textContent = highestRatioVideos[1].title;
  document.getElementById("highestRatioVideo3").textContent = highestRatioVideos[2].title;
}

console.log("yolo dawg");

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = new URL(tabs[0].url);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getChannelId)(url)
    .then(channelId => (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getVideos)(channelId))
    .then(updatePopup)
    .catch(console.error);
});

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map