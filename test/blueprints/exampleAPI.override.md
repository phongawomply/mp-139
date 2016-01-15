# Group Override Test resource API

## Override Initialize Resource [/test/{id}?message=hello]
An example of defining a resource in blueprints.
+ Parameters
  + id: 1 (number) - An unique identifier of the test resource.

### GET
Get test resource.
+ Response 200 (application/json)
  {
    id: '10',
    author: 'hello'
  }

## Override Initialize Resource [/test/{id}?message=world]
An example of defining a resource in blueprints.
+ Parameters
  + id: 1 (number) - An unique identifier of the test resource.

### GET
Get test resource.
+ Response 200 (application/json)
  {
    id: '10',
    author: 'world'
  }

## Override Initialize Resource [/test/{id}?message=world&something=silly]
An example of defining a resource in blueprints.
+ Parameters
  + id: 1 (number) - An unique identifier of the test resource.

### GET
Get test resource.
+ Response 200 (application/json)
  {
    id: '10',
    author: 'bleh belh bleh'
  }