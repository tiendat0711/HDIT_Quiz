import { useParams, useLocation } from 'react-router-dom'
import { apiGetQuizById, apiSubmitResult } from '../../Service/apiService';
import { useEffect } from 'react';
import _ from 'lodash'
import './DetailQuiz.scss'
import { useState } from 'react';
import Question from './Question';
import ModalResult from './ModalResult';

const DetailQuiz = (props) => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [dataModalResult, setDataModalResult] = useState({})
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    useEffect(() => {
        fetchQuizbyId();
    }, [quizId])

    const fetchQuizbyId = () => {
        getDataQuiz();

    }

    const getDataQuiz = async () => {
        let res = await apiGetQuizById(quizId);
        // console.log('>>>>', res);
        if (res && res.EC === 0) {
            let raw = res.DT;


            let data = _.chain(raw)
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);

                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()

            setDataQuiz(data);

        }


    }
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const handleFinish = async () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            let res = await apiSubmitResult(payload)

            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            } else {
                alert('something wrong...')
            }
        }
    }
    const handleCheckBoxClick = (questionId, answerId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);

        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;

        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)

        }
    }
    return (
        <div className='detail-quiz-container'>
            <div className='left-content'>
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <div className='q-body'>
                    <Question
                        handleCheckBoxClick={handleCheckBoxClick}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[index]
                                :
                                []}
                        index={index}
                    />
                </div>
                <div className='footer'>
                    <button
                        className='btn btn-primary'
                        onClick={() => handlePrev()}
                    >Back</button>
                    <button
                        className='btn btn-secondary'
                        onClick={() => handleNext()}
                    >Next</button>
                    <button
                        className='btn btn-warning'
                        onClick={() => handleFinish()}
                    >Finish</button>
                </div>
            </div>
            <div className='right-content'>

            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>

    )
}
export default DetailQuiz;