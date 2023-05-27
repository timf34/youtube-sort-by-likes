"""
Sample Python code for youtube.channels.list
See instructions for running these code samples locally:
https://developers.google.com/explorer-help/code-samples#python

Note: If we get a 'Bad Request' response, delete the token.json file and run it again. Log into oauth using
timf34@gmail.com
"""
import json
import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from google.oauth2.credentials import Credentials

from typing import List, Dict, Optional, Tuple

LEX_CHANNEL_ID = "UCSHZKyawb77ixDdsGog4iWA"
YOUTUBE_DEFAULT_CHANNEL_ID = "UC_x5XG1OV2P6uZZ5FSM9Ttw"


class YouTubeDataAPI:
    def __init__(
            self,
            scopes: Optional[List[str]] = None,
            client_secret_file: str = "../client_secret_541571150180-ubpg8s5aeoq9ngefn4tami93c7a0bg37.apps.googleusercontent.com.json"
         ):
        self.client_secret_file: str = client_secret_file
        self.scopes: List[str] = scopes or ["https://www.googleapis.com/auth/youtube.readonly"]  # Best practice to use `or` for mutable default values
        self.api_service_name: str = "youtube"
        self.api_version: str = "v3"
        self.credentials = None
        self.youtube = None
        self.get_credentials()
        self.get_youtube()

    def get_credentials(self) -> googleapiclient.discovery.Resource:
        if os.path.exists('token.json'):
            self.credentials = Credentials.from_authorized_user_file('token.json', self.scopes)
        else:
            flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
                self.client_secret_file, self.scopes)
            self.credentials = flow.run_local_server(port=0)
            with open('token.json', 'w') as token:
                token.write(self.credentials.to_json())
        return self.credentials

    def get_youtube(self) -> googleapiclient.discovery.Resource:
        self.youtube = googleapiclient.discovery.build(
            self.api_service_name, self.api_version, credentials=self.credentials)
        return self.youtube

    def get_channel_id_from_url(self, url: str) -> str:
        """Parses a channel url and returns the channel id."""
        username = url.split("/")[-1]

        # For custom URLs (e.g., "https://www.youtube.com/c/lexfridman")
        if username.startswith("c/"):
            username = username[2:]
        # For URLs with @ symbol (e.g., "https://www.youtube.com/@lexfridman")
        elif username.startswith("@"):
            username = username[1:]

        request = self.youtube.channels().list(
            part="id",
            forUsername=username
        )
        response = request.execute()
        return response['items'][0]['id'] if len(response['items']) > 0 else None

    def get_channel_info(self, channel_id: str) -> Dict[str, str]:
        request = self.youtube.channels().list(
            part="snippet,contentDetails,statistics",
            id=channel_id
        )
        return request.execute()

    def get_channels_videos_info(self, channel_id: str, max_results: int = 50) -> List[Dict[str, str]]:
        """
        Returns a list of dictionaries with information for all videos in a given channel.

        Args:
            channel_id (str): The channel id (i.e. UCSHZKyawb77ixDdsGog4iWA)
            max_results (int): The maximum number of results to return. Defaults to 50.
        """
        videos_info = []
        next_page_token = None
        total_results=0
        while True:
            request = self.youtube.search().list(
                part="snippet",
                channelId=channel_id,
                maxResults=max_results,
                order="date",
                pageToken=next_page_token
            )
            response = request.execute()
            total_results += len(response['items'])

            for item in response['items']:
                if 'videoId' in item['id']:
                    video_info = self.get_video_info(item['id']['videoId'])
                    videos_info.append(video_info)

            if 'nextPageToken' in response:
                next_page_token = response['nextPageToken']
            else:
                break

        print(total_results)
        return videos_info

    def get_video_info(self, video_id: str) -> Dict[str, str]:
        """
        Returns a dictionary with information for a given video.
        :param video_id: The video id.
        """
        request = self.youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id=video_id
        )
        return request.execute()

    def get_video_id_from_url(self, video_url: str) -> str:
        """
        Parses a video url and returns the video id.

        Args:
            video_url (str): A YouTube video url (i.e. https://www.youtube.com/watch?v=dQw4w9WgXcQ)
        """
        request = self.youtube.videos().list(
            part="id",
            id=video_url.split("v=")[1]
        )
        response = request.execute()
        return response['items'][0]['id'] if len(response['items']) > 0 else None

    @staticmethod
    def get_channel_video_ids_from_videos_info(self, videos_info: dict, channel_id: str) -> List[str]:
        """Returns a list of video ids for a given channel."""
        video_ids = []
        for item in videos_info['items']:
            video_ids.append(item['id']['videoId'])
        return video_ids


def sample():
    youtube = YouTubeDataAPI(scopes=["https://www.googleapis.com/auth/youtube.readonly"])
    channel_info = youtube.get_channel_info(LEX_CHANNEL_ID)
    print("Channel info:\n", json.dumps(channel_info, indent=4, sort_keys=True))

    chanel_videos = youtube.get_channels_videos_info(LEX_CHANNEL_ID, max_results=10)
    # print(json.dumps(chanel_videos, indent=4, sort_keys=True))
    print("Number of videos: ", len(chanel_videos))

    # chanel_video_ids = youtube.get_channel_video_ids(chanel_videos)
    # print("Number of videos: ", len(chanel_video_ids))

    # Get video info
    # print("Channel's videos' info:")
    # for count, video_id in enumerate(chanel_video_ids):
    #     video_info = youtube.get_video_info(video_id)
    #     print(json.dumps(video_info, indent=4, sort_keys=True))
    #     if count == 3:
    #         break


if __name__ == "__main__":
    sample()
