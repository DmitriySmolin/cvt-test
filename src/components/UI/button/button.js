import React from 'react'
import classes from './button.module.scss'

const Button = props => {
  const cls = [
    classes[props.width],
    classes[props.height],
    classes.button,
    classes[props.type],
  ]

  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
    >
      {props.children}
    </button>
  )
}

export default Button
