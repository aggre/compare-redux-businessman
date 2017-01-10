import React from 'react'
import { render } from 'react-dom'
import { install } from 'businessman'
import App from './containers/App'

install( '/worker.js' )

render(
	<App/>,
	document.getElementById( 'root' )
)
