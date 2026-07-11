import WorkDetailTemplate from "./WorkDetailTemplate"
import { rag } from "./workDetailData"

export default function WorkDetailPageRag() {
  return <WorkDetailTemplate work={rag} />
}
