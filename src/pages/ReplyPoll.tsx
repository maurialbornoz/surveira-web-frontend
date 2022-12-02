// import { RouteComponentProps } from "react-router-dom";
import {useParams} from 'react-router-dom';
import Poll from '../components/ReplyPoll/Poll';
type RouteParams = {
    id: string
}

// interface ReplyPollProps extends RouteComponentProps<RouteParams> {

// }

const ReplyPoll = () => {
    const params = useParams<RouteParams>() as RouteParams;
    // const pollUUID = props.match.params.id
    const pollUUID = params.id
    return (  
        <Poll id={pollUUID}></Poll>
    );
}
 
export default ReplyPoll;