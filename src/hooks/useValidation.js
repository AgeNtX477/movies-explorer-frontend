import { useState } from 'react'

export function useValidation () {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({})
  const [isValid, setIsValid] = useState(false)
  const handleErrors = e => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: e.target.validationMessage })
    setValues({ ...values, [name]: value })
    setIsValid(e.target.closest('form').checkValidity())
  }
  return { values, setValues, errors, isValid, setIsValid, handleErrors }
}
