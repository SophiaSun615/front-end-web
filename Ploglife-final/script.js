document.addEventListener("DOMContentLoaded", function () {
  attachClickEvent("About", "main-content");
  attachClickEvent("Recommend", "main-container");
  attachClickEvent("Explore", "explore");
  attachClickEvent("Upload", "upload");

  window.addEventListener("scroll", handleScroll);
});

function attachClickEvent(elementText, targetClass) {
  const element = Array.from(
    document.querySelectorAll(".header-center a")
  ).find((el) => el.textContent === elementText);

  if (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const targetElement = document.querySelector(`.${targetClass}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

function handleScroll() {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("fixed-header");
  } else {
    header.classList.remove("fixed-header");
  }
}

const proxyUrl = "https://type.fit/api/quotes";

function fetchInspiration(apiUrl) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return Promise.reject("Fetch failed");
      }
      return response.json();
    })
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];

      displayInspiration(randomQuote);
    })
    .catch((error) => {
      console.error("Error fetching inspiration:", error);
    });
}

function displayInspiration(quote) {
  const inspirationResult = document.getElementById("inspirationResult");

  if (inspirationResult) {
    inspirationResult.innerHTML = `<p style="color: white;">"${quote.text}" - ${quote.author}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const topTopicLinks = document.querySelectorAll(".top-topic a");

  topTopicLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      resetTopTopicColors();
      link.style.color = "#e5be68";

      const topic = link.getAttribute("data-topic");
      const imageUrl = getTopicImage(topic);
      const content = getTopicContent(topic);

      updateTopDiscussContent(content, imageUrl);
      updateRightDiscussTitle(link.innerText);
    });
  });
});

function resetTopTopicColors() {
  const topTopicLinks = document.querySelectorAll(".top-topic a");
  topTopicLinks.forEach((link) => (link.style.color = "black"));
}

function getTopicImage(topic) {
  const imageMap = {
    Minimalism:
      "https://trendenser.se/wp-content/uploads/2019/05/nyhetsbrev_59256dfe2a6b2250a22b3d9a.jpg",
    "Work-Life Balance":
      "https://i.pinimg.com/564x/b3/7e/63/b37e6371ae85da07f6188f8d71f42241.jpg",
    "Information Age":
      "https://i.pinimg.com/564x/1f/80/bb/1f80bbe1c504fa4e586c255635f099d0.jpg",
    Dinner:
      "https://i.pinimg.com/474x/cc/47/45/cc474537618ae14f3d62ff718641c491.jpg"
  };

  return imageMap[topic] || "";
}

function updateTopDiscussContent(topic, imageUrl) {
  const rightDiscussContent = document.querySelector(".right-discuss p");
  const leftSquareImage = document.querySelector(".left-square img");

  if (rightDiscussContent && leftSquareImage) {
    rightDiscussContent.innerHTML = "";
    rightDiscussContent.style.display = "block";
    leftSquareImage.src = imageUrl;

    const additionalContent = document.createElement("div");
    additionalContent.classList.add("additional-content");
    additionalContent.innerHTML = topic;

    rightDiscussContent.appendChild(additionalContent);
  }
}

function getTopicContent(topic) {
  const contentMap = {
    Minimalism:
      "A minimalist lifestyle can reduce the stress associated with consumerism and the constant pursuit of material possessions.",
    "Work-Life Balance":
      "In recent years, remote work has become a new trend in people's work styles. The rapid development of technology has provided us with opportunities to work anywhere.",
    "Information Age":
      "Fragmented reading is a double-edged sword, providing people with fast and rich information. However, the drawbacks of fragmented reading are that it can easily lead to mental inertia.",
    Dinner:
      "In a busy and fast-paced life, people don‘t have enough time to prepare food. It is common to hastily eat three meals to fill their stomachs, so they have developed many bad eating habits."
  };

  return contentMap[topic] || "";
}

