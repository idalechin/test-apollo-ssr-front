import {vendorsFilterReducer} from './vendorsFilter';

const mainReducer = ({vendorsFilter}, action) => ({
  vendorsFilter: vendorsFilterReducer(vendorsFilter, action),
});

export default mainReducer