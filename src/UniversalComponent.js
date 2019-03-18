import React from 'react'
import PropTypes from 'prop-types'
import universal from 'react-universal-component'
import Loading from './components/loader'
import NotFound from './components/notFound'

// small function that allows page to be a string or a dynamic import function
// <UniversalComponent page={()=>{import('../../someFolder/Component.js')}}
// Its great for complex folder structures. You can leverage code completion

const UniversalComponent = ({path}) => universal(path, {
  onError: error => {
    throw error
  },
  minDelay: 1200,
  loading: null,
  error: null,
  ignoreBabelRename: true
})

export default UniversalComponent
