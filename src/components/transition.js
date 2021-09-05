import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 400
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateX(10rem)`
  },
  entered: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0rem)`
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(-10rem)`
  },
}

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props
    return (
      <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}

export default Transition