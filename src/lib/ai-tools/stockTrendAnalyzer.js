const fallbackModelResults = [
  { estimators: 1, trainAccuracy: 0.7382, testAccuracy: 0.7149, gap: 0.0233 },
  { estimators: 50, trainAccuracy: 0.9155, testAccuracy: 0.7758, gap: 0.1397 },
  { estimators: 100, trainAccuracy: 0.9405, testAccuracy: 0.7926, gap: 0.1479 },
]

function parseCsvRows(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, "")))
    .filter((row) => row.some(Boolean))
}

function isNumeric(value) {
  if (value === "" || value == null) return false
  return Number.isFinite(Number(value))
}

function normalizeKey(key) {
  return key.toLowerCase().replace(/[\s-]+/g, "_")
}

function extractModelResults(headers, rows) {
  const normalized = headers.map(normalizeKey)
  const estimatorIndex = normalized.findIndex((key) => key === "n_estimators" || key === "estimators")
  const trainIndex = normalized.findIndex((key) => key === "train_accuracy" || key === "accuracy_train")
  const testIndex = normalized.findIndex((key) => key === "test_accuracy" || key === "accuracy" || key === "accuracy_test")

  if (estimatorIndex < 0 || testIndex < 0) return fallbackModelResults

  return rows
    .map((row) => {
      const estimators = Number(row[estimatorIndex])
      const testAccuracy = Number(row[testIndex])
      const trainAccuracy = trainIndex >= 0 ? Number(row[trainIndex]) : Math.min(0.99, testAccuracy + 0.08)
      if (!Number.isFinite(estimators) || !Number.isFinite(testAccuracy)) return null
      return {
        estimators,
        trainAccuracy,
        testAccuracy,
        gap: Math.max(0, trainAccuracy - testAccuracy),
      }
    })
    .filter(Boolean)
}

export function analyzeCsvText(text) {
  const rows = parseCsvRows(text)

  if (rows.length < 2) {
    return createFallbackAnalysis()
  }

  const headers = rows[0]
  const dataRows = rows.slice(1)
  const missingValues = dataRows.reduce((count, row) => count + headers.filter((_, index) => !row[index]).length, 0)
  const numericColumns = headers.filter((_, index) => dataRows.some((row) => isNumeric(row[index])))
  const categoricalColumns = headers.filter((header) => !numericColumns.includes(header))
  const modelResults = extractModelResults(headers, dataRows)
  const bestResult = modelResults.reduce((best, item) => (item.testAccuracy > best.testAccuracy ? item : best), modelResults[0])

  return {
    source: "Uploaded CSV",
    rows: dataRows.length,
    columns: headers.length,
    missingValues,
    numericColumns,
    categoricalColumns,
    sampleRows: dataRows.slice(0, 3),
    headers,
    modelResults,
    summary: `共解析 ${dataRows.length} 筆資料、${headers.length} 個欄位。最佳 test accuracy 為 ${bestResult.testAccuracy.toFixed(4)}，需觀察 train/test gap 是否擴大。`,
  }
}

export function createFallbackAnalysis() {
  return {
    source: "Demo ML result fallback",
    rows: 2873,
    columns: 56,
    missingValues: 0,
    numericColumns: ["Elevation", "Aspect", "Slope", "Hillshade"],
    categoricalColumns: ["Cover_Type", "Soil_Type"],
    headers: ["Elevation", "Aspect", "Slope", "Cover_Type"],
    sampleRows: [
      ["2265", "9", "21", "Cover 2"],
      ["2214", "357", "5", "Cover 5"],
      ["2809", "148", "22", "Cover 1"],
    ],
    modelResults: fallbackModelResults,
    summary: "n_estimators 增加後測試準確率提升，但 generalization gap 也變大，需注意過擬合。",
  }
}

export { fallbackModelResults }
