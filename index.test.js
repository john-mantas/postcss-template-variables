const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

test('Replace template variable', async () => {
  await run(
    'p { color: tvar( settings.color ); }',
    'p { color: {{ settings.color }}; }'
  )
});
