import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      matters {
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
  }
`;

export const QUERY_MATTERS = gql`
  query matters {
    matters {
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
`;

export const QUERY_SINGLE_MATTER = gql`
  query getSingleMatter($reference: String!) {
    getSingleMatter(reference: $reference) {
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