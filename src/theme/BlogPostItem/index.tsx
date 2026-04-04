import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import Comments from "@site/src/components/Comments";

type Props = React.ComponentProps<typeof BlogPostItem>;

export default function BlogPostItemWrapper(props: Props): React.JSX.Element {
    const { metadata, isBlogPostPage } = useBlogPost();
    const { comments = true } = metadata.frontMatter;

    return (
        <>
            <BlogPostItem {...props} />
            {comments && isBlogPostPage && <Comments />}
        </>
    );
}
