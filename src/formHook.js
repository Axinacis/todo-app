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
        // event.persist();
        // setInputs(inputs => ({...inputs, [event.target.name]:event.target.value}))
        const {name,value} = event.target;
        setInputs(inputs => ({...inputs, [name]:value}))
    };

    const updateInputs = (values) => {
        setInputs({...values})
    };

    return {
        inputs,
        // handleSubmit,
        handleInputChange,
        updateInputs
    }
};

export default useForm;