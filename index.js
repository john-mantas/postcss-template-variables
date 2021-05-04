module.exports = (opts = {
  prefix: 'tvar',
  template: {
    open: '{{',
    close: '}}'
  }
}) => {
  const START_GROUP = '(',
        END_GROUP = ')';

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const VALUE_REGEXP = new RegExp(
    `${escapeRegExp(opts.prefix)}${escapeRegExp(START_GROUP)}(.*?)${escapeRegExp(END_GROUP)}`,
    'g'
  );

  const valueReplacer = (match, p1) => {
    return `${opts.template.open}${p1}${opts.template.close}`
  };

  return {
    postcssPlugin: 'postcss-template-variables',
    Declaration(decl) {
      if (decl.value.includes(`${opts.prefix}${START_GROUP}`)) {
        decl.value = decl.value.replace(VALUE_REGEXP, valueReplacer);
      }
    }
  }
}

module.exports.postcss = true
