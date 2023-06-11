import { headers } from "next/headers";

export const revalidate = 1200; // not necessary, just for ISR demonstration

interface Post {
    title: string;
    content: string;
    slug: string;
}

export async function generateStaticParams() {

    // can't use headers since pre-compiled
    const origin = process.env.NODE_ENV === 'production'
        ? 'https://nextspace-nine.vercel.app'
        : 'http://localhost:3000';

    const posts: Post[] = await fetch(origin + '/api/content').then(
        (res) => res.json()
    );

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

interface Props {
    params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {

    //const _headers = headers();
    //const origin = new URL(_headers.get('referer')!).origin;
    const origin = process.env.NODE_ENV === 'production'
        ? 'https://nextspace-nine.vercel.app'
        : 'http://localhost:3000';

    // deduped
    const posts: Post[] = await fetch(origin + '/api/content').then(
        (res) => res.json()
    );
    const post = posts.find((post) => post.slug === params.slug);

    if (!post) {
        return <h1>404 - Page Not Found</h1>
    }

    return (
        <div>
            <h1>{post.title} </h1>
            <p> {post.content} </p>
        </div>
    );
}