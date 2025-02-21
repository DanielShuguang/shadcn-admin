import { ECOption, useEcharts } from '@/utils/echarts'
import { useMemoizedFn } from 'ahooks'
import { ECharts } from 'echarts/core'
import { Ref, useImperativeHandle } from 'react'

export interface EchartsReactRef {
  /**
   * 获取 echarts 实例
   *
   * @returns echarts 实例
   */
  getEchartsInstance: () => ECharts | null
  clear: () => void
  dispose: () => void
  rerender: () => void
}

export interface EchartsReactProps extends React.HTMLAttributes<HTMLDivElement> {
  options: ECOption
  /** 更新数据时是否销毁原来数据生成的图表，默认为 false */
  forceUpdate?: boolean | 'dispose' | 'clear'
  resize?: boolean | number
  ref?: Ref<EchartsReactRef>
}

export default function EchartsReact({
  options,
  forceUpdate,
  resize,
  ref,
  ...restProps
}: EchartsReactProps) {
  const { chartInstance, containerRef } = useEcharts(options, { forceUpdate, resize })

  const rerender = useMemoizedFn(() => {
    chartInstance.current?.setOption(options)
  })

  useImperativeHandle(ref, () => ({
    getEchartsInstance: () => chartInstance.current,
    clear: () => chartInstance.current?.clear(),
    rerender,
    dispose: () => {
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
  }))

  return <div ref={containerRef} {...restProps} />
}
