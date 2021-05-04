module.exports = (opts = {
  prefix: 'tvar',
  quotes: true,
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

  const START_REGEXP = `${opts.quotes?'"':''}${escapeRegExp(opts.prefix)}${escapeRegExp(START_GROUP)}`,
        END_REGEXP = `${escapeRegExp(END_GROUP)}${opts.quotes ? '"' : ''}`;

  const VALUE_REGEXP = new RegExp(
    `${START_REGEXP}(.*?)${END_REGEXP}`,
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
