import React from 'react'
import { Typography, Box, Button, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Legend,
} from 'devextreme-react/pie-chart';

const UserResult = ({ setComponent }) => {

    const answer = useSelector((state) => state.user.userAnswer.answer[0])

    const style = {
        root: {
            textAlign: 'center',
        },
        btn: {
            margin: "2rem 0"
        },
        spanBtn: {
            fontWeight: "100px"
        }
    }

    const areas = [
        { name: "india", value: 20 },
        { name: "France", value: 30 },
        { name: "England", value: 40 },
        { name: "Scotland", value: 10 },
    ]

    return (
        <Box sx={{ ...style.root }}>
            <Stack spacing={2} >
                <Typography variant="h5">NAME : {answer.name.toUpperCase()}</Typography>
                <Typography variant="h5">REG NO : {answer.regNo}</Typography>
                <PieChart
                    id="pie"
                    dataSource={areas}
                    palette="dark"
                >
                    <Legend
                        orientation="horizontal"
                        itemTextPosition="right"
                        horizontalAlignment="center"
                        verticalAlignment="bottom"
                        columnCount={4} />
                    <Series
                        argumentField="name"
                        valueField="value"
                    >
                        <Label visible={true}>
                            <Connector visible={true} width={1} />
                        </Label>
                    </Series>

                    <Size width={400} />
                </PieChart>
                <Typography variant="h5">Total Score : {answer.totalScore}</Typography>
            </Stack>
            <Button type="button" sx={{ ...style.btn }} variant="contained" onClick={() => setComponent("userAnswer")}>Check Answers</Button>
        </Box>
    )
}

export default UserResult