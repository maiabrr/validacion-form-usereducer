import React, {useReducer} from "react";
import './Form.css';
const initialState ={
    firstName: {value: '', error: null},
    lastName: {value: '', error: null},
    email: {value: '', error: null},
};
function formReducer(state, action){
    switch (action.type){
        case 'UPDATE_FIELD':
            return{
                ...state,
                [action.field]:{
                    ...state[action.field],
                    value: action.value,
                    error: action.error,
                },
            };
            default:
                return state;
    }
}
const validateFirstName = (name) => {
    return name ? null: 'First Name is required';
};
const validateLastName = (name) => {
    return name ? null: 'Last Name is required';
};
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null: 'Invalid email address';
};

const Form = () =>{
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (field, value) =>{
        let error = null;
        if (field === 'firstName') error = validateFirstName(value);
        if (field === 'lastName') error = validateLastName(value);
        if (field === 'email') error = validateEmail(value);
        dispatch({ type: 'UPDATE_FIELD', field, value, error });
    };
    const handleSubmit = (e) =>{
        e.preventDefault();

    };
    return(
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label>First Name:</label>
                <input
                    type="text"
                    value={state.firstName.value}
                    onChange={(e) => handleChange ('firstName', e.target.value)} />
                {state.firstName.error && <p className="error">{state.firstName.error}</p>}
            </div>
            <div className="form-group">
                <label>Last Name:</label>
                <input
                    type="text"
                    value={state.lastName.value}
                    onChange={(e) => handleChange ('lastName', e.target.value)} />
                {state.lastName.error && <p className="error">{state.lastName.error}</p>}
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={state.email.value}
                    onChange={(e) => handleChange ('email', e.target.value)} />
                {state.email.error && <p className="error">{state.email.error}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};
export default Form;