import { selectIsFavorite, selectToggleFavorite } from '../store/selectors'
import { useDashboardStore } from '../store/useDashboardStore'

interface FavoriteButtonProps {
  code: string
}

function FavoriteButton({ code }: FavoriteButtonProps) {
  const isFavorite = useDashboardStore(selectIsFavorite(code))
  const toggleFavorite = useDashboardStore(selectToggleFavorite)

  return (
    <button
      type="button"
      className="favorite-button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
      onClick={() => toggleFavorite(code)}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  )
}

export default FavoriteButton