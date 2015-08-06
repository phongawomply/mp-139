# Example API
API descriptions in markdown!  This is example API using API blueprints.  For full usage examples see the github [documentation](https://github.com/apiaryio/api-blueprint/tree/master/examples).
Also there is a specification [here](https://github.com/apiaryio/api-blueprint/blob/master/API%20Blueprint%20Specification.md).  

Make the most of API blueprints by tapping into its [toolchain](https://apiblueprint.org/#bindings) for your dev environment.  Additionally instantly fire up API servers in node with [api-mock](https://www.npmjs.com/package/api-mock).

# Group Test resource API

## Test Resouce [/test/{id}]
An example of defining a resource in blueprints.
+ Parameters
  + id: 1 (number) - An unique identifier of the test resource.

### GET
Get test resource.
+ Response 200 (application/json)
  {
    id: '1',
    author: 'Jacob Tran'
  }

### PUT
Update a test resource.
+ Request (application/json)
  {
    id: '1',
    author: 'Phong Mai'
  }
+ Response 204 (application/json)
  {
    success: 'true'
  }
