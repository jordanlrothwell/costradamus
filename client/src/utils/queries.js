import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query Query($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
      matters {
        _id
        reference
        matterAuthor
        quantum
        costPool {
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
        costs {
          _id
          itemNumber
          description
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
query Query {
  me {
    _id
    username
    matters {
      _id
      reference
      quantum
      costPool {
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
query Query($username: String) {
  matters(username: $username) {
    _id
    reference
    matterAuthor
    quantum
    costPool {
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
`;
export const QUERY_MATTER = gql`
  query Query($matterId: ID!) {
    matter(matterId: $matterId) {
      _id
      reference
      matterAuthor
      quantum
      costPool {
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

export const COST_BY_DESC = gql`
query CostByDesc($description: String!) {
  costByDesc(description: $description) {
    _id
  }
}
`