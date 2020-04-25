import React from 'react';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

// Destructure the post from props...
const Post = ({ post }) => {
	let contentHTML = '';
	if (post.content.ops) {
		const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
		contentHTML = converter.convert();
	} else {
		contentHTML = post.content;
	}
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
