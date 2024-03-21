import { Form, Space, Button } from 'antd'
/**
 * 搜索表单容器组件封装
 * @param props
 * @returns
 */

const SearchForm = ({ children, submit, reset, ...restProps }: any) => {
  return (
    <Form className='search-form' layout='inline' {...restProps}>
      {children}
      <Form.Item>
        <Space>
          <Button type='primary' onClick={submit}>
            搜索
          </Button>
          <Button type='default' onClick={reset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SearchForm