function updateRightDiscussTitle(title) {
  const rightDiscussTitle = document.querySelector(".right-discuss h2");
  if (rightDiscussTitle) {
    rightDiscussTitle.textContent = title.replace("・", "");
    rightDiscussTitle.style.lineHeight = "5rem";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const photoGrid = document.getElementById("photoGrid");
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  let perPage = 9;
  async function fetchRandomPhoto() {
    try {
      const response = await fetch("https://source.unsplash.com/random");
      return response.url;
    } catch (error) {
      console.error("Error fetching random photo:", error);
    }
  }

  async function addPhotosToGrid(count) {
    for (let i = 0; i < count; i++) {
      const randomPhotoUrl = await fetchRandomPhoto();
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square9");
      const img = document.createElement("img");
      img.src = randomPhotoUrl;
      img.alt = "Unsplash Photo";
      squareDiv.appendChild(img);
      photoGrid.appendChild(squareDiv);
    }
  }
  viewMoreBtn.addEventListener("click", async () => {
    addPhotosToGrid(perPage);
  });
  addPhotosToGrid(perPage);
});

document.addEventListener("DOMContentLoaded", function () {
  const photoGrid = document.getElementById("photoGrid");
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  let perPage = 9;

  async function fetchRandomPhoto() {
    try {
      const response = await fetch("https://source.unsplash.com/random");
      return response.url;
    } catch (error) {
      console.error("Error fetching random photo:", error);
    }
  }

  async function addPhotosToGrid(count) {
    for (let i = 0; i < count; i++) {
      const randomPhotoUrl = await fetchRandomPhoto();
      const squareDiv = createSquareDiv(randomPhotoUrl);
      photoGrid.appendChild(squareDiv);
    }
  }

  viewMoreBtn.addEventListener("click", async () => {
    addPhotosToGrid(perPage);
  });

  addPhotosToGrid(perPage);
});

function upload(squareNumber) {
  var canvasId = "canv" + squareNumber;
  var imgcanvas = document.getElementById(canvasId);
  var fileinput = document.querySelector(
    "#square" + squareNumber + " input[type=file]"
  );
  var image = new SimpleImage(fileinput);
  image.drawTo(imgcanvas);
}

document
  .getElementById("uploadBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var images = [];
    var loadedCount = 0;

    function checkAndDisplay() {
      if (loadedCount === images.length) {
        displayImages(images);
        var textboxContent = document.querySelector(".textbox").innerText;
        displayText(textboxContent);
        document.getElementById("title").style.display = "block";
        document.getElementById("imageContainer").style.display = "flex";
        document.getElementById("textContainer").style.display = "block";

        showAlert("Upload successful!");
      }
    }

    for (var i = 1; i <= 6; i++) {
      var fileInput = document.querySelector(
        "#square" + i + " input[type=file]"
      );
      if (fileInput.files.length > 0) {
        var image = new Image();
        images.push(image);

        (function (currentImage, currentSquareNumber) {
          readImage(fileInput, currentImage, currentSquareNumber, function () {
            loadedCount++;
            checkAndDisplay();
          });
        })(image, i);
      }
    }

    if (images.length === 0) {
      showAlert("No images selected!");
    }
  });

function readImage(input, image, squareNumber, callback) {
  var reader = new FileReader();

  reader.onload = function (e) {
    image.src = e.target.result;
    var imgcanvas = document.getElementById("canv" + squareNumber);
    imgcanvas
      .getContext("2d")
      .drawImage(image, 0, 0, imgcanvas.width, imgcanvas.height);
    callback();
  };

  reader.readAsDataURL(input.files[0]);
}

function displayImages(images) {
  var imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  var columns = 3;
  var rows = Math.ceil(images.length / columns);

  for (var i = 0; i < rows; i++) {
    var rowElement = document.createElement("div");
    rowElement.className = "image-row";

    for (var j = 0; j < columns; j++) {
      var index = i * columns + j;

      if (index < images.length) {
        var imgElement = document.createElement("img");
        imgElement.src = images[index].src;
        imgElement.alt = "Image " + (index + 1);
        imgElement.className = "thumbnail";
        rowElement.appendChild(imgElement);
      }
    }

    imageContainer.appendChild(rowElement);
  }
}

function displayText(text) {
  var textContainer = document.getElementById("textContainer");
  textContainer.textContent = text;
}

function showAlert(message) {
  alert(message);
}