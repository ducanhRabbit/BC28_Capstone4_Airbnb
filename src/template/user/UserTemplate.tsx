import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../../components/Header/Header'
type Props = {}

export default function UserTemplate({}: Props) {
  return (
    <>
        <Header></Header>
        <Outlet></Outlet>
        <footer>456</footer>
    </>
  )
}