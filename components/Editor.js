import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { FiImage } from 'react-icons/fi'
import { CgInsertBeforeR } from 'react-icons/cg'
import TextareaAutosize from 'react-textarea-autosize'
import GifModal from './GifModal'

const Editor = () => {
  const nodeRef = React.useRef()
  const limit = 20
  const [node, setNode] = useState([
    {
      message: '',
      id: Math.random().toString(16).slice(2),
      count: 0,
      gif: '',
      media: ''
    }
  ])

  const handleNodeSubmit = () => {
    setNode([
      ...node,
      {
        message: '',
        id: Math.random().toString(16).slice(2)
      }
    ])
  }

  const handleNodeRemove = (index) => {
    const list = [...node]
    list.splice(index, 1)
    setNode(list)
  }

  const onNodeChange = (e, index) => {
    const { name, value } = e.target
    const list = [...node]
    list[index][name] = value
    list[index]['count'] = value.length
    setNode(list)
  }

  const onNodeKeyDown = (e, index) => {
    const keyCode = e.keyCode || e.which
    if (e.keyCode == 13 && e.ctrlKey) {
      return handleNodeSubmit()
    }
    if (keyCode === 46 || keyCode === 8) {
      if (e.target.value === '') {
        return handleNodeRemove(index)
      }
    }
  }

  const onGifSelect = (index, item) => {
    const list = [...node]
    list[index]['gif'] = item.images.original.mp4
    setNode(list)
  }

  const onImageChange = (e, index) => {
    const { name, files } = e.target
    const list = [...node]
    list[index][name] = URL.createObjectURL(files[0])
    setNode(list)
  }

  return (
    <div className='w-full md:w-4/12 p-3 my-2 mx-auto' id='root'>
      {node.map((item, index) => (
        <div key={item.id}>
          <TextareaAutosize
            ref={nodeRef}
            id='message'
            name='message'
            autoFocus
            onChange={(e) => onNodeChange(e, index)}
            onKeyDown={(e) => onNodeKeyDown(e, index)}
            value={item.message}
            placeholder='Empty tweets..'
          />
          <div className='flex gap-3 items-center justify-end mt-2'>
            <div
              className={`font-bold mr-2 ${
                item.count > limit ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {item.count} / {limit}
            </div>
            <div>
              <CgInsertBeforeR
                className='text-blue-500/75'
                size={22}
                onClick={handleNodeSubmit}
              />
            </div>
            <div>
              <GifModal onGifSelect={onGifSelect} index={index} />
            </div>
            <div>
              <label>
                <input
                  type='file'
                  name='media'
                  onChange={(e) => onImageChange(e, index)}
                />
                <FiImage
                  className='relative -top-9 text-blue-500/75'
                  size={20}
                />
              </label>
            </div>
          </div>
          <div className='flex gap-2 relative -top-10 w-32'>
            <div>
              {item.media ? (
                <Image
                  className='w-16 rounded-md'
                  src={item.media}
                  alt='media'
                  width={'60%'}
                  height={'60%'}
                />
              ) : (
                ''
              )}
            </div>
            <div>
              {item.gif ? (
                <video
                  src={item.gif}
                  alt='profile'
                  className='w-24 rounded-md'
                  autoPlay
                  loop
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Editor
