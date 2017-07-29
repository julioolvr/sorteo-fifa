import ora from 'ora'

let task
let data = {}

const handlers = ({
    logger = (data) => data.toString(),
    startMsg = 'Comienza el Sorteo!',
    endMsg = 'Powered By ✌️'}
  ) => ({
    START_RAFFLE: () => {
      console.log(startMsg)
    },
    START: () => {
      data = {}
      task = ora(logger(data)).start()
    },
    SET: (newData) => {
      data = {...data, ...newData}
      task.text = logger(data)
    },
    END: (position) => {
      task.succeed()
    },
    END_RAFFLE: () => {
      console.log(endMsg)
    }
  })

export default (options) => {
  const configuredHandlers = handlers(options)
  return (item) => configuredHandlers[item.type](item.data)
}
