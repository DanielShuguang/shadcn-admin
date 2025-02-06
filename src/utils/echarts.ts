import { BarSeriesOption, LineSeriesOption, PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components'
import { ComposeOption } from 'echarts/core'
import { use } from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

export function prepareEcharts() {
  // 注册必须的组件
  use([
    TitleComponent,
    TooltipComponent,
    DatasetComponent,
    TransformComponent,
    LineChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    SVGRenderer
  ])
}
