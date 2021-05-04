module.exports = (opts) => {
  const START_GROUP = '(',
        END_GROUP = ')',
        PREFIX = opts && opts.prefix ? opts.prefix : 'tvar',
        QUOTES = opts && opts.quotes !== undefined ? opts.quotes : true,
        TEMPLATE_OPEN = opts && opts.template && opts.template.open ? opts.template.open : '{{',
        TEMPLATE_CLOSE = opts && opts.template && opts.template.close ? opts.template.close : '}}';

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const START_REGEXP = `${QUOTES?'"':''}${escapeRegExp(PREFIX)}${escapeRegExp(START_GROUP)}`,
        END_REGEXP = `${escapeRegExp(END_GROUP)}${QUOTES ? '"' : ''}`;

  const VALUE_REGEXP = new RegExp(
    `${START_REGEXP}(.*?)${END_REGEXP}`,
    'g'
  );

  const valueReplacer = (match, p1) => {
    return `${TEMPLATE_OPEN}${p1}${TEMPLATE_CLOSE}`
  };

  return {
    postcssPlugin: 'postcss-template-variables',
    Declaration(decl) {
      if (decl.value.includes(`${PREFIX}${START_GROUP}`)) {
        decl.value = decl.value.replace(VALUE_REGEXP, valueReplacer);
      }
    }
  }
}

module.exports.postcss = true
