import gql from "graphql-tag";

export const UPDATE_TAG = gql`
  mutation updateTag($id: Int!, $name: String) {
    update_tags_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      created_at
      id
      name
    }
  }
`;
export const ADD_NEW_TASK = gql`
  mutation addNewTask($tag_id: Int, $title: String) {
    insert_task_tag_one(
      object: { tag_id: $tag_id, task: { data: { title: $title } } }
    ) {
      tag_id
      task {
        title
      }
    }
  }
`;

export const ADD_NEW_TAG = gql`
  mutation insertTag($name: String) {
    insert_tags_one(object: { name: $name }) {
      id
      name
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask(
    $id: Int!
    $title: String
    $start_time: timestamptz
    $end_time: timestamptz
  ) {
    update_tasks_by_pk(
      _set: { title: $title, start_time: $start_time, end_time: $end_time }
      pk_columns: { id: $id }
    ) {
      title
      id
      start_time
      end_time
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: Int) {
    delete_tasks(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($id: Int) {
    delete_tags(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;
