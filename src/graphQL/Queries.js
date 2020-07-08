import gql from "graphql-tag";

export const GET_TAG_BY_ID = gql`
  query getTagById($id: Int!) {
    tasks_by_pk(id: $id) {
      end_time
      title
    }
  }
`;

export const GET_TAGS = gql`
  query getTags {
    tags {
      id
      name
      tasks {
        id
        tag_id
        title
      }
    }
  }
`;
