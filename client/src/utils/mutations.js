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
  mutation addMatter($reference: String!, $quantum: QuantumInput, $offer: OfferInput, $milestones: MilestoneInput) {
    addMatter(reference: $reference, quantum: $quantum, offer: $offer, milestones: $milestones) {
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
