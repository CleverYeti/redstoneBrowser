/** @jsx createElement */
/** @jsxFrag createFragment */

function viewBuild(build) {
  return (
    <div className="buildPage">
      <div className="images">
        <div className="scroller">
          {build.images.map((imagePath, i) =>{
            const el = image(imagePath)
            el.dataset.i = i
            return el
          })}
          <div className="arrow next"></div>
          <div className="arrow previous"></div>
        </div>
        <div className="selector">
          {build.images.map((imagePath, i) => {
            const el = image(imagePath)
            el.onclick = () => {document.querySelector(`.scroller > .image[data-i="${i}"]`).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })}
            return el
          })}
        </div>
      </div>

      <div className="buildInfo">
        <div className="name">{build.name}</div>
        {
          build.creators.map(creator => nameTag(creator))
        }
        
        
        {statBlock(build, stats)}
        
        {tagBlock([
          ...build.tags.map(tag => ({name: tag})),
          ...build.awards.map(award => ({name: award, isAward: true}))
        ])}

        <div className="flex-space"></div>

        <div className="actionButton" onclick={() => {
          const element = document.querySelector(".buildPage > .buildInstructions")
          element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
          element.classList.add("animate")
          setTimeout(()=>element.classList.remove("animate"), 2000)
        }}>
          <div className="text">Build It!</div>
          {animatedButton1()}
        </div>
      </div>

      <div className="buildInstructions">
        {build.youtubeTutorialLink != null ? 
          <div className="option">
            <div className="icon">
              <img src="/icons/youtube.svg" alt=""/>
            </div>
            <div className="title">Video Tutorial</div>
            <div className="description">This tutorial was made by the creator or with approval from the creator</div>
            <div className="video">
              <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + build.youtubeTutorialLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        : <></>}
        
        {build.schematicLink != null ? 
          <div className="option">
            <div className="icon" style="margin-bottom: 1rem">
              <img src="/icons/schematic.svg" alt=""/>
            </div>
            <div className="title">Schematic</div>
            <div className="description">Open the schematic file using the <a href="https://www.curseforge.com/minecraft/mc-mods/litematica" target="_blank">Litematica mod</a> to get an overlay of the blocks or paste it in a creative world</div>
            <div className="actionButton" onclick={() => {window.open(build.schematicLink, '_blank')}}>
              <div className="text">Download</div>
              {animatedButton2()}
            </div>
          </div>
        : <></>}

        {build.worldLink != null ? 
          <div className="option">
            <div className="icon" style="margin-bottom: 1rem">
              <img src="/icons/schematic.svg" alt=""/>
            </div>
            <div className="title">World Download</div>
            <div className="description">Put the world in you worlds folder and open it to view to build or copy it as a schematic</div>
            <div className="actionButton" onclick={() => {window.open(build.worldLink, '_blank')}}>
              <div className="text">Download</div>
              {animatedButton2()}
            </div>
          </div>
        : <></>}
      </div>
    </div>
  )
}