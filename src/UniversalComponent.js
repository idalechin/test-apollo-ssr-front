import universal from 'react-universal-component'
import Loader from './components/loader'
import NotFound from './components/notFound'

// small function that allows page to be a string or a dynamic import function
// <UniversalComponent page={()=>{import('../../someFolder/Component.js')}}
// Its great for complex folder structures. You can leverage code completion

const UniversalComponent = universal(({ page }) => page(), {
	onError: error => {
		console.log("Router error: ", error);
		return null;
	},
	minDelay: 1200,
	loading: Loader,
	error: NotFound,
	ignoreBabelRename: true
})

export default UniversalComponent
