import React, { useState } from "react";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      content: "What’s the best way to start investing?",
      likes: 12,
    },
    {
      id: 2,
      user: "Bob",
      content: "Anyone using the new feature to track expenses?",
      likes: 8,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      const newEntry = {
        id: posts.length + 1,
        user: "You",
        content: newPost,
        likes: 0,
      };
      setPosts([newEntry, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Community</h1>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button
          onClick={handlePost}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold">{post.user}</h3>
            <p className="text-gray-700 my-2">{post.content}</p>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleLike(post.id)}
            >
              👍 {post.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
