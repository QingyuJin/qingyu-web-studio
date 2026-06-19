const seedlingClasses = ["Sugar beet", "Common wheat", "Maize", "Loose Silky-bent", "Black-grass"]

function hashText(value) {
  return Array.from(value).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
}

export function classifySeedling(file) {
  if (!file) {
    return {
      predictedClass: "Sugar beet",
      confidence: 92,
      top3: [
        { label: "Sugar beet", score: 92 },
        { label: "Common wheat", score: 6 },
        { label: "Maize", score: 2 },
      ],
      workflow: ["人工複查", "品質標註", "加入訓練資料", "匯出分類紀錄"],
    }
  }

  const signature = `${file.name}-${file.size}-${file.lastModified}`
  const hash = hashText(signature)
  const firstIndex = hash % seedlingClasses.length
  const secondIndex = (firstIndex + 1 + (hash % 3)) % seedlingClasses.length
  const thirdIndex = (secondIndex + 1 + (hash % 2)) % seedlingClasses.length
  const confidence = 84 + (hash % 13)
  const secondScore = Math.max(3, Math.round((100 - confidence) * 0.7))
  const thirdScore = Math.max(1, 100 - confidence - secondScore)

  return {
    predictedClass: seedlingClasses[firstIndex],
    confidence,
    top3: [
      { label: seedlingClasses[firstIndex], score: confidence },
      { label: seedlingClasses[secondIndex], score: secondScore },
      { label: seedlingClasses[thirdIndex], score: thirdScore },
    ],
    workflow: ["人工複查", "品質標註", "加入訓練資料", "匯出分類紀錄"],
  }
}

export { seedlingClasses }
