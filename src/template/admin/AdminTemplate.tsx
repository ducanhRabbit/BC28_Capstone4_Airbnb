import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function AdminTemplate({}: Props) {
  return (
    <div>
        <header>123</header>
        <Outlet></Outlet>
        <footer>89652</footer>
    </div>
  )
}