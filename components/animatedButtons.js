/** @jsx createElement */
/** @jsxFrag createFragment */

function animatedButton1() {
  const wrapperEl = document.createElement("div");
  wrapperEl.classList.add("svgWrapper")
  wrapperEl.innerHTML = `
  <svg viewBox="0 0 800 800" width="251" height="251" id="redstone-bg">
    <radialGradient id="radial-gradient">
      <stop class="stop1" offset="0%"/>
      <stop class="stop2" offset="100%"/>
    </radialGradient>
    <filter id="pixelate" x="0" y="0">
      <feFlood x="0" y="0" height="4" width="4"/>
      <feComposite width="10" height="10"/>
      <feTile result="a"/>
      <feComposite in="SourceGraphic" in2="a" operator="in"/>
      <feMorphology operator="dilate" radius="2"/>
    </filter>
    
    <filter id="nnnoise-filter-1" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="140%" height="140%"  result="turbulence"></feTurbulence>
      <feSpecularLighting surfaceScale="10" specularConstant="1" specularExponent="20" lighting-color="white" x="0%" y="0%" width="140%" height="140%"  in="turbulence" result="specularLighting">
        <feDistantLight azimuth="3" elevation="10"></feDistantLight>
      </feSpecularLighting>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
    
    <filter id="nnnoise-filter-2" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="140%" height="140%" result="turbulence"></feTurbulence>
      <feSpecularLighting surfaceScale="10" specularConstant="1" specularExponent="10" lighting-color="white" x="0%" y="0%" width="140%" height="140%" in="turbulence" result="specularLighting">
        <feDistantLight azimuth="3" elevation="50"></feDistantLight>
      </feSpecularLighting>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
    
    <filter id="nnnoise-filter-3" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="140%" height="140%" result="turbulence"></feTurbulence>
      <feSpecularLighting surfaceScale="10" specularConstant="1" specularExponent="4" lighting-color="white" x="0%" y="0%" width="140%" height="140%" in="turbulence" result="specularLighting">
        <feDistantLight azimuth="3" elevation="50"></feDistantLight>
      </feSpecularLighting>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
    
    <filter id='noiseFilter'>
      <feTurbulence 
        type='fractalNoise' 
        baseFrequency='0.15' 
        numOctaves='1' 
        stitchTiles='stitch'/>
    </filter>
    
    <filter id="r1">
      <feColorMatrix type="matrix" in="SourceGraphic" 
      values="1.0  0.0  0.0  0.0  0.0
                0.0  0.0  0.0  0.0  0.0
                0.0  0.0  0.0  0.0  0.0
                1.0  0.0  0.0  0.0  0.0"
      />
    </filter>
    <filter id="r2">
      <feColorMatrix type="matrix" in="SourceGraphic" 
      values="0.66  0.0  0.0  0.0  0.0
                0.0  0.006  0.0  0.0  0.0
                0.0  0.0  0.0  0.0  0.0
                1.0  0.0  0.0  0.0  0.0"
      />
    </filter>
    <filter id="r3">
      <feColorMatrix type="matrix" in="SourceGraphic" 
      values="0.45  0.0  0.0  0.0  0.0
                0.0  0.0  0.0  0.0  0.0
                0.0  0.0  0.0  0.0  0.0
                1.0  0.0  0.0  0.0  0.0"
      />
    </filter>
    <filter id="r4">
      <feColorMatrix type="matrix" in="SourceGraphic" 
      values="0.25  0.0  0.0  0.0  0.0
                0.0  0.0  0.0  0.0  0.0
                0.0  0.0  0.0  0.0  0.0
                0.0  0.0  0.0  1.0  0.0"
      />
    </filter>
    
    <g>
      <g filter="url(#r4)">
        <g filter="url(#pixelate)">
          <rect width="100%" height="100%" class="animationFill"></rect>
        </g>
      </g>

      <g filter="url(#r3)">
        <g filter="contrast(100)">
          <g filter="url(#pixelate)">
          <rect width='100%' height='100%' fill="black"/>
          <rect width="100%" height="100%" class="animationFill" filter="url(#nnnoise-filter-3)"></rect>
          </g>
        </g>
      </g>

      <g filter="url(#r2)">
        <g filter="contrast(100)">
          <g filter="url(#pixelate)">
          <rect width='100%' height='100%' fill="black"/>
          <rect width="100%" height="100%" class="animationFill" filter="url(#nnnoise-filter-2)"></rect>
          </g>
        </g>
      </g>

      <g filter="url(#r1)">
        <g filter="contrast(100)">
          <g filter="url(#pixelate)">
          <rect width='100%' height='100%' fill="black"/>
          <rect width="100%" height="100%" class="animationFill" filter="url(#nnnoise-filter-1)"></rect>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `
  return wrapperEl
}

function animatedButton2() {
  const wrapperEl = document.createElement("div");
  wrapperEl.classList.add("svgWrapper")
  wrapperEl.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="251" height="251" id="redstone-bg">
    <radialGradient id="radial-gradient-2">
      <stop class="stop1" offset="0%"/>
      <stop class="stop2" offset="100%"/>
    </radialGradient>
    
    <g>
      <g filter="url(#r4)">
        <g filter="url(#pixelate)">
          <rect width="100%" height="100%" class="animationFill"></rect>
        </g>
      </g>

      <g filter="url(#r3)">
        <g filter="contrast(100)">
          <g filter="url(#pixelate)">
          <rect width='100%' height='100%' fill="black"/>
          <rect width="100%" height="100%" class="animationFill" filter="url(#nnnoise-filter-3)"></rect>
          </g>
        </g>
      </g>

      <g filter="url(#r2)">
        <g filter="contrast(100)">
          <g filter="url(#pixelate)">
          <rect width='100%' height='100%' fill="black"/>
          <rect width="100%" height="100%" class="animationFill" filter="url(#nnnoise-filter-2)"></rect>
          </g>
        </g>
      </g>

      <g filter="url(#r1)">
        <g filter="contrast(100)">
          <g filter="url(#pixelate)">
          <rect width='100%' height='100%' fill="black"/>
          <rect width="100%" height="100%" class="animationFill" filter="url(#nnnoise-filter-1)"></rect>
          </g>
        </g>
      </g>
    </g>  
  </svg>
  `
  return wrapperEl
}