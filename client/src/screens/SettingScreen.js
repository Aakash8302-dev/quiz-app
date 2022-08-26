import React,{useState, useEffect} from 'react'
import { Container, Typography, Switch, FormControl, FormControlLabel, Button, Box, Stack } from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import { createSetting, getSetting } from '../features/setting'
import Loader from '../components/Loader'

const style = {
    root:{
        padding: "1.5rem 0 2.5rem ",
        height: "80vh"
    },
    title:{
        margin: "1rem 0",
    },
    stack:{
        margin: "1rem 0",
    },
    settingWrap:{
        display: "flex",
        flexDirection: "column",
        float: "left"
    },
    saveBtn:{
        marginTop: "2rem"
    }
}

const SettingScreen = () => {

    const dispatch = useDispatch();
    
    const initialSetting = useSelector((state) => state.setting)
    const [setting, setSetting] = useState(initialSetting)

    const handleChange = (e) => {

        const {name, checked} = e.target

        setSetting({
            ...setting,
            [name]:checked
        })
    }


    const handleSubmit = () => {
        dispatch(createSetting(setting))
    }

  return (
    <Container sx={{...style.root}}>
        {
            initialSetting && initialSetting.status !== "idle" ? <Box>
                <Typography variant='h5' sx={{...style.title}}>Settings</Typography>
                    <Box component='div' sx={{...style.settingWrap}}>
                        <FormControl component='fieldset'>
                                <FormControlLabel
                                    control={<Switch name="showAnswer" checked={setting.showAnswer} onChange={handleChange}  />}
                                    label="Show Answers"
                                    labelPlacement='start'
                                />
                        </FormControl>
                        <Box sx={{...style.saveBtn}}>
                            <Button type="button" variant='contained' size='small' onClick={handleSubmit}>Save</Button> 
                        </Box>
                    </Box> 
            </Box> : <Loader />
        }
        
    </Container>
  )
}

export default SettingScreen