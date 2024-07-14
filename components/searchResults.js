/** @jsx createElement */
/** @jsxFrag createFragment */

function searchResults(results, allTags, toggleTagCallBack) {
  return (
    <div className="results">
      {results.map(build => (
        <div className="result" onclick={() => {location.href = `/${category}/view/?build=${build.uuid}`}}>
          <div className="image" style={`--image: ${build.images[0]}`}></div>
          <div className="name">{build.name}</div>
          {statBlock(build, stats)}
          {tagBlock([
            ...build.tags.map(tag => ({name: tag, isActive: (allTags.filter(t => t.name == tag)[0].isActive)})),
            ...build.awards.map(award => ({name: award, isAward: true, isActive: (allTags.filter(t => t.name == award)[0].isActive)}))
          ], toggleTagCallBack)}
        </div>
      ))}
    </div>
  )
}