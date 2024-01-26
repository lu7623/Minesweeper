export const levels = [
    {
      name: 'easy',
      width: 10,
      height: 10
    },
    {
      name: 'medium',
      width: 15,
      height: 15
    },
    {
      name: 'hard',
      width: 25,
      height: 25
    }
  ]
  
  export const state = {
    level: levels[0],
    sound: true,
    theme: 'light',
    bombcount: 10,
    time: 0,
    steps: 0,
    cellsOpen: 0
  }
  
 