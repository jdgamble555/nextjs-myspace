import { headers } from 'next/headers';
import Link from 'next/link';

export default async function Blog() {

    const _headers = headers();
    const origin = new URL(_headers.get('referer')!).origin;

    const posts = await fetch(origin + '/api/content').then((res) =>
        res.json()
    );
    return (
        <div>
            <h1>Welcome to our Blog</h1>
            <ul>
                {posts && posts.length && posts.map((post: any) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}