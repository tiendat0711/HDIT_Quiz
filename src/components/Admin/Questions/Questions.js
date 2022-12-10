import './Questions.scss'
import Select from 'react-select';
import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs"
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai"
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { apiGetQuizAllForAdmin, apiCreateQuestionForQuiz, apiCreateAnswersForQuestion } from "../../../Service/apiService";
import ModalPreviewImage from './ModalPreviewImage';
const Questions = (props) => {
    const [previewImage, setPreviewImage] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: 'question 1',
                image: '',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false,
                    }
                ]
            }
        ]
    )
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                image: '',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }

                ]
            };

            setQuestions([...questions, newQuestion]);

        }

        if (type === 'REMOVE') {
            let questionsClone = questions;
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone);
        }
    }
    const handleAddRemoveAnswer = (type, answerId, questionId) => {
        let questionsClone = _.cloneDeep(questions);

        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };

            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id != answerId);
            setQuestions(questionsClone);

        }
    }
    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
            }
            setQuestions(questionsClone);
        }

    }
    const handleOnchangImageQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
        }
        console.log(event.target.files[0])
        setQuestions(questionsClone);
    }
    const handleOnchangeAnswer = (type, questionId, answerId, value) => {

        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);

        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map((answer) => {
                    if (type === 'CHECKBOX') {
                        if (answer.id === answerId) {
                            answer.isCorrect = value;
                        }
                        return answer;
                    }

                    if (type = 'INPUT') {
                        if (answer.id === answerId) {
                            answer.description = value;
                        }
                        return answer;
                    }
                });
        }
        setQuestions(questionsClone);
    }
    const hanldeSubmitQuestionForQuiz = async () => {
        console.log(questions, selectedQuiz)

        //submit question apiCreateQuestionForQuiz(quiz_id, description, questionImage)
        // , apiCreateAnswersForQuestion(description, correct_answer, question_id)
        await Promise.all(questions.map(async (question) => {
            const q = await apiCreateQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile)

            await Promise.all(question.answers.map(async (answer) => {
                await apiCreateAnswersForQuestion(
                    answer.description, answer.isCorrect, q.DT.id
                )
            }))
        }));

    }
    const handlePreviewImage = () => {

    }
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await apiGetQuizAllForAdmin();
        if (res && res.EC === 0) {
            let newListQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`,
                }
            })
            // console.log(newListQuiz);
            setListQuiz(newListQuiz);
        }
    }
    return (
        <div className='questions-container'>
            <div className='title'>Manage Questions</div>
            <div className='add-new-question'>
                <div className='col-6'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaltValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question:
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}

                                        />
                                        <label >Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-upload' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type={'file'}
                                            hidden
                                            onChange={(event) => handleOnchangImageQuestion(question.id, event)}
                                        />
                                        <span onClick={() => handlePreviewImage(question.id)}>
                                            {(question.imageFile && question.imageName) ? question.imageName : '0 file is uploaded'

                                            }

                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className='icon-add' />
                                        </span>
                                        {
                                            questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className='icon-remove' />
                                            </span>
                                        }

                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>

                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleOnchangeAnswer('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleOnchangeAnswer('INPUT', question.id, answer.id, event.target.value)}
                                                    />
                                                    <label >answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', '', question.id,)}>
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>

                                                    {
                                                        question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', answer.id, question.id)} >
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    }

                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {questions && questions.length > 0 &&
                    <div>
                        <button onClick={() => hanldeSubmitQuestionForQuiz()}
                            className='btn btn-warning'>
                            Save Questions
                        </button>
                    </div>
                }

            </div>

            {previewImage && <ModalPreviewImage />}
        </div >

    )
}

export default Questions;