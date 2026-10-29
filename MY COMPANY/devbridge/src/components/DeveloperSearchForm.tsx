type Cat = { slug: string; name: string };

/** Plain GET form: works without JavaScript and keeps filters in the URL (shareable, back-button friendly). */
export function DeveloperSearchForm({
  categories,
  values = {},
}: {
  categories: Cat[];
  values?: { q?: string; category?: string; budget?: string; availability?: string };
}) {
  return (
    <form action="/developers" method="get" className="card grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="search">
      <div className="lg:col-span-2">
        <label htmlFor="q" className="label">Skill or language</label>
        <input id="q" name="q" defaultValue={values.q} placeholder="e.g. React, Python, WordPress" className="input" maxLength={60} />
      </div>
      <div>
        <label htmlFor="category" className="label">Project category</label>
        <select id="category" name="category" defaultValue={values.category ?? ""} className="input">
          <option value="">Any</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="budget" className="label">Max budget (₹)</label>
        <input id="budget" name="budget" type="number" min={0} step={500} defaultValue={values.budget} placeholder="e.g. 10000" className="input" />
      </div>
      <div>
        <label htmlFor="availability" className="label">Availability</label>
        <select id="availability" name="availability" defaultValue={values.availability ?? ""} className="input">
          <option value="">Any</option>
          <option value="AVAILABLE">Available</option>
          <option value="LIMITED">Limited</option>
        </select>
      </div>
      <div className="sm:col-span-2 lg:col-span-5">
        <button type="submit" className="btn-primary w-full sm:w-auto">Search developers</button>
      </div>
    </form>
  );
}
