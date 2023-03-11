# Sample Python code for youtube.channels.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/code-samples#python

# Note: I'm coming back to this at a much later stage, and it seems there's some oauth stuff missing that I can't immediately figure out.
# Going to try to use my other no_auth.py script as a reference to get this working without oauth.
import json
import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from google.oauth2.credentials import Credentials

from typing import List, Dict


class YouTubeDataAPI:
    def __init__(self, scopes):
        self.client_secret_file: str = "../client_secret_541571150180-ubpg8s5aeoq9ngefn4tami93c7a0bg37.apps.googleusercontent.com.json"
        self.scopes: List[str] = ["https://www.googleapis.com/auth/youtube.readonly"]
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
        """Parses a video url and returns the video id."""
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


def print_channel_info():
    youtube = YouTubeDataAPI(scopes=["https://www.googleapis.com/auth/youtube.readonly"])
    response = youtube.get_channel_info("UC_x5XG1OV2P6uZZ5FSM9Ttw")

    # Pretty print the json response
    print(json.dumps(response, indent=4, sort_keys=True))


def print_video_id():
    youtube = YouTubeDataAPI(scopes=["https://www.googleapis.com/auth/youtube.readonly"])
    video_id = youtube.get_video_id_from_url("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    print(video_id)


def print_channel_video_ids():
    youtube = YouTubeDataAPI(scopes=["https://www.googleapis.com/auth/youtube.readonly"])
    video_ids = youtube.get_channel_video_ids("UC_x5XG1OV2P6uZZ5FSM9Ttw")
    print(video_ids)
    print(len(video_ids))


if __name__ == "__main__":
    print_channel_info()
    # print_video_id()
    print_video_id()
    print_channel_video_ids()
