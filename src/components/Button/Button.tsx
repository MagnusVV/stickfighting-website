import styles from './Button.module.css'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  styling?: string
  onClickEvent?: () => void
}

const Button = ({
  text = 'Knapp',
  type,
  styling,
  onClickEvent,
}: ButtonProps) => {
  return (
    <button className={styling} type={type} onClick={onClickEvent}>
      {text}
    </button>
  )
}

export default Button
