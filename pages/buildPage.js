/** @jsx createElement */
/** @jsxFrag createFragment */

async function displayBuildPageFromUrl() {

  document.body.appendChild(nav(category))
  
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("build")) {window.location.href = `/${category}`;}
  const buildId = urlParams.get("build")
  const response = await sb
    .from("builds")
    .select()
    .eq('uuid', buildId)
    .eq('category', category)
    .maybeSingle();

  if (response.error != null || response.data == null) {
    // build not found
    document.body.appendChild(unknownBuildPage());
  } else {
    // build found
    const build = response.data
    document.body.appendChild(viewBuild(build))
  }
}

displayBuildPageFromUrl()