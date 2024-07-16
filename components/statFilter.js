/** @jsx createElement */
/** @jsxFrag createFragment */

// callBack(min, max)

function statFilter(filter, callBack = () => {}) {
  if (filter.type == "dimensions2D") {
    const element = (
      <div className="statFilter">
        <div className="name">{filter.name}</div>
        <div className="line"></div>
        <input type="number" name="" className="width integerInput"
          value={filter.width} min="0"
          onChange={(event) => {
            filter.width = event.target.value;
            if (event.target.value == "") {
              event.target.value = null
              filter.width = null
            }
            callBack()
          }}
        />
        <div className="clearInput"
          onclick={() => {
            filter.width = null
            element.querySelector(".width").value = filter.width
            callBack()
          }}
        ><ion-icon name="close"></ion-icon></div>
        <div className="inputRelation">x</div>
        <input type="number" name="" className="height integerInput"
          value={filter.height}
          onChange={(event) => {
            filter.height = event.target.value;
            if (event.target.value == "") {
              event.target.value = null
              filter.height = null
            }
            callBack()
          }}
        />
        <div className="clearInput"
          onclick={() => {
            filter.height = null
            element.querySelector(".height").value = filter.height
            callBack()
          }}
        ><ion-icon name="close"></ion-icon></div>
      </div>
    )
    return element
  }



  if (filter.type == "integerRange") {
    const element = (
      <div className="statFilter">
        <div className="name">{filter.name}</div>
        <div className="line"></div>
        <input type="number" name="" className="min integerInput"
          value={filter.min} min={filter.minLimit}
          onChange={(event) => {
            filter.min = event.target.value;
            if (event.target.value == "") {
              event.target.value = null
              filter.min = null
            }
            if (filter.min > filter.max && filter.max != null) {
              filter.max = filter.min
              element.querySelector(".max").value = filter.max
            }
            callBack()
          }}
        />
        <div className="clearInput"
          onclick={() => {
            filter.min = filter.minLimit
            element.querySelector(".min").value = filter.min
            callBack()
          }}
        ><ion-icon name="close"></ion-icon></div>
        <div className="inputRelation">to</div>
        <input type="number" name="" className="max integerInput"
          value={filter.max} max={filter.maxLimit}
          onChange={(event) => {
            filter.max = event.target.value;
            if (event.target.value == "") {
              event.target.value = null
              filter.max = null
            }
            if (filter.max < filter.min && filter.min != null) {
              filter.min = filter.max
              element.querySelector(".min").value = filter.min
            }
            callBack()
          }}
        />
        <div className="clearInput"
          onclick={() => {
            filter.max = filter.maxLimit
            element.querySelector(".max").value = filter.max
            callBack()
          }}
        ><ion-icon name="close"></ion-icon></div>
      </div>
    )
    return element
  }

  if (filter.type == "tickRange") {
    const element = (
      <div className="statFilter">
        <div className="name">{filter.name}</div>
        <div className="line"></div>
        <div class="tickInputWrapper">
          <input type="number" name="" className="min integerInput" style={"--value: " + (filter.min != null ? `(${filter.min * 0.05}s)` : "")}
            value={filter.min} min={filter.minLimit}
            onChange={(event) => {
              filter.min = event.target.value;
              if (event.target.value == "") {
                event.target.value = null
                filter.min = null
              }
              event.target.parentElement.style.setProperty("--value", filter.min != null ? `(${filter.min * 0.05}s)` : "")
              if (filter.min > filter.max && filter.max != null) {
                filter.max = filter.min
                element.querySelector(".max").value = filter.max
              }
              callBack()
            }}
          />
        </div>
        <div className="clearInput"
          onclick={() => {
            filter.min = filter.minLimit
            element.querySelector(".min").value = filter.min
            callBack()
          }}
        ><ion-icon name="close"></ion-icon></div>
        <div className="inputRelation">to</div>
        <input type="number" name="" className="max integerInput" style={"--value: " + (filter.max != null ? `(${filter.max * 0.05}s)` : "")}
          value={filter.max} max={filter.maxLimit}
          onChange={(event) => {
            filter.max = event.target.value;
            if (event.target.value == "") {
              event.target.value = null
              filter.max = null
            }
            event.target.parentElement.style.setProperty("--value", filter.max != null ? `(${filter.max * 0.05}s)` : "")
            if (filter.max < filter.min && filter.min != null) {
              filter.min = filter.max
              element.querySelector(".min").value = filter.min
            }
            callBack()
          }}
        />
        <div className="clearInput"
          onclick={() => {
            filter.max = filter.maxLimit
            element.querySelector(".max").value = filter.max
            callBack()
          }}
        ><ion-icon name="close"></ion-icon></div>
      </div>
    )
    return element
  }
  
}