import { Link } from 'react-router'
import StatusMessage from '../components/StatusMessage'

function NotFoundPage() {
  return (
    <section>
      <StatusMessage variant="empty" message="Сторінку не знайдено" />
      <Link to="/" className="back-link">← На головну</Link>
    </section>
  )
}

export default NotFoundPage