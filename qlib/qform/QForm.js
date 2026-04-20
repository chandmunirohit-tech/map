document.addEventListener("DOMContentLoaded", function () {

  emailjs.init("YOUR_PUBLIC_KEY");

  const formContainer = document.getElementById("dynamicForm");

  const fields = [
    {
      type:"text",
      name:"user_name",
      label:"Name",
      placeholder:"Enter your name"
    },
    {
      type:"number",
      name:"user_number",
      label:"Phone",
      placeholder:"Enter phone number"
    },
    {
      type:"textarea",
      name:"message",
      label:"Message",
      placeholder:"Write your message"
    }
  ];


  fields.forEach(field => {

    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    label.innerText = field.label;
    label.className = "block text-sm font-medium mb-1";

    let element;

    if(field.type === "textarea"){
      element = document.createElement("textarea");
    }
    else{
      element = document.createElement("input");
      element.type = field.type;
    }

    element.name = field.name;
    element.placeholder = field.placeholder;
    element.className =
    "w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none";

    const error = document.createElement("p");
    error.className = "text-red-500 text-sm mt-1 hidden";

    wrapper.appendChild(label);
    wrapper.appendChild(element);
    wrapper.appendChild(error);

    formContainer.appendChild(wrapper);

  });



  document.getElementById("sendBtn").addEventListener("click", function(){

    let valid = true;

    const nameInput = document.querySelector('[name="user_name"]');
    const phoneInput = document.querySelector('[name="user_number"]');
    const messageInput = document.querySelector('[name="message"]');

    const nameError = nameInput.nextElementSibling;
    const phoneError = phoneInput.nextElementSibling;
    const messageError = messageInput.nextElementSibling;

    nameError.classList.add("hidden");
    phoneError.classList.add("hidden");
    messageError.classList.add("hidden");

    nameInput.classList.remove("border-red-500");
    phoneInput.classList.remove("border-red-500");
    messageInput.classList.remove("border-red-500");


    if(nameInput.value.trim() === ""){
      nameError.innerText = "Name is required";
      nameError.classList.remove("hidden");
      nameInput.classList.add("border-red-500");
      valid = false;
    }


    if(phoneInput.value.trim() === ""){
      phoneError.innerText = "Phone number is required";
      phoneError.classList.remove("hidden");
      phoneInput.classList.add("border-red-500");
      valid = false;
    }
    else if(!/^[0-9]{10}$/.test(phoneInput.value)){
      phoneError.innerText = "Enter valid 10 digit phone number";
      phoneError.classList.remove("hidden");
      phoneInput.classList.add("border-red-500");
      valid = false;
    }


    if(messageInput.value.trim() === ""){
      messageError.innerText = "Message cannot be empty";
      messageError.classList.remove("hidden");
      messageInput.classList.add("border-red-500");
      valid = false;
    }
    else if(messageInput.value.trim().length < 5){
      messageError.innerText = "Message must be at least 5 characters";
      messageError.classList.remove("hidden");
      messageInput.classList.add("border-red-500");
      valid = false;
    }


    if(!valid) return;


    const params = {
      user_name: nameInput.value,
      user_number: phoneInput.value,
      message: messageInput.value
    };

    emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",params)
    .then(function(){
      alert("Mail Sent Successfully ✅");
    })
    .catch(function(error){
      alert("Error ❌");
      console.log(error);
    });

  });

});