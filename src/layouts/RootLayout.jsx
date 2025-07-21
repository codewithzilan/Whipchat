import React from 'react'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sideber from '../components/Sideber'

const RootLayout = () => {
  return (
    <div>

        <Grid container spacing={2}>
        <Grid size={2}>
         <Sideber/>
        </Grid>
        <Grid size={10}><Outlet/></Grid>
        
      </Grid>


      
    </div>
  )
}

export default RootLayout