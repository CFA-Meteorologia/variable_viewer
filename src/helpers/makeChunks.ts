const makeChunks = (values: any[], chunkSize: number) => {
  const chunks: any[] = []

  values.forEach((v, i) => {
    const index = Math.floor(i / chunkSize)

    if (index === chunks.length) chunks.push([])

    const chunk = chunks[index]
    chunk.push(v)
  })

  return chunks
}

export default makeChunks
