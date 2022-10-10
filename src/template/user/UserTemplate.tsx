import React from 'react'
import {Outlet} from 'react-router-dom'
type Props = {}

export default function UserTemplate({}: Props) {
  return (
    <>
        <header>123</header>
        <Outlet></Outlet>
        <footer>456</footer>
    </>
  )
}