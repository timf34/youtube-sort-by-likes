// Import node-fetch
const fetch = require('node-fetch');

const API_KEY = "AIzaSyCH3y1_3XlxueC-ecNYfTcHOlTxtOiwL1o";

async function fetchYouTubeAPI(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`YouTube API responded with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("YouTube API request failed:", error);
        throw error;
    }
}

async function getChannelIdByUsername(username) {
    const data = await fetchYouTubeAPI(`https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${username}&part=id`);
    if (data.items && data.items.length > 0) {
        return data.items[0].id;
    } else {
        throw new Error('No channel found with this username');
    }
}

async function getChannelIdFromPageSource(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        // Regex pattern to find the channel ID
        const pattern = /"channelId":"(UC[^"]+)"/;
        const match = pattern.exec(html);

        if (match && match[1]) {
            return match[1];  // Channel ID
        } else {
            throw new Error('Channel ID not found in page source');
        }
    } catch (error) {
        console.error('Error fetching page:', error);
        throw error;
    }
}

// Updated function to extract channel ID from URL
async function getChannelId(url) {
    try {
        if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/channel/')) {
            return url.pathname.split('/channel/')[1];
        } else if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/@')) {
            const username = url.pathname.split('/@')[1].split('/')[0];
            try {
                return await getChannelIdByUsername(username);
            } catch {
                // If getting channel ID by username fails (due to custom URL), try extracting from page source
                return await getChannelIdFromPageSource(url.href);
            }
        } else {
            throw new Error('URL is not a valid YouTube channel URL');
        }
    } catch (error) {
        console.error('Error in getChannelId:', error.message);
        throw error;
    }
}

// Mock function for fetchYouTubeAPI using node-fetch
async function mockFetchYouTubeAPI(url) {
    if (url.includes('validUsername')) {
        return { items: [{ id: 'channel123' }] };
    } else {
        return { items: [] };
    }
}

// Replace fetchYouTubeAPI with the mock for testing
// const fetchYouTubeAPI = mockFetchYouTubeAPI;

// URLs to test
const testUrls = [
    'https://www.youtube.com/@lexfridman',
    'https://www.youtube.com/@GreatArtExplained',
    'https://www.youtube.com/@NASA',
    'https://www.youtube.com/@MercatusCenter',
];

async function runTests() {
    for (let urlString of testUrls) {
        try {
            // Using Node.js compatible URL parsing
            const url = new URL(urlString);
            const channelId = await getChannelId(url);
            console.log(`Test passed for URL: ${urlString}, Channel ID: ${channelId}`);
        } catch (error) {
            console.error(`Test failed for URL: ${urlString}, Error: ${error.message}`);
        }
    }
}

runTests();
