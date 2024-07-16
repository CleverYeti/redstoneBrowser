/** @jsx createElement */
/** @jsxFrag createFragment */

async function displayBrowsePageFromUrl() {
  
  document.body.appendChild(nav(category))

  // importing url filters
  const urlParams = new URLSearchParams(window.location.search);
  for (let filter of filters) {
    if (filter.type == "tickRange" || filter.type == "integerRange") {
      if (urlParams.has(filter.codeName + "-min")) filter.min = parseInt(urlParams.has(filter.codeName + "-min"));
      if (urlParams.has(filter.codeName + "-max")) filter.max = parseInt(urlParams.has(filter.codeName + "-max"));
    }
    if (filter.type == "dimensions2D" || filter.type == "integerRange") {
      if (urlParams.has(filter.codeName + "-width")) filter.width = parseInt(urlParams.has(filter.codeName + "-width"));
      if (urlParams.has(filter.codeName + "-height")) filter.height = parseInt(urlParams.has(filter.codeName + "-height"));
    }
  }
  let activeTags = []
  if (urlParams.has("tags")) activeTags = urlParams.get("tags").split(",");


  // sort
  let activeSort = Object.keys(sorts)[0]
  if (urlParams.has("sort")) activeSort = urlParams.get("sort")


  // getting builds info
  // breaks if we have more than a million builds in a category...
  // safe to say were not gonna have any problems
  //let { builds, error } =
  const response = await sb
    .from("builds")
    .select()
    .eq("category", category)
  const builds = response.data
  if (response.error) console.log("supabase error", response.error)

  // tags
  const allTags = []
  for (let build of builds) {
    for (let tag of build.tags) {
      if (allTags.filter(t => t.name == tag).length == 0) {
        allTags.push({
          name: tag,
          isAward: false,
          isActive: activeTags.includes(tag)
        })
      }
    }
    for (let award of build.awards) {
      if (allTags.filter(t => t.name == award).length == 0) {
        allTags.push({
          name: award,
          isAward: true,
          isActive: activeTags.includes(award)
        })
      }
    }
  }
    

  function refreshResults() {
    element.querySelector(".filters > .tags").replaceWith(renderTags())
    element.querySelector(".results").replaceWith(renderResults())
  }
  function renderResults() {
    // filter builds
    const filteredBuilds = builds.filter(build => {
      for (let filter of filters) {
        if (!filter.check(build)) return false
      }
      for (let tag of allTags) {
        if (tag.isActive) {
          if (!build.tags.includes(tag.name) && tag.isAward == false) return false
          if (!build.awards.includes(tag.name) && tag.isAward == true) return false
        }
      }
      return true
    })
    const sortedBuilds = sorts[activeSort].apply(filteredBuilds)

    return searchResults(sortedBuilds, allTags, (tag) => {allTags.filter(t => t.name == tag.name)[0].isActive = !tag.isActive; refreshResults()})
  }
  function renderTags() {
    return tagBlock(allTags, (tag) => {allTags.filter(t => t.name == tag.name)[0].isActive = !tag.isActive; refreshResults()})
  }

  const element = (
    <div className="browsePage">
      <div className="header">{categoryName}</div>
      <div className="filters">
        <div className="sort">
          <div className="title">Sort by</div>
          <select name="" id="" onchange={(event) => {activeSort = event.target.value; refreshResults()}}>
            {Object.entries(sorts).map(([codeName, sort]) => 
              <option value={codeName} selected={codeName == activeSort}>{sort.name}</option>
            )}
          </select>
        </div>
        {renderTags()}
        <div className="statFilters">
          {filters.map((filter) => (
            statFilter(filter, refreshResults)
          ))}
        </div>
      </div>
      {renderResults()}
    </div>
  )
  
  document.body.appendChild(element)
}

displayBrowsePageFromUrl();