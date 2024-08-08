
import gql from "graphql-tag";
const GET_USERS = gql`
query GetUsers($username: String!, $password: String!) {
  mySchema_users(where: {username: {_eq: $username}, password: {_eq: $password}}) {
    id
    password
    username
  }
}
`;
export { GET_USERS };


