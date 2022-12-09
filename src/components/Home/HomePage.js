import videoHomepage from '../../assets/videoHomepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    return (
        <div className='homepage-container'>
            <video autoPlay loop muted>
                <source
                    src={videoHomepage}
                    type="video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    There's a better way to ask
                </div>
                <div className='title-2'>
                    You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead—and make
                    everyone happy.
                </div>
                <div className='title-3'>
                    {isAuthenticated === true ?
                        <button onClick={() => navigate('/users')}>Quiz now</button >
                        :
                        <button onClick={() => navigate('/login')}>Get started - it's free!</button >
                    }

                </div>
            </div>
        </div>

    )
}
export default HomePage;