import React from 'react';

// Destructure the post from props...
const Post = ({ post }) => (
	<article className='post container'>
		<h1>{post.title}</h1>
		<div>{post.content}</div>
	</article>
);
export default Post;
