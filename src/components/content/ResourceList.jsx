import PageTitleBand from './PageTitleBand'
import { LinkList, ListPosts, ListRow } from './ListRows'

/** §5/§6 list page body: title band (eyebrow + h1) and link-list rows. */
export default function ResourceList({ eyebrow, title, groups }) {
  return (
    <section id="posts-list" className="posts-list-section">
      <div className="container-list flex flex-col items-center">
        <PageTitleBand eyebrow={eyebrow} title={title} />
        <ListPosts>
          {groups.map((g) => (
            // summary column: space-y-3 (12px), no gap utility
            <ListRow key={g.title} title={g.title} descriptions={g.descriptions} summaryClassName="space-y-[12px]" divider={g.divider !== false}>
              <LinkList links={g.links} />
            </ListRow>
          ))}
        </ListPosts>
      </div>
    </section>
  )
}
