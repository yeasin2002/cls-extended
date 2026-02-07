/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { unplugin } from '../index'

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import Starter from 'unplugin-starter/webpack'
 *
 * export default {
 *   plugins: [Starter()],
 * }
 * ```
 */
const webpack = unplugin.webpack as typeof unplugin.webpack
export default webpack
export { webpack as } from 'module.exports'

