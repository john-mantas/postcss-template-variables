module.exports = () => {

  return {
    postcssPlugin: 'postcss-template-variables',
    Declaration(decl) {
      if (decl.value.includes('tvar(')) {
        decl.value = decl.value.replace(/tvar\((.*?)\)/, '{{$1}}');
      }
    }
  }
}

module.exports.postcss = true
