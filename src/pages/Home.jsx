import { Grid } from '@mui/material'
import React from 'react'
import UserList from '../layouts/UserList'

const Home = () => {
  return (

    <div className='home-grid-division'>
      <Grid container spacing={4}>

        <Grid size={4}>
          <UserList />
        </Grid>
        <Grid size={4}>
          <UserList />
        </Grid>
        <Grid size={4}>
          <UserList />
        </Grid>

      </Grid>

    </div>

  )
}

export default Home