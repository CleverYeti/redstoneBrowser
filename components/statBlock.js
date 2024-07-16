/** @jsx createElement */
/** @jsxFrag createFragment */

function statBlock(build, statReference) {
  return (
    <div className="stats">
      {statReference.map((stat) => 
        <div className="stat">
          <div className="statName">{stat.name}</div>
          <div className="line"></div>
          <div className="statValue">{stat.getValue(build)}</div>
        </div>
      )}
    </div>
  )
}