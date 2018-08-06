import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
//import { gql, graphql, compose } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => props.save ? '#2BC3A1' : ''};
  color: ${props => props.save ? 'white' : '#A3A3A3'};
  height: 48px;
  line-height: 1;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 300;
  border-radius: 4px
`

const ImageContainer = styled.div`
  width: 100%;
  background-color: #F7F7F7;
  min-height: 250px;
  margin-bottom: 20px;
`

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px;
`

class ChangePersonCard extends React.Component {
  
  static fragments = {
    person: gql`
      fragment PersonCardPerson on people {
        id
        firstName
        lastName
        image
      }
    `
  }

  static propTypes = {
    person: propType(ChangePersonCard.fragments.person).isRequired,
    handleCancel: PropTypes.func.isRequired,
    afterChange: PropTypes.func.isRequired,
    updatePerson: PropTypes.func.isRequired,
    ///deletePerson: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    const { firstName,lastName, image } = props.person
    //console.log(props.person);
    this.state = { firstName, lastName, image }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render () {
    return (
      <div className="w-100 pa4 flex justify-center">
        <Card style={{ maxWidth: 450 }}>
          <input
            className="w-100 padding-1 mv2"
            value={ this.state.firstName }
            placeholder="First name"
            onChange={ (e) => this.setState({ firstName: e.target.value }) }
          />
          <input
            className="w-100 padding-1 mv2"
            value={ this.state.lastName }
            placeholder="Last name"
            onChange={ (e) => this.setState({ lastName: e.target.value }) }
          />
          <input
            className="w-100 padding-1 mv2"
            value={ this.state.image }
            placeholder="Image Url"
            onChange={ (e) => this.setState({ image: e.target.value }) }
          />
          <ImageContainer>
          </ImageContainer>
          <div className='flex justify-between'>
            <Button delete onClick={ this.handleDelete }>Delete</Button>
            <Button onClick={ this.props.handleCancel }>Cancel</Button>
            { this.canUpdate
              ? <Button save onClick={ this.handleUpdate }>Update</Button>
              : <Button disabled>Update</Button>
            }
          </div>
        </Card>
      </div>
    )
  }


  get canUpdate () {
    return this.state.firstName && this.state.lastName && this.state.image && 
      (this.props.person.firstName !== this.state.firstName || this.props.person.lastName !== this.state.lastName || this.props.person.image !== this.state.image)
  }

  handleUpdate () {
    const { id } = this.props.person
    const { lastName, firstName, image } = this.state
    this.props.updatePerson({ variables: { id, lastName, firstName, image } })
    .then(this.props.afterChange)
  }

  handleDelete () {
    const { id } = this.props.pokemon
    this.props.deletePokemon({ variables: { id } })
    .then(this.props.afterChange)
  }
}

const updatePerson = gql`
  mutation UpdateAuthor($id: Int!, $firstName: String!, $lastName: String!, $image: String) {
    updateAuthor(authorId: $id, firstName: $firstName, lastName: $lastName, image: $image) {
      id
    }
  }
`

/*
const deletePerson = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`
*/
/*
// compose for multiple constants graphql
const ChangePersonCardWithMutations = compose(
  graphql(updatePerson, {
    name: 'updatePerson'
  }),
  graphql(deletePerson, {
    name: 'deletePerson'
  })
)(ChangePersonCard)
*/
// OR for only one constant graphql
const ChangePersonCardWithMutations = graphql(updatePerson,{name:'updatePerson'})(ChangePersonCard)

export default ChangePersonCardWithMutations