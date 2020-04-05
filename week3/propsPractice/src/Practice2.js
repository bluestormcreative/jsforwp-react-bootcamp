import React from 'react';

const Practice2 = () => {
	/*
    1. Create post object with an id and title
  */
	const post = {
		id: 22,
		title: `We got a title heyo`,
	};
	return (
		<div className='practice'>
			{/* 
        2. Call the Post component below
        3. Pass in the post object as a prop
      */}
			<Post post={post} />
		</div>
	);
};

/*
  4. Make the Post component accept props
  5. Have Post component render the post title and ID to the page
*/
const Post = (props) => {
	const { post } = props;
	return (
		<p>
			Post title: {post.title}, ID: {post.id}
		</p>
	);
};

export default Practice2;
