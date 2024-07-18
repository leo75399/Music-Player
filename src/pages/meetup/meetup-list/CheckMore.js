const CheckMore = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <i
        className="fas fa-caret-down"
        style={{ color: '#C4C4C4', fontSize: '40px', marginTop: '-20px' }}
      ></i>
      <i
        className="fas fa-caret-down"
        style={{
          color: '#C4C4C4',
          fontSize: '60px',
          marginTop: '-20px',
          marginBottom: '20px',
        }}
      ></i>
      <div>查看更多活動</div>
    </div>
  )
}

export default CheckMore
