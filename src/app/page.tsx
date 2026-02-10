import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">我的博客</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">还没有文章，快去写一篇吧！</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-6">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mt-1">{post.date}</p>
              <p className="text-gray-700 mt-2">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}