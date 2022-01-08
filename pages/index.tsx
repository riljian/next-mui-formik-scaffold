import type { GetStaticProps, NextPage } from 'next'

const Home: NextPage = () => null

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title: 'Home',
  },
})

export default Home
