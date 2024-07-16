/** @jsx createElement */
/** @jsxFrag createFragment */

function unknownBuildPage() {
  return (
    <div className="messagePage">
      Unknown Build
      <a href={`/${category}/`}>Return to browsing {categoryName.toLowerCase()}</a>
    </div>
  )
}