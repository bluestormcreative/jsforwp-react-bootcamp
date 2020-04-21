import React, { useState, useEffect } from 'react';
import './App.css';

const togglePost = (event) => {
	const post = event.target.closest('.post');
	if (!post.classList.contains('post-open')) {
		post.classList.add('post-open');
	} else {
		post.classList.remove('post-open');
	}
};

const PostList = (props) => {
	const posts = props.posts;
	const postItems = posts.map((post) => {
		return (
			<div className='post' key={post.id} onClick={togglePost}>
				<h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
				<div
					className='post-content'
					dangerouslySetInnerHTML={{ __html: post.content.rendered }}
				/>
			</div>
		);
	});

	return postItems;
};

function App() {
	const [posts, setPosts] = useState([]);
	const url = 'https://css-tricks.com/wp-json/wp/v2/posts';

	const getPosts = () => {
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setPosts([...data]);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (posts.length === 0) {
			getPosts();
		}
	});

	return (
		<div className='App'>
			<h2>Hooks-based Post Reader</h2>
			<PostList posts={posts} />
		</div>
	);
}

export default App;
