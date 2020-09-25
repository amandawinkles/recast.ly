var searchYouTube = (options, callback) => {
  $.ajax({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    contentType: 'application/json',
    data: {
      q: options.query,
      maxResults: options.max || 5,
      key: options.key,
      videoEmbeddable: true,
      part: 'snippet',
      type: 'video'
    },
    success: (data) => {
      console.log('successfully retrieved data from Youtube API', data);
      callback(data.items);
    },
    error: () => {
      console.log('error getting data from Youtube API');
    }
  });
};

export default searchYouTube;
