import googleapiclient.discovery

def get_channel_id(channel_username):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey="AIzaSyDo9qHImkHIScMUzMcktyTbHqJm-z7Cp8A")
    channel_id = None
    request = youtube.channels().list(
        part="id",
        forUsername=channel_username
    )
    response = request.execute()
    if len(response['items']) > 0:
        channel_id = response['items'][0]['id']
    return channel_id

channel_username = "LexFridman"
channel_id = get_channel_id(channel_username)
print("Channel ID:", channel_id)

# Get a list of all video ids for a channel
def get_channel_video_ids(channel_id):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey="AIzaSyDo9qHImkHIScMUzMcktyTbHqJm-z7Cp8A")
    video_ids = []
    request = youtube.search().list(
        part="id",
        channelId=channel_id,
        maxResults=50,
        order="date"
    )
    response = request.execute()
    for item in response['items']:
        video_ids.append(item['id']['videoId'])
    return video_ids


