const category = "pistonDoors"

const categoryName = "Piston Doors"

const sorts = {
  relevancy: {
    name: "Relevancy",
    apply: (builds) => {
      const sortedBuilds = []
      const groups = [
        builds.filter(build => build.awards.includes("editors_picks")),
        builds.filter(build => !build.awards.includes("editors_picks") && build.awards.length > 0),
        builds.filter(build => !build.awards.includes("editors_picks") && !build.awards.length > 0 && build.tags.includes("entity-less")),
        builds.filter(build => !build.awards.includes("editors_picks") && !build.awards.length > 0 && !build.tags.includes("entity-less")),
      ]
      for (let group of groups) {
        group.sort((a,b) => {
          const areaDiff = a.stats.width * a.stats.height * a.stats.depth - b.stats.width * b.stats.height * b.stats.depth
          if (areaDiff != 0) return areaDiff
          const speedDiff = (a.stats.opening + a.stats.closing) * 0.5 - (b.stats.opening + b.stats.closing) * 0.5
          if (speedDiff != 0) return speedDiff
          const resetDiff = (a.stats.openingReset + a.stats.closingReset) * 0.5 - (b.stats.openingReset + b.stats.closingReset) * 0.5
          return resetDiff
        })
      }
      return groups.flat()
    }
  },
  fastest: {
    name: "Fastest",
    apply: (builds) => {
      const result = [...builds]
      result.sort((a,b) => {
        const speedDiff = (a.stats.opening + a.stats.closing) * 0.5 - (b.stats.opening + b.stats.closing) * 0.5
        if (speedDiff != 0) return speedDiff
        const resetDiff = (a.stats.openingReset + a.stats.closingReset) * 0.5 - (b.stats.openingReset + b.stats.closingReset) * 0.5
        if (resetDiff != 0) return resetDiff
        const areaDiff = a.stats.width * a.stats.height * a.stats.depth - b.stats.width * b.stats.height * b.stats.depth
        if (areaDiff != 0) return areaDiff
        return 0
      })
      return result
    }
  },
  smallest: {
    name: "Smallest",
    apply: (builds) => {
      const result = [...builds]
      result.sort((a,b) => {
        const areaDiff = a.stats.width * a.stats.height * a.stats.depth - b.stats.width * b.stats.height * b.stats.depth
        if (areaDiff != 0) return areaDiff
        const speedDiff = (a.stats.opening + a.stats.closing) * 0.5 - (b.stats.opening + b.stats.closing) * 0.5
        if (speedDiff != 0) return speedDiff
        const resetDiff = (a.stats.openingReset + a.stats.closingReset) * 0.5 - (b.stats.openingReset + b.stats.closingReset) * 0.5
        if (resetDiff != 0) return resetDiff
        return 0
      })
      return result
    }
  },
}


const stats = [
  {name: "Opening", getValue: (build) => `${build.stats.opening}t (${build.stats.opening / 20}s)`},
  {name: "Closing", getValue: (build) => `${build.stats.closing}t (${build.stats.closing / 20}s)`},
  {name: "Opening Reset", getValue: (build) => `${build.stats.openingReset}t (${build.stats.openingReset / 20}s)`},
  {name: "Closing Reset", getValue: (build) => `${build.stats.closingReset}t (${build.stats.closingReset / 20}s)`},
  
  {name: "Size (WxDxH)", getValue: (build) => `${build.stats.width}x${build.stats.depth}x${build.stats.height} (${build.stats.width * build.stats.depth * build.stats.height}b)`},
  {name: "Door Size (WxH)", getValue: (build) => `${build.stats.doorWidth}x${build.stats.doorHeight}`}
]

// filter types: tickRange, integerRange, dimensions2D
const filters = [
  {
    codeName: "door-size",
    name: "Door size",
    type: "dimensions2D",
    check: function(build) {
      if (this.width != null && build.stats.doorWidth != this.width) return false
      if (this.height != null && build.stats.doorHeight != this.height) return false
      return true
    }
  },
  {
    codeName: "avg-speed",
    name: "Avg Speed",
    type: "tickRange",
    minLimit: 0,
    maxLimit: null,
    check: function(build) {
      const value = (build.stats.opening + build.stats.closing) * 0.5
      if (this.min != null && value < this.min) return false
      if (this.max != null && value > this.max) return false
      return true
    }
  },
  {
    codeName: "size",
    name: "Size",
    type: "integerRange",
    minLimit: 0,
    maxLimit: null,
    check: function(build) {
      const value = (build.stats.width * build.stats.depth * build.stats.height)
      if (this.min != null && value < this.min) return false
      if (this.max != null && value > this.max) return false
      return true
    }
  },
]