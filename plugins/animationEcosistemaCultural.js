import animejs from 'animejs'

const animate = (el) => {
  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 9000,
    })
    .add({
      targets: el,
      d: {
        value: [
          `
          M 25.5629 75.8108
          C 167.563 -58.1889 334.563 5.81077 386.563 110.811 421.133 180.616 408.605 239.079 365.563 284.811 301.563 352.81 254.907 350.81 189.907 284.811 114.907 199 -65.4372 188.811 25.5629 75.8108
        `,
          `
          M 31.5 84.0003
          C 173.5 -49.9994 372.671 -8.99983 387.5 104.5 400.5 204 369.542 214.268 326.5 260 262.5 328 240 288 177 288 68.4786 288 -59.5 197 31.5 84.0003
        `,
        ],
      },
      easing: 'linear',
    })
    .add({
      targets: el,
      d: {
        value: [
          `
          M 31.5 84.0003
          C 173.5 -49.9994 372.671 -8.99983 387.5 104.5 400.5 204 369.542 214.268 326.5 260 262.5 328 240 288 177 288 68.4786 288 -59.5 197 31.5 84.0003
        `,
          `
          M 50.4999 64
          C 222.691 -28.0333 444.917 -20.7812 428.5 92.4999 413.5 196 410.542 202.268 367.5 248 303.5 316 286.429 305.714 220.907 273.811 114.5 222 -94.5 141.5 50.4999 64
        `,
        ],
      },
      easing: 'linear',
    })
    .add({
      targets: el,
      d: {
        value: [
          `
          M 50.4999 64
          C 222.691 -28.0333 444.917 -20.7812 428.5 92.4999 413.5 196 410.542 202.268 367.5 248 303.5 316 286.429 305.714 220.907 273.811 114.5 222 -94.5 141.5 50.4999 64
        `,
          `
          M 25.5629 75.8108
          C 167.563 -58.1889 334.563 5.81077 386.563 110.811 421.133 180.616 408.605 239.079 365.563 284.811 301.563 352.81 254.907 350.81 189.907 284.811 114.907 199 -65.4372 188.811 25.5629 75.8108
        `,
        ],
      },
      easing: 'linear',
    })
}

export default animate
