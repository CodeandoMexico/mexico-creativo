import animejs from 'animejs'

const animate = (el) => {
  animejs
    .timeline({
      autoplay: true,
      loop: true,
      duration: 6000,
    })
    .add({
      targets: el,
      d: {
        value: [
          `
          M 120, 400
              C 160, 300 260, 300 320, 350
              380, 420 350, 460 300, 480
              240, 490 260, 460 160, 480
              140, 480 100, 450 120, 400
        `,
          `
          M 120, 410
              C 120, 270 230, 320 290, 350
              350, 370 370, 420 340, 430
              300, 450 360, 470 270, 490
              160, 510 120, 486 120, 410
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
          M 120, 410
              C 120, 270 230, 320 290, 350
              350, 370 370, 420 340, 430
              300, 450 360, 470 270, 490
              160, 510 120, 486 120, 410
            `,
          `
          M 150, 460
              C 50, 390 130, 290 250, 360
              300, 390 300, 390 320, 380
              370, 370 360, 460 270, 470
              180, 500 200, 480 150, 460
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
          M 150, 460
              C 50, 390 130, 290 250, 360
              300, 390 300, 390 320, 380
              370, 370 360, 460 270, 470
              180, 500 200, 480 150, 460
            `,
          `
          M 120, 400
              C 160, 300 260, 300 320, 350
              380, 420 350, 460 300, 480
              240, 490 260, 460 160, 480
              140, 480 100, 450 120, 400
          `,
        ],
      },
      easing: 'linear',
    })
}

export default animate
