### The Template
This template is specifically for an AngularJS project in womply, it will provide the developer
with a standard layout that contains the top navigation and side navigation. It also provides
the following libraries: angular, underscore and angular-material.

#### Application Setup
There are application specific setup required for every application that clones this repository. An AppConfig factory
must be created that returns a promise which resolves an object that describes application specific settings. An example
has been included in ./app/components/app_config/services/app_config.js. A description of the configuration keys are as
follows:

##### ApplicationId (string)
A string containing the id for the application.

##### UserMenuLinks (Array<Object>)
An array of object to define the user menu links, each object has the following properties:
* name - the title to display on the menu
* href - the location that the menu item navigates to

##### ApiBase (string)
Defines the base url for the API service.

##### ApiPath (string)
Defines the path for the API service.

##### NavigationLinks (Array<Object>)
Array of objects to define the side bar navigation links. Each object has the following properties:
* id - the id for the navigation
* name - the name of the navigation item
* route - the route that the navigation will go to
* active - boolean to state which is active initially
* href - the location that will be navigated to when the navigation link has been clicked

##### NavigationSelected (Function)
This is an optional configuration that when set, will trigger every time the navigation menu item has been clicked. This
overriedes any href that has been set in the NavigationLinks

```js
angular.module('womply')
  .factory('AppConfig', ['$q', '$location', 'Context', 'Environment', function($q, $location, Context, Environment) {
    var defer = $q.defer();


    Context.getCurrentMerchantLocation()
      .then(function(slug) {
        defer.resolve({
          ApplicationId: 'insights',
          UserMenuLinks: [
            {
              name: 'Logout',
              href: Environment.getInsightsPath() + '/users/sign_out'
            }
          ],
          ApiBase: 'http://local.womply.com:3000',
          ApiPath: '/api/0.1',
          NavigationLinks: [
            {
              id:     'nav1',
              name:   'Nav 1',
              route:  'nav1',
              active: true
            },
            {
              id:     'nav2',
              name:   'Nav 2',
              route:  'nav2'
            }
          ],
          NavigationSelected: function() {
            var self = this;
            Context.getCurrentMerchantLocation()
              .then(function(slug) {
                $location.path('/' + slug + '/' + self.route)
              });
          }
        });
      });

    return defer.promise;
  }]);
```

#### Deployment Setup

Forks of this template can be configured to automatically deploy to S3/nginx. To enable automatic deployment:

1. Issue a request to Devops to create a new S3 bucket for your app and proxy it via a new domain hosted by nginx.

2. Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables to the CircleCI build for your forked repo.

3. Edit the `APP_S3_BUCKET` and `ADDITIONAL_S3_PATH` variables in `bin/deploy`.

4. Uncomment the `deployment` section in `circle.yml`.

5. Merge your changes for steps 3-4 to your develop branch which will cause CircleCI to automatically deploy to your testing S3 bucket. Rinse and repeat for your master branch.

#### Gulp Tasks
##### serve:livereload
```js
	gulp serve:livereload
```
Serve the application on port 9999 with a watch and livereload pushes. This means that when there is a change in the code, the browser
will refresh itself.

##### serve
```js
	gulp serve
```
Serve the application on port 9999.

##### test:karma:dev
```js
	gulp test:karma:dev
```
Run karma on the js code for unit testing and to provide a coverage report that is placed under ./coverage directory.

##### test:karma:prod
```js
	gulp test:karma:prod
```
Run karma on the concatenated js file built with coverage report under the ./coverage directory.
