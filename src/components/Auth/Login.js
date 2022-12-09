import { useState } from "react";
import { Button } from "react-bootstrap";
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../Service/apiService";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email!")
            return;
        }
        setIsLoading(true)
        //submit apis
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
            toast.success(res.EM);
            setIsLoading(false);
            navigate('/')
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
            setIsLoading(false)
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <span> Don't have an account yet?</span>
                <button>Sign up</button>
            </div>
            <div className="title col-4 mx-auto">
                Tien Dat
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, Who's this?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={"password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span
                    className="forgot-password"
                >Forgot password ?</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        <span>Login</span>
                        {isLoading === true && <AiOutlineLoading3Quarters className="login-loading-icon" />}
                    </button>

                </div>
                <div className="back text-center">
                    <span onClick={() => { navigate('/') }}> &#60;&#60;Go to HomePage</span>
                </div>
            </div>
        </div>
    )
}
export default Login;