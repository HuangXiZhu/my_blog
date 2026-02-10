import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline">
        ← 返回首页
      </Link>

      <article className="mt-6">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-gray-500 mt-2">{post.date}</p>

        <div
          className="prose mt-8"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}