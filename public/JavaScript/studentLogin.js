function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("login successfull");
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
}

document.querySelector("button").addEventListener("click", () => {
  location.href = "http://localhost:3000/studentPage";
});

window.student_id = document.querySelector("input").value;
