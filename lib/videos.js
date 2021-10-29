export const getVideos = async (searchQuery) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data?.items.map((item) => {
      return {
        title: item?.snippet?.title,
        imageUrl: item?.snippet?.thumbnails?.high?.url,
      };
    });
  } catch (error) {
    return [];
  }
};
