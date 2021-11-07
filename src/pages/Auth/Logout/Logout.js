import { useContext } from "react"
import { Redirect } from "react-router";
import AuthContext from "../../../store/auth-context"

const Logout = props => {
    const authCtx =useContext(AuthContext);
    authCtx.logout();
    return (
        <Redirect to='/' />
    )
}
export default Logout