'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag, Eye, Heart, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BlogPost, blogPosts } from '@/db/blogs';

export default function BlogPostPage() {
    const router = useRouter();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (window) {
            const id = window.location.pathname.split("/")[2];
            setBlog(blogPosts[Number(id)])
            setLoading(false)
        }
    }, [])

    if (loading || !blog) {
        return (
            <div className="min-h-screen bg-[#041227] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#041227] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-8"
                    aria-label="Go back to blogs"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Blogs</span>
                </button>

                {/* Blog Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm border shadow-slate-800 hover:shadow-2xl border-slate-700 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300"
                >
                    {/* Author Info */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            {blog.authorAvatar && (
                                <img 
                                    src={blog.authorAvatar} 
                                    alt={blog.author}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <p className="text-white font-medium">{blog.author}</p>
                                <div className="flex items-center space-x-2 text-sm text-white/70">
                                    <Calendar className="w-4 h-4" />
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                        </div>
                        
                        {blog.readTime && (
                            <div className="flex items-center space-x-1 text-sm text-white/70">
                                <Clock className="w-4 h-4" />
                                <span>{blog.readTime} min read</span>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {blog.title}
                    </h1>

                    {/* Excerpt */}
                    {blog.excerpt && (
                        <p className="text-lg leading-relaxed text-white/90 mb-8 italic">
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Introduction */}
                    {blog.introduction && (
                        <div className="prose prose-invert max-w-none mb-8">
                            <p className="text-white/90 whitespace-pre-line">
                                {blog.introduction}
                            </p>
                        </div>
                    )}

                    {blog.content && (
                        <div className="prose prose-invert max-w-none mb-8">
                            <p className="text-white/90 whitespace-pre-line">
                                {blog.content}
                            </p>
                        </div>
                    )}

                    {/* Conclusion */}
                    {blog.conclusion && (
                        <div className="prose prose-invert max-w-none mt-8 pt-6 border-t border-slate-700">
                            <p className="text-white/90 whitespace-pre-line">
                                {blog.conclusion}
                            </p>
                        </div>
                    )}

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {blog.tags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300"
                                >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-slate-700">
                        <div className="flex items-center space-x-2 text-sm text-white/70">
                            <Eye className="w-4 h-4" />
                            <span>{blog.viewCount || 0} views</span>
                        </div>
                        {blog.likes && (
                            <div className="flex items-center space-x-2 text-sm text-white/70">
                                <Heart className="w-4 h-4" />
                                <span>{blog.likes} likes</span>
                            </div>
                        )}
                        {blog.shareCount && (
                            <div className="flex items-center space-x-2 text-sm text-white/70">
                                <Share2 className="w-4 h-4" />
                                <span>{blog.shareCount} shares</span>
                            </div>
                        )}
                    </div>

                    {/* Related Posts */}
                    {blog.relatedPosts && blog.relatedPosts.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <h3 className="text-lg font-semibold text-white mb-4">Related Posts</h3>
                            <div className="flex flex-wrap gap-4">
                                {blog.relatedPosts.slice(0, 3).map((postId) => (
                                    <button
                                        key={postId}
                                        onClick={() => router.push(`/blogs/${postId}`)}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/90 transition-colors"
                                    >
                                        {blogPosts.find(post => post.id === postId)?.title || `Post ${postId}`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Footer */}
                <footer className="mt-12 text-center text-white/50 text-sm">
                    <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
