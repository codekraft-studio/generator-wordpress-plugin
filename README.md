# generator-wordpress-plugin 

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> The best way to start creating your WordPress plugin projects.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wordpress-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-wordpress-plugin
```

Then generate your new project:

```bash
yo wordpress-plugin [name]
```

## Development

Until the module it's not yet available as a global npm module. A global module may be created and symlinked to a local one, using npm. 

Move inside the project folder and type:

```bash
npm link
```

That will install your project dependencies and symlink a global module to your local file. After npm is done, you'll be able to call `yo wordpress-plugin`


## Contributing

1. Create an issue and describe your idea
2. Fork the project
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

---

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [codekraft-studio](https://codekraft.it)


[npm-image]: https://badge.fury.io/js/generator-wordpress-plugin.svg
[npm-url]: https://npmjs.org/package/generator-wordpress-plugin
[travis-image]: https://travis-ci.org/codekraft-studio/generator-wordpress-plugin.svg?branch=master
[travis-url]: https://travis-ci.org/codekraft-studio/generator-wordpress-plugin
[daviddm-image]: https://david-dm.org/codekraft-studio/generator-wordpress-plugin.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/codekraft-studio/generator-wordpress-plugin
[coveralls-image]: https://coveralls.io/repos/codekraft-studio/generator-wordpress-plugin/badge.svg
[coveralls-url]: https://coveralls.io/r/codekraft-studio/generator-wordpress-plugin
