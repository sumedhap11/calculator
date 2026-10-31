function calculate() {
  let amount = document.getElementById("x1").value;
  let roi = document.getElementById("x2").value;
  let duration = document.getElementById("x3").value;

  let msg = document.getElementById("msg");
  let error = document.getElementById("error");

  error.innerText = "";
  msg.innerHTML = "";

  if (amount.trim() == "" || roi.trim() == "" || duration.trim() == "") {
    error.innerText = "All Values are required";
    return;
  } else if (isNaN(amount) || isNaN(roi) || isNaN(duration)) {
    error.innerText = "All Values must be a number";
    return;
  } else if (Number(amount) <= 0 || Number(roi) <= 0 || Number(duration) <= 0) {
    error.innerText = "All Values must be positive numbers";
    return;
  } else {
    amount = Number(amount);
    roi = Number(roi);
    duration = Number(duration);

    let interest = (amount * roi * duration) / 100;
    let final = amount + interest;

    msg.innerHTML = `
            <b>Result:</b><br><br>

            <b>Principal Amount</b><br>
            ₹${amount.toLocaleString("en-IN")}<br><br>

            <b>Interest Amount</b><br>
            ₹${interest.toLocaleString("en-IN")}<br><br>

            <b>Total Amount Payable</b><br>
            ₹${final.toLocaleString("en-IN")}
        `;

    msg.style.color = "green";

    if (window.myPieChart) {
      window.myPieChart.destroy();
    }

    window.myPieChart = new Chart(document.getElementById("myChart"), {
      type: "pie",
      data: {
        labels: ["Principal Amount", "Interest Amount"],
        datasets: [
          {
            data: [amount, interest],
            backgroundColor: ["#3B82F6", "#F59E0B"],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return (
                  context.label + ": ₹" + context.raw.toLocaleString("en-IN")
                );
              },
            },
          },
        },
      },
    });
  }
}
