import { EmojiFrown } from "react-bootstrap-icons";

const NotFound = () => {
    return ( 
        <div className="page-not-found mt-5 container d-flex justify-content-center">
            <EmojiFrown className="not-found-icon"></EmojiFrown>
            <p className="ms-4">Page not found</p>
        </div>
     );
}
 
export default NotFound;