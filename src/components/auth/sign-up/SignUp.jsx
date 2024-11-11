
import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SignInImg from '../../../assests/digi.gif'
import { Password, Visibility, VisibilityOff } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

const SignUp = () => {


    const schema = yup.object({
        firstName: yup.string().min(3).max(10).required("Fisrtname is invalid"),
        lastName: yup.string().required("Last Name is invalid"),
        email: yup.string().required("Your email is invalid"),
        password: yup.string().required("Password is invalid").min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),

    });

    const signUpValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: signUpValues,
        resolver: yupResolver(schema),
    })

    const signInHandler = (data) => {
        console.log(data);
        reset();
    }


    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='mt-5'>
            <Grid container>
                <Grid className='text-center' item xs={12} sm={12} md={6}>
                    <img className='img-fluid' src={SignInImg} />
                </Grid>
                <Grid className='' item xs={12} sm={12} md={6}>
                    <Box className="container mt-5">
                        <Typography className='text-center' variant='h4'>Get Start Shopping</Typography>
                        <Typography className='text-center mb-5' variant='body2'>Welcome to freshCart! Enter Your email to get started.</Typography>

                        <form onSubmit={handleSubmit(signInHandler)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>

                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => <TextField type='text' {...field} size="small" fullWidth placeholder='First Name'></TextField>}
                                    />


                                    <p className='text-danger'>{errors?.firstName?.message}</p>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => <TextField type='text' {...field} size="small" fullWidth placeholder='Second Name'></TextField>}
                                    />

                                    <p className='text-danger'>{errors?.lastName?.message}</p>
                                </Grid>
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
                                    <Button type='submit' variant='contained' fullWidth> Register </Button>

                                </Grid>
                            </Grid>

                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp
