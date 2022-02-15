import CopyOutlined from '@ant-design/icons/lib/icons/CopyOutlined'
import { Button, message } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'

interface CopyProps {
  text: any
  style?: any
}

const Copy: React.FC<CopyProps> = ({
  text,
  style = { color: '#979797', border: 'none', width: 'fit-content', background: 'transparent', boxShadow: 'none' }
}) => (
  <CopyToClipboard text={text} onCopy={() => message.success('Copy Success')}>
    <Button style={style} icon={<CopyOutlined />} size="small" />
  </CopyToClipboard>
)
export default Copy
