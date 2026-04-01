"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import { Post } from "@/lib/db";

export default function PostList({ initialPosts }: { initialPosts: Post[] }) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {initialPosts.map((post) => (
          <motion.div key={post.id} variants={item}>
            <PostCard 
              post={post} 
              onClick={() => setSelectedPost(post)} 
            />
          </motion.div>
        ))}
      </motion.div>

      <PostModal 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </>
  );
}
