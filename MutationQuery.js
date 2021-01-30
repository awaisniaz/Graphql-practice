var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


const schema = buildSchema(`
type Mutation{
    setMessage(message:String):String
}

type Query{
    getMessage:String
}
`)
var fakeDatabase = {}
const root = {
    setMessage({ message }) {
        fakeDatabase.message = message
        return fakeDatabase.message
    },

    getMessage() {
        return fakeDatabase.message
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});