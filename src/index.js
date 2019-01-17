const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('../generated/prisma-client')
// const typeDefs  = require('./schema.graphql')


const options = {
    port: 8000,
    endpoint: '/graphql',
    playground: '/playground'
}

// Como testar no postman:

// Headers:
// Content-Type: application/graphql
// exemplo:
// {
// 	user(email: "thales@gmail"){
// 		name
//    		posts {
//    			title
// 	    }
// 	}
// }

const resolvers = {
    Query: {
        post: (_, { id }) => {
            prisma.post({ id }).then(res => console.log(res))
            return prisma.post({ id })
        },
        feed: (_, args) => {
            prisma.posts().then(res => console.log(res))
            return prisma.posts()
        },

        user: (_, { email }) => {
            prisma.user({ email }).then(res => console.log(res))
            return prisma.user({ email })
        },

        users: (_, args) => {
            prisma.users().then(res => console.log(res));

            return prisma.users()
        },
    },
    Mutation: {
        createPost: (_, { title, content, creatorEmail }) => {
            return prisma.createPost({
                title,
                content,
                creator: { connect: { email: creatorEmail } }
            })
        },
        createUser: (_, { name, email }) => {
            return prisma.createUser({
                name,
                email
            })
        }
    },
    Post: {
        creator: ({ id }, args, context) => {
            return prisma.post({ id }).creator()
        },
    },
    User: {
        posts: ({ id }, args, context) => {
            return prisma.user({ id }).post()
        },
    }

}

// console.log(require('./schema'))

const server = new GraphQLServer({
    typeDefs: require('./schema'),
    resolvers,
    context: {
        prisma
    }
})

server.start(
    options,
    ({ port }) => console.log(`Server started, listening on port ${port} for incoming requests`)
)