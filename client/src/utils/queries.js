import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      matters {
        _id
        reference
        matterAuthor
        quantum
        costs {
          _id
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
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query User {
    me {
      _id
      username
      email
      password
      matters {
        _id
        reference
        matterAuthor
        quantum
        costs {
          _id
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
        }
      }
    }
  }
`;

export const QUERY_MATTERS = gql`
  query Matters($username: String) {
    matters(username: $username) {
      _id
      reference
      matterAuthor
      quantum
      costs {
        _id
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
      }
    }
  }
`;

export const QUERY_COSTS = gql`
query Costs {
  costs {
    _id
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
  }
}
`
export const QUERY_MATTER = gql`
  query Matter($matterId: ID!) {
    matter(matterId: $matterId) {
      _id
      reference
      matterAuthor
      quantum
      costs {
        _id
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
      }
    }
  }
`;
