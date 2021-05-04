import { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'

const data = [
  {
    "id": "japan",
    "data": [
      {
        "x": "plane",
        "y": 65
      },
      {
        "x": "helicopter",
        "y": 245
      },
      {
        "x": "boat",
        "y": 276
      },
      {
        "x": "train",
        "y": 210
      },
      {
        "x": "subway",
        "y": 44
      },
      {
        "x": "bus",
        "y": 209
      },
      {
        "x": "car",
        "y": 205
      },
      {
        "x": "moto",
        "y": 181
      },
      {
        "x": "bicycle",
        "y": 15
      },
      {
        "x": "horse",
        "y": 234
      },
      {
        "x": "skateboard",
        "y": 197
      },
      {
        "x": "others",
        "y": 125
      }
    ]
  }
]


export default function AssetItem({ asset }) {
  const [chartData, setChartData] = useState([])
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
    fetchData()
  }, [])
  return (
    <div className="col-xl-4 col-md-6 mb-3">
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <h5 className="card-title px-2 pt-2">
            <img
              width={24}
              height={24}
              src={`https://static.coincap.io/assets/icons/${asset.symbol?.toLowerCase()}@2x.png`}
              style={{ marginRight: '.5rem' }}
            />
            {asset.name}
          </h5>
          <div className="card-subtitle mb-2 text-muted px-2">
            Price: {(+asset.priceUsd).toFixed(2)}{'  '}
            Change: <span className={(+asset.changePercent24Hr > 0) ? 'text-danger' : 'text-success'}>{(+asset.changePercent24Hr).toFixed(2)}%</span>
          </div>
          <div className="card-text" style={{ height: 100 }}>
            <ResponsiveLine
              animate
              enableSlices="x"
              curve="basis"
              colors={[(+asset.changePercent24Hr > 0) ? '#dc3545' : '#198754']}
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}