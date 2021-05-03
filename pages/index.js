import Head from 'next/head'
import AssetItem from '../components/asset-item'

export default function Home({ data }) {
  return (
    <div className="container p-3">
      <Head>
        <title>blockchain-web主页</title>
      </Head>
      <div className="row">
        {data?.data?.map(asset => (
          <AssetItem asset={asset} key={asset.id} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('https://api.coincap.io/v2/assets?limit=24')
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}