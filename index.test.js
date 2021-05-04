const postcss = require('postcss')

const plugin = require('./')

// Option values used in test expectations
const customOptions = {
  prefix: '$',
  quotes: false,
  template: {
    open: '<<',
    close: '>>'
  }
}

// Parameters passed to plugin custom options
const customOptionsParameters = {
  prefix: '$',
  quotes: false,
  template: {
    open: '<<',
    close: '>>'
  }
}

async function run(input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

// Default options block
describe('Replace with default options', () => {
  describe('one', () => {
    test('template variable', async () => {
      await run(
        'p { color: "tvar( settings.color )"; }',
        'p { color: {{ settings.color }}; }'
      )
    })

    test('template variable with units', async () => {
      await run(
        'p { padding: "tvar( settings.padding )"px; }',
        'p { padding: {{ settings.padding }}px; }'
      )
    })

    test('template variable with filters', async () => {
      await run(
        'p { padding: "tvar( settings.padding | append: "px" )"; }',
        'p { padding: {{ settings.padding | append: "px" }}; }'
      )
    })

    test('enclosed template variables', async () => {
      await run(
        'p { background-image: url("tvar( settings.image | img_url: "100x" )"); }',
        'p { background-image: url({{ settings.image | img_url: "100x" }}); }'
      )
    })
  })

  describe('many', () => {
    test('template variables', async () => {
      await run(
        'p { padding: "tvar( settings.y_length )" "tvar( settings.x_length )"; }',
        'p { padding: {{ settings.y_length }} {{ settings.x_length }}; }'
      )
    })

    test('template variables with units', async () => {
      await run(
        'p { padding: "tvar( settings.y_length )"px "tvar( settings.x_length )"px; }',
        'p { padding: {{ settings.y_length }}px {{ settings.x_length }}px; }'
      )
    })

    test('template variables with filters', async () => {
      await run(
        'p { padding: "tvar( settings.y_length | append: "px" )" "tvar( settings.x_length | append: "px" )"; }',
        'p { padding: {{ settings.y_length | append: "px" }} {{ settings.x_length | append: "px" }}; }'
      )
    })

    test('enclosed template variables', async () => {
      await run(
        'p { background-image: url("tvar( settings.image | img_url: "100x" )"), url("tvar( settings.image | img_url: "100x" )"); }',
        'p { background-image: url({{ settings.image | img_url: "100x" }}), url({{ settings.image | img_url: "100x" }}); }'
      )
    })
  })
})

// Custom options block
describe('Replace with custom options', () => {
  describe('one', () => {
    test('template variable', async () => {
      await run(
        `p { color: ${customOptions.prefix}( settings.color ); }`,
        `p { color: ${customOptions.template.open} settings.color ${customOptions.template.close}; }`,
        customOptionsParameters
      )
    })

    test('template variable with units', async () => {
      await run(
        `p { padding: ${customOptions.prefix}( settings.padding )px; }`,
        `p { padding: ${customOptions.template.open} settings.padding ${customOptions.template.close}px; }`,
        customOptionsParameters
      )
    })

    test('template variable with filters', async () => {
      await run(
        `p { padding: ${customOptions.prefix}( settings.padding | append: "px" ); }`,
        `p { padding: ${customOptions.template.open} settings.padding | append: "px" ${customOptions.template.close}; }`,
        customOptionsParameters
      )
    })

    test('enclosed template variables', async () => {
      await run(
        `p { background-image: url(${customOptions.prefix}( settings.image | img_url: "100x" )); }`,
        `p { background-image: url(${customOptions.template.open} settings.image | img_url: "100x" ${customOptions.template.close}); }`,
        customOptionsParameters
      )
    })
  })

  describe('many', () => {
    test('template variables', async () => {
      await run(
        `p { padding: ${customOptions.prefix}( settings.y_length ) ${customOptions.prefix}( settings.x_length ); }`,
        `p { padding: ${customOptions.template.open} settings.y_length ${customOptions.template.close} ${customOptions.template.open} settings.x_length ${customOptions.template.close}; }`,
        customOptionsParameters
      )
    })

    test('template variables with units', async () => {
      await run(
        `p { padding: ${customOptions.prefix}( settings.y_length )px ${customOptions.prefix}( settings.x_length )px; }`,
        `p { padding: ${customOptions.template.open} settings.y_length ${customOptions.template.close}px ${customOptions.template.open} settings.x_length ${customOptions.template.close}px; }`,
        customOptionsParameters
      )
    })

    test('template variables with filters', async () => {
      await run(
        `p { padding: ${customOptions.prefix}( settings.y_length | append: "px" ) ${customOptions.prefix}( settings.x_length | append: "px" ); }`,
        `p { padding: ${customOptions.template.open} settings.y_length | append: "px" ${customOptions.template.close} ${customOptions.template.open} settings.x_length | append: "px" ${customOptions.template.close}; }`,
        customOptionsParameters
      )
    })

    test('enclosed template variables', async () => {
      await run(
        `p { background-image: url(${customOptions.prefix}( settings.image | img_url: "100x" )), url(${customOptions.prefix}( settings.image | img_url: "100x" )); }`,
        `p { background-image: url(${customOptions.template.open} settings.image | img_url: "100x" ${customOptions.template.close}), url(${customOptions.template.open} settings.image | img_url: "100x" ${customOptions.template.close}); }`,
        customOptionsParameters
      )
    })
  })
})
