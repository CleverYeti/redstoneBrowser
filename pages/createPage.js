/** @jsx createElement */
/** @jsxFrag createFragment */


function uploadImages() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ".png"
    input.multiple = "true"
    input.onchange = () => {
      resolve(input.files);
    };
  input.click();
  })
}

async function displayCreatePage() {
  async function submitSend(submitSB, submitTable) {
    const waitingEl = (
      <div className="messagePage">
        Submitting, please wait
      </div>
    )
    element.replaceWith(waitingEl)
    console.log(build)
    const response = await submitSB
      .from(submitTable)
      .insert(build)
    handleSBError("Failed submitting build", response.error)
    if (response.error != null) {
      waitingEl.replaceWith(element)
      return
    }
    for (let imageFilePath in imageFiles) {
      const imageFile = imageFiles[imageFilePath]
      const response = await submitSB
        .storage
        .from("images")
        .upload(imageFilePath, imageFile)
      handleSBError("Failed submitting build images", response.error)
      if (response.error != null) {
        waitingEl.replaceWith(element)
        return
      }
    }
    waitingEl.replaceWith(
      <div className="messagePage">
        Build submitted.
        <div className="description">
          Builds are reviewed by a moderator before being put on the site.<br/>
          Keep in mind we wand all builds on the site to have a purpose, so<br/>builds that are objectively worse in <span style="font-weight: 600;">EVERY</span> way will be removed.
        </div>
        <a href={`/${category}/`}>Return to browsing {categoryName.toLowerCase()}</a>
      </div>
    )
  }

  async function submitAsAdmin() {
    const adminKey = prompt("Enter admin key")
    // check if the format is good
    if (adminKey.slice(0, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.".length) != "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.") {
      alert("invalid key format")
      return
    }
    delete build.priorityKey
    submitSend(supabase.createClient(sbUrl, adminKey), "builds")
  }

  async function submit() {
    submitSend(sb, "submissions")
  }

  document.body.appendChild(nav(category))
  
  const inputs = {
    text: (label, callBack) => (
      <div className="inputBlock">
        <div className="name">{label}</div>
        <input type="text" className="textInput" onChange={(e) => {
          if (e.target.value != "") {callBack(e.target.value)}
          else {callBack(null)}
        }}/>
      </div>
    ),
  }

  const creatorsResponse = await sb
      .from("creators")
      .select()
  handleSBError("Failed retrieving creators", creatorsResponse.error)
  const allCreators = creatorsResponse.data

  const build = {
    uuid: crypto.randomUUID(),
    name: "",
    priorityKey: "",
    creators: [],
    images: [],
    youtubeShowcaseLink: null,
    youtubeTutorialLink: null,
    schematicLink: null,
    worldLink: null,
    imageTutorial: null,
    tags: [],
    awards: [],
    stats: Object.fromEntries(inputStats.map(stat => [stat.name, 0])),
    category: category,
  }
  const imageFiles = {}
  
  const element = (
    <div className="createPage">
      <div className="leftColumn">
        {inputs.text("Name", v => build.name = v)}
        {inputs.text("Youtube Showcase Video ID", v => build.youtubeShowcaseLink = v)}
        {inputs.text("Youtube Tutorial Video ID", v => build.youtubeTutorialLink = v)}
        {inputs.text("Schematic Link", v => build.schematicLink = v)}
        {inputs.text("World Download Link", v => build.worldLink = v)}
        {inputs.text("Priority code (ignore if you dont know)", v => build.priorityKey = v)}

        {(()=>{
          const element = <div className="creators">
            <div className="title">Creators:</div>
            <select name="" className="addCreator" onchange={(event) => {
              const uuid = event.target.value
              if (uuid == "none") return
              if (!build.creators.includes(event.target.value)) {
                build.creators.push(event.target.value)
                element.insertBefore(creatorLine(uuid), event.target)
              }
              event.target.value = "none"
            }}>
              <option value="none" selected disabled>Add Creator</option>
              {allCreators.map(creator => (
                <option value={creator.uuid}>{creator.name}</option>
              ))}
            </select>
          </div>
          function creatorLine(uuid) {
            return (
              <div className="creatorLine">
                <div className="icon"><ion-icon name="person-circle-outline"></ion-icon></div>
                <div className="name">{allCreators.filter(c => c.uuid == uuid)[0].name}</div>
                <div className="remove" onclick={(event) => {
                  build.creators.splice(build.creators.indexOf(uuid))
                  event.target.closest(".creatorLine").remove()
                }}><ion-icon name="close"></ion-icon></div>
              </div>
            )
          }
          return element
        })()}
      </div>
      <div className="middleColumn">
        {(()=>{
          function renderTags() {
            for (let tag of inputTags) {
              tag.isActive = (build.tags.includes(tag.name) && !tag.isAward) || (build.awards.includes(tag.name) && tag.isAward)
            }
            return tagBlock(
              inputTags,
              (tag) => {
                let targetArray
                
                if (tag.isActive) {
                  if (tag.isAward) {build.awards.splice(build.awards.indexOf(tag.name))}
                  else {targetArray = build.tags.splice(build.tags.indexOf(tag.name))} 
                } else {
                  if (tag.isAward) {build.awards.push(tag.name)}
                  else {targetArray = build.tags.push(tag.name)} 
                }
                refreshTags()
              }
            )
          }
          function refreshTags() {
            const newEl = renderTags()
            tagsEl.replaceWith(newEl)
            tagsEl = newEl
          }
          let tagsEl = renderTags()
          return tagsEl
        })()}
      </div>
      <div className="leftColumn">
        <div className="stats">
          {inputStats.map(stat => (
            <div className="stat">
              <div className="statName">{stat.name}</div>
              <div className="line"></div>
              <input type="number" value="0" className="statInput" onchange={(event) => {
                build.stats[stat.name] = parseInt(event.target.value)
              }}/>
            </div>
          ))}
        </div>
      </div>
      
      {(()=>{
        function refreshImages() {
          const newEl = renderImages()
          element.replaceWith(newEl)
          element = newEl
        }
        function renderImages() {
          function swapItemUp(index) {
            build.images.splice(index - 1, 0, build.images.splice(index,1)[0])
            refreshImages()
          }
          return (
            <div className="images">
              
              {build.images.map((imageId, index) => (
                <div className="imageBlock">
                  <div className="image" style={`background-image: url(${URL.createObjectURL(imageFiles[imageId])})`}></div>
                  <div className="move">
                    {index > 0 ? <div className="up" onclick={() => {swapItemUp(index)}}><ion-icon name="chevron-up-outline"></ion-icon></div> : <></>}
                    {index < (build.images.length - 1) ? <div className="down" onclick={() => swapItemUp(index + 1)}><ion-icon name="chevron-down-outline"></ion-icon></div> : <></>}
                  </div>
                </div>
              ))}
              <div className="addImages" onclick={async () => {
                const files = await uploadImages()
                for (let file of files) {
                  const uuid = crypto.randomUUID()
                  const path = build.uuid + "/" + uuid
                  imageFiles[path] = file
                  build.images.push(path)
                }
                refreshImages()
              }}>
                Add Images
              </div>
            </div>
          )
        }
        let element = renderImages();
        return element
      })()}
      <div className="actionButton" onclick={() => {submit()}}>Submit</div>
      <div className="submitAsAdmin" onclick={() => {submitAsAdmin()}}>Submit directly with admin key</div>
    </div>
  )
  document.body.appendChild(element)
}


displayCreatePage()