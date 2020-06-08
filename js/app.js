function renderLocations(location_list) {
  location_list.sort(function (a, b) {
    if (a.city < b.city) {
      return -1;
    }
    if (a.city > b.city) {
      return 1;
    }
    return 0;
  });

  var tbody = document.querySelector(".locations tbody");

  tbody.textContent = "";

  for (var i = 0; i < location_list.length; i++) {
    var row = renderLocation(location_list[i]);

    tbody.appendChild(row);
  }
}

function renderLocation(location) {
  var tr = document.createElement("tr");
  tr.appendChild(renderLocationProp(location.city, true));
  tr.appendChild(renderLocationProp(location.state));
  tr.appendChild(renderLocationProp(location.population));
  tr.appendChild(renderLocationProp(location.mayor));
  tr.appendChild(renderLocationProp(location.governor));
  tr.appendChild(renderLocationProp(location.statebird));
  return tr;
}

function renderLocationProp(content, nonNumeric) {
  var td = document.createElement("td");
  td.textContent = content;
  if (nonNumeric) {
    td.classList.add("non-numeric");
  }
  return td;
}
var searchInput = document.getElementById("location-filter");
function isLocationFound(location) {
  var userInput = searchInput.value;
  var lowercaseUserInput = userInput.toLowerCase();
  var lowercaseCity = location.state.toLowerCase();

  if (lowercaseCity.indexOf(lowercaseUserInput) >= 0) {
    return true;
  } else {
    return false;
  }
}

searchInput.addEventListener("input", function () {
  var filtered_locations = LOCATIONS.filter(isLocationFound);

  renderLocations(filtered_locations);
});
