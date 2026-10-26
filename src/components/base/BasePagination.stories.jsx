import { useState } from 'react'
import BasePagination from './BasePagination.jsx'

// Un vrai composant (nom en majuscule) pour pouvoir utiliser useState
function InteractivePagination({ totalPages, startPage = 1 }) {
  const [page, setPage] = useState(startPage)
  return <BasePagination page={page} totalPages={totalPages} onChange={setPage} />
}

export default {
  title: 'Base/BasePagination',
  component: BasePagination,
}

export const FirstPage = { name: 'Première page', render: () => <InteractivePagination totalPages={3} /> }
export const MiddlePage = { name: 'Page du milieu', render: () => <InteractivePagination totalPages={5} startPage={3} /> }
export const LastPage = { name: 'Dernière page', render: () => <InteractivePagination totalPages={3} startPage={3} /> }
