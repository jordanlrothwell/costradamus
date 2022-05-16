import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      matters {
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
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      matters {
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
    }
  }
`;

export const QUERY_MATTERS = gql`
  query matters($username: String!) {
    matters(username: $username) {
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
    }
  }
`;

