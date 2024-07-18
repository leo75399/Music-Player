const ScrollToTop = () => {
  const renderedSpan = Array.from({ length: 18 }).map((_, i) => (
    <span style={{ '--i': i + 1 }} key={i}>
      <i>scroll</i> <i>up</i> <i className="fas fa-chevron-circle-up"></i>
    </span>
  ))

  return (
    <div
      className="j-list-scroll-wrap d-none d-lg-flex "
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="j-list-scroll-box">{renderedSpan}</div>
    </div>
  )
}

export default ScrollToTop
