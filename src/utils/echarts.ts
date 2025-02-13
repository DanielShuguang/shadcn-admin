import { useDebounceEffect, useSize } from 'ahooks'
import { BarSeriesOption, LineSeriesOption, PieChart, LineChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  TitleComponentOption,
  GridComponent,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components'
import { ComposeOption, ECharts, init } from 'echarts/core'
import { use } from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useRef } from 'react'

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
    GridComponent,
    BarChart,
    LineChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ])
}

export function useEcharts<Dom extends HTMLElement = HTMLDivElement>(options: ECOption) {
  const containerRef = useRef<Dom>(null)
  const chartInstance = useRef<ECharts | null>(null)

  function initEcharts() {
    if (!containerRef.current) return

    chartInstance.current?.dispose()
    chartInstance.current = init(containerRef.current)
  }

  useEffect(() => {
    initEcharts()
    chartInstance.current?.setOption(options)

    return () => {
      chartInstance.current?.clear()
      chartInstance.current?.dispose()
    }
  }, [options])

  const size = useSize(containerRef)

  useDebounceEffect(
    () => {
      chartInstance.current?.resize()
    },
    [size],
    { wait: 500 }
  )

  return { containerRef, chartInstance }
}
