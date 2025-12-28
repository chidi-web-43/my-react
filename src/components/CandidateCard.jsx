function CandidateCard({ name, manifesto, onVote, photo }) {
  return (
    <div className="card h-100 text-center">
      {photo && (
        <img src={photo} className="card-img-top img-fluid" alt={name} />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text flex-grow-1">{manifesto}</p>
        <button className="btn btn-success mt-auto" onClick={onVote}>
          Vote
        </button>
      </div>
    </div>
  );
}

export default CandidateCard;
