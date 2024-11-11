import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SignUpImg from '../../../assests/sign-up.png'
import { Controller, useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    firstName: yup.string().min(3).max(10).required("Fisrtname is invalid"),
    lastName: yup.string().required("Last Name is invalid"),
    email: yup.string().required("Your email is invalid"),
    password: yup.string().required("Password is invalid")
  });

  const signInValues = {
    email: "",
    password: ""
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: signInValues,
    resolver: yupResolver(schema),
  })


const signInHandler = (e, data)=>{
e.default();
}

  return (
    <div>
      <Grid container className='mt-5'>
        <Grid item x={12} md={6} className='text-center'>
          <img className='img-fluid' src={SignUpImg} alt="" />
        </Grid>
        <Grid item x={12} md={6}>

          <Box className='container'>

            <Typography className='text-center' variant='h4'>Get Start Shopping</Typography>
            <Typography className='text-center mb-5' variant='body2'>Welcome to freshCart! Enter Your email to get started.</Typography>



            <form onSubmit={handleSubmit (signInHandler )}>



              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField {...field} size="small" fullWidth type='email' placeholder='Email'></TextField>}
                  />

                  <p className='text-danger'>{errors?.email?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <OutlinedInput

                      fullWidth size='small'
                      id="outlined-adornment-weight"
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end" onClick={() => {
                          setShowPassword(!showPassword);
                        }}>
                          <IconButton
                            aria-label={
                              showPassword ? 'hide the password' : 'display the password'
                            }

                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }

                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />}
                  />

                  <p className='text-danger'>{errors?.password?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' fullWidth> Sign In </Button>

                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignIn
