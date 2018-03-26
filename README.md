# vue-mason
A command line tool for quickly generating and scaffolding Vue files.

## Installation

```bash
npm install -g vue-mason
```

## Usage

`vue-mason --help`

### Creating Components

Vue Mason currently has support for quickly generating:
- Basic Single File Vue Components (SFVC)
- JSX Components
- Render Function Components
- Vue Class Components

By default, Vue Mason will create a Basic SFVC.

`vue-mason create:component MyComponent`

Where `MyComponent` is the name of the component you want to create.

To specify a different template type you must pass the `--type` flag followed by the type you want to create.

`vue-mason create:component MyComponent --type jsx`

| Type | Value
| ---  | ---
| SFCV | (default)
| JSX  | jsx
| Render | render
| Class | class

Generating a component this way will look for a `./src/components/` path. If it does not exist it will create one for you to save the file.  However, this may not work for you so you can also pass in the path of where to save the component.

`vue-mason create:component MyComponent --path /some/path`

### Creating Route Files

You can create route files through Vue Mason as well. Currently, the following template is used to scaffold your routes:

```javascript
import {} from ''

export default [
  {
    path: '',
    name: '',
    component: ''
  }
]
```

To create a route:

`vue-mason create:route /dashboard`

You can specify other options here too like the component to map the route to and the name of the route.

`vue-mason create:route /dashboard --component DashboardComponent --name dashboard`

We can specify more than one route as well:

`vue-mason create:route /dashboard /favorites /settings`

By default, Vue Mason will save it to a file called `routes.js`.  You can update this to suit your needs with the `--filename` flag.

`vue-mason create:route /dashboard --filename dashboardroutes.js`

You can change the default save path, `./src/`, using the `--path` flag.

`vue-mason create:route /dashboard --path /my/dashboard/stuff`

### Creating Vuex Store files

Finally, Vue Mason allows for quickly creating Vuex store related files.

There are two template types to choose from:
- Flat (default)
- Spread

The `flat` option will create stubs for your initial state, getters, actions and mutations.  The `spread` option will create a separate file initial state, getters, actions, muatations, and mutation types.

`vue-mason create:store StoreName`
`vue-mason create:store StoreName --type spread`

We can also specify if the store module is namespaced or not via the `--namespaced` flag. By default, a store module is not namespaced.

`vue-mason create:store StoreName --namespaced`

As with the other file creation options we can change the default save path of `./src/`.

`vue-mason create:store StoreName --path /store/modules/`

## Status: Beta
The base of the features are there but there are probably some bugs.  We still need testing setup and other ideas ironed out. If you come across a bug please [submit an issue](https://github.com/dillonchanis/vue-mason/issues).  We are accepting PRs!

## License
MIT
