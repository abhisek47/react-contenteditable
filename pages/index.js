import Head from 'next/head'
import Editor from '../components/Editor'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thread Builder</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Editor />
    </div>
  )
}
