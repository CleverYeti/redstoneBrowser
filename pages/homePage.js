/** @jsx createElement */
/** @jsxFrag createFragment */

async function displayHomePage() {
  
  const element = (
    <div className="homePage">
      <div className="titleSection">
        <img src="/icons/logo.svg" alt="" />
        <div className="title">
          The best place to find <span>Redstone Contraptions</span> to build in your world
        </div>
        <div className="scrollingDemo">
          
        </div>
      </div>
    </div>
  )

  async function getDemoBuilds() {
    const response = await sb
      .from("builds")
      .select()
    const builds = response.data
    if (response.error) {
      console.log("supabase error", response.error)
      return
    }
    element.querySelector(".scrollingDemo").appendChild(
      <div className="scrollingDemoWrapper">
        {Array(6).fill(0).map(() => {
          const build = builds[Math.floor(Math.random() * builds.length)]
          return (
            <div className="demoBuild">
              <div className="image" style={`backgound-image: url(${build.images[0]})`}></div>
              <div className="name">{build.name}</div>
            </div>
          )
        })}
      </div>
    )
  }

  document.body.appendChild(nav())
  document.body.appendChild(element)
  getDemoBuilds()
}

displayHomePage()