import React, { useState } from "react";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      content: "Excited about my new investment strategy!",
    },
    { id: 2, user: "Bob", content: "Anyone tried the new ETF options?" },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        ...posts,
        { id: posts.length + 1, user: "You", content: newPost },
      ]);
      setNewPost("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Community Interaction</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-2 rounded">
            <strong>{post.user}</strong>
            <p>{post.content}</p>
          </div>
        ))}
        <div className="mt-4">
          <textarea
            className="w-full border rounded p-2"
            rows="3"
            placeholder="Share your thoughts..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button
            onClick={handlePostSubmit}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
