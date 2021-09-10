export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  const postsToJson = await posts.json();
  const photosToJson = await photos.json();

  const postsAndPhotos = postsToJson.map((post, index) => {
    return { ...post, cover: photosToJson[index].url }
  })

  return postsAndPhotos;
}