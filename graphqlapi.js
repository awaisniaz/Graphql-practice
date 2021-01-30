var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


const schema = buildSchema(`
type Student {
    numberofStudent : Int,
    numberofClasses:Int
}

type Query{
 info : Student
}
`)
class StudentData {

    numberofStudent() {
        return 500
    }

    numberofClasses() {
        return 12
    }


}

const root = {
    info: () => {
        return new StudentData()
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');