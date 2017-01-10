import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectName, fetchPostsIfNeeded } from '../actions'
import Posts from '../components/Posts'

let queue = [
	'AskReddit',
	'news',
	'funny',
	'pics',
	'todayilearned',
	'videos',
	'worldnews',
	'gifs',
	'gaming',
	'aww',
	'movies',
	'Jokes'
]

class App extends Component {
	static propTypes = {
		selectedName: PropTypes.string.isRequired,
		posts: PropTypes.array.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	componentDidMount () {
		const { dispatch, selectedName } = this.props
		dispatch( fetchPostsIfNeeded( selectedName ) )
		queue.shift()
	}

	componentWillReceiveProps ( nextProps ) {
		if ( nextProps.posts.length === 0 || queue.length === 0 ) {
			return
		}
		const { dispatch } = nextProps
		dispatch( selectName( queue[ 0 ] ) )
		dispatch( fetchPostsIfNeeded( queue[ 0 ] ) )
		queue.shift()
	}

	render () {
		const { posts } = this.props
		return (
			<div>
				<div>
					<Posts posts={posts}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { selectedName, postsByName } = state
	const {
		items: posts
	} = postsByName[ selectedName ] || {
		items: []
	}

	return {
		selectedName,
		posts
	}
}

export default connect( mapStateToProps )( App )
