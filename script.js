function showForm() {
    const selectedForm = document.getElementById("formSelect").value;
    let message;
    if (selectedForm === "exp") {
      message = "Выбрана показательная форма.";
    } else if (selectedForm === "trig") {
      message = "Выбрана тригонометрическая форма.";
    }
    console.log(message); 
  }

function toExponential(modulus, argument) {
    // z = modulus * e^(i * argument)
    return modulus + " * e^(" + argument + "*i)";
  }
  
  function toTrigonometric(modulus, argument) {
    // z = modulus * (cos(argument) + i * sin(argument))
    return modulus + " * (cos(" + argument + ") + i * sin(" + argument + "))";
  }

  function getRealPart(modulus, argument, form) {
    if (form === "exp") {
      return modulus * Math.cos(argument);
    } else if (form === "trig") {
      return modulus * Math.cos(argument); 
    }
  }
  
  function getImaginaryPart(modulus, argument, form) {
    if (form === "exp") {
      return modulus * Math.sin(argument);
    } else if (form === "trig") {
      return modulus * Math.sin(argument); 
    }
  }

  function getArgument(modulus, argument, form) {
    if (form === "trig") {
      return argument; 
    } else if (form === "exp") {
      return Math.atan2(getImaginaryPart(modulus, argument, form), getRealPart(modulus, argument, form)); 
    }
  }

  function removeErrorClass(event) {
    event.target.classList.remove("error"); 
  }

  function calculate() {

    let hasErrors = false;

    const modulus = parseFloat(document.getElementById("modulusInput").value);
    const argument = parseFloat(document.getElementById("argumentInput").value);

    document.getElementById("modulusInput").addEventListener("input", removeErrorClass);
    document.getElementById("argumentInput").addEventListener("input", removeErrorClass);   

    if (modulus < 0) {
        document.getElementById("modulusInput").classList.add("error");
        hasErrors = true;
    }

    if (argument === 0) {
        document.getElementById("argumentInput").classList.add("error");
        hasErrors = true;
    }

    if (hasErrors) {
        return;
      }

      if (!document.getElementById("realPart").checked &&
      !document.getElementById("imagPart").checked &&
      !document.getElementById("argument").checked &&
      !document.getElementById("otherForm").checked) {
    document.getElementById("realPart").classList.add("error");
    document.getElementById("imagPart").classList.add("error");
    document.getElementById("argument").classList.add("error");
    document.getElementById("otherForm").classList.add("error");
    return;
  } else {
    document.getElementById("realPart").classList.remove("error");
    document.getElementById("imagPart").classList.remove("error");
    document.getElementById("argument").classList.remove("error");
    document.getElementById("otherForm").classList.remove("error");
  }
  
    const form = document.getElementById("formSelect").value;
  
    const resultsList = document.createElement("ul");
  
    if (document.getElementById("realPart").checked) {
      const realPart = getRealPart(modulus, argument, form);
      const listItem = document.createElement("li");
      listItem.textContent = "Действительная часть: " + realPart;
      resultsList.appendChild(listItem);
    }
 
    if (document.getElementById("imagPart").checked) {
        const imagPart = getImaginaryPart(modulus, argument, form);
        const listItem = document.createElement("li");
        listItem.textContent = "Мнимая часть: " + imagPart;
        resultsList.appendChild(listItem);
    }
    
      if (document.getElementById("argument").checked) {
        const arg = getArgument(modulus, argument, form);
        const listItem = document.createElement("li");
        listItem.textContent = "Аргумент: " + arg;
        resultsList.appendChild(listItem);
    }
    
      if (document.getElementById("otherForm").checked) {
        let otherFormResult;
        if (form === "exp") {
          otherFormResult = toTrigonometric(modulus, argument);
        } else if (form === "trig") {
          otherFormResult = toExponential(modulus, argument);
        }
        const listItem = document.createElement("li");
        listItem.textContent = "Другая форма: " + otherFormResult;
        resultsList.appendChild(listItem);
    }
  
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 
    resultsDiv.appendChild(resultsList);
  }

  function clearFields() {
    document.getElementById("argumentInput").value = "";
    document.getElementById("modulusInput").value = "";
    document.getElementById("results").innerHTML = "";

    document.getElementById("realPart").checked = false;
    document.getElementById("imagPart").checked = false;
    document.getElementById("argument").checked = false;
    document.getElementById("otherForm").checked = false;
  }