/** @jsx createElement */
/** @jsxFrag createFragment */

function image(path) {
  const element = <div className="image" data-isLoading="true"></div>
  async function getImage() {
    const response = await sb
      .storage
      .from("images")
      .getPublicUrl(path)
    handleSBError("Failed retrieving image", response.error)
    element.style.backgroundImage = `url(${response.data.publicUrl})`
  }
  getImage()
  return element
}