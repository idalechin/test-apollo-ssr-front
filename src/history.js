import canUseDom from 'can-use-dom'
import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';

const history = canUseDom ? createBrowserHistory() : createMemoryHistory()

export default history
