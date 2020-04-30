import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import SimpleStorage from 'react-simple-storage';
import firebase from './firebase';
import Header from './components/Header';
import Posts from './components/Posts';
import Post from './components/Post';
import PostForm from './components/PostForm';
import NotFound from './components/NotFound';
import Messages from './components/Messages';
import Login from './components/Login';
import './App.css';

class App extends Component {
	state = {
		posts: [
			{
				id: 1,
				slug: 'hello-react',
				title: 'Hello React',
				content: 'Lorem.',
			},
			{
				id: 2,
				slug: 'hello-project',
				title: 'Hello Project',
				content: 'Tothe.',
			},
			{
				id: 3,
				slug: 'hello-blog',
				title: 'Hello Blog',
				content: 'Ipsum.',
			},
		],
		message: null,
	};

	onLogin = (email, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((user) => console.log('Logged in'))
			.catch((error) => console.log(error));
	};

	getNewSlugFromTitle = (title) =>
		encodeURIComponent(title.toLowerCase().split(' ').join('-'));

	addNewPost = (post) => {
		post.id = this.state.posts.length + 1;
		post.slug = this.getNewSlugFromTitle(post.title);
		this.setState({
			posts: [...this.state.posts, post],
			message: 'saved',
		});
		setTimeout(() => {
			this.setState({ message: null });
		}, 1600);
	};

	updatePost = (post) => {
		post.slug = this.getNewSlugFromTitle(post.title);
		const index = this.state.posts.findIndex((p) => p.id === post.id);
		const posts = this.state.posts
			.slice(0, index)
			.concat(this.state.posts.slice(index + 1));
		const newPosts = [...posts, post].sort((a, b) => a.id - b.id);
		this.setState({
			posts: newPosts,
			message: 'updated',
		});
		setTimeout(() => {
			this.setState({ message: null });
		}, 1600);
	};

	deletePost = (post) => {
		if (window.confirm('Delete this post?')) {
			const posts = this.state.posts.filter((p) => p.id !== post.id);
			this.setState({ posts, message: 'deleted' });
			setTimeout(() => {
				this.setState({ message: null });
			}, 1600);
		}
	};

	render() {
		return (
			<Router>
				<div className='App'>
					<SimpleStorage parent={this} />
					<Header />
					{this.state.message && (
						<Messages type={this.state.message} />
					)}
					<Switch>
						<Route
							exact
							path='/'
							render={() => (
								<Posts
									posts={this.state.posts}
									deletePost={this.deletePost}
								/>
							)}
						/>
						<Route
							path='/post/:postSlug'
							render={(props) => {
								const post = this.state.posts.find(
									(post) =>
										post.slug ===
										props.match.params.postSlug // This match prop comes from react-router-dom.
								);
								if (post) return <Post post={post} />;
								else return <NotFound />;
							}}
						/>
						<Route
							exact
							path='/login'
							render={() => <Login onLogin={this.onLogin} />}
						/>
						<Route
							exact
							path='/new'
							render={() => (
								<PostForm
									addNewPost={this.addNewPost}
									post={{
										id: 0,
										slug: '',
										title: '',
										content: '',
									}}
								/>
							)}
						/>
						<Route
							path='/edit/:postSlug'
							render={(props) => {
								const post = this.state.posts.find(
									(post) =>
										post.slug ===
										props.match.params.postSlug
								);
								if (post) {
									return (
										<PostForm
											post={post}
											updatePost={this.updatePost}
										/>
									);
								} else {
									return <Redirect to='/' />;
								}
							}}
						/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}
export default App;
