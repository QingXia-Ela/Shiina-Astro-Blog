import MI from 'markdown-it'
const mi = new MI()

const MD = `
---
title: test
---


# Test

## h2

test

**Images**
`

console.log(mi.renderInline(MD));