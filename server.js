// server.js
const express = require('express');
const app = express();

app.use(express.json());

// Fake in‑memory "database"
let posts = [
  { id: 1, title: "First Post", content: "Hello World", userId: "user1" },
  { id: 2, title: "Second Post", content: "Another post", userId: "user2" }
];

// DELETE endpoint
app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.body.userId; // normally comes from login/auth

  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (posts[postIndex].userId !== userId) {
    return res.status(403).json({ message: 'Not authorized to delete this post' });
  }

  posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});