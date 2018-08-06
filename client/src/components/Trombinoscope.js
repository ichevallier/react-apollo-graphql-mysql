import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import PersonPreview from './PersonPreview'
import AddPersonPreview from './AddPersonPreview'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
`
const ListQuery = gql`query ListQuery{
  authors {
      id
      firstName
      lastName
      image
  }
}`
class Trombinoscope extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      error: PropTypes.object,
      authors: PropTypes.array
    }).isRequired
  }
  

  render () {
    console.log('load : '+this.props.data.loading);
    //console.log('people : '+this.props.data.authors);
    if (this.props.data.loading) {
      return (<div>Loading...</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <Title className='tc pa5'>
          Athlete
        </Title>
        <div className='flex flex-wrap justify-center center w-75'>
          <AddPersonPreview />
          {this.props.data.authors.map((athlete) =>
            <PersonPreview key={athlete.id} athlete={athlete} />
          )}
        </div>
      </div>
    )
  }
}
const TrombinoscopeWithData = graphql(ListQuery, {
  options: { pollInterval: 5000 },
})(Trombinoscope)

export default TrombinoscopeWithData
