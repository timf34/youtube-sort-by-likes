import { getChannelIdByUsername } from './api.js';

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

export { getChannelId, decodeHtml, cacheData, getCachedData};
