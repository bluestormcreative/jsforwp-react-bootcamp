import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import SimpleStorage from 'react-simple-storage';
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
		isAuthenticated: false,
		posts: [],
		message: null,
	};

	onLogin = (email, password) => {
		this.props.appService
			.login(email, password)
			.then((user) => this.setState({ isAuthenticated: true }))
			.catch((error) => console.log(error));
	};

	onLogout = () => {
		this.props.appService
			.logout()
			.then(() => this.setState({ isAuthenticated: false }))
			.catch((error) => console.log(error));
	};

	displayMessage = (type) => {
		this.setState({ message: type });
		setTimeout(() => {
			this.setState({ message: null });
		}, 1600);
	};

	addNewPost = (post) => {
		this.props.appService.savePost(post);
		this.displayMessage('saved');
	};

	updatePost = (post) => {
		this.props.appService.updatePost(post);
		this.displayMessage('updated');
	};

	deletePost = (post) => {
		if (window.confirm('Delete this post?')) {
			this.props.appService.deletePost(post);
			this.displayMessage('deleted');
		}
	};

	renderAuthRoute(Component, props) {
		if (this.state.isAuthenticated) {
			return <Component {...props} />;
		} else {
			return <Redirect to='/' />;
		}
	}

	componentDidMount() {
		this.props.appService.subscribeToPosts((posts) =>
			this.setState({ posts })
		);
	}

	render() {
		return (
			<Router>
				<div className='App'>
					<SimpleStorage parent={this} />
					<Header
						isAuthenticated={this.state.isAuthenticated}
						onLogout={this.onLogout}
					/>
					{this.state.message && (
						<Messages type={this.state.message} />
					)}
					<Switch>
						<Route
							exact
							path='/'
							render={() => (
								<Posts
									isAuthenticated={this.state.isAuthenticated}
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
							render={() =>
								!this.state.isAuthenticated ? (
									<Login onLogin={this.onLogin} />
								) : (
									<Redirect to='/' />
								)
							}
						/>
						<Route
							exact
							path='/new'
							render={() =>
								this.renderAuthRoute(PostForm, {
									addNewPost: this.addNewPost,
									post: {
										key: null,
										slug: '',
										title: '',
										content: '',
									},
								})
							}
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
									return this.renderAuthRoute(PostForm, {
										updatePost: this.updatePost,
										post,
									});
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
