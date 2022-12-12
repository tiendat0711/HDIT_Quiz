import axios from "../utils/axiosCustomize";
const apiCreatNewUser = (email, password, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const apiUpdateUser = (id, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}
const apiDeleteUser = (userID) => {
    return axios.delete('api/v1/participant', { data: { id: userID } });
}
const apiGetAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const apiGetAllUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword })
}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username })
}
const apiGetQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}
const apiGetQuizById = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}
const apiSubmitResult = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data })
}
const apiSaveNewQuiz = (description, name, type, image) => {
    //submit data
    const data = new FormData();
    data.append('handleSaveQuiz', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data);
}
const apiGetQuizAllForAdmin = () => {
    return axios.get(`api/v1/quiz/all`)
}
const apiCreateQuestionForQuiz = (quiz_id, description, questionImage) => {
    //submit data
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return axios.post('api/v1/question', data);
}
const apiCreateAnswersForQuestion = (description, correct_answer, question_id) => {
    //submit data
    const data = {
        description, correct_answer, question_id
    }

    return axios.post('api/v1/answer', data);
}
const apiAssignQuiztoUser = (quizId, userId) => {
    const data = {
        quizId: quizId,
        userId: userId
    }
    return axios.post('api/v1/quiz-assign-to-user', data);
}
const apiGetQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}
export {
    apiCreatNewUser, apiGetAllUsers, apiUpdateUser,
    apiDeleteUser, apiGetAllUsersWithPaginate, postLogin,
    postRegister, apiGetQuizByUser, apiGetQuizById,
    apiSubmitResult, apiSaveNewQuiz, apiGetQuizAllForAdmin,
    apiCreateQuestionForQuiz, apiCreateAnswersForQuestion,
    apiAssignQuiztoUser, apiGetQuizWithQA
}