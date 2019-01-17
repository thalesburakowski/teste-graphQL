
module.exports = `

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]
}

type Post {
  id: ID!
  title: String!
  content: String!
  published: Boolean!
  creator: User!
}

type Query {
    post(id: ID): Post!
    feed: [Post!]
    user(email: String): User!
    users: [User!]

}

type Mutation {
    createPost(title: String!, content: String!, creatorEmail: String!): Post!
    createUser(name: String!, email: String!): User!
}` 