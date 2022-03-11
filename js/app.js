let posts = [];

let likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
  return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
  return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
  return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
//second click means deselect
 if(!likedPostsId.find(likedPost => likedPost === id )){
  likedPostsId.push(id);
 }else{
   //deselect love react
  deselect(id);
 }
  
  console.log(likedPostsId);
  showPosts(posts);
};

const reportPost = (id) => {
  reportedPostsId.push(id);
  const remainingPosts = posts.filter(
    (post) => !reportedPostsId.includes(post.id)
  );
  showPosts(remainingPosts);
};

const displayContent = (text) => {
  return text.length < 30
    ? text
    : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
  if (id === "posts") {
    document.getElementById("posts").style.display = "grid";
    document.getElementById("liked").style.display = "none";
    document.getElementById("reported").style.display = "none";
    document.getElementById("articleBOX").style.display = "block";
  } else if (id === "liked") {
    document.getElementById("liked").style.display = "block";
    document.getElementById("posts").style.display = "none";
    document.getElementById("reported").style.display = "none";
    document.getElementById("articleBOX").style.display = "none";

    displayLikedPosts();
  } else {
    document.getElementById("reported").style.display = "block";
    document.getElementById("posts").style.display = "none";
    document.getElementById("liked").style.display = "none";
    document.getElementById("articleBOX").style.display = "none";

    displayReportedPosts();
  }
};
//deselect love react
const deselect = (id) => {
  
    const newlikedPostsIds = likedPostsId.filter(likedPost => likedPost !== id );
    likedPostsId = newlikedPostsIds;
   
};

const createPost = (post, Isreported = false) => {
  
  //Ignore deleted files
  let reportedstate = true;
  for (const reportedPost of reportedPostsId) {
    if (post.id === reportedPost) {
      reportedstate = false;
      //deselect love react
      deselect(post.id);

    }
  }


  //Switch to love or reported list
  if (reportedstate || Isreported) {
    const image = post.image;
    const div = document.createElement("article");
    div.classList.add("post");
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${post.userImage}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${
                    isLiked(post.id) && "text-danger"
                  }"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                    post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(
                  post.description
                )}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                          ${post.comments[0]?.user}
                      </a>
                      ${post.comments[0]?.text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
  } else {
    return 0; //0 = falsey value , It can falsify the condition
  }
};

const showPosts = (posts) => {
  const productsContainer = document.getElementById("posts");
  productsContainer.innerHTML = "";

  posts.forEach((post) => {
    const div = createPost(post);
    //Ignores false returns
    if (div) {
      productsContainer.appendChild(div);
    }
  });
};

const displayLikedPosts = () => {
  const likedPosts = getLikedPosts();

  document.getElementById("likedbox").innerHTML = "";
  likedPosts.forEach((post) => {
    const div = createPost(post);
    //Ignores false returns
    if (div) {
      document.getElementById("likedbox").appendChild(div);
    }
  });
};

const displayReportedPosts = () => {
  const reportedPosts = getReportedPosts();
  document.getElementById("reportedBox").innerHTML = "";
  reportedPosts.forEach((post) => {
    const div = createPost(post, true);
    //Ignores false returns
    if (div) {
      document.getElementById("reportedBox").appendChild(div);
    }
  });
};

const loadPosts = async () => {
  let data = await fetch("../data/posts.json");
  posts = await data.json();
  showPosts(posts);
};

// const Home = () =>{
//   switchTab( 'posts' );
//   location.reload(); 
// }
// const Love = () =>{
//   switchTab( 'liked' )
//   location.reload(); 
// }

loadPosts();
// const navLinks = document.querySelectorAll('.nav-item')
// const menuToggle = document.getElementById('navbarSupportedContent')
// const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
// navLinks.forEach((l) => {
//     l.addEventListener('click', () => { bsCollapse.toggle() })
// })


