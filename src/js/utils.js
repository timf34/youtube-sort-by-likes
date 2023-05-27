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

export { getChannelId };
