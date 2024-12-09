import React from 'react'

type ExtendedProps = Pick<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'onClick' | 'style'
>

interface Props extends ExtendedProps {
  label: string
}

const TestComponent = (props: Props) => {
  const { label, ...btnProps } = props
  return <button {...btnProps}>{label}</button>
}

export default TestComponent
