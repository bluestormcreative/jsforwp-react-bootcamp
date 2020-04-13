import React from 'react';

class Practice2 extends React.Component {
	state = {
		posts: [
			{
				id: 0,
				title: {
					rendered: 'Default Post',
				},
			},
		],
	};
	/* 
    1. Add the method componentDidMount()
    2. Call fetch("https://dev-react-explained-api.pantheonsite.io/wp-json/wp/v2/posts")
    3. Then call .json() on the response
    4. Take that and set it as the value of posts in state
    5  Add a catch to log out any errors
  */

	componentDidMount() {
		fetch(
			'https://dev-react-explained-api.pantheonsite.io/wp-json/wp/v2/posts'
		)
			.then((response) => response.json())
			.then((posts) => {
				this.setState({ posts: posts });
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<header>
				<h1>PRACTICE 2</h1>
				<h2>Posts</h2>
				<ul>
					{this.state.posts.map((post) => (
						<li key={post.id}>{post.title.rendered}</li>
					))}
				</ul>
				<hr />
			</header>
		);
	}
}

export default Practice2;
