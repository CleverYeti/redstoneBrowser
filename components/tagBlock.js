/** @jsx createElement */
/** @jsxFrag createFragment */

// callback(tagInfo: still linked)
// tags: [
//    {
//      name: str
//      isAward: bool
//      isActive: bool
//    }
//  ]
function tagBlock(tags, callback = (tag) => {}) {
  function formatName(name) {
    return name.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }
  console.log(tags)
  return (
    <div className="tags">
      {
        tags.filter(tag => tag.isAward).map(tag => (
          <div className="award" data-active={tag.isActive == true} onclick={(event) => {event.stopPropagation(); callback(tag)}}><ion-icon class="icon-notActive" name="star-outline"></ion-icon><ion-icon class="icon-active" name="star"></ion-icon>{formatName(tag.name)}</div>
        ))
      }
      {
        tags.filter(tag => !tag.isAward).map(tag => (
          <div className="tag" data-active={tag.isActive == true} onclick={(event) => {event.stopPropagation(); callback(tag)}}>{formatName(tag.name)}</div>
        ))
      }
    </div>
  )
}