export default function AssetItem ({ asset }) {
  return (
    <div className="col-xl-4 col-md-6 mb-3">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title">
            <img
              width={24}
              height={24}
              src={`https://static.coincap.io/assets/icons/${asset.symbol?.toLowerCase()}@2x.png`}
              style={{ marginRight: '.5rem' }}
            />
            {asset.name}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  )
}