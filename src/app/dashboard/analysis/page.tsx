import { Col, Row } from 'antd'
import HotSearch from './HotSearch'
import Overview from './Overview'
import Rank from './Rank'
import SalesCategoryProportion from './SalesCategoryProportion'

export default function Analysis() {
  return (
    <div>
      <Overview />
      <Rank />
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <HotSearch />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <SalesCategoryProportion />
        </Col>
      </Row>
    </div>
  )
}
