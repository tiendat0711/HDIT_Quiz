import { useState, useEffect } from "react";
import { apiGetQuizByUser } from "../../Service/apiService";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
    const navigate = useNavigate()
    const [arrQuiz, setArrQuiz] = useState([])

    useEffect(() => {
        getListQuiz();
    }, [])

    const getListQuiz = async () => {
        const res = await apiGetQuizByUser();

        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    }
    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`data:image/jpeg;base64, ${quiz.image}`} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`,
                                        { state: { quizTitle: quiz.description } }
                                    )}
                                >Do now</button>
                            </div>
                        </div>
                    )
                })
            }

            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    You don't have any quiz now!
                </div>

            }
        </div>
    )
}

export default ListQuiz;