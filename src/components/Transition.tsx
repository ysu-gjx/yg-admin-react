import { useState, useTransition } from 'react'

const Index = () => {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target?.value)
    startTransition(() => {
      const arr = Array.from({ length: 5000 }).fill('1')
      setList([...(arr as string[])])
    })
  }

  return (
    <>
      <input type='text' value={query} onChange={handleChange} />
      <ul>
        {isPending && <li>loading...</li>}
        {list.map((item: string, index: number) => {
          return <li key={index}>{query}</li>
        })}
      </ul>
    </>
  )
}

export default Index
