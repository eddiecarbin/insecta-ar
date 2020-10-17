
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import { terser } from "rollup-plugin-terser";
export default {
	input: 'game/src/InsectaContext.ts', // our source file
	output: [
		{
			//umd
			format: 'umd',
			name: 'insecta',
			file: 'game/dist/bundle.js',
			sourcemap: true,
			globals: {
				three: 'THREE'
			}
		}
	],
	external: [
		...Object.keys(pkg.dependencies || {}),
		"three"
	],
	plugins: [
		typescript({
			tsconfig: "game/tsconfig.json",
			typescript: require('typescript'),
		}),
		json(),
		nodeResolve() ,
		terser() // minifies generated bundles
	]
};