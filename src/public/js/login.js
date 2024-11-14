document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response);

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("jwtToken", data.token);
      console.log("chegou aqui");
      return;
    }
    return console.error(data.message);
  });
