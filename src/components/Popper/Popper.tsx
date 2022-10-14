import React from 'react'

type Props = {
    children:any
}

export default function PopperWrapper({children}: Props) {
  return (
    <div className='popper-wrapper'>{children}</div>
  )
}