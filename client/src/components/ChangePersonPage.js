import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


import ChangePersonCard from './ChangePersonCard'

const PersonQuery = gql`
  query PersonQuery($id: Int!) {
    author(id: $id) {
      id
      image
      firstName
      lastName
    }
  }
`

class ChangePersonPage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      error: PropTypes.object,
      author: PropTypes.object
    }).isRequired,
    //router: PropTypes.object.isRequired,
    //params: PropTypes.object.isRequired,
  }
  constructor () {
    super()
    this.goBack = this.goBack.bind(this)
  }
/* 
*/
  render () {
    //console.log('test :: '+this.props.data.people);
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      //console.log('test'+this.props.data.people.firstName);
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
   
    console.log('change :: '+this.props.data.author.firstName);
    
     return (
      <div>
        <ChangePersonCard person={this.props.data.author} handleCancel={this.goBack} afterChange={ this.goBack }/>
      </div>
    )
  }

  goBack () {
    this.props.history.replace('/')
  }
}

const ChangePersonPageWithQuery = graphql(PersonQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.personId
    }
  })
})(withRouter(ChangePersonPage))


export default ChangePersonPageWithQuery
