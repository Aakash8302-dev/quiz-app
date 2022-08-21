import React,{useState} from 'react'
import {Stack, TextField} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const MuiDateTime = ({dateTime, setDateTime, label}) => {

    const handleChange = (value) => {
        setDateTime(value)
    }

  return (
    <Stack>
        <DateTimePicker 
            label={label}
            renderInput={(params)=> <TextField {...params} />} 
            onChange={handleChange}
            value={dateTime}
        />
    </Stack>
  )
}

export default MuiDateTime