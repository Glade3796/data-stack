const form = document.getElementById("form");
const delToggle = document.getElementById("deleteCheck");

//form submit function:
//####################
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formVal = Object.fromEntries(formData);
  //posting to place.db:
  const res = await fetch("http://localhost:3333/place", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formVal),
  });
  //console logging
  const json = await res.json();
  console.log(json);
  console.log(formVal);
  location.reload();

  window.scrollTo(0, document.body.scrollHeight);
});

//function to generate content
//############################
async function getEntries() {
  //fetching database info
  const res = await fetch("http://localhost:3333/place");
  const entry = await res.json();
  entry.reverse();
  //creation of each element
  entry.forEach(function (entry) {
    //html elements
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const likes = document.createElement("p");
    const alreadyLiked = document.createElement("p");
    const delBtn = document.createElement("button");
    //html manipulation
    div.style.backgroundColor = entry.user_colour;
    alreadyLiked.setAttribute("class", "alreadyliked");
    delBtn.setAttribute("class", "delBtn delBtnHid");
    delBtn.setAttribute("id", `del_${entry.id}`);
    delBtn.style.visibility = "hidden";
    //--'userbox' class for css and node referencing
    div.setAttribute("class", "userBox");
    //setting each 'userbox' with an id to be referenced for likes & deletion
    const divID = `${entry.id}`;
    div.setAttribute("id", divID);
    //setting likes field as 'likes' class for css and referencing
    likes.setAttribute("class", "likes");
    //giving h3 a liked attribute to be switched to true when liked
    h3.setAttribute("liked", false);
    //'userbox' contents
    h3.textContent = entry.user_firstname;
    p.textContent = entry.user_message;
    likes.textContent = entry.likes;
    alreadyLiked.textContent = "already liked!";
    delBtn.textContent = "x";
    //add eventlistener to each 'userbox'
    div.addEventListener(
      "click",
      //function for when userbox is clicked

      //################# start of click function ##########
      async function (event) {
        event.stopImmediatePropagation();
        console.log("click", divID);
        //retrieve userbox liked status via attributes
        let liked = h3.getAttribute("liked");
        //get dom node for the likes displayed via the .likes class
        let likeDisp = div.getElementsByClassName("likes");

        //to be executed if the userBox has not previously been clicked
        if (h3.getAttribute("liked") == "false") {
          //retrieve likes from database
          let currentLikes = entry.likes;
          //increment likes by one
          let newLikes = currentLikes + 1;
          //create new object to be sent to database/server
          let newEnt = {
            id: entry.id,
            likes: newLikes,
          };
          //send above object via POST route to 3333/likes
          const res = await fetch("http://localhost:3333/likes", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newEnt),
          });
          //console logging
          const json = await res.json();
          console.log(json);
          console.log("new entry: ", newEnt);
          //content for liked post (repeated temp)
          const likedPost = `\u2665${h3.textContent}\u2665`;
          //trying to circumvent repeated instances
          if (h3 != likedPost) {
            h3.textContent = likedPost;
          }
          //set attribute liked to true
          h3.setAttribute("liked", true);
          //access local storage and add id of clicked 'userBox'
          let likeData = JSON.parse(localStorage.getItem("likes"));
          if (likeData != null || undefined) {
            likeData.push({ id: divID, liked: true });
          } else {
            likeData = [];
            likeData.push({ id: divID, liked: true });
          }
          likes.textContent = newLikes;
          localStorage.setItem("likes", JSON.stringify(likeData));
        }
        //if already been liked then ->
        else {
          console.log("already liked");
          alreadyLiked.setAttribute("class", "rev-alreadyliked");
          setTimeout(() => {
            alreadyLiked.setAttribute("class", "alreadyliked");
          }, 500);
        }
      }
    );
    //################### end of click function ################

    //accessing local data ("if statements" to circumvent empty field)
    let likeData = JSON.parse(localStorage.getItem("likes"));
    console.log();
    for (let index = 0; index < likeData.length; index++) {
      if (entry.id == likeData[index].id) {
        const likedPost = `\u2665${h3.textContent}\u2665`;
        console.log("liked", entry.id);
        h3.setAttribute("liked", true);
        h3.textContent = likedPost;
      }
    }
    // ############## delete button function ########################
    delBtn.addEventListener("click", async function (event) {
      //prevent beneath div triggering
      event.stopImmediatePropagation();
      //obj with id to be deleted
      let delEntry = {
        id: entry.id,
      };
      //send to 3333/del
      const res = await fetch("http://localhost:3333/del", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(delEntry),
      });
      //remove div
      const delDiv = document.getElementById(`${entry.id}`);
      delDiv.remove();
    });
    // ############### end of delete function ################
    //adding each element to a div and then to the container
    div.appendChild(delBtn);
    div.appendChild(alreadyLiked);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(likes);
    const container = document.getElementById("container");
    container.appendChild(div);
  });
}

//###### delete toggle ########
delToggle.addEventListener("click", function (event) {
  //   event.stopPropagation();
  const dBtn = document.getElementsByClassName("delBtn");
  console.log(delToggle.checked);
  let check = delToggle.checked;
  console.log(check);
  if (check) {
    for (let i = 0; i < dBtn.length; i++) {
      dBtn[i].style.visibility = "visible";
    }
  } else {
    for (let x = 0; x < dBtn.length; x++) {
      dBtn[x].style.visibility = "hidden";
    }
  }
});

getEntries();
