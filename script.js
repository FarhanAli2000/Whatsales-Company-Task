const url =
  "https://api.currencyapi.com/v3/latest?currencies=PKR&apikey=cur_live_JEcpC8CbNEcaX2VKQ1OqxwHYFNWCkPgfShvc9zPJ";

let exchangeRates = [];
let timestamps = [];

const data = {
  labels: timestamps,
  datasets: [
    {
      label: "USD to PKR",
      data: exchangeRates,
      borderWidth: 2,
      borderColor: "green",
      backgroundColor: "rgba(0, 255, 0, 0.1)",
    },
  ],
};

const config = {
  type: "line",
  data,
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: "Time" },
        ticks: { maxTicksLimit: 10 },
      },
      y: {
        beginAtZero: false,
        title: { display: true, text: "Exchange Rate (PKR)" },
      },
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);

function fetchExchangeRate() {
  fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      const rate = data.data.PKR.value;
      const now = new Date().toLocaleTimeString();

      exchangeRates.push(rate);
      timestamps.push(now);

      if (exchangeRates.length > 10) {
        exchangeRates.shift();
        timestamps.shift();
      }

      myChart.update();
    })
    .catch((error) => console.error("Error fetching exchange rate:", error));
}

fetchExchangeRate();
setInterval(fetchExchangeRate, 35000);
