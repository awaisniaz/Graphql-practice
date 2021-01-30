const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const port = process.env.PORT || 9000
const app = express()
///const info = require('./Data')

app.use(bodyParser.json(), cors())
const typeDefinition = `
type university{
    id:Int,
    university:String
}
type Student{
    Name:String,
    university: university
}
type Query  {
   greeting: String,
   student:[Student]
   studentByName(Name:String): [Student]
}
type Mutation {
    createUser(id:Int,Name:String):String
}
`
const infodata = [{ id: 1, Name: 'Awais' }, { id: 2, Name: 'Tayyab' }]
const Unidatadata = [{ id: 1, university: 'Uow' }, { id: 2, university: 'Uow' }]
const resolverObject = {
    Query: {
        greeting: () => 'Greeting',
        student: () => {
            console.log(root)
            return infodata
        },
        studentByName: (root, args, context, info) => infodata.filter((e, i) => {
            return e.Name == args.Name

        }),
    },
    Student: {
        university: (global, args, Context, info) => {
            return { id: 2, university: 'Nust' }
        }
    },

    Mutation: {
        createUser: (global, args, context, info) => {
            if (args.id == 1) {
                infodata.Name = 'Hussan';
                console.log(infodata)

            }
        }

    }
}

const { makeExecutableSchema } = require('graphql-tools')

const schema = makeExecutableSchema({ typeDefs: typeDefinition, resolvers: resolverObject })

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.listen(port, () => console.log(`server is up and running ${port}`))