import Search from '@/components/Search'
import { Button, Form, Input, message, Select } from 'antd'
import axios from 'axios'
import { useCallback } from 'react'
import style from './index.module.scss'

const { Item } = Form
const { Option } = Select

const ContactUs: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = useCallback(async (values: any) => {
    try {
      await axios.post('https://www.dcfsnetwork.com/admin/create_feedback', values)
      message.success('Submit success!')
    } catch (error) {
      throw error
    }
  }, [])

  return (
    <>
      <div className="search_box">
        <Search />
      </div>
      <div className={style.contact}>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off" size="large">
          <Item
            name="catalog"
            initialValue="1. General lnquiry (Non support related)"
            rules={[{ required: true }]}
            help="Note: Selecting an incorrect subject could result in a delayed or non response">
            <Select>
              <Option value="1. General lnquiry (Non support related)">1. General lnquiry (Non support related)</Option>
              <Option value="2. Support/Technical Issue">2. Support/Technical Issue</Option>
              <Option value="3. Name Tagging/Label Address">3. Name Tagging/Label Address</Option>
            </Select>
          </Item>
          <div>
            <Item name="user" label="Name" rules={[{ required: true }]}>
              <Input />
            </Item>
            <Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Item>
          </div>
          <Item name="body" label="Message" rules={[{ required: true }]}>
            <Input.TextArea
              autoSize={{ minRows: 7 }}
              placeholder={`Where applicable please provide the following information
1. Txn hash (Transaction receipt):
2. Wallet provider Or exchange service:
3. Your question/issue:`}
            />
          </Item>
          <Item style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button type="primary" htmlType="submit" style={{ width: '230px', height: '50px', padding: '0', borderRadius: '100px', fontWeight: 500 }}>
              Send Message
            </Button>
          </Item>
        </Form>
      </div>
    </>
  )
}

export default ContactUs
