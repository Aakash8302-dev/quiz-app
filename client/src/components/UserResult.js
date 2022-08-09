import React from 'react'
import { Typography, Box as Container, Button, Stack } from '@mui/material'
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
            padding: "2rem 0"
        },
        btn: {
            margin: "2rem 0"
        },
        spanBtn: {
            fontWeight: "100px"
        }
    }

    const totalQuestions = 6;
    const totalCore = 2;
    const totalAptitude = 2;
    const totalVerbal = 2;
    const totalCoding = 2;
    var incorrect

    let aptitudeScore = answer.aptitudeScore;
    let verbalScore = answer.verbalScore;
    let codingScore = answer.codingScore;
    let coreScore = answer.coreScore;

    incorrect = totalQuestions - (aptitudeScore + verbalScore + codingScore + coreScore);




    const areas = [
        { name: "Core", value: coreScore },
        { name: "Aptitude", value: aptitudeScore },
        { name: "Verbal", value: verbalScore },
        { name: "Coding", value: codingScore },
        { name: "Incorrect", value: incorrect }
    ]

    return (
        <Container sx={{ ...style.root }}>
            <Stack spacing={1} >
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

                    <Size width={350} />
                </PieChart>
                <Typography variant="h5">Total Score : {answer.totalScore}</Typography>
            </Stack>
            <Button type="button" sx={{ ...style.btn }} variant="contained" onClick={() => setComponent("userAnswer")}>Check Answers</Button>
        </Container>
    )
}

export default UserResult