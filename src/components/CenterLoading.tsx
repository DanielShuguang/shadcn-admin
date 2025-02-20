import { Spin } from 'antd'
import React from 'react'

export default function CenterLoading() {
  return <Spin className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
}
