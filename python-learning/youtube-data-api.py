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

    def get_channel_info(self, channel_id: str) -> Dict[str, str]:
        request = self.youtube.channels().list(
            part="snippet,contentDetails,statistics",
            id=channel_id
        )
        return request.execute()

    def get_channel_videos(self, channel_id: str, max_results: int = 100) -> Dict[str, str]:
        request = self.youtube.search().list(
            part="snippet",
            channelId=channel_id,
            maxResults=max_results,
            order="date"
        )
        return request.execute()

    def get_video_info(self, video_id: str) -> Dict[str, str]:
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

    def get_channel_video_ids(self, channel_id: str) -> List[str]:
        """Returns a list of video ids for a given channel."""
        video_ids = []
        response = self.get_channel_videos(channel_id)
        for item in response['items']:
            video_ids.append(item['id']['videoId'])
        return video_ids


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


def sample():
    youtube = YouTubeDataAPI(scopes=["https://www.googleapis.com/auth/youtube.readonly"])
    channel_info = youtube.get_channel_info(LEX_CHANNEL_ID)
    print(json.dumps(channel_info, indent=4, sort_keys=True))
    chanel_video_ids = youtube.get_channel_video_ids(LEX_CHANNEL_ID)
    print("Number of videos: ", len(chanel_video_ids))

    # Get video info
    for count, video_id in enumerate(chanel_video_ids):
        video_info = youtube.get_video_info(video_id)
        print(json.dumps(video_info, indent=4, sort_keys=True))
        if count == 3:
            break


if __name__ == "__main__":
    sample()
