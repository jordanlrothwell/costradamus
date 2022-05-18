import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        matters {
          _id
        }
      }
    }
  }
`;

export const ADD_MATTER = gql`
  mutation Mutation($reference: String!) {
    addMatter(reference: $reference) {
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

export const ADD_COST = gql`
  mutation Mutation($matterId: ID!, $costId: ID!, $index: Int!) {
    addCost(matterId: $matterId, costId: $costId, index: $index) {
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

export const REMOVE_MATTER = gql`
  mutation Mutation($matterId: ID!) {
    removeMatter(matterId: $matterId) {
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

export const REMOVE_COST = gql`
  mutation Mutation($matterId: ID!, $costId: ID!, $index: Int!) {
    removeCost(matterId: $matterId, costId: $costId, index: $index) {
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

export const MOVE_COST = gql`
  mutation Mutation($matterId: ID!, $costId: ID!, $index: Int!) {
    moveCost(matterId: $matterId, costId: $costId, index: $index) {
      _id
      reference
      matterAuthor
      quantum
      costPool {
        _id
        itemNumber
        description
      }
      costs {
        _id
        itemNumber
        description
      }
    }
  }
`;
