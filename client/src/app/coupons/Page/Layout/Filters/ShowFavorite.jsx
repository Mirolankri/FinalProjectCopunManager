import React from 'react'

export const ShowFavorite = ({onShowFavorite}) => {
  return (
    <>
    <div>
        <input type="checkbox" id="show-favorite" onChange={onShowFavorite} />
        <label htmlFor="show-favorite">הצג רק קופונים מועדפים</label>
    </div>
    </>
  )
}
