import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { deletePoll, getUserPolls, togglePollOpened } from "../services/PollService";
import { List, Share, Trash } from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";
import Switch from "../components/UI/Switch";
import ReactPaginate from "react-paginate";
import copy from "copy-to-clipboard";
import { BASE_URL } from "../utils/constants";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { confirmAlert } from "react-confirm-alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const User = () => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalRecords, setTotalRecords] = useState<number>(0)
    const [showToast, setShowToast] = useState<boolean>(false)
    const [polls, setPolls] = useState<Array<any>>([])

    const navigate = useNavigate()


    useEffect(() => {
        fetchPolls()
    }, [currentPage])

    const fetchPolls = async () => {
        const res: any = await getUserPolls(currentPage)
        setPolls(res.data.polls)
        setTotalPages(res.data.totalPages)
        setTotalRecords(res.data.totalRecords)
        ReactTooltip.rebuild()
    }

    const handlePollToggle = async (id: number) => {
        const _polls = [...polls]
        const poll = _polls.find((poll: any) => poll.id === id)
        poll.opened = !poll.opened
        setPolls(_polls)
        await togglePollOpened(poll.pollId)
    }

    const handlePageChange = (selectedItem: {selected: number}) => {
        setCurrentPage(selectedItem.selected)
    }

    const handleDeletePoll =  (pollId: string) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="custom-ui">
                        <h2>Delete Survey</h2>
                        <p>Are you sure?</p>
                        <Button 
                            className="me-2"
                            variant="outline-primary" 
                            size="sm"
                            onClick={async () => {
                                await deletePoll(pollId)
                                currentPage === 0 ? fetchPolls() : setCurrentPage(0)
                                onClose()
                            }}
                        >Yes, delete it</Button>
                        <Button variant="outline-primary" size="sm" onClick={onClose}>No</Button>
                    </div>
                )
            }
        })
    }

    const renderTable = () => {
        return (
            <Table className="mt-5 polls-table" bordered hover responsive >
                <thead >
                    <tr>
                        <th>Title</th>
                        <th>More Surveys</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {polls.map((poll: any) => {
                        return (
                            <tr key={poll.id}>
                                <td>{poll.content}</td>
                                <td>
                                    <Switch
                                    
                                        label={!!poll.opened ? "Activated" : "Disabled"}
                                        checked={!!poll.opened}
                                        id={poll.pollId}
                                        onChange={() => {
                                            handlePollToggle(poll.id)
                                        }}
                                    ></Switch>
                                </td>
                                <td className="polls-table-controls">
                                    <span data-tip="Share survey"
                                        onClick={() => {
                                            copy(`${BASE_URL}/reply_poll/${poll.pollId}`)
                                            setShowToast(true)
                                        }}
                                    ><Share></Share></span>
                                    <span data-tip="Show" onClick={() => navigate(`/results/${poll.pollId}`)}><List></List></span>
                                    <span data-tip="Delete survey" onClick={() => handleDeletePoll(poll.pollId)}><Trash></Trash></span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
    return (
        <Container className="mt-5">
            <Row>
                <Col sm="10" md="10" lg="8" className="mx-auto ">
                    <h5>My Surveys</h5>
                    {
                        
                        
                            totalRecords > 0 && polls ? 
                            <>
                                {renderTable()}
                                <ReactPaginate 
                                    pageCount={totalPages}
                                    forcePage={currentPage}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={2}
                                    containerClassName="pagination justify-content-end"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    activeClassName="active"
                                    breakLabel="..."
                                    onPageChange={handlePageChange}
                                ></ReactPaginate>
                                <ReactTooltip place="top" effect="solid"/>
                                <ToastContainer position="bottom-center">
                                    <Toast show={showToast} delay={5000} autohide onClose={() => {setShowToast(false)}}>
                                        <Toast.Header closeButton={false}>Shared</Toast.Header>
                                        <Toast.Body>Link copied</Toast.Body>
                                    </Toast>
                                </ToastContainer>
                            </>
                            : <span className="d-block mt-5">No surveys, <Link to="/create_poll">create</Link> one</span>
                            }
                    

                </Col>
            </Row>
        </Container>
     );
}

export default User;