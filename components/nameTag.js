/** @jsx createElement */
/** @jsxFrag createFragment */

function nameTag(uuid) {
  console.log(uuid)
  const textElement = <span>Loading</span>
  const element = <div className="creator"><ion-icon name="person-circle-outline"></ion-icon>{textElement}</div>
  async function getName() {
    const response = await sb
      .from("creators")
      .select()
      .eq("uuid", uuid)
      .maybeSingle()
    handleSBError("Failed retrieving creator name", response.error)
    const row = response.data
    textElement.innerText = row.name
    element.onclick = () => window.open("https://youtube.com/@" + row.youtubeHandle, '_blank');
  }
  getName()
  return element
}