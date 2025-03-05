import { useDebounceEffect, useSize, useUnmount } from 'ahooks'
import {
  BarSeriesOption,
  LineSeriesOption,
  GaugeSeriesOption,
  PieChart,
  LineChart,
  BarChart,
  PieSeriesOption,
  GaugeChart
} from 'echarts/charts'
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
import { useEffect, useMemo, useRef } from 'react'
import { WordCloudSeriesOption } from 'echarts/types/dist/echarts'
import 'echarts-liquidfill'
import 'echarts-wordcloud'

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | PieSeriesOption
  | WordCloudSeriesOption
  | GaugeSeriesOption
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
    GaugeChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ])
}

export interface ChartConfig {
  /** 更新数据时是否销毁原来数据生成的图表，默认为 false */
  forceUpdate?: boolean | 'dispose' | 'clear'
  resize?: boolean | number
}

export function useEcharts<Dom extends HTMLElement = HTMLDivElement>(
  options: ECOption,
  config?: ChartConfig
) {
  const { forceUpdate = false, resize = 500 } = config || {}

  const containerRef = useRef<Dom>(null)
  const chartInstance = useRef<ECharts | null>(null)

  function initEcharts() {
    if (!containerRef.current) return

    if (!chartInstance.current) {
      chartInstance.current = init(containerRef.current)
    }
  }

  useEffect(() => {
    initEcharts()
    chartInstance.current?.setOption(options)

    if (forceUpdate) {
      return () => {
        if (forceUpdate === 'clear') {
          chartInstance.current?.clear()
        } else {
          chartInstance.current?.dispose()
          chartInstance.current = null
        }
      }
    }
  }, [options, forceUpdate])

  useUnmount(() => {
    chartInstance.current?.dispose()
    chartInstance.current = null
  })

  const size = useSize(containerRef)

  const resizeMs = useMemo(() => (typeof resize === 'number' ? resize : 500), [resize])

  useDebounceEffect(
    () => {
      chartInstance.current?.resize()
    },
    [size],
    { wait: resizeMs }
  )

  return { containerRef, chartInstance }
}
