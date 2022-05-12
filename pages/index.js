import Head from 'next/head'
import Editor from '../components/Editor'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thread Builder</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Editor />
    </div>
  )
}
