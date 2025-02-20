import { Col, Row } from 'antd'
import RealTimeStatus from './RealTimeStatus'
import RightPanel from './RightPanel'
import EachCategoryProportion from './EachCategoryProportion'
import PopularSearches from './PopularSearches'
import RemainingResources from './RemainingResources'

export default function Monitor() {
  return (
    <div>
      <Row gutter={24}>
        <Col className="mb-[24px]" xs={24} sm={24} md={24} lg={24} xl={18}>
          <RealTimeStatus />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <RightPanel />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col className="mb-[24px]" xs={24} sm={24} lg={24} xl={12}>
          <EachCategoryProportion />
        </Col>
        <Col className="mb-[24px]" xs={24} sm={24} lg={12} xl={6}>
          <PopularSearches />
        </Col>
        <Col className="mb-[24px]" xs={24} sm={24} lg={12} xl={6}>
          <RemainingResources />
        </Col>
      </Row>
    </div>
  )
}
