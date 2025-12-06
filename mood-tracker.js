const moodChartCanvas = document.getElementById("moodChart");
let moodChart;

function logMood(emoji) {
  const moodData = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const timestamp = new Date().toLocaleString();
  moodData.push({ emoji, timestamp });
  localStorage.setItem("moodHistory", JSON.stringify(moodData));
  updateMoodChart();
}

function updateMoodChart() {
  const moodData = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const labels = moodData.map(entry => entry.timestamp);
  const values = moodData.map(entry => {
    switch (entry.emoji) {
      case "😊": return 3;
      case "😐": return 2;
      case "😞": return 1;
      default: return 0;
    }
  });

  if (moodChart) moodChart.destroy();

  moodChart = new Chart(moodChartCanvas, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Mood Over Time",
        data: values,
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 3,
          ticks: {
            callback: function (value) {
              return ["", "😞", "😐", "😊"][value];
            }
          }
        }
      }
    }
  });
}

// Initialize chart on load
updateMoodChart();
