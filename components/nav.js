/** @jsx createElement */
/** @jsxFrag createFragment */

function nav() {
  return (
    <div className="nav">
      <nav>
        <a className="logo" href="/">
          <img src="/icons/logo.svg" alt=""/>
          <div className="name">Redstone<br/> Browser</div>
        </a>
        <div className="categories">
          <a className="category disabled">Components</a>
          <a className="category" data-active={category == "pistonDoors"} href={`/pistonDoors/`}>Piston doors</a>
          <a className="category disabled">Transportation</a>
          <a className="category disabled">Farms</a>
          <a className="category disabled">Computational</a>
          <a className="category disabled">More</a>
        </div>
        <div className="leftActions">
          <div className="darkToggle">
            <ion-icon name="sunny-outline" style="--ionicon-stroke-width: 48px;"></ion-icon>
          </div>
        </div>
      </nav>
    </div>
  )
}