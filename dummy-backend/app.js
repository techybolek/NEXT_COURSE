const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  console.log('Getting posts from backend...');
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2500));
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  console.log('Creating a new post...');
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

app.put('/posts/:id', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postIndex = existingPosts.findIndex((post) => post.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found.' });
  }
  const updatedPost = { ...req.body, id: req.params.id };
  existingPosts[postIndex] = updatedPost;
  await storePosts(existingPosts);
  res.json({ message: 'Post updated.', post: updatedPost });
});

app.listen(8080);
