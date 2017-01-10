export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_NAME = 'SELECT_NAME'

const fat = data => {
	let res = []
	for ( let i = 0; i < 1000; i++ ) {
		Array.prototype.push.apply( res, data )
	}
	res = null
	return data
}

export const selectName = name => ( {
	type: SELECT_NAME,
	name
} )

export const requestPosts = name => ( {
	type: REQUEST_POSTS,
	name
} )

export const receivePosts = ( name, json ) => ( {
	type: RECEIVE_POSTS,
	name,
	posts: fat( json.data.children.map( child => child.data ) )
} )

const fetchPosts = name => dispatch => {
	dispatch( requestPosts( name ) )
	return fetch( `https://www.reddit.com/r/${name}.json` )
	.then( response => response.json() )
	.then( json => dispatch( receivePosts( name, json ) ) )
}

const shouldFetchPosts = ( state, name ) => {
	const posts = state.postsByName[ name ]
	if ( !posts ) {
		return true
	}
	return posts.didInvalidate
}

export const fetchPostsIfNeeded = name => ( dispatch, getState ) => {
	if ( shouldFetchPosts( getState(), name ) ) {
		return dispatch( fetchPosts( name ) )
	}
}
