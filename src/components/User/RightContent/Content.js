import './Content.scss'
import CountDown from './CountDown';
const RightContent = (props) => {
    const { dataQuiz } = props;

    const onTimeUp = () => {
        props.handleFinish();
    }

    return (
        <>
            <div className="main-timer">
                <CountDown />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((item, index) => {
                        return (
                            <div key={`question ${index}`} className="question">{index + 1}</div>
                        )
                    })}


            </div>
        </>
    )
}
export default RightContent;