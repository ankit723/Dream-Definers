'use client'

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmailModal } from './email-modal';
import { CommentSection } from './comment-section';

interface BlogInteractionsProps {
  slug: string;
}

export function BlogInteractions({ slug }: BlogInteractionsProps) {
  const [email, setEmail] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState({ total: 0, userLiked: false });
  const [shares, setShares] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved email
    const savedEmail = localStorage.getItem('blog_user_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
    fetchStats();
  }, [slug, email]);

  const fetchStats = async () => {
    try {
      const [likesRes, sharesRes] = await Promise.all([
        fetch(`/api/blogs/${slug}/likes${email ? `?email=${encodeURIComponent(email)}` : ''}`),
        fetch(`/api/blogs/${slug}/shares`),
      ]);

      const likesData = await likesRes.json();
      const sharesData = await sharesRes.json();

      setLikes(likesData);
      setShares(sharesData.totalShares || 0);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailConfirm = (userEmail: string) => {
    setEmail(userEmail);
    localStorage.setItem('blog_user_email', userEmail);
  };

  const handleLike = async () => {
    if (!email) {
      setShowEmailModal(true);
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${slug}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setLikes(prev => ({
          total: data.liked ? prev.total + 1 : prev.total - 1,
          userLiked: data.liked,
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = document.title;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        });
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    // Record share
    try {
      await fetch(`/api/blogs/${slug}/shares`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, platform }),
      });
      setShares(prev => prev + 1);
    } catch (error) {
      console.error('Error recording share:', error);
    }
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
        <Button
          variant={likes.userLiked ? 'default' : 'outline'}
          size="sm"
          onClick={handleLike}
          className="flex items-center gap-2"
        >
          <Heart className={`h-4 w-4 ${likes.userLiked ? 'fill-current' : ''}`} />
          <span>{likes.total}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCommentClick}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Comments</span>
        </Button>

        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            <span>{shares}</span>
          </Button>
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => handleShare('facebook')}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              Share on LinkedIn
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              Share on WhatsApp
            </button>
            <button
              onClick={() => handleShare()}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {showComments && (
        <CommentSection 
          slug={slug} 
          email={email}
          onRequestEmail={() => setShowEmailModal(true)}
        />
      )}

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onConfirm={handleEmailConfirm}
        title="Enter your email to interact"
      />
    </>
  );
}

