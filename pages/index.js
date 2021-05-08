import Head from 'next/head'
import { CardsGrid, Container } from '@mantine/core'
import AssetItem from '../components/asset-item'

export default function Home({ data }) {
  return (
    <Container
      size="xl"
    >
      <Head>
        <title>blockchain-web主页</title>
      </Head>
      <CardsGrid cardsPerRow={4}>
        {data?.data?.map(asset => (
          <AssetItem asset={asset} key={asset.id} />
        ))}
      </CardsGrid>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('https://api.coincap.io/v2/assets?limit=24')
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}