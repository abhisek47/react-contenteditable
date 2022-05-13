import React from 'react'
import { LinkPreview } from '@dhaiwat10/react-link-preview'

const EmbedLink = ({ url }) => {
  const start = url.startsWith('http')
  return (
    <div>
      {url && (
        <LinkPreview
          className='mb-2'
          url={url}
          showLoader={start ? true : false}
          fallbackImageSrc={true}
        />
      )}
    </div>
  )
}

export default EmbedLink
