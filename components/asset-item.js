import { useEffect, useState } from 'react'
import { Card, Button, Text, Badge } from '@mantine/core';
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
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm">
        <div
          style={{
            height: 160,
            margin: -16,
            marginBottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={`https://static.coincap.io/assets/icons/${asset.symbol?.toLowerCase()}@2x.png`}
            width={120}
            height={120}
            style={{
              position: 'absolute',
              opacity: .05,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
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
          /> : <Button
            size="xs"
            variant="light"
            color={(+asset.changePercent24Hr > 0 ? 'red' : 'teal')}
            onClick={() => setShowChart(true)}
          >
            Click to show chart
          </Button> }
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10
          }}
        >
          <Text weight={500}>{asset.name} <b>${(+asset.priceUsd).toFixed(2)}</b></Text>
          <Badge color={(+asset.changePercent24Hr) > 0 ? 'red' : 'teal'}>
            {(+asset.changePercent24Hr).toFixed(2)}% {(+asset.changePercent24Hr) > 0 ? '↑' : '↓'}
          </Badge>
        </div>

        <Text size="sm">
          Market Cap: ${(+asset.marketCapUsd).toFixed(2)}
        </Text>
        <Text size="sm">
          Max Supply: {(+asset.maxSupply).toFixed(2)}
        </Text>
        <Text size="sm">
          Supply: {(+asset.supply).toFixed(2)}
        </Text>
        <Text size="sm">
          Volume 24Hr: {(+asset.volumeUsd24Hr).toFixed(2)}
        </Text>

        <Button
          size="sm"
          variant="light"
          color="cyan"
          fullWidth
          style={{ marginTop: 10 }}
          onClick={() => window.open(asset.explorer)}
        >
          Explorer
        </Button>
      </Card>
    </div>
  )
}
