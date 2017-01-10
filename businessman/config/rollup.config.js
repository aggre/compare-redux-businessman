import nodeResolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'

export default {
	entry: 'src/worker/index.js',
	dest: 'public/worker.js',
	format: 'iife',
	plugins: [
		nodeResolve( { jsnext: true } ),
		buble()
	]
}
