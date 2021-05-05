import { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'

export default function AssetItem({ asset }) {
  const [chartData, setChartData] = useState([])
  const [showChart, setShowChart] = useState(false)
  const fetchData = async () => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${asset.id}/history?interval=d1`)
    const _data = await res.json()
    if (_data.data) {
      setChartData([
        {
          id: asset.id,
          data: _data.data.map(item => ({ x: item.date, y: item.priceUsd }))
        }
      ])
    }
  }
  useEffect(() => {
    if (showChart) fetchData()
  }, [showChart])
  return (
    <div className="col-xl-4 col-md-6 mb-3">
      <div className="card shadow-sm border-0">
        <div
          className="card-body p-0"
        >
          <h5 className="card-title px-2 pt-2">
            <img
              width={100}
              height={100}
              src={`https://static.coincap.io/assets/icons/${asset.symbol?.toLowerCase()}@2x.png`}
              style={{ position: 'absolute', left: 0, top: 0, opacity: .1, pointerEvents: 'none', userSelect: 'none' }}
            />
            {asset.name}
          </h5>
          <div className="card-subtitle mb-2 text-muted px-2">
            Price: <b>{(+asset.priceUsd).toFixed(2)}{'  '}</b>
            Change: <span className={(+asset.changePercent24Hr > 0) ? 'text-danger' : 'text-success'}>{(+asset.changePercent24Hr).toFixed(2)}%</span>
          </div>
          <div className="card-text" style={{ height: 100 }}>
            {showChart ? <ResponsiveLine
              animate
              enableArea
              enableSlices="x"
              curve="basis"
              colors={[(+asset.changePercent24Hr > 0) ? 'rgba(220, 53, 69, .5)' : 'rgba(25, 135, 84, .5)']}
              data={chartData}
              theme={{
                crosshair: {
                  line: {
                    stroke: 'black',
                    strokeWidth: 1,
                    strokeOpacity: 0.35,
                  },
                },
              }}
              defs={[
                linearGradientDef('gradientA', [
                  { offset: 0, color: 'inherit' },
                  { offset: 100, color: 'inherit', opacity: 0 },
                ]),
              ]}
              crosshairType="x"
              axisLeft={false}
              axisBottom={false}
              enableGridX={false}
              enableGridY={false}
              enablePoints={false}
              sliceTooltip={(slice) => {
                const { xFormatted, yFormatted } = slice.slice.points[0].data;
                return <div className="line__tooltip">
                  <span className="line__tooltip-text">
                    <small>{xFormatted}</small>
                    <br />
                    <strong>${yFormatted}</strong>
                  </span>
                </div>;
              }}
            /> : <div className="d-flex justify-content-center align-items-center" style={{ height: 100 }}>
              <button className="btn btn-light btn-sm" onClick={() => setShowChart(true)}>Click to show chart</button>  
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}
