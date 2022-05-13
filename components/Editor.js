import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { FiImage } from 'react-icons/fi'
import { CgInsertBeforeR } from 'react-icons/cg'
import TextareaAutosize from 'react-textarea-autosize'
import GifModal from './GifModal'
import EmbedLink from './EmbedLink'
import EmbedTweet from './EmbedTweet'
import mentions from './mentions'

const Editor = () => {
  const nodeRef = React.useRef()
  const limit = 140
  const [items, setItems] = useState(mentions)
  const [enterPressed, setEnterPressed] = useState(0)
  const [suggestions, setSuggestions] = useState([])
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
    setEnterPressed(0)
  }

  const handleNodeRemove = (index) => {
    const list = [...node]
    list.splice(index, 1)
    setNode(list)
  }

  const onNodeChange = (e, index) => {
    const { name, value } = e.target
    const userList = e.target.value
    const list = [...node]
    list[index][name] = value
    list[index]['count'] = value.length
    let suggestions = []
    if (userList.length > 0) {
      const regex = new RegExp(`^${userList}`, 'i')
      suggestions = items.sort().filter((v) => regex.test(v))
    }
    setSuggestions(suggestions)
    setNode(list)
  }

  const suggestionSelected = (e, value, index) => {
    e.preventDefault()
    const list = [...node]
    list[index]['message'] = '@' + value
    setNode(list)
  }

  const onNodeKeyDown = (e, index) => {
    const keyCode = e.keyCode || e.which

    if (keyCode === 13) {
      if (enterPressed === 0) {
        setEnterPressed(enterPressed + 1)
        console.log(`Enter pressed once. enterPressed is ${enterPressed}`)
      } else if (enterPressed === 1) {
        console.log(`Enter pressed Twice. enterPressed is ${enterPressed}`)
        return handleNodeSubmit()
      }
    }

    // if (keyCode === 13 && e.ctrlKey) {
    //   return handleNodeSubmit()
    // }

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
    <div className='w-full md:w-4/12 p-4 my-2 mx-auto' id='root'>
      {node.map((item, index) => (
        <div key={item.id}>
          <TextareaAutosize
            ref={nodeRef}
            id='message'
            name='message'
            autoFocus
            className='mention'
            onChange={(e) => onNodeChange(e, index)}
            onKeyDown={(e) => onNodeKeyDown(e, index)}
            value={item.message}
            placeholder='Empty tweets..'
          />
          <div className='flex space-x-2 my-2'>
            <div>
              {item.media ? (
                <Image
                  className='rounded-md'
                  src={item.media}
                  alt='media'
                  width='80%'
                  height='80%'
                  objectFit='cover'
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
          <div className='mb-3'>
            <EmbedLink url={item.message} />
            <EmbedTweet url={item.message} />
          </div>
          <hr />
          <div className='flex gap-3 items-center justify-end'>
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
            <div>
              <GifModal onGifSelect={onGifSelect} index={index} />
            </div>
          </div>
          <ul
            className={`relative -top-20 w-48 text-sm font-medium text-gray-900 bg-gray-50 shadow-sm rounded-sm`}
          >
            {suggestions.map((item) => (
              <li
                className='w-full px-4 py-2 border-b border-gray-200 dark:border-gray-400'
                key={item}
                autoFocus
                onClick={(e) => suggestionSelected(e, item, index)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Editor
