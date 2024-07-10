import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import Button from './Button'
import { PropsButton } from './types'

const setup = (props: PropsButton) => {
  render(<Button {...props}>{props.children}</Button>)
}

describe('Button atom', () => {
  describe('When Button component is called', () => {
    it('ensure that it will be rendered correctly', () => {
      const word = faker.lorem.word(2)
      const className = faker.lorem.word()
      const id = faker.lorem.word()
      const onClick = jest.fn()

      setup({ className, id, onClick, children: word })

      expect(screen.getByTestId('button')).toHaveTextContent(word)
      expect(document.querySelector('button')).toBeInTheDocument()
    })
  })

  describe('When Button is clicked', () => {
    it('ensure that the onClick function will be called', () => {
      const word = faker.lorem.word(2)
      const className = faker.lorem.word()
      const id = faker.lorem.word()
      const onClick = jest.fn()

      setup({ className, id, onClick, children: word })

      fireEvent.click(screen.getByTestId('button'))

      expect(onClick).toHaveBeenCalled()
    })
  })
})
