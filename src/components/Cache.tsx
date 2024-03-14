import { useState, useMemo, useCallback, memo, FC } from 'react'

interface ChildProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
}
const Child: FC<ChildProps> = memo(({ handleClick }) => {
  console.log('子组件render')
  return (
    <>
      <div>woshi子组件</div>
      <button onClick={handleClick}>子组件 click</button>
    </>
  )
})
const Index = () => {
  console.log('Index...')
  const [count, setCount] = useState(0)
  const total1 = useMemo(() => {
    console.log('total1....')
    const list = [1, 3, 5, 7, 9]
    return list.reduce((prev, cur) => prev + cur, 0)
  }, [])

  const handleSubClick = useCallback(() => {
    console.log('子组件点击了')
  }, [])
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>change count</button>
      <div>Total1: {total1}</div>
      <Child handleClick={handleSubClick} />
    </>
  )
}

export default Index
