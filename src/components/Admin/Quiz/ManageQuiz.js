import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { apiSaveNewQuiz } from '../../../Service/apiService'
import { toast } from 'react-toastify'
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];


const ManageQuiz = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState()
    const [image, setImage] = useState(null)
    const hanldeOnchange = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {

            setImage(event.target.files[0])

        }

    }
    const handleSaveQuiz = async () => {
        let res = await apiSaveNewQuiz(description, name, type?.value, image)
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required!')
            return;
        }
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setImage(null);
        } else {
            toast.error(res.EM)
        }

    }
    return (
        <>

            <div className="quiz-container">

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add new quiz</Accordion.Header>
                        <Accordion.Body>
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Personalia:</legend>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Your quiz name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label >Your quiz name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='select-container'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        value={type}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className="more-action form-group">
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        onChange={(event) => hanldeOnchange(event)}
                                    />

                                </div>
                                <div>
                                    <button
                                        className='btn btn-warning mt-3'
                                        onClick={() => handleSaveQuiz()}
                                    >Save</button>
                                </div>
                            </fieldset>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

                <div className='list-detail'>
                    <TableQuiz />
                </div>


            </div>
        </>

    )
}
export default ManageQuiz;