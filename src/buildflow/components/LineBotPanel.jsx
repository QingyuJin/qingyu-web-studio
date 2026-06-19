import LineBotDemo from "./linebot/LineBotDemo"

function LineBotPanel({ tasks, session }) {
  return <LineBotDemo tasks={tasks} session={session} />
}

export default LineBotPanel
