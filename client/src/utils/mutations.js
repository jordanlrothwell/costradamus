import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username

      }
    }
  }
`;

export const ADD_MATTER = gql`
mutation Mutation($reference: String!) {
  addMatter(reference: $reference) {
    _id
    reference
    quantum
    costs {
      itemNumber
      description
      scale {
        A
        B
        C
        D
        E
        F
        G
      }
      category
      special {
        rate
        amount
      }
    }
  }
}
`;

export const UPDATE_MATTER = gql`
  mutation updateMatter($_id: ID!, $reference: String, $quantum: QuantumInput, $offer: OfferInput, $milestones: MilestoneInput) {
    updateMatter(_id: $_id, reference: $reference, quantum: $quantum, offer: $offer, milestones: $milestones) {
      _id
      reference
      quantum {
        claimedAmount
        awardedAmount
      }
      offer {
        isPlaintiff
        amount
        date
      }
      milestones {
        defence
        preHearing
        arbitration
      }
      matterUser
    }
  }
`;

