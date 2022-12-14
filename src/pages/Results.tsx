import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from 'react-router-dom';
import { getPollResults } from '../services/PollService';
import { ChartType, PollChartData, PollResult } from '../types';
import ResultsChart from '../components/Results/ResultsChart';
import palette from 'google-palette'

type RouteParams = {
    id: string
}

// interface ResultsProps extends RouteComponentProps<RouteParams>

// const Results = (props: ResultsProps) => {
const Results = () => {
    const navigate = useNavigate()
    const {id} = useParams<RouteParams>() as RouteParams;
    const [chartData, setChartData] = useState<Array<PollChartData>>([])
    const [pollTitle, setPollTitle] = useState<string>('')
    const [chartType, setChartType] = useState<ChartType>("PIE")


    useEffect(() => {
        fetchResults()
    }, [])

    const fetchResults =  async () => {
        try {
            const res: any = await getPollResults(id)
            const results: Array<PollResult> = res.data.results
            formatData(results)
            setPollTitle(res.data.content)
        } catch (error) {
            console.error(error)
            navigate('/')
        }
    }

    const formatData = (results: Array<PollResult>) => {
        const pollChartData: Array<PollChartData> = []


        for (let key in results){
            let chartData: any = {
                data: {
                    labels: [],
                    datasets: [{data: []}]
                },
                title: results[key].question,
                questionId: key
            }
            results[key].details.forEach(detail => {
                chartData.data.labels?.push(detail.answer)
                chartData.data.datasets[0].data.push(detail.result)
            })
            chartData.data.datasets[0].backgroundColor = palette('cb-Dark2', results[key].details.length).map((color: any) => '#' + color)
            pollChartData.push(chartData)
        }
        setChartData(pollChartData)

    }

    const renderResultsChart = () => {
        return chartData.map(data => {
            return (
                <ResultsChart chartType={chartType} chartData={data} key={data.questionId}></ResultsChart>
            )
        })
    }
    
    return ( 
        <Container>
            <Row>
                <Col lg="6" md="10" sm="10" className="mx-auto mt-5">
                    <div className='header'>
                        <h4>{pollTitle}</h4><hr/>
                        {/* <div className='mb-3'>
                            <Form.Check
                                inline
                                label="Pie chart"
                                name="chart"
                                type='radio'
                                id="chart-pie"
                                checked={chartType === "PIE"}
                                onChange={() => setChartType("PIE")}
                            ></Form.Check>
                            <Form.Check
                                inline
                                label="Bar chart"
                                name="chart"
                                type='radio'
                                id="chart-bar"
                                checked={chartType === "BAR"}
                                onChange={() => setChartType("BAR")}
                            ></Form.Check>
                        </div> */}
                    </div>
                    {renderResultsChart()}
                </Col>
            </Row>

        </Container>
     );
}
 
export default Results;