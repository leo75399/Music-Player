import React from 'react'

const Input = ({
  label,

  error = false,
  errorText,
  value,
  onChange,
  ...other
}) => (
  <div className="form-group">
    <label htmlFor={label}>{label}</label>
    <input type="text" value={value} onChange={onChange} {...other} />
    {error && <p style={{ color: 'red', margin: 0 }}>{errorText}</p>}
  </div>
)

export default Input
