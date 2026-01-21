const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const blogsDiv = document.getElementById("blogs");

saveBtn.addEventListener("click", async () => {
  const id = document.getElementById("blogId").value;
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const author = document.getElementById("author").value;

  if (!title || !body) return alert("Title and body are required");

  const data = { title, body, author };

  if (id) {
    await fetch(`/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } else {
    await fetch("/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  clearForm();
  loadBlogs();
});

clearBtn.addEventListener("click", clearForm);

async function loadBlogs() {
  const res = await fetch("/blogs");
  const blogs = await res.json();

  blogsDiv.innerHTML = "";

  blogs.forEach((b) => displayBlog(b));
}

function displayBlog(blog) {
  const div = document.createElement("div");
  div.className = "blog";

  div.innerHTML = `
    <h3>${blog.title}</h3>
    <p>${blog.body}</p>
    <small>Author: ${blog.author}</small><br/>
    <button onclick="editBlog('${blog._id}')">Edit</button>
    <button class="delete" onclick="deleteBlog('${blog._id}')">Delete</button>
  `;

  blogsDiv.appendChild(div);
}

async function editBlog(id) {
  const res = await fetch(`/blogs/${id}`);
  const blog = await res.json();

  document.getElementById("blogId").value = blog._id;
  document.getElementById("title").value = blog.title;
  document.getElementById("body").value = blog.body;
  document.getElementById("author").value = blog.author;
}

async function deleteBlog(id) {
  if (!confirm("Delete this post?")) return;

  await fetch(`/blogs/${id}`, {
    method: "DELETE",
  });

  loadBlogs();
}

function clearForm() {
  document.getElementById("blogId").value = "";
  document.getElementById("title").value = "";
  document.getElementById("body").value = "";
  document.getElementById("author").value = "";
}

loadBlogs();
