const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

describe('Replace one', () => {
  test('template variable', async () => {
    await run(
      'p { color: tvar( settings.color ); }',
      'p { color: {{ settings.color }}; }'
    )
  })

  test('template variable with units', async () => {
    await run(
      'p { padding: tvar( settings.padding )px; }',
      'p { padding: {{ settings.padding }}px; }'
    )
  })

  test('template variable with filters', async () => {
    await run(
      'p { padding: tvar( settings.padding | append: "px" ); }',
      'p { padding: {{ settings.padding | append: "px" }}; }'
    )
  })

  test('enclosed template variables', async () => {
    await run(
      'p { background-image: url(tvar( settings.image | img_url: "100x" )); }',
      'p { background-image: url({{ settings.image | img_url: "100x" }}); }'
    )
  })
})

describe('Replace many', () => {
  test('template variables', async () => {
    await run(
      'p { padding: tvar( settings.y_length ) tvar( settings.x_length ); }',
      'p { padding: {{ settings.y_length }} {{ settings.x_length }}; }'
    )
  })

  test('template variables with units', async () => {
    await run(
      'p { padding: tvar( settings.y_length )px tvar( settings.x_length )px; }',
      'p { padding: {{ settings.y_length }}px {{ settings.x_length }}px; }'
    )
  })

  test('template variables with filters', async () => {
    await run(
      'p { padding: tvar( settings.y_length | append: "px" ) tvar( settings.x_length | append: "px" ); }',
      'p { padding: {{ settings.y_length | append: "px" }} {{ settings.x_length | append: "px" }}; }'
    )
  })

  test('enclosed template variables', async () => {
    await run(
      'p { background-image: url(tvar( settings.image | img_url: "100x" )), url(tvar( settings.image | img_url: "100x" )); }',
      'p { background-image: url({{ settings.image | img_url: "100x" }}), url({{ settings.image | img_url: "100x" }}); }'
    )
  })
})
