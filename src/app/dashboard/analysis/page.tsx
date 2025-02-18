import HotSearch from './HotSearch'
import Overview from './Overview'
import Rank from './Rank'

export default function Analysis() {
  return (
    <div>
      <Overview />
      <Rank />
      <div className="w-full flex gap-[24px] min-[1200px]:flex-nowrap min-[992px]:flex-wrap">
        <div className="min-[1200px]:flex-[50%] min-[992px]:flex-[100%]">
          <HotSearch />
        </div>
        <div className="min-[1200px]:flex-[50%] min-[992px]:flex-[100%]">
          <HotSearch />
        </div>
      </div>
    </div>
  )
}
