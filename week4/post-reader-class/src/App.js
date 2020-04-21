import React from 'react';
import './App.css';

function togglePost(event) {
	const post = event.target.closest('.post');
	if (!post.classList.contains('post-open')) {
		post.classList.add('post-open');
	} else {
		post.classList.remove('post-open');
	}
}

function PostList(props) {
	const posts = props.posts;
	const postItems = posts.map((post) => {
		return (
			<div className='post' onClick={togglePost} key={post.id}>
				<h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
				<div
					className='post-content'
					dangerouslySetInnerHTML={{ __html: post.content.rendered }}
				/>
			</div>
		);
	});
	return <div className='posts'>{postItems}</div>;
}

class App extends React.Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		this.url = 'https://css-tricks.com/wp-json/wp/v2/posts';

		this.posts = fetch(this.url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({ posts: [...data] });
			});
	}

	render() {
		return (
			<div className='App'>
				<div className='post-reader'>
					<h2>Class-based Post Reader</h2>
					<PostList posts={this.state.posts} />
				</div>
			</div>
		);
	}
}

export default App;
