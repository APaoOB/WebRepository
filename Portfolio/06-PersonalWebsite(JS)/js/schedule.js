function addScheduleEntry(event) {
  event.preventDefault();

  var date = document.getElementById("schedule-date").value;
  var start = document.getElementById("schedule-start").value;
  var end = document.getElementById("schedule-end").value;
  var activity = document.getElementById("schedule-activity").value.trim();
  var place = document.getElementById("schedule-place").value.trim();
  var type = document.getElementById("schedule-type").value;
  var notes = document.getElementById("schedule-notes").value.trim();
  var flag = document.getElementById("schedule-flag").value;
  var isFree = document.getElementById("schedule-free");

  if (!date || !start || !end || !activity || !place) {
    window.alert("Please complete all the information :)");
    return;
  }

  if (end <= start) {
    window.alert("Unless you are Hermione Granger, the end time must be after the start time.");
    return;
  }

  var row = document.createElement("tr");
  var values = [date, start, end, activity, place, type, notes];

  values.forEach(function (value) {
    var cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });

  var statusCell = document.createElement("td");
  var statusImage = document.createElement("img");
  statusImage.src = isFree ? "images/free.png" : "images/busy.png";
  statusImage.alt = isFree ? "Free" : "Busy";
  statusImage.width = 20;
  statusImage.style.borderLeft = "6px solid " + flag;
  statusCell.appendChild(statusImage);
  row.appendChild(statusCell);

  document.getElementById("schedule-body").appendChild(row);
  document.getElementById("schedule-form").reset();
}

document.getElementById("schedule-form").addEventListener("submit", addScheduleEntry);
