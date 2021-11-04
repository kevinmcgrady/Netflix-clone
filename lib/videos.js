const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const baseUrl = 'youtube.googleapis.com/youtube/';

  try {
    const response = await fetch(
      `https://${baseUrl}${url}&key=${YOUTUBE_API_KEY}`,
    );
    const data = await response.json();

    if (data?.error) {
      console.log(data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item?.snippet?.title,
        imageUrl: item?.snippet?.thumbnails?.high?.url,
        id,
      };
    });
  } catch (error) {
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const url = `v3/search?part=snippet&maxResults=25&q=${searchQuery}`;

  return getCommonVideos(url);
};

export const getPopularVideos = () => {
  const url = `v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&&maxResults=25&regionCode=US`;

  return getCommonVideos(url);
};
