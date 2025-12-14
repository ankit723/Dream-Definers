'use client'

import { useState, useEffect } from 'react';
import { Heart, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Comment {
  id: string;
  email: string;
  name: string | null;
  content: string;
  createdAt: string;
  likesCount: number;
  userLiked: boolean;
  replies: Comment[];
}

interface CommentSectionProps {
  slug: string;
  email: string | null;
  onRequestEmail?: () => void;
}

export function CommentSection({ slug, email, onRequestEmail }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    fetchComments();
  }, [slug, email]);

  const fetchComments = async () => {
    try {
      const url = `/api/blogs/${slug}/comments${email ? `?email=${encodeURIComponent(email)}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!email) {
      if (onRequestEmail) {
        onRequestEmail();
      } else {
        alert('Please enter your email to post a comment');
      }
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          content: newComment,
        }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    if (!email) {
      if (onRequestEmail) {
        onRequestEmail();
      } else {
        alert('Please enter your email to post a reply');
      }
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          content: replyContent,
          parentId,
        }),
      });

      if (response.ok) {
        setReplyContent('');
        setReplyingTo(null);
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    if (!email) {
      if (onRequestEmail) {
        onRequestEmail();
      } else {
        alert('Please enter your email to like a comment');
      }
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${slug}/comments/${commentId}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const isReplying = replyingTo === comment.id;
    const maxDepth = 3; // Limit nesting depth

    return (
      <div className={`${depth > 0 ? 'ml-6 md:ml-8 mt-4 border-l-2 border-gray-200 pl-3 md:pl-4' : ''}`}>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="font-semibold text-blue-950">
                {comment.name || comment.email.split('@')[0]}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCommentLike(comment.id)}
              className={`flex items-center gap-1 ${comment.userLiked ? 'text-red-600' : ''}`}
            >
              <Heart className={`h-4 w-4 ${comment.userLiked ? 'fill-current' : ''}`} />
              <span>{comment.likesCount}</span>
            </Button>
          </div>
          <p className="text-gray-700 mb-3 whitespace-pre-wrap">{comment.content}</p>
          {depth < maxDepth && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (!email) {
                    if (onRequestEmail) {
                      onRequestEmail();
                    } else {
                      alert('Please enter your email to reply');
                    }
                    return;
                  }
                  setReplyingTo(isReplying ? null : comment.id);
                }}
                className="flex items-center gap-1"
              >
                <Reply className="h-4 w-4" />
                Reply
              </Button>
            </div>
          )}

          {isReplying && depth < maxDepth && email && (
            <div className="mt-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => handleReply(comment.id)}
                >
                  Post Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-blue-950 mb-4">Comments</h3>

      {email ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
            rows={4}
          />
          <Button type="submit" className="mt-2">
            Post Comment
          </Button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 mb-3">
            Please enter your email to post a comment. You can view comments below without signing in.
          </p>
          {onRequestEmail && (
            <Button
              onClick={onRequestEmail}
              size="sm"
              className="bg-blue-950 hover:bg-blue-900"
            >
              Enter Email to Comment
            </Button>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

