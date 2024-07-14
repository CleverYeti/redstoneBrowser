/** @jsx createElement */
/** @jsxFrag createFragment */

function unknownBuildPage() {
  return (
    <div className="unknownBuildPage">
      Unknown Build
      <a href={`/${category}/`}>Return to browsing {categoryName.toLowerCase()}</a>
    </div>
  )
}