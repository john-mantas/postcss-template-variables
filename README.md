# PostCSS Template Variables

[PostCSS] plugin to use variables from templating languages.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Convert this: */
.foo {
  color: "tvar( settings.color )";
  background: "tvar( settings.color_bg )", url("tvar( settings.background | file_img_url: '100x' )");
}

/* to this: */
.foo {
  color: {{ settings.color }};
  background: {{ settings.color_bg }}, url({{ settings.background | file_img_url: '100x' }});
}
```

**With custom options** (prefix:`'$'`, quotes:`false`, template.open:`'<<'`, template.close:`'>>'`)
```css
/* Convert this: */
.foo {
  color: $( settings.color );
  background: $( settings.color_bg ), url($( settings.background | file_img_url: '100x' ));
}

/* to this: */
.foo {
  color: << settings.color >>;
  background: << settings.color_bg >>, url(<< settings.background | file_img_url: '100x' >>);
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-template-variables
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-template-variables'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

## Options

```js
module.exports = {
  plugins: [
    require('postcss-template-variables')({
      prefix: 'tvar',
      quotes: true,
      template: {
        open: '{{',
        close: '}}'
      }
    })
  ]
}
```

- **prefix** {string} (default: `'tvar'`) : Select a symbol or a word to be used for matching

- **quotes** {boolean} (default: `true`) : Enable/disable quotes around variables

- **template.open** {string} (default: `'{{'`) : The opening part used by the templating language

- **template.close** {string} (default: `'}}'`) : The closing part used by the templating language

*If an option is not set, it will fallback to the default value.*

## License

[MIT](./LICENSE)