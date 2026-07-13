import { defineEventHandler, createError, getRouterParam, setHeaders } from 'h3'

export default defineEventHandler(async (event) => {
  const { BUCKET } = event.context.cloudflare.env as unknown as { BUCKET: any }
  if (!BUCKET) {
    throw createError({ statusCode: 500, message: 'R2 Bucket is not configured.' })
  }

  const path = getRouterParam(event, 'path')
  if (!path) {
    throw createError({ statusCode: 400, message: 'Invalid file path.' })
  }

  // Fetch the file from R2
  const object = await BUCKET.get(path)
  if (!object) {
    throw createError({ statusCode: 404, message: 'File not found.' })
  }

  // Set response headers from R2 metadata
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)

  setHeaders(event, Object.fromEntries(headers.entries()))

  return object.body
})
