import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

// 获取所有文章
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '无标题',
        date: data.date || '',
        excerpt: data.excerpt || '',
        content,
        tags: data.tags || [],
      };
    });

  // 按日期降序排序（最新的在前）
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 根据 slug 获取单篇文章
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '无标题',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content,
    tags: data.tags || [],
  };
}

// 获取所有文章的 slug（用于静态生成）
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}