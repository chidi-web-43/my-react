// src/pages/Results.jsx
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Results() {
  // Example results data (replace with backend later)
  const results = [
    { name: "John Doe", votes: 120 },
    { name: "Jane Smith", votes: 95 },
    { name: "Ali Musa", votes: 80 },
    { name: "Grace Okoro", votes: 60 },
  ];

  // Find the candidate with the highest votes
  const maxVotes = Math.max(...results.map(c => c.votes));
  const winner = results.find(c => c.votes === maxVotes);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', minHeight: "100vh", background: "#f4f6f9" }}>
      
      {/* HERO / HEADER */}
      <div className="bg-success text-white py-5 text-center">
        <h2 className="fw-bold mb-2">SUG Election Results</h2>
        <p className="lead mb-0">Official tally of votes for Students’ Union Government (SUG)</p>
      </div>

      {/* WINNER CARD */}
      <div className="container py-4">
        <div className="card border-success shadow-sm mb-5">
          <div className="card-body text-center">
            <h4 className="fw-bold">🎉 Winner 🎉</h4>
            <h3 className="text-success mt-2">{winner.name}</h3>
            <p className="mb-0">Total Votes: <strong>{winner.votes}</strong></p>
          </div>
        </div>

        {/* RESULTS TABLE */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-4">Vote Tally</h5>
            <table className="table table-striped table-hover">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Candidate</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {results.map((candidate, index) => (
                  <tr key={index} className={candidate.name === winner.name ? "table-success fw-bold" : ""}>
                    <td>{index + 1}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-4">
              <Link to="/" className="btn btn-outline-success">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Results;
