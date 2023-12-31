# YouTube Video Analyzer Chrome Extension

## Description
YouTube-Sort-By-Likes is a Chrome extension that lets you see the most liked and highest like:view ratio videos within a YouTube channel

It provides two functionalities:
1. A UI button that allows sorting the list of videos by "most liked" and "highest like ratio". (still to be implemented!)
2. Display the names of the videos which have the highest like to view ratio and are the most liked through a popup when you click the extension. 

Please note that the first functionality is still in development.

## TODO

- [] Add instructions for bringing your own YouTube API key, _and make adding it easy_
- [] Update README with the extension in action

## Getting Started
These instructions will guide you to run this project in your local machine for development and testing purposes.

### Prerequisites
- Node.js
- npm
- Chrome browser
- YouTube API Key

### Clone
- Clone this repo to your local machine using `https://github.com/timf34/youtube-sort-by-likes.git`

### Setup
1. Use the package manager [npm](https://www.npmjs.com/get-npm) to install the dependencies.

```bash
npm install
```

2. Replace the placeholder API key in the `constants.js` file with your YouTube API Key.

```javascript
export const apiKey = "your-youtube-api-key";
```

### Running the project
1. Run the following command to compile the project using Webpack. 

```bash
npm run build
```

This will create a `dist` folder with the compiled `popup.js`.

2. Go to Chrome's Extension page by navigating to `chrome://extensions/` in your Chrome browser. 

3. Enable developer mode by clicking the toggle switch in the upper-right corner. 

4. Click on "Load Unpacked" and select the project folder.

5. The extension should now be installed on your Chrome browser. 

6. Visit a YouTube channel and click the extension icon in your browser to see the most liked videos and videos with the highest like/view ratio.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
