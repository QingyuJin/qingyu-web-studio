import { lineBotBuildFlowActions } from "../data/lineBotAdminData.js"
import { progressByLineBotStatus } from "../data/lineBotScenarios.js"

export function getInitialMessageId(scenario) {
  return scenario.messages.find((message) => message.analysis)?.id || scenario.messages[0].id
}

export function getQuickReplyResult(reply, currentStatus) {
  const results = {
    新增案件: { toast: "已建立新案件", status: "待場勘" },
    今日回報: { toast: "已更新施工進度", status: "施工中" },
    上傳照片: { toast: "已歸檔施工照片", status: currentStatus },
    查報價: { toast: "已查詢報價狀態", status: "估價中" },
    追加工程: { toast: "已新增追加工程紀錄", status: "施工中" },
    通知老闆: { toast: "已通知老闆確認", status: currentStatus },
    標記完工: { toast: "已標記為待驗收", status: "待驗收" },
    建立驗收: { toast: "已建立驗收待辦", status: "待驗收" },
    查保固: { toast: "已開啟保固查詢", status: "已完成" },
    標記停工: { toast: "已建立天候停工紀錄", status: currentStatus },
    建立異常單: { toast: "已建立現場異常通報", status: currentStatus },
  }

  return results[reply] || { toast: `${reply} 已送出`, status: currentStatus }
}

export function getProgressByStatus(status, fallbackProgress) {
  return progressByLineBotStatus[status] || fallbackProgress
}

export function getBuildFlowActionForQuickReply(scenarioId, reply) {
  const actions = lineBotBuildFlowActions[scenarioId] || []
  const actionTypeByReply = {
    新增案件: "create_case",
    安排場勘: "mark_site_survey",
    今日回報: "add_daily_report",
    更新進度: "update_status",
    上傳照片: "add_photo_record",
    查報價: "mark_quotation",
    追加工程: "add_change_order",
    標記停工: "update_status",
    建立異常單: "update_status",
    標記完工: "mark_acceptance",
    建立驗收: "mark_acceptance",
    查保固: "request_missing_info",
    請客戶補照片: "request_missing_info",
    通知客戶補資料: "request_missing_info",
    通知老闆: "request_missing_info",
  }

  const preferredType = actionTypeByReply[reply]
  return actions.find((action) => action.type === preferredType) || actions[0]
}
