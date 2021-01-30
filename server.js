const { graphql, buildSchema } = require('graphql')

const scheme = buildSchema(`
type Query {
    greeting:String

}
`)

const root = {
    greeting: () => {
        return 'Hello World';
    }
}

graphql(scheme, '{ greeting}', root).then((response) => {
    console.log(response.data.greeting)
})