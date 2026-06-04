import { Typography } from '@/components/ui/typography'

type Props = {
  showViews: boolean
  views: number
  showCreatedAt: boolean
  createdAt: Date
}

export function NoteStats(props: Props) {
  const { showViews, views, showCreatedAt, createdAt } = props

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {showViews && <Typography variant="small">Views: {views + 1}</Typography>}
      {showCreatedAt && (
        <Typography variant="small">
          Created at: {createdAt.toLocaleDateString()}
        </Typography>
      )}
    </div>
  )
}
