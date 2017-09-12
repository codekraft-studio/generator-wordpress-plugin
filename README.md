# generator-wordpress-plugin 

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Slack Chat](https://img.shields.io/badge/wordpress_slack-@codekraft--studio-blue.svg?style=flat)](https://wordpress.slack.com)
> The best way to start creating your WordPress plugin projects.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wordpress-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-wordpress-plugin
```

Then generate your new project:

```bash
yo wordpress-plugin
```

Once you are inside a existing project, generated with this tool you can also do:
```bash
yo wordpress-plugin:metabox My Metabox
yo wordpress-plugin:shortcode My Shortcode
yo wordpress-plugin:widget My Widget
```

## Generators
Available generators:
  + __app__: Default generator (same as `yo wordpress-plugin`)
  + __metabox__: For generating metaboxes in `include/metaboxes/`
  + __shortcode__: For generating shortcodes in `include/shortcodes/`
  + __widget__: For generating widgets in `include/widgets/`


## Development

Until the module it's not yet available as a global npm module. A global module may be created and symlinked to a local one, using npm. 

Move inside the project folder and type:

```bash
npm link
```

That will install your project dependencies and symlink a global module to your local file. After npm is done, you'll be able to call `yo wordpress-plugin`


## Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/codekraft-studio/generator-wordpress-plugin/fork)
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
[coveralls-image]: https://coveralls.io/repos/github/codekraft-studio/generator-wordpress-plugin/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/codekraft-studio/generator-wordpress-plugin?branch=master
