import React from 'react';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

// Destructure the post from props...
const Post = ({ post }) => {
	const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
	const contentHTML = converter.convert();
	return (
		<article className='post container'>
			<h1>{post.title}</h1>
			<div
				className='post-content'
				dangerouslySetInnerHTML={{ __html: contentHTML }}
			/>
		</article>
	);
};
export default Post;
