import {useState} from 'react';

const useForm =  (initialValues) => {
    const [inputs, setInputs] = useState(initialValues);

    /*const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        }
        callback();
    };*/

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]:event.target.value}))
    };

    return {
        inputs,
        // handleSubmit,
        handleInputChange
    }
};

export default useForm;