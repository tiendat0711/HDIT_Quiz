import _ from 'lodash'
import './DetailQuiz.scss'
const Question = (props) => {
    const { data, index } = props;
    const hanldeCheckBoxClick = (event, questionId, answerId) => {
        // console.log(event.target.checked)
        props.handleCheckBoxClick(questionId, answerId);

    }
    if (_.isEmpty(data)) {
        return (
            <>
            </>
        )
    }
    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64, ${data.image}`} />
                </div>
                :
                <div className='q-image'>

                </div>
            }

            <div className='question'>Question {index + 1} : {data.questionDescription} ?</div>
            <div className='answers'>
                {
                    data.answers && data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`}
                                className='child-answers'
                            >
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        onChange={(event) => hanldeCheckBoxClick(event, data.questionId, a.id)}
                                    />
                                    <label className="form-check-label" >
                                        {a.description}
                                    </label>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;