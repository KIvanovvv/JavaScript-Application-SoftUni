import { html } from "../../node_modules/lit-html/lit-html.js";
import { editJob, getJobById } from "../api/data.js";

export async function showEdit(ctx) {
  const job = await getJobById(ctx.params.id);
  ctx.render(editTemp(job, onEdit));

  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, imageUrl, category, description, requirements, salary } =
      Object.fromEntries(formData);
    if (
      !title ||
      !imageUrl ||
      !category ||
      !description ||
      !requirements ||
      !salary
    ) {
      alert(`All fields are required!`);
      return;
    }
    await editJob(
      job._id,
      title,
      imageUrl,
      category,
      description,
      requirements,
      salary
    );
    ctx.page.redirect(`/details/${job._id}`);
  }
}

function editTemp(job, onEdit) {
  return html` <section id="edit">
    <div class="form">
      <h2>Edit Offer</h2>
      <form @submit=${onEdit} class="edit-form">
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
          value=${job.title}
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          value=${job.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          value=${job.category}
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        >
${job.description}</textarea
        >
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        >
${job.requirements}</textarea
        >
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
          value=${job.salary}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;
}
